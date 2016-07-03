package streama

import grails.converters.JSON

import java.nio.file.Files
import java.nio.file.Paths

import static org.springframework.http.HttpStatus.*

class FileController {

  def uploadService
  def fileService
  def srt2vttService

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
      render status: NOT_FOUND
      return
    }

    def filePath = uploadService.getPath(file)

    if(!filePath){
      render status: NOT_FOUND
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
}
