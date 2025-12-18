package streama


import grails.converters.JSON
import grails.transaction.Transactional

import static org.springframework.http.HttpStatus.*

@Transactional(readOnly = true)
class SubtitlesController {
  static responseFormats = ['json', 'xml']

  def opensubtitlesService

  def index() {}

  def get() {
    def subtitlesRequest = new SubtitlesRequest()
    subtitlesRequest.setEpisode(params.episode)
    subtitlesRequest.setQuery(params.query)
    subtitlesRequest.setSeason(params.season)
    subtitlesRequest.setSubLanguageId(params.subLanguageId)

    def videoId = params.videoId
    boolean searchByHash = params.searchByHash?.toBoolean()

    def responseSubtitle

    if (searchByHash) {
      responseSubtitle = opensubtitlesService.getSubtitlesByHash(videoId)
    } else {
      responseSubtitle = opensubtitlesService.getSubtitles(subtitlesRequest)
    }
    if (responseSubtitle.statusCodeValue != 200) {
      response.status = BAD_REQUEST.value()
      def map = [error: true, message: responseSubtitle.body]
      respond map
    } else {
      respond JSON.parse((responseSubtitle.body as JSON).toString())
    }
  }


  def download() {
    def subtitleName = params.subFileName
    def subtitleLink = params.subDownloadLink
    def subtitleLang = params.subLang
    def videoId = params.videoId

    // Security fix: Input validation at controller level (defense in depth)
    // Validate required parameters are present
    if (!subtitleName || !subtitleLink || !subtitleLang || !videoId) {
      response.status = BAD_REQUEST.value()
      respond([error: true, message: "Missing required parameters"])
      return
    }

    // Validate subtitleName doesn't contain path traversal characters
    if (subtitleName.contains("..") || subtitleName.contains("/") || subtitleName.contains("\\")) {
      log.warn("Security: Blocked potential path traversal in subtitle filename: ${subtitleName}")
      response.status = BAD_REQUEST.value()
      respond([error: true, message: "Invalid subtitle filename"])
      return
    }

    try {
      if (opensubtitlesService.downloadSubtitles(subtitleName, subtitleLink, subtitleLang, videoId)) {
        respond status: OK
      } else {
        respond status: BAD_REQUEST
      }
    } catch (SecurityException e) {
      log.error("Security violation in subtitle download: ${e.message}")
      response.status = BAD_REQUEST.value()
      respond([error: true, message: e.message])
    }
  }

  def setDefault() {
    def subtitleId = params.id
    def videoId = params.videoId
    opensubtitlesService.setDefaultSubtitle(subtitleId, videoId)
    respond status: OK
  }

  def getVideoSubtitles() {
    def videoId = params.videoId
    def subtitles = opensubtitlesService.getVideoSubtitles(videoId)
    if (subtitles == null || subtitles.isEmpty()) {
      render status: NO_CONTENT
    } else {
      JSON.use('adminFileManager') {
        respond JSON.parse((subtitles as JSON).toString()), status: OK
      }
    }
  }
}
