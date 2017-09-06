package streama

import grails.transaction.Transactional

import java.nio.file.Files
import java.nio.file.Paths

import static org.springframework.http.HttpStatus.NOT_ACCEPTABLE
import static org.springframework.http.HttpStatus.NOT_ACCEPTABLE

@Transactional
class VideoService {

  def fileService
  def uploadService

  def deleteVideoAndAssociations(Video video) {
    video.setDeleted(true)
    ViewingStatus.findAllByVideo(video)*.delete(flush: true)
    video.files?.each{ fileService.fullyRemoveFile(it) }
    video.save failOnError: true, flush: true
  }

  @Transactional
  def addLocalFile(Video videoInstance, params){
    def result = [:]

    // The local path is configured?
    if (!uploadService.localPath) {
      result.message = "The Local Video Files setting is not configured."
      result.error = true
      result.statusCode = NOT_ACCEPTABLE.value
      return result
    }

    // The local path is configured?
    if (!params.localFile) {
      result.message = "No LocalFile has been submitted for this request."
      result.error = true
      result.statusCode = NOT_ACCEPTABLE.value
      return result
    }

    // Check that the given file path is contained in the local files directory
    def localPath = Paths.get(uploadService.localPath)
    def givenPath = Paths.get(params.localFile).toAbsolutePath()
    if (!givenPath.startsWith(localPath)) {
      result.message = "The video file must be contained in the Local Video Files setting."
      result.error = true
      result.statusCode = NOT_ACCEPTABLE.value
      return result
    }

    // Create the file in database
    File file = File.findOrCreateByLocalFile(params.localFile)
    file.localFile = params.localFile
    file.originalFilename = givenPath.getFileName().toString()
    file.contentType = Files.probeContentType(givenPath)
    file.size = Files.size(givenPath)
    def extensionIndex = params.localFile.lastIndexOf('.')
    file.extension = params.localFile[extensionIndex..-1];
    file.save(failOnError: true, flush: true)
    videoInstance.addToFiles(file)
    videoInstance.save(failOnError: true, flush: true)
    return file
  }

}
