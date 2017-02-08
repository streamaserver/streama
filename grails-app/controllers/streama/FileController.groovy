package streama

import grails.converters.JSON
import grails.config.Config

import groovy.json.JsonSlurper

import java.nio.file.Files
import java.nio.file.Paths
import java.util.regex.Pattern

import static org.springframework.http.HttpStatus.*

class FileController {

  def uploadService
  def fileService
  def srt2vttService
  def theMovieDbService

  def index(){
    def filter = params.filter
    def responseObj = [
        files: [],
        count: 0
    ]

    if(filter == 'all'){
      responseObj.files = File.list(params)
      responseObj.count = File.count()
    }
    if(filter == 'noVideos'){
      responseObj.files = File.list().findAll{!it.isInUse}
      responseObj.count = responseObj.files?.size()
    }
    if(filter == 'noFile'){
      responseObj.files = File.list().findAll{!it.fileExists}
      responseObj.count = responseObj.files?.size()
    }
    if(filter == 'onlyFile'){
      responseObj.files = findUnusedFiles()
      responseObj.count = responseObj.files?.size()
    }

    JSON.use('adminFileManager'){
      respond responseObj
    }
  }

  def findUnusedFiles(){
    def files = []
    uploadService.storagePaths.each{path ->
      java.io.File directory = new java.io.File(path + '/upload')
      directory.eachFile { file ->
        def fileObj = [:]

        def extensionIndex = file.name.lastIndexOf('.')
        fileObj.extension = file.name[extensionIndex..-1];
        fileObj.sha256Hex = file.name[0..(extensionIndex-1)];
        fileObj.originalFilename = file.name;
        fileObj.path = file.absolutePath;
        fileObj.isHardDriveFile = true;

        File fileInstance = File.findBySha256Hex(fileObj.sha256Hex)
        if(!fileInstance){
          files.add(fileObj)
        }
      }

    }

    return files
  }

  def removeFileFromDisk(File file){
    def path = params.path

    if(!file && !path){
      render status: NOT_FOUND
      return
    }

    if(file){
      fileService.fullyRemoveFile(file)
    } else if(path){
      java.io.File rawFile = new java.io.File(path)
      rawFile.delete()
    }
    respond status: NO_CONTENT
  }

  def removeMultipleFilesFromDisk() {
    def idBulk = params.list('id').collect({it.toLong()})
    idBulk.each { id ->
      def file = File.get(id)
      fileService.fullyRemoveFile(file)
    }
    respond status: NO_CONTENT
  }

  def cleanUpFiles(){
    def type = params.type
    def files = File.list()

    files.each{ file ->
      if(type == 'noVideos' && (!file.isInUse && file.imagePath && file.fileExists)){
        fileService.fullyRemoveFile(file)
      }

      if(type == 'noFile' && (file.associatedVideos && (!file.imagePath || !file.fileExists))){
        fileService.fullyRemoveFile(file)
      }
    }

    respond status: OK
  }

  def serve() {

    if (!params.id) {
      return;
    }

    def file = File.get(params.getInt('id'))
    if(!file){
      response.setStatus(BAD_REQUEST.value())
      render ([messageCode: 'FILE_IN_DB_NOT_FOUND'] as JSON)
      return
    }

    def filePath = uploadService.getPath(file)

    if(!filePath){
      response.setStatus(NOT_ACCEPTABLE.value())
      render ([messageCode: 'FILE_IN_FS_NOT_FOUND', data: file.sha256Hex] as JSON)
      return
    }

    if(request.method == 'HEAD'){
      render(status: OK)
      return
    }

    java.io.File rawFile = new java.io.File(filePath)
    response.contentType = file.contentType


    if(fileService.allowedVideoFormats.contains(file.extension)){
      fileService.serveVideo(request, response, rawFile, file)
    }else if(file.extension == '.srt'){
      def vttResult = srt2vttService.convert(rawFile)
      render ( file: vttResult.getBytes('utf-8'), contentType: file.contentType, fileName: file.originalFilename.replace('.srt', '.vtt'))
    }else{
      render ( file: rawFile.bytes, contentType: file.contentType)
    }

  }

  def upload(){
    def file = uploadService.upload(request)
    respond file
  }

  def deletedUnusedFilesOnHardDrive(){
    uploadService.storagePaths.each{path ->
      java.io.File directory = new java.io.File(path + '/upload')
      directory.eachFile { file ->
        def fileObj = [:]

        def extensionIndex = file.name.lastIndexOf('.')
        def sha256Hex = file.name[0..(extensionIndex-1)];

        File fileInstance = File.findBySha256Hex(sha256Hex)
        if(!fileInstance){
          file.delete()
        }
      }

    }
  }

  def localFiles(String path) {
    def result = [:]
    if (!uploadService.localPath) {
      result.code = "LocalFilesNotEnabled"
      result.message = "The Local Video Files setting is not configured."
      response.setStatus(NOT_ACCEPTABLE.value)
      respond result
      return
    }

    def localPath = Paths.get(uploadService.localPath)
    def dirPath = localPath.resolve(path).toAbsolutePath()

    if (!dirPath.startsWith(localPath)) {
      result.code = "FileNotInLocalPath"
      result.message = "The video file must be contained in the Local Video Files setting."
      response.setStatus(NOT_ACCEPTABLE.value)
      respond result
      return
    }

    def response = []
    Files.list(dirPath).each { file ->
      response << [
        name: file.getFileName().toString(),
        path: file.toAbsolutePath().toString(),
        directory: Files.isDirectory(file)
      ]
    }

    render response as JSON
  }


  def matchMetaDataFromFiles(){
//      Shows:
//      American.Crime.Story.S01E02.720p.BluRay.x264.ShAaNiG.mkv
//      master.chef.us.603.hdtv-lol.mp4
//      Silicon.Valley.S02E01.HDTV.x264-ASAP.mp4
//      Vikings_S03E06_HDTV_x264-KILLERS.srt
//      Seinfeld.S01E03.The.Robbery.720p.HULU.WEBRip.AAC2.0.H.264-NTb.mkv

//      Movies:
//      Pulp.Fiction.(1994).avi
//      The_Avengers_:_Age_of_Ultron_(2015).mp4
//      Green.Lantern.(2011).H.264.mkv

    def config = grailsApplication.config

    def stdMovieRegex = /^(?<Name>.*)[_.]\(\d{4}\).*/
    def stdTvShowRegex = /^(?<Name>.+)[._]S(?<Season>\d{2})E(?<Episode>\d{2,3}).*/

    def isMovieConfigAvailable = config.containsProperty("Movies.regex")
    def isTvShowConfigAvailable = config.containsProperty("Shows.regex")

    def movieRegex = isMovieConfigAvailable ?
      config.getProperty("Movies.regex") : stdMovieRegex
    def tvShowRegex = isTvShowConfigAvailable ?
      config.getProperty("Shows.regex") : stdTvShowRegex

    def files = request.JSON.files
    def result = []
    log.debug(files)

    files.each{ file ->
      def fileResult = [file: file.path]

      String fileName = file.name
      def tvShowMatcher = fileName =~ tvShowRegex
      def movieMatcher = fileName =~ movieRegex

      if(tvShowMatcher.matches()){
        def name = tvShowMatcher.group('Name').replaceAll(/[._]/, " ")
        def seasonNumber = tvShowMatcher.group('Season').toInteger()
        def episodeNumber = tvShowMatcher.group('Episode').toInteger()
        def type = "tv"

        try {
          def json = theMovieDbService.searchForEntry(type, name)
          def movieDbResults = json?.results

          if(movieDbResults) {
            // Why do i need to access index 0? Worked just fine without before extracting to service
            def tvShowId = movieDbResults.id[0]

            def episodeResult = theMovieDbService.getEpisodeMeta(tvShowId, seasonNumber, episodeNumber)

            fileResult.episodeName = episodeResult.name
            fileResult.air_date = episodeResult.air_date
            fileResult.id = episodeResult.id
          }
        } catch(Exception ex) {
          log.error("Error occured while trying to retrieve data from TheMovieDB. Please check your API-Key.")
          fileResult.name = name
        }
        fileResult.status = 1
        fileResult.message = 'match found'
        fileResult.type = type
        fileResult.season = seasonNumber
        fileResult.episodeNumber = episodeNumber
      }
      else if(movieMatcher.matches()) {
        def name = movieMatcher.group('Name').replaceAll(/[._]/, " ")
        def type = "movie"

        try {
          def json = theMovieDbService.searchForEntry(type, name)
          def movieDbResults = json?.results

          if(movieDbResults) {
            def movieId = movieDbResults.id[0]

            def movieResult = theMovieDbService.getFullMovieMeta(movieId)
            fileResult.id = movieResult.id
            fileResult.release_date = movieResult.release_date
            fileResult.name = movieResult.title
          }
        } catch(Exception ex) {
          log.error("Error occured while trying to retrieve data from TheMovieDB. Please check your API-Key.")
          fileResult.name = name
        }
        fileResult.status = 1
        fileResult.message = 'match found'
        fileResult.type = type
      }
      else {
        fileResult.status = 0
        fileResult.message = 'No match found'
      }

      result.add(fileResult)
    }

    render (result as JSON)
  }
}
