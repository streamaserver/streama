package streama

import grails.transaction.Transactional

@Transactional
class MigrationService {

  def setDefaultDeletedFlag() {
    def videos = Video.findAllByDeletedIsNull()

    videos.each{
      it.deleted = false
      it.save(failOnError: true)
    }
  }
}
