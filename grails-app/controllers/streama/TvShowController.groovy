package streama

import grails.converters.JSON

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class TvShowController {

  def theMovieDbService
  def videoService

  static responseFormats = ['json', 'xml']
  static allowedMethods = [save: "POST", delete: "DELETE"]

  def index() {
    JSON.use('fullShow') {
      respond TvShow.findAllByDeletedNotEqual(true), [status: OK]
    }
  }

  @Transactional
  def save() {
    def data = request.JSON

    if (data == null) {
      render status: NOT_FOUND
      return
    }

    TvShow tvShowInstance = TvShow.findOrCreateById(data.id)
    tvShowInstance.properties = data

    if(!tvShowInstance.imdb_id && !data.manualInput){
      tvShowInstance.imdb_id = tvShowInstance.externalLinks?.imdb_id
    }

    tvShowInstance.validate()
    if (tvShowInstance.hasErrors()) {
      render status: NOT_ACCEPTABLE
      return
    }

    tvShowInstance.save flush: true
    respond tvShowInstance, [status: CREATED]
  }

  def show(TvShow tvShowInstance) {
    JSON.use('fullShow') {
      respond tvShowInstance, [status: OK]
    }
  }

  def episodesForTvShow(TvShow tvShowInstance) {
    JSON.use('episodesForTvShow') {
      respond Episode.findAllByShowAndDeletedNotEqual(tvShowInstance, true), [status: OK]
    }
  }

  def adminEpisodesForTvShow(TvShow tvShowInstance) {
    JSON.use('adminEpisodesForTvShow') {
      respond Episode.findAllByShowAndDeletedNotEqual(tvShowInstance, true), [status: OK]
    }
  }

  @Transactional
  def delete(TvShow tvShowInstance) {

    if (tvShowInstance == null) {
      render status: NOT_FOUND
      return
    }

    tvShowInstance.deleted = true
    tvShowInstance.save flush: true, failOnError: true

    tvShowInstance.episodes*.deleted = true
    tvShowInstance.episodes*.save flush: true, failOnError: true

    render status: NO_CONTENT
  }

  @Transactional
  def removeSeason() {
    TvShow tvShow = TvShow.get(params.getInt('showId'))
    int season = params.getInt('season_number')

    if (!tvShow || season == null) {
      render status: NOT_FOUND
      return
    }

    def episodes = Episode.findAllByShowAndSeason_numberAndDeletedNotEqual(tvShow, season, true)
    episodes.each{episode ->
      videoService.deleteVideoAndAssociations(episode)
    }

    render status: NO_CONTENT
  }
}
