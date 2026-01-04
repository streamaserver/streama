package streama

import grails.test.mixin.TestFor
import spock.lang.Specification
import spock.lang.Unroll

@TestFor(OpensubtitlesService)
class OpensubtitlesServiceSecuritySpec extends Specification {

  def setup() {
    // Mock dependencies
    service.uploadService = Mock(UploadService) {
      getDir() >> [uploadDir: File.createTempDir()]
    }
  }

  @Unroll
  def "allows valid opensubtitles URL: #url"() {
    expect:
    service.isUrlAllowed(url) == true

    where:
    url << [
      // Legacy opensubtitles.org domains
      "http://dl.opensubtitles.org/en/download/sub/12345",
      "https://dl.opensubtitles.org/en/download/sub/12345",
      "http://www.opensubtitles.org/download/sub/67890",
      "https://opensubtitles.org/download/sub/11111",
      "http://vip.opensubtitles.org/download/sub/22222",
      // New opensubtitles.com domains
      "https://api.opensubtitles.com/api/v1/download/12345",
      "https://www.opensubtitles.com/download/sub/67890",
      "https://opensubtitles.com/download/sub/11111"
    ]
  }

  @Unroll
  def "blocks SSRF attack URL: #url"() {
    expect:
    service.isUrlAllowed(url) == false

    where:
    url << [
      // Internal network SSRF
      "http://localhost/admin",
      "http://127.0.0.1/admin",
      "http://192.168.1.1/admin",
      "http://10.0.0.1/internal",
      "http://169.254.169.254/latest/meta-data/",  // AWS metadata

      // External malicious hosts
      "http://evil.com/payload.gz",
      "http://attacker.org/shell.gz",

      // Protocol attacks
      "file:///etc/passwd",
      "ftp://attacker.com/payload",
      "gopher://localhost:25/",

      // Subdomain bypass attempts
      "http://opensubtitles.org.evil.com/",
      "http://dl.opensubtitles.org.attacker.com/",
      "http://opensubtitles.com.evil.com/",
      "http://api.opensubtitles.com.attacker.com/",

      // Malformed URLs
      "",
      "not-a-url",
      "javascript:alert(1)"
    ]
  }

  def "downloadSubtitles returns false when API key is not configured"() {
    given:
    def video = Mock(Video) {
      getId() >> 1L
    }
    Video.metaClass.static.findById = { id -> video }
    service.settingsService = Mock(Object) {
      getValueForName('opensubtitles_api_key') >> null
    }

    when:
    def result = service.downloadSubtitles("subtitle.srt", "12345", "en", 1L)

    then:
    result == false
  }

  def "downloadSubtitles returns false when video not found"() {
    given:
    Video.metaClass.static.findById = { id -> null }

    when:
    def result = service.downloadSubtitles("subtitle.srt", "12345", "en", 1L)

    then:
    result == false
  }
}
