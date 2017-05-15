package streama

import grails.test.mixin.TestFor
import spock.lang.Specification

@TestFor(Video)
class VideoSpec extends Specification {

  void "test video constraints for overview size"() {
    setup:
      def video0 = Video.newInstance()
      def video1 = Video.newInstance()
      def video2 = Video.newInstance()

    //string length 4, good length
      video0.overview = 'test'
    //String length 5000, good length
      video1.overview = 't' * 5000
    //String length 5001, too long
      video2.overview = 'f' * 5001

      video0.dateCreated = null
      video0.lastUpdated = null
    expect:
      video0.validate() == true
      video1.validate() == true
      video2.validate() == false
  }

  void "test has files, with files"() {
    given: 'The video has filed associated'
      def video = new Video(files: [Stub(File), Stub(File)])

    when: 'Method hasFiles is called'
      def hasFiles = video.hasFiles()

    then: 'The returned value is true'
      hasFiles == true
  }

  void "test has files, without files"() {
    given: 'The video has filed associated'
      def video = new Video()

    when: 'Method hasFiles is called'
      def hasFiles = video.hasFiles()

    then: 'The returned value is true'
      hasFiles == false
  }
}
