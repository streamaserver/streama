package streama

import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import spock.lang.Specification
import spock.lang.Unroll

/**
 * See the API for {@link grails.test.mixin.support.GrailsUnitTestMixin} for usage instructions
 */
@TestFor(SettingsController)
@Mock(Settings)
class SettingsControllerSpec extends Specification {

  static final String TMDB_CANARY = 'tmdb-canary-0001'
  static final String OPENSUBTITLES_CANARY = 'opensubtitles-canary-0002'

  def setup() {
    [
      new Settings(settingsKey: 'TheMovieDB API key', value: TMDB_CANARY),
      new Settings(settingsKey: 'OpenSubtitles API Key', name: 'opensubtitles_api_key', value: OPENSUBTITLES_CANARY),
      new Settings(settingsKey: 'Upload Directory', value: '/data/upload'),
      new Settings(settingsKey: 'Local Video Files', value: '/data/local'),
      new Settings(settingsKey: 'Let users download Videos', name: 'player_showDownloadButton', value: 'true', settingsType: 'boolean'),
      new Settings(settingsKey: 'Amount of profiles users can create', name: 'profile-count', value: '5', settingsType: 'integer')
    ]*.save(flush: true, failOnError: true)
  }

  def cleanup() {
    SecurityContextHolder.clearContext()
  }

  private void callIndexAs(Collection<String> authorities) {
    SecurityContextHolder.context.authentication = new UsernamePasswordAuthenticationToken(
      'someone', 'n/a', authorities.collect { new SimpleGrantedAuthority(it) })
    def transactionManager = applicationContext.getBean('transactionManager')
    def settingsController = SettingsController.newInstance()
    settingsController.transactionManager = transactionManager
    settingsController.settingsService = new SettingsService(transactionManager: transactionManager)
    response.format = 'json'
    settingsController.index()
  }

  @Unroll
  void "index never returns API keys or server paths to #who"() {
    when:
    callIndexAs(authorities)

    then:
    status == 200
    !response.text.contains(TMDB_CANARY)
    !response.text.contains(OPENSUBTITLES_CANARY)
    !response.text.contains('/data/upload')
    response.json*.name.containsAll(['player_showDownloadButton', 'profile-count'])

    where:
    who                                     | authorities
    'a viewer'                              | ['ROLE_TRUSTED_USER']
    'the anonymous user (no roles at all)'  | []
    'a content manager'                     | ['ROLE_CONTENT_MANAGER', 'ROLE_TRUSTED_USER']
  }

  void "index gives content managers the local video directory and plain viewers not"() {
    when:
    callIndexAs(['ROLE_CONTENT_MANAGER'])

    then:
    response.json*.settingsKey.contains('Local Video Files')

    when:
    response.reset()
    callIndexAs(['ROLE_TRUSTED_USER'])

    then:
    !response.json*.settingsKey.contains('Local Video Files')
  }

  void "index still returns every setting, keys included, to admins"() {
    when:
    callIndexAs(['ROLE_ADMIN'])

    then:
    response.json.size() == Settings.count()
    response.text.contains(TMDB_CANARY)
    response.text.contains(OPENSUBTITLES_CANARY)
  }

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
