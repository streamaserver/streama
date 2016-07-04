package streama
import grails.test.mixin.TestFor
import spock.lang.Specification
/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(File)
class FileSpec extends Specification {
  void "test file constraints for sha256Hex and quality"() {
    setup:
      def file0 = File.newInstance()
      def file1 = File.newInstance()
      def file2 = File.newInstance()
      def file3 = File.newInstance()

      //string length 64
      file0.sha256Hex = 'TuFk8RjfG4AYQYT0pmK6vaBivF449S2UNmhXQEbE9Sr3FFFX44n4lyPq2jOQkUUv'
      //string length 65, too long
      file1.sha256Hex = '8iSuxvAT7NGS5lAa1eOIw1MlKZhO14m9p3ZQSQ08VilBGqniVA1EeLvyxKj8MNW3g'
      //quality 720p is on the allowed list
      file2.quality = '720p'
      //quality 721p is not on the allowed list
      file3.quality = '721p'

    expect:
      file0.validate() == true
      file1.validate() == false
      file2.validate() == true
      file3.validate() == false
  }
}
