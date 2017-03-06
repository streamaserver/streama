package streama

import grails.transaction.Transactional

@Transactional
class VideoService {

  def fileService

  def deleteVideoAndAssociations(Video video) {
    video.deleted = true
    ViewingStatus.findAllByVideo(video)*.delete(flush: true)
    video.files?.each{ fileService.fullyRemoveFile(it) }
    video.save failOnError: true, flush: true
  }
}
