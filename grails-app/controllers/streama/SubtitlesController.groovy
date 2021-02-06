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
    if (opensubtitlesService.downloadSubtitles(subtitleName, subtitleLink, subtitleLang, videoId)) {
      respond status: OK
    } else {
      respond status: BAD_REQUEST
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
