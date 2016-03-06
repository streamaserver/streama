package streama

import grails.test.mixin.TestFor
import spock.lang.Shared
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(TvShow)

class TvShowSpec extends Specification {
  @Shared tvshow0, tvshow1, tvshow2
  def setup() {
    tvshow0 = TvShow.newInstance()
    tvshow1 = TvShow.newInstance()
    tvshow2 = TvShow.newInstance()
  }
    void "test tvshow constraints for overview length"() {
      setup:
      //string length 4, good length
      tvshow0.overview = 'asdf'
      //String length 5000, good length
      tvshow1.overview = 't' * 5000
      //String length 5001, too long
      tvshow2.overview = 'f' * 5001
      //Name is not null
      tvshow0.name = 'testname'
      tvshow1.name = 'testname'
      tvshow2.name = 'testname'

      expect:
      tvshow0.validate() == true
      tvshow1.validate() == true
      tvshow2.validate() == false
    }
  void "test tvshow contraints for name"() {
      setup:
        //Name is not null
        tvshow0.name = 'testname'
        //Name is null, not allowed
        tvshow1.name = null
      expect:
        tvshow0.validate() == true
        tvshow1.validate() == false
  }
}
