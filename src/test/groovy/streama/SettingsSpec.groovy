package streama

import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.support.GrailsUnitTestMixin} for usage instructions
 */
@TestFor(Settings)
class SettingsSpec extends Specification {

  void "test constraints for settingsKey being null"() {
    setup:
      def settings0 = Settings.newInstance()
      def settings1 = Settings.newInstance()
      //settingsKey is null, not valid
      settings0.settingsKey = null
      //settingsKey not null, valid
      settings1.settingsKey = 'abcd'

    expect:
      settings0.validate() == false
      settings1.validate() == true
  }
}
