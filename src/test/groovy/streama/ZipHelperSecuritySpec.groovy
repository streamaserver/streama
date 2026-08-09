package streama

import spock.lang.Specification
import spock.lang.Unroll

class ZipHelperSecuritySpec extends Specification {

  def stagingDir
  def testFile

  def setup() {
    // Create a temporary staging directory for tests
    stagingDir = File.createTempDir("streama-test-", "-staging")

    // Create a test gzip file
    testFile = new File(stagingDir, "test.gz")
    def content = "test content".bytes
    new java.util.zip.GZIPOutputStream(new FileOutputStream(testFile)).withStream { gz ->
      gz.write(content)
    }
  }

  def cleanup() {
    // Clean up temp files
    stagingDir?.deleteDir()
  }

  def "happy path - valid filename extracts correctly"() {
    when:
    def result = ZipHelper.unzipFile(stagingDir.absolutePath, "test.gz", "subtitle.srt")

    then:
    result.endsWith(".srt")
    // File should exist in staging dir
    new File(stagingDir, result).exists()
  }

  def "happy path - filename with spaces works"() {
    when:
    def result = ZipHelper.unzipFile(stagingDir.absolutePath, "test.gz", "my subtitle file.srt")

    then:
    result.endsWith(".srt")
    new File(stagingDir, result).exists()
  }

  @Unroll
  def "blocks path traversal attack with filename: #maliciousName"() {
    when:
    ZipHelper.unzipFile(stagingDir.absolutePath, "test.gz", maliciousName)

    then:
    def e = thrown(SecurityException)
    e.message.contains("Path traversal") || e.message.contains("Invalid filename")

    where:
    maliciousName << [
      "../../../../etc/passwd",
      "../../../tmp/pwned.txt",
      "..\\..\\..\\windows\\system32\\config\\sam",
      "/etc/passwd",
      "\\windows\\system32\\config\\sam",
      "../subtitle.srt",
      "foo/../bar.srt",
      "foo/bar.srt"
    ]
  }

  def "blocks empty filename"() {
    when:
    ZipHelper.unzipFile(stagingDir.absolutePath, "test.gz", "")

    then:
    def e = thrown(SecurityException)
    e.message.contains("Invalid filename")
  }

  def "blocks dotfile filename"() {
    when:
    ZipHelper.unzipFile(stagingDir.absolutePath, "test.gz", ".htaccess")

    then:
    def e = thrown(SecurityException)
    e.message.contains("Invalid filename")
  }

  def "blocks double-dot filename"() {
    when:
    ZipHelper.unzipFile(stagingDir.absolutePath, "test.gz", "..hidden")

    then:
    def e = thrown(SecurityException)
  }
}
