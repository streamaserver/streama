package streama

import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.support.GrailsUnitTestMixin} for usage instructions
 */
@TestFor(Genre)
class GenreSpec extends Specification {

  void "test constraints with null values on apiId and name"() {
    setup:
      def genre0 = Genre.newInstance()
      def genre1 = Genre.newInstance()

      genre0.apiId = null
      genre1.name = null
    expect:
      genre0.validate() == false
      genre1.validate() == false
  }
}
