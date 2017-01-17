package streama

import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import spock.lang.Specification

@TestFor(SettingsService)
@Mock(Settings)
class SettingsServiceSpec extends Specification {
  void "test getting base URL"() {
    setup:
      def settingsService = SettingsService.newInstance()
      def settings = [
              new Settings(settingsKey: 'Base URL', value: 'http://localhost:8080/streama')
      ]
      settings*.save(flush: true)
      def result = settingsService.getBaseUrl()
    expect:
      result == 'http://localhost:8080/streama'
  }
}
