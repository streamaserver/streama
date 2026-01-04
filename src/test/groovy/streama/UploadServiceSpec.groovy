package streama


import grails.test.mixin.TestFor
import org.grails.io.support.ClassPathResource
import spock.lang.Specification

@TestFor(UploadService)
class UploadServiceSpec extends Specification {

  void "test getting image content type"() {
    def imageFile = new ClassPathResource('BigBuckBunny.jpg').getFile()
    def result = service.detectContentType(imageFile.bytes)
    expect:
    result == 'image/jpeg'
  }

  void "test getting video content type"() {
    def imageFile = new ClassPathResource('BigBuckBunny.mp4').getFile()
    def result = service.detectContentType(imageFile.bytes)
    expect:
    result == 'application/mp4'
  }
}
