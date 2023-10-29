package streama


import org.apache.commons.codec.digest.DigestUtils

import java.util.zip.GZIPInputStream

class ZipHelper {
  static String unzipFile(String stagingDir, String zipFileName, String originalFileName) {
    byte[] buffer = new byte[1024]
    def filePath = new java.io.File("$stagingDir/$zipFileName")

    if(!filePath.exists()) {
      throw new FileNotFoundException("Failed to unzip file. File not found.")
    }

    GZIPInputStream gzis = new GZIPInputStream(new FileInputStream(filePath))
    FileOutputStream fos = new FileOutputStream("$stagingDir/$originalFileName")

    int len
    while ((len = gzis.read(buffer)) > 0) {
      fos.write(buffer, 0, len);
    }

    gzis.close()
    fos.close()
    def file = new java.io.File("$stagingDir/$originalFileName")
    def sha256Hex = file.newInputStream().withStream { stream -> DigestUtils.sha256Hex(stream) }
    def index = originalFileName.lastIndexOf('.')
    String extension = originalFileName[index..-1]
    def newFile = new java.io.File("$stagingDir/$sha256Hex$extension")
    file.renameTo(newFile)
    return "$sha256Hex$extension"
  }
}
