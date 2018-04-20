package streama

import grails.transaction.Transactional
import groovy.json.JsonSlurper

import java.nio.file.Files
import java.nio.file.Paths

@Transactional
class TranscodeService {

  def settingsService

  private static final String subtitlePath = null;
  private static final boolean CAN_TRANSCODE = false;

  // Access this field to determine whether or not transcoding is available
  public static boolean canTranscode() { return CAN_TRANSCODE; }

  static {
    // We can transcode if we have actual ffmpeg. Results won't necessarily work if we have
    // libav bastard version of ffmpeg
    CAN_TRANSCODE = ['ffmpeg', '-version'].execute().getText().startsWith('ffmpeg')
    CAN_TRANSCODE = CAN_TRANSCODE && ['ffprobe', '-version'].execute().getText().startsWith('ffprobe')

    def uDir = Settings.findBySettingsKey('Upload Directory')?.value;
    if (!uDir) {
      CAN_TRANSCODE = false;
    } else {
      subtitlePath = uDir + java.io.File.separatorChar + 'transcodedSubtitles'
      def d = new java.io.File(uDir)
      if (!d.exists()) {
        System.out.println("Creating subtitle transcoding directory: " + uDir)
        d.mkdirs()
      }
    }
  }

  List<File> transcodeSubtitles(File videoFile) {
    def returnFiles = []

    def fileIdent = videoFile.localFile
      .split("$java.io.File.separatorChar")[-1]
      .split('\\.')[0..-2].join('.').replace(' ', '_')

    System.out.println(fileIdent)

    def ffProbeCmd = ['ffprobe',
                      '-i', videoFile.localFile,
                      '-show_streams',
                      '-show_format',
                      '-print_format', 'json']

    def probe = new JsonSlurper().parseText(ffProbeCmd.execute().getText())
    def subStreams = probe.streams.findAll { it.codec_type.equals("subtitle") }

    System.out.println(subStreams)

    subStreams.each {
      def fileName = fileIdent + '_s-' + it.index + '.vtt'
      def finalPath = subtitlePath + java.io.File.separatorChar + fileName
      System.out.println('transcoding ' + finalPath +'!')
      def ffMpegCmd = ['ffmpeg', '-i', videoFile.localFile, '-map', '0:' + it.index, '-f', 'webvtt', finalPath]
      def ffProc = ffMpegCmd.execute()
      ffProc.waitFor()
      if (ffProc.exitValue() == 0) {
        System.out.println("Successfully converted " + finalPath + "!")
        def newFile = new File()
        newFile.localFile = finalPath
        newFile.originalFilename = fileName
        newFile.contentType = "text/vtt"
        // These may not be reliable... depends on who encoded the file.
        newFile.subtitleLabel = it.tags.title == null ? "Embedded Subtitles" : it.tags.title
        newFile.subtitleSrcLang = it.tags.language
        newFile.size = Files.size(Paths.get(finalPath))
        newFile.extension = ".vtt"
        returnFiles.add(newFile)
      } else {
        System.out.println("Failed conversion: ")
        System.out << ffProc.errorStream
        System.out.flush()
        new java.io.File(finalPath)?.delete()
      }
    }

    return returnFiles
  }
}
