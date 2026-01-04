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

    // Security fix: Reject path traversal attempts (CWE-22)
    // Check for path traversal characters BEFORE sanitization to detect attacks
    if (originalFileName.contains("..") || originalFileName.contains("/") || originalFileName.contains("\\")) {
      throw new SecurityException("Path traversal attempt detected in filename: ${originalFileName}")
    }

    // Sanitize filename as defense-in-depth
    String sanitizedFileName = new File(originalFileName).getName()
    if (sanitizedFileName.isEmpty() || sanitizedFileName.startsWith(".")) {
      throw new SecurityException("Invalid filename: filename cannot be empty or start with a dot")
    }

    // Build target path and validate it's within staging directory
    File stagingDirFile = new File(stagingDir)
    File targetFile = new File(stagingDirFile, sanitizedFileName)
    String canonicalStagingDir = stagingDirFile.getCanonicalPath()
    String canonicalTargetPath = targetFile.getCanonicalPath()

    if (!canonicalTargetPath.startsWith(canonicalStagingDir + File.separator)) {
      throw new SecurityException("Path traversal attempt detected: file path escapes staging directory")
    }

    GZIPInputStream gzis = new GZIPInputStream(new FileInputStream(filePath))
    FileOutputStream fos = new FileOutputStream(targetFile)

    int len
    while ((len = gzis.read(buffer)) > 0) {
      fos.write(buffer, 0, len);
    }

    gzis.close()
    fos.close()

    // Use the validated targetFile instead of reconstructing path
    def sha256Hex = targetFile.newInputStream().withStream { stream -> DigestUtils.sha256Hex(stream) }
    def index = sanitizedFileName.lastIndexOf('.')
    String extension = sanitizedFileName[index..-1]

    // Validate the new filename is also safe
    File newFile = new File(stagingDirFile, "$sha256Hex$extension")
    String canonicalNewPath = newFile.getCanonicalPath()
    if (!canonicalNewPath.startsWith(canonicalStagingDir + File.separator)) {
      throw new SecurityException("Path traversal attempt detected in renamed file")
    }

    targetFile.renameTo(newFile)
    return "$sha256Hex$extension"
  }
}
