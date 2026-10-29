package streama

import java.nio.file.InvalidPathException
import java.nio.file.Path
import java.nio.file.Paths

class PathHelper {

  /**
   * Checks that the path lies inside one of the directories. Both sides are normalized first,
   * so '..' segments cannot climb out of the directory.
   */
  static boolean isInside(String path, List<String> directories) {
    if (!path) {
      return false
    }
    try {
      Path target = Paths.get(path).toAbsolutePath().normalize()
      return directories.any { dir -> dir && target.startsWith(Paths.get(dir).toAbsolutePath().normalize()) }
    } catch (InvalidPathException ignored) {
      return false
    }
  }
}
