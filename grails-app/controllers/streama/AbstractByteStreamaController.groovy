package streama

import grails.plugin.springsecurity.annotation.Secured

import static org.springframework.http.HttpStatus.NOT_MODIFIED

@Secured('permitAll')
abstract class AbstractByteStreamaController {

  def fileService
  def springSecurityService

  def streamFile(String filePath, String contentType, String fileName) {
    def file = new File(filePath)

    if (!file.exists() || !file.isFile()) {
      response.status = 404
      return
    }

    response.contentType = contentType
    response.setHeader('Content-Disposition', "inline; filename=\"${fileName}\"")
    response.setHeader('Content-Length', "${file.length()}")

    def rangeHeader = request.getHeader('Range')

    if (rangeHeader) {
      handleRangeRequest(file, rangeHeader)
    } else {
      response.outputStream << file.bytes
    }
  }

  def downloadFile(String filePath, String contentType, String fileName) {
    def file = new File(filePath)

    if (!file.exists() || !file.isFile()) {
      response.status = 404
      return
    }

    response.contentType = contentType
    response.setHeader('Content-Disposition', "attachment; filename=\"${fileName}\"")
    response.setHeader('Content-Length', "${file.length()}")
    response.outputStream << file.bytes
  }

  protected void handleRangeRequest(File file, String rangeHeader) {
    def totalBytes = file.length()
    def rangeParts = rangeHeader.replace('bytes=', '').split('-')
    def start = rangeParts[0].toLong()
    def end = rangeParts.length > 1 && rangeParts[1] ? rangeParts[1].toLong() : totalBytes - 1

    if (start >= totalBytes || end >= totalBytes) {
      response.setHeader('Content-Range', "bytes */${totalBytes}")
      response.status = 416
      return
    }

    response.setHeader('Content-Range', "bytes ${start}-${end}/${totalBytes}")
    response.setHeader('Content-Length', "${end - start + 1}")
    response.status = 206

    def fileInputStream = new FileInputStream(file)
    fileInputStream.skip(start)

    def buffer = new byte[8192]
    def remaining = end - start + 1
    def outputStream = response.outputStream

    while (remaining > 0) {
      def bytesToRead = Math.min(buffer.length, remaining as int)
      def bytesRead = fileInputStream.read(buffer, 0, bytesToRead)
      if (bytesRead == -1) break
      outputStream.write(buffer, 0, bytesRead)
      remaining -= bytesRead
    }

    fileInputStream.close()
    outputStream.flush()
  }

  protected boolean validateRequest(Object videoInstance) {
    if (!videoInstance) {
      response.status = 404
      return false
    }

    def user = springSecurityService.currentUser
    def canAccess = fileService.canUserAccessMedia(user, videoInstance)

    if (!canAccess) {
      response.status = 403
      return false
    }

    return true
  }
}
