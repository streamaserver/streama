package streama

import grails.converters.JSON
import groovy.json.JsonSlurper

class TheMovieDbController {
  static responseFormats = ['json', 'xml']

  def theMovieDbService
  def migrationService

  def parseGenres(movieDbGenres){
    def streamaGenres = []
    movieDbGenres.each{ metaGenre ->
      Genre genre = Genre.findByApiId(metaGenre)
      streamaGenres.add(genre)
    }
    return streamaGenres
  }

  def search() {
    String type = params.type
    String name = params.name

    if(!name){
      render 'name required'
      return
    }

    def query = URLEncoder.encode(name, "UTF-8")

    def JsonContent = new URL(theMovieDbService.BASE_URL + '/search/' + type + '?query=' + query + '&' + theMovieDbService.API_PARAMS).getText("UTF-8")
    def json = new JsonSlurper().parseText(JsonContent)

    def results = json?.results

    results.each{ hit ->
      hit.genre = parseGenres(hit.genre_ids)
    }

    respond json?.results
  }

  def hasKey() {
    def resultObj = [key: theMovieDbService.API_KEY!=null]
    respond resultObj
  }

  def seasonNumberForShow(params) {
    String apiId = params.apiId
    def result = []

    if (!apiId) {
      return
    }

    def JsonContent = new URL(theMovieDbService.BASE_URL + '/tv/' + apiId + '?' + theMovieDbService.API_PARAMS).getText("UTF-8")
    def json = new JsonSlurper().parseText(JsonContent)

    def seasons = json?.seasons

    seasons?.each{ seasonData ->
      result.add(seasonData.season_number)
    }

    respond result
  }

  def seasonForShow() {

    def episodes = listNewEpisodesForSeason(params)
    List<Episode> result = []
    TvShow tvShow = TvShow.get(params.getInt('showId'))

    episodes?.each{ episodeData ->
      Episode episode = new Episode(episodeData)
      episode.show = tvShow
      episode.save failOnError: true
      result.add(episode)
    }

    JSON.use('adminEpisodesForTvShow') {
      respond result
    }

  }

  def listNewEpisodesForSeason(params){
    String apiId = params.apiId
    String season = params.season
    TvShow tvShow = TvShow.get(params.getInt('showId'))
    def result = []

    if(!apiId){
      return result
    }

    def JsonContent = new URL(theMovieDbService.BASE_URL + '/tv/' + apiId + '/season/' + season + '?' + theMovieDbService.API_PARAMS).getText("UTF-8")
    def json = new JsonSlurper().parseText(JsonContent)

    def episodes = json?.episodes

    episodes?.each{ episodeData ->
      if(Episode.findByShowAndSeason_numberAndEpisode_numberAndDeletedNotEqual(tvShow, season, episodeData.episode_number, true)){
        return
      }
      result.add(episodeData)
    }

    return result

  }

  def countNewEpisodesForSeason(){
    def resultObj = [count: listNewEpisodesForSeason(params).size()]
    respond resultObj
  }


  def availableGenres(){
    HashSet genres = theMovieDbService.movieGenres + theMovieDbService.tvGenres
    respond genres
  }


  def testMigration(){
    migrationService.addGenresToMoviesAndShows()
  }

  def imagesForMedia(){
    String apiId = params.apiId
    String type = params.type
    String imageType = params.imageType ?: 'backdrops'

    def requestUrl = "${theMovieDbService.BASE_URL}/${type}/${apiId}/images?${theMovieDbService.API_PARAMS_WITHOUT_LANG}"
    def JsonContent = new URL(requestUrl).getText("UTF-8")
    def json = new JsonSlurper().parseText(JsonContent)

    render (json?."$imageType" as JSON)
  }

}
