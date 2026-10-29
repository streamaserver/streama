package streama

import org.apache.commons.logging.LogFactory
import org.springframework.core.env.ConfigurableEnvironment
import org.springframework.core.env.MapPropertySource

import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.nio.file.attribute.PosixFilePermissions
import java.security.SecureRandom

/**
 * Supplies the key that signs remember-me cookies. Releases up to 1.11.1 shipped one fixed key, so anyone
 * holding a user's password hash could forge a login cookie for that user.
 *
 * An operator can still set grails.plugin.springsecurity.rememberMe.key. Otherwise a random key is created on
 * first start and kept in streama.rememberMeKeyFile (default: streama-remember-me.key in the working directory,
 * next to the default H2 database), so remember-me logins survive restarts.
 */
class RememberMeKey {

  static final String KEY_PROPERTY = 'grails.plugin.springsecurity.rememberMe.key'
  static final String FILE_PROPERTY = 'streama.rememberMeKeyFile'
  static final String DEFAULT_FILE = 'streama-remember-me.key'
  private static final String FORMER_SHIPPED_KEY = 'streama_Rocks123!!RememberMe'

  private static final log = LogFactory.getLog(this)

  static void apply(ConfigurableEnvironment environment) {
    String configured = environment.getProperty(KEY_PROPERTY)
    if (configured && configured != FORMER_SHIPPED_KEY) {
      return
    }
    if (configured) {
      log.warn("${KEY_PROPERTY} is set to the key older Streama releases shipped publicly. It is ignored, a generated key is used instead.")
    }

    Path keyFile = Paths.get(environment.getProperty(FILE_PROPERTY, DEFAULT_FILE)).toAbsolutePath()
    environment.propertySources.addFirst(new MapPropertySource('streamaRememberMeKey', [(KEY_PROPERTY): loadOrCreate(keyFile)]))
  }

  private static String loadOrCreate(Path keyFile) {
    try {
      if (Files.exists(keyFile)) {
        String stored = new String(Files.readAllBytes(keyFile), 'UTF-8').trim()
        if (stored) {
          return stored
        }
      } else {
        Files.createDirectories(keyFile.parent)
        createOwnerOnly(keyFile)
      }
      String key = generate()
      Files.write(keyFile, key.getBytes('UTF-8'))
      log.info("Generated a new remember-me key in ${keyFile}")
      return key
    } catch (IOException e) {
      log.warn("Could not read or write the remember-me key file ${keyFile} (${e.message}). Using a temporary key, so remember-me logins end when Streama restarts.")
      return generate()
    }
  }

  private static void createOwnerOnly(Path file) {
    try {
      Files.createFile(file, PosixFilePermissions.asFileAttribute(PosixFilePermissions.fromString('rw-------')))
    } catch (UnsupportedOperationException ignored) {
      // file system without POSIX permissions (Windows)
      Files.createFile(file)
    }
  }

  private static String generate() {
    byte[] bytes = new byte[32]
    new SecureRandom().nextBytes(bytes)
    return bytes.encodeHex().toString()
  }
}
