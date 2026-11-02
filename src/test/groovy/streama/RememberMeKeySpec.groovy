package streama

import org.springframework.core.env.MapPropertySource
import org.springframework.core.env.StandardEnvironment
import spock.lang.Specification

import java.nio.file.Files
import java.nio.file.attribute.PosixFilePermissions

class RememberMeKeySpec extends Specification {

  java.io.File tempDir
  java.io.File keyFile

  def setup() {
    tempDir = java.io.File.createTempDir('streama-test-', '-rememberme')
    keyFile = new java.io.File(tempDir, 'nested/streama-remember-me.key')
  }

  def cleanup() {
    tempDir?.deleteDir()
  }

  private StandardEnvironment environmentWith(Map properties) {
    def environment = new StandardEnvironment()
    environment.propertySources.addFirst(new MapPropertySource('test', [(RememberMeKey.FILE_PROPERTY): keyFile.absolutePath] + properties))
    return environment
  }

  def "generates a random key, stores it owner-only and reuses it on the next start"() {
    when:
    def first = environmentWith([:])
    RememberMeKey.apply(first)
    def second = environmentWith([:])
    RememberMeKey.apply(second)

    then:
    def key = first.getProperty(RememberMeKey.KEY_PROPERTY)
    key ==~ /[0-9a-f]{64}/
    keyFile.text == key
    second.getProperty(RememberMeKey.KEY_PROPERTY) == key
    PosixFilePermissions.toString(Files.getPosixFilePermissions(keyFile.toPath())) == 'rw-------'
  }

  def "every installation gets its own key"() {
    when:
    def first = environmentWith([:])
    RememberMeKey.apply(first)
    keyFile.delete()
    def second = environmentWith([:])
    RememberMeKey.apply(second)

    then:
    first.getProperty(RememberMeKey.KEY_PROPERTY) != second.getProperty(RememberMeKey.KEY_PROPERTY)
  }

  def "a key configured by the operator wins and no file is written"() {
    when:
    def environment = environmentWith([(RememberMeKey.KEY_PROPERTY): 'operator-chosen-key'])
    RememberMeKey.apply(environment)

    then:
    environment.getProperty(RememberMeKey.KEY_PROPERTY) == 'operator-chosen-key'
    !keyFile.exists()
  }

  def "the key older releases shipped publicly is never used"() {
    when:
    def environment = environmentWith([(RememberMeKey.KEY_PROPERTY): 'streama_Rocks123!!RememberMe'])
    RememberMeKey.apply(environment)

    then:
    environment.getProperty(RememberMeKey.KEY_PROPERTY) ==~ /[0-9a-f]{64}/
  }

  def "falls back to a temporary key when the key file cannot be written"() {
    given:
    keyFile = new java.io.File(tempDir, 'blocked/streama-remember-me.key')
    new java.io.File(tempDir, 'blocked').text = 'a file, not a directory'

    when:
    def environment = environmentWith([:])
    RememberMeKey.apply(environment)

    then:
    environment.getProperty(RememberMeKey.KEY_PROPERTY) ==~ /[0-9a-f]{64}/
  }
}
