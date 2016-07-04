package streama

import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.support.GrailsUnitTestMixin} for usage instructions
 */
@TestFor(SettingsController)
@Mock(Settings)
class SettingsControllerSpec extends Specification {

  void "test settings instance is null, status 404"() {

    when:
      def settingsController = SettingsController.newInstance()
      request.method = 'POST'
      settingsController.save(null)

    then:
      status == 404
  }

  void "test settings instance not valid, status 406"() {
    when:
    def settingsController = SettingsController.newInstance()
    def settingsMock = new Settings(settingsKey: null)
    request.method = 'POST'
    settingsController.save(settingsMock)

    then:
    status == 406
  }

  void "test settings instance is valid, status 201"() {
    when:
    def settingsController = SettingsController.newInstance()
    def settingsMock = new Settings(settingsKey: 'abcd')
    request.method = 'POST'
    settingsController.save(settingsMock)

    then:
    status == 201
  }

}
