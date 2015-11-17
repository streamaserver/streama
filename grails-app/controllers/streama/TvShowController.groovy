package streama

import grails.converters.JSON

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class TvShowController {

  def theMovieDbService

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

    if(!tvShowInstance.imdb_id){
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
      respond Episode.findAllByShow(tvShowInstance), [status: OK]
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

    Episode.findAllByShowAndSeason_number(tvShow, season)*.delete()

    render status: NO_CONTENT
  }
}
