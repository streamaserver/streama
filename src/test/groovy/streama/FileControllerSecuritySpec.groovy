package streama

import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import spock.lang.Specification

@TestFor(FileController)
@Mock(File)
class FileControllerSecuritySpec extends Specification {

  java.io.File tempDir
  java.io.File uploadDir

  def setup() {
    tempDir = java.io.File.createTempDir('streama-test-', '-files')
    uploadDir = new java.io.File(tempDir, 'upload')
    uploadDir.mkdirs()
    controller.uploadService = Stub(UploadService) {
      getUploadDirs() >> [uploadDir.absolutePath]
    }
  }

  def cleanup() {
    tempDir?.deleteDir()
  }

  void "removeFileFromDisk refuses a path outside the upload directories and leaves the file alone"() {
    given:
    def outside = new java.io.File(tempDir, 'canary.txt')
    outside.text = 'canary'

    when:
    request.method = 'DELETE'
    params.path = outside.absolutePath
    controller.removeFileFromDisk(null)

    then:
    status == 403
    outside.exists()
  }

  void "removeFileFromDisk refuses a traversal out of the upload directory"() {
    given:
    def outside = new java.io.File(tempDir, 'canary.txt')
    outside.text = 'canary'

    when:
    request.method = 'DELETE'
    params.path = uploadDir.absolutePath + '/../canary.txt'
    controller.removeFileFromDisk(null)

    then:
    status == 403
    outside.exists()
  }

  void "removeFileFromDisk still deletes an orphaned file inside the upload directory"() {
    given:
    def orphan = new java.io.File(uploadDir, 'abc.mp4')
    orphan.text = 'orphan'

    when:
    request.method = 'DELETE'
    params.path = orphan.absolutePath
    controller.removeFileFromDisk(null)

    then:
    !orphan.exists()
  }

  void "save only changes the editable labels, never path, hash or visibility"() {
    given:
    def file = new File(sha256Hex: 'abc', extension: '.srt', label: 'old', subtitleLabel: 'EN').save(flush: true, failOnError: true)

    when:
    request.method = 'POST'
    request.json = [
        id: file.id,
        label: 'new',
        subtitleLabel: 'DE',
        localFile: '/data/streama.mv.db',
        sha256Hex: '../../../etc/passwd',
        extension: '',
        isPublic: true,
        transcodedAudioPath: '/etc/shadow'
    ]
    controller.save()
    file.refresh()

    then:
    status == 201
    file.label == 'new'
    file.subtitleLabel == 'DE'
    file.localFile == null
    file.sha256Hex == 'abc'
    file.extension == '.srt'
    !file.isPublic
    file.transcodedAudioPath == null
  }

  void "save does not create new file entries"() {
    when:
    request.method = 'POST'
    request.json = [localFile: '/data/canary.txt', name: 'canary']
    controller.save()

    then:
    status == 404
    File.count() == 0
  }
}
