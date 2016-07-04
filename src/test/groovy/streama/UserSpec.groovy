package streama

import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.support.GrailsUnitTestMixin} for usage instructions
 */
@TestFor(User)
class UserSpec extends Specification {

  void "test constraints for username uniqueness"() {
    setup:
      def user0 = User.newInstance()
      def user1 = User.newInstance()

    when:
    user0.username = 'testuser'

    then: 'username is unique'
    user0.validate() == true

    when:
    user1.username = 'testuser2'

    then: 'username is unique (for now)'
    user1.validate() == true

    when:
    user1.save(flush: true)
    def user2 = new User(username: 'testuser2')

    then: 'username is not unique'
    user2.validate() == false
  }


  void "test constraints for username being blank"() {
    setup:
      def user0 = User.newInstance()

      user0.username = ''

    expect:
      user0.validate() == false
  }
  void "test constraints for password being blank"() {
    setup:
    def user0 = User.newInstance()
    def user1 = User.newInstance()

    user0.password = ''
    user1.password = 'testpass'

    expect:
    user0.validate() == false
    user1.validate() == true
  }
}
