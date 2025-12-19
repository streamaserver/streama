package streama


import java.nio.ByteBuffer
import java.nio.ByteOrder
import java.nio.channels.FileChannel
import java.nio.channels.FileChannel.MapMode

class OpenSubtitlesHasherService {

  def static HASH_CHUNK_SIZE = 64 * 1024

  def static computeHash(file) {
    def size = file.length()
    def chunkSizeForFile = Math.min(HASH_CHUNK_SIZE, size)

    def fileChannel = new FileInputStream(file).getChannel()

    try {
      def head = computeHashForChunk(fileChannel.map(MapMode.READ_ONLY, 0, chunkSizeForFile))
      def tail = computeHashForChunk(fileChannel.map(MapMode.READ_ONLY, Math.max(size - HASH_CHUNK_SIZE, 0), chunkSizeForFile))

      return String.format("%016x", size + head + tail)
    } finally {
      fileChannel.close()
    }
  }


  def static computeHash(stream, length) {
    def chunkSizeForFile = (int) Math.min(HASH_CHUNK_SIZE, length)

    def chunkBytes = new byte[(int) Math.min(2 * HASH_CHUNK_SIZE, length)]

    def dis = new DataInputStream(stream)

    dis.readFully(chunkBytes, 0, chunkSizeForFile)

    def position = chunkSizeForFile
    def tailChunkPosition = length - chunkSizeForFile

    while (position < tailChunkPosition && (position += dis.skip(tailChunkPosition - position)) >= 0)

      dis.readFully(chunkBytes, chunkSizeForFile, chunkBytes.length - chunkSizeForFile)

    def head = computeHashForChunk(ByteBuffer.wrap(chunkBytes, 0, chunkSizeForFile))
    def tail = computeHashForChunk(ByteBuffer.wrap(chunkBytes, chunkBytes.length - chunkSizeForFile, chunkSizeForFile))

    return String.format("%016x", length + head + tail)
  }

  def static computeHashForChunk(buffer) {
    def longBuffer = buffer.order(ByteOrder.LITTLE_ENDIAN).asLongBuffer()
    def hash = 0

    while (longBuffer.hasRemaining()) {
      hash += longBuffer.get()
    }

    return hash
  }
}
