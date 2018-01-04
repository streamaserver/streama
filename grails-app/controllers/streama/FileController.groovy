package streama

import grails.converters.JSON
import grails.transaction.Transactional
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
  def springSecurityService
  def theMovieDbService
  def bulkCreateService

  def getURL(){
    if (!params.id) {
      return
    }
    def file = File.get(params.getInt('id'))

    def responseObj = [url: file.getSrc()]

    render (responseObj as JSON)

  }

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
      render (responseObj as JSON)
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
      Map result = fileService.fullyRemoveFile(file)
      if(result.error){
        response.setStatus(result.statusCode)
        render (result as JSON)
        return
      }else{
        respond status: OK
      }
    }


    else if(path){
      java.io.File rawFile = new java.io.File(path)
      rawFile.delete()
      respond status: OK
    }
  }

  def removeMultipleFilesFromDisk() {
    def idBulk = params.list('id').collect({it.toLong()})
    def result = [
        successes: [],
        errors: []
    ]
    idBulk.each { id ->
      def file = File.get(id)
      def individualResult =fileService.fullyRemoveFile(file)

      if(individualResult.error){
        result.errors.add(id)
      }else{
        result.successes.add(id)
      }
    }
    if(result.successes.size() > 0){
      response.setStatus(OK.value())
    }else{
      response.setStatus(NOT_ACCEPTABLE.value())
    }
    render (result as JSON)
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
      log.debug('FILE_IN_DB_NOT_FOUND')
      return
    }

    if(!file.isPublic && !springSecurityService.isLoggedIn()){
      response.setStatus(UNAUTHORIZED.value())
      render ([messageCode: 'UNAUTHORIZED'] as JSON)
      log.debug('UNAUTHORIZED')
      return
    }

    def filePath = uploadService.getPath(file)

    if(!filePath){
      response.setStatus(NOT_ACCEPTABLE.value())
      render ([messageCode: 'FILE_IN_FS_NOT_FOUND', data: file.sha256Hex] as JSON)
      log.debug('FILE_IN_FS_NOT_FOUND')
      return
    }

    if(request.method == 'HEAD'){
      render(status: OK)
      return
    }

    java.io.File rawFile = new java.io.File(filePath)
    response.contentType = file.contentType


    if(fileService.allowedVideoFormats.contains(file.extension)){
      def result = fileService.serveVideo(request, response, rawFile, file)
      if(result?.error){
        render (result as JSON)
        return
      }
      return null
    }else if(file.extension == '.srt'){
      def vttResult = srt2vttService.convert(rawFile)
      render ( file: vttResult.getBytes('utf-8'), contentType: file.contentType, fileName: file.originalFilename.replace('.srt', '.vtt'))
    }else{
      render ( file: rawFile.bytes, contentType: file.contentType)
    }

  }

  def upload(){
    def file = uploadService.upload(request, params)
    if(file!=null){
    	respond file
    }else{
    	render status: 415
    }
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
    def dirPath
    if(path.contains(uploadService.localPath)){
      dirPath = localPath.resolve(path).toAbsolutePath()
    }else{
      dirPath = localPath.resolve( uploadService.localPath + path).toAbsolutePath()
    }

    if (!dirPath.startsWith(localPath)) {
      result.code = "FileNotInLocalPath"
      result.message = "The video file must be contained in the Local Video Files setting."
      response.setStatus(NOT_ACCEPTABLE.value)
      respond result
      return
    }

    if(Files.notExists(dirPath)){
      dirPath = localPath.resolve( uploadService.localPath).toAbsolutePath()
    }

    if(Files.notExists(dirPath)){
      result.code = "DirectoryNotFound"
      result.message = "The Local Files Directory could not be found."
      response.setStatus(NOT_ACCEPTABLE.value)
      respond result
      return
    }

    def response = []
    Files.list(dirPath).each { file ->
      if(Files.isHidden(file)){
        return
      }
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

    def files = request.JSON.files
    def result = bulkCreateService.matchMetaDataFromFiles(files)

    render (result as JSON)
  }

  def bulkAddMediaFromFile(){
    def files = request.JSON.files
    def result = bulkCreateService.bulkAddMediaFromFile(files)

    render (result as JSON)
  }


  def save(File file) {

    if (file == null) {
      render status: NOT_FOUND
      return
    }

    file.validate()

    if (file.hasErrors()) {
      render status: NOT_ACCEPTABLE
      return
    }

    file.save flush: true
    respond file, [status: CREATED]
  }

}
