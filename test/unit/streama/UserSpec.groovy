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
      mockForConstraintsTests(User, [user1])

      //username is unique
      user0.username = 'testuser'
      //username is unique (for now)
      user1.username = 'testuser2'
      //username is not unique
      def user2 = new User(username: 'testuser2')

    expect:
      user0.validate() == true
      user1.validate() == true
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
