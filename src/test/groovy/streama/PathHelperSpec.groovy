package streama

import spock.lang.Specification
import spock.lang.Unroll

class PathHelperSpec extends Specification {

  @Unroll
  void "isInside('#path') is #expected"() {
    expect:
    PathHelper.isInside(path, ['/data/streama/upload', '/mnt/second/upload']) == expected

    where:
    path                                       | expected
    '/data/streama/upload/abc.mp4'             | true
    '/mnt/second/upload/sub/abc.srt'           | true
    '/data/streama/upload/../streama.mv.db'    | false
    '/data/streama/upload/../../../etc/passwd' | false
    '/data/streama/uploadX/abc.mp4'            | false
    '/tmp/canary.txt'                          | false
    '/data/streama'                            | false
    ''                                         | false
    null                                       | false
  }

  void "empty directory entries never match"() {
    expect:
    !PathHelper.isInside('/etc/passwd', [null, ''])
  }
}
