package streama

import static org.springframework.http.HttpStatus.*

class FileController {

  def uploadService
  def fileService

  def index(){
    respond File.list()
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


    java.io.File rawFile = new java.io.File(uploadService.getPath(file.sha256Hex, file.extension))
    response.contentType = file.contentType


    if(fileService.allowedVideoFormats.contains(file.extension)){
      fileService.serveVideo(request, response, rawFile, file)
    }else{
      render ( file: rawFile.bytes, contentType: file.contentType)
    }

  }

  def upload(){
    def file = uploadService.upload(request)
    respond file
  }
}
