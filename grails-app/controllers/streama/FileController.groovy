package streama

import static org.springframework.http.HttpStatus.*

class FileController {

  def uploadService

  def index(){
    respond File.list()
  }
  def serve() {

    if (!params.id) {
      return;
    }

    def file = File.findBySha256Hex(params.id)
    if(!file){
      render status: NOT_FOUND
      return
    }


    java.io.File rawFile = new java.io.File(uploadService.getPath(params.id, file.extension))

    def rangeHeader = request.getHeader("Range")
    //bytes=391694320-


    def fileLength = rawFile.length()
    def contentLength = rawFile.length().toString()
    def rangeEnd = fileLength.toInteger()-1
    def rangeStart


    if(rangeHeader){
      rangeStart = rangeHeader.split("\\D+")[1].toLong()
      contentLength = fileLength - rangeStart
    }
    //add html5 video headers
    response.addHeader("Accept-Ranges", "bytes")
    response.addHeader("Content-Length", contentLength.toString())
    response.addHeader("Connection", "Keep-Alive")
    response.addHeader("Keep-Alive", "timeout=5, max=100")


    if(rangeHeader){
      response.addHeader("Content-Range", "bytes $rangeStart-$rangeEnd/$fileLength")
      response.setStatus(PARTIAL_CONTENT.value())
    }

    response.contentType = file.contentType


    //Read and write bytes of file incrementally into the outputstream
    FileInputStream fis = new FileInputStream(rawFile) //391694394
    byte[] buffer = new byte[16000]

    if(rangeStart){
      fis.skip(rangeStart)
    }

    try{
      while (true){
        int read = fis.read(buffer)
        if (read == -1){
          break
        }
        response.outputStream.write(buffer, 0, read)
      }
      fis.close()
    }catch(Exception io){
      log.error("catch for outputStream exception")
    }

  }
}
