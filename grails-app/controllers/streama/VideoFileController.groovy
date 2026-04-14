package streama

import grails.converters.JSON
import grails.transaction.Transactional
import org.springframework.http.HttpStatus

class VideoFileController {
  def VideoFileService
  def VideoController
  def springSecurityService

  def serve() {
    def file = videoFileService.getVideoFile(params.id)
    if (!file) {
      render status: 404
      return
    }

    if (file.uploadStatus == 'pending') {
      response.sendError(403, 'File is still processing')
      return
    }

    if (!file.hasViewingRights(springSecurityService.currentUser)) {
      response.sendError(403, 'No viewing rights')
      return
    }

    def absolutePath = videoFileService.getAbsolutePath(file)
    def fileToServe = new File(absolutePath)

    if (!fileToServe.exists()) {
      render status: 404
      return
    }

    // Prevent path traversal attacks by validating the canonical path
    def canonicalPath = fileToServe.canonicalPath
    def baseDir = grailsApplication.config.streama.videoFilesDirectory
    def canonicalBaseDir = new File(baseDir).canonicalPath

    if (!canonicalPath.startsWith(canonicalBaseDir)) {
      log.warn "Potential path traversal attempt detected: ${params.id}"
      response.sendError(403, 'Access denied')
      return
    }

    response.setHeader('Accept-Ranges', 'bytes')
    response.setContentType(file.contentType ?: 'application/octet-stream')
    response.setHeader('Content-Disposition', "attachment;filename=${file.name}".toString())
    response.setContentLength(fileToServe.size().toInteger())

    if (request.getHeader('Range')) {
      response.setStatus(206)
      DataSourceUtils.rangeSupport(fileToServe, response.getHeader('Range'), response)
    } else {
      response.setStatus(200)
      DataSourceUtils.streamFile(fileToServe, response)
    }
  }
}