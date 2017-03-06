package streama

import grails.test.mixin.TestFor
import spock.lang.Specification

@TestFor(VideoService)
class VideoServiceSpec extends Specification {

  def fileServiceMock = Mock(FileService)

  def setup() {
   service.fileService = fileServiceMock
  }

  void "test delete video and all associations"() {
    setup:
      GroovyMock(ViewingStatus, global: true)

      def viewingStatus1 = Mock(ViewingStatus)
      def viewingStatus2 = Mock(ViewingStatus)

      def file1 = Mock(File)
      def file2 = Mock(File)

      Video video = Mock(Video)
      video.files >> [file1, file2]

      ViewingStatus.findAllByVideo(video) >> [viewingStatus1, viewingStatus2]

    when: 'Method deleteVideoAndAssociations is called'
      service.deleteVideoAndAssociations(video)

    then: 'The video has been flagged to delete'
      1 * video.setDeleted(true)

    and: 'All ViewingStatus has been deleted'
      1 * viewingStatus1.delete([flush: true])
      1 * viewingStatus2.delete([flush: true])

    and: 'All files linked has been deleted'
      1 * fileServiceMock.fullyRemoveFile(file1)
      1 * fileServiceMock.fullyRemoveFile(file2)

    and: 'The video has been saved'
      1 * video.save([failOnError: true, flush: true])
  }
}
