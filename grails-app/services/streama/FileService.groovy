package streama

import grails.converters.JSON
import org.apache.commons.codec.digest.DigestUtils

import static javax.servlet.http.HttpServletResponse.SC_NOT_ACCEPTABLE
import grails.transaction.Transactional

import static org.springframework.http.HttpStatus.*

@Transactional
class FileService {

  def allowedVideoFormats = ['.mp4', '.mkv', '.webm', '.ogg', '.m4v']
  def allowedSubtitleFormats = ['.srt', '.vtt']

  def serveVideo(request, response, java.io.File rawFile, File file) {
    def rangeHeader = request.getHeader("Range")
    //bytes=391694320-


    def fileLength = rawFile.length()
    def contentLength = rawFile.length().toString()
    def rangeEnd = fileLength.toLong()-1
    def rangeStart

    if(rangeHeader){
      String[] range = rangeHeader.substring(6).split("-")
      rangeStart = range[0].toLong()
      if (range.length == 2)
        rangeEnd = range[1].toLong()

      contentLength = rangeEnd + 1 - rangeStart
    }
    String sha256Hex = file.sha256Hex ?: DigestUtils.sha256Hex(rawFile.absolutePath)
    //add html5 video headers
    response.addHeader("Accept-Ranges", "bytes")
    response.addHeader("Connection", "Keep-Alive")
    response.addHeader("Keep-Alive", "timeout=5, max=100")
    response.addHeader("Content-Length", contentLength.toString())
    response.addHeader("Last-Modified", (file.lastUpdated).format("EEE, dd MMM yyyy hh:MM:ss 'GMT'"))
    response.addHeader("Cache-Control", 'public,max-age=3600,public')
    response.addHeader("Etag", "\"${sha256Hex}\"")
    response.addHeader("Content-Type", "video/mp4")


    if(rangeHeader){
      response.addHeader("Content-Range", "bytes $rangeStart-$rangeEnd/$fileLength")
      response.setStatus(PARTIAL_CONTENT.value())
    }


    FileInputStream fis

    //Read and write bytes of file incrementally into the outputstream
    try{
      fis = new FileInputStream(rawFile) //391694394
    }catch(e){
      response.setStatus(PRECONDITION_FAILED.value())
      return [error: true, message: e.message]
    }
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
    }catch(Exception e){
//      log.error('caught exception for video playback. ' + e.message)
//      e.printStackTrace()
//      e.getCause().printStackTrace()
    }finally{
//      response.outputStream.flush()
      fis.close()
    }
  }


  def Map fullyRemoveFile(File file){
    if(!file){
      return ResultHelper.generateErrorResult(SC_NOT_ACCEPTABLE, 'file', 'No valid file selected.')
    }
    if(file.localFile){
      return ResultHelper.generateErrorResult(SC_NOT_ACCEPTABLE, 'local', 'cant delete file associated with the File-Browser.')
    }
    if(file.externalLink){
      return ResultHelper.generateErrorResult(SC_NOT_ACCEPTABLE, 'external', 'cant delete file associated with an external Link.')
    }
    if(file.associatedVideosInclDeleted){
      file.associatedVideosInclDeleted.each{ video ->
        video.removeFromFiles(file)
        video.save(flush: true, failOnError: true)
      }
    }

    if(file.isInUse){
      def tvShowByPoster = TvShow.findByPoster_image(file)
      if(tvShowByPoster){
        tvShowByPoster.poster_image = null
        tvShowByPoster.save(flush: true, failOnError: true)
      }

      def tvShowByBackdrop = TvShow.findByPoster_image(file)
      if(tvShowByBackdrop){
        tvShowByBackdrop.backdrop_image = null
        tvShowByBackdrop.save(flush: true, failOnError: true)
      }
    }

    if(file.imagePath && file.fileExists){
      java.io.File rawFile = new java.io.File(file.imagePath)
      rawFile.delete()
    }

    file.delete(flush: true)


    return ResultHelper.generateOkResult()
  }
}
