package streama

import grails.converters.JSON
import grails.transaction.NotTransactional
import grails.transaction.Transactional
import groovy.json.JsonSlurper
import static grails.async.Promises.*

import static javax.servlet.http.HttpServletResponse.SC_ACCEPTED
import static javax.servlet.http.HttpServletResponse.SC_OK

class TheMovieDbController {
  static responseFormats = ['json', 'xml']

  def theMovieDbService
  def migrationService

  Map imageIntegrityResult = [:]

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
      hit.backdrop_path = "https://image.tmdb.org/t/p/w300" + hit.backdrop_path
      hit.poster_path = "https://image.tmdb.org/t/p/w300" + hit.poster_path
      hit.genre = theMovieDbService.parseGenres(hit.genre_ids)
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
      episodeData.apiId = episodeData.id
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


  @NotTransactional
  def checkAndFixImageIntegrity(){
    def ids = params.list('ids')*.toLong()
    if(!theMovieDbService.getAPI_KEY()){
      return
    }
    imageIntegrityResult = [
      tvShow: [
        total: 0,
        skipped: 0,
        fixed: 0
      ],
      movie: [
        total: 0,
        skipped: 0,
        fixed: 0
      ]
    ]

    List<TvShow> tvShows = TvShow.where {
      deleted != true
      apiId != null
      (poster_image == null || backdrop_image == null)
      if(ids){
        id in ids
      }
    }.list()
    imageIntegrityResult.tvShow.total = tvShows.size()
    tvShows.each{ TvShow tvShow ->
      boolean isPosterImageReachable = !tvShow.poster_path || theMovieDbService.isImageReachable(tvShow.poster_path)
      if (!isPosterImageReachable){
        theMovieDbService.refreshData(tvShow, 'poster_path', 'poster_image')

      }
      boolean isBackdropImageReachable = !tvShow.backdrop_path || theMovieDbService.isImageReachable(tvShow.backdrop_path)
      if (!isBackdropImageReachable){
        theMovieDbService.refreshData(tvShow, 'backdrop_path', 'backdrop_image')
      }
      if(!isBackdropImageReachable || !isPosterImageReachable){
        imageIntegrityResult.tvShow.fixed++
      }
      else{
        imageIntegrityResult.tvShow.skipped++
      }

      log.info("STATUS UPDATE: TV-SHOWS -- Fixed: ${imageIntegrityResult.tvShow.fixed}, Skipped: ${imageIntegrityResult.tvShow.skipped}, total: ${imageIntegrityResult.tvShow.total}")
    }

    List<Movie> movies = Movie.where {
      deleted != true
      apiId != null
      (poster_image == null || backdrop_image == null)
      if(ids){
        id in ids
      }
    }.list()
    imageIntegrityResult.movie.total = movies.size()
    movies.each{ Movie movie ->
      boolean isPosterImageReachable = !movie.poster_path || theMovieDbService.isImageReachable(movie.poster_path)
      if (!isPosterImageReachable){
        theMovieDbService.refreshData(movie, 'poster_path', 'poster_image')
      }
      boolean isBackdropImageReachable = !movie.backdrop_path || theMovieDbService.isImageReachable(movie.backdrop_path)
      if (!isBackdropImageReachable){
        theMovieDbService.refreshData(movie, 'backdrop_path', 'backdrop_image')
      }
      if(!isBackdropImageReachable || !isPosterImageReachable){
        imageIntegrityResult.movie.fixed++
      }
      else{
        imageIntegrityResult.movie.skipped++
      }
      log.info("STATUS UPDATE: MOVIE -- Fixed: ${imageIntegrityResult.movie.fixed}, Skipped: ${imageIntegrityResult.movie.skipped}, total: ${imageIntegrityResult.movie.total}")
    }

    response.setStatus(SC_OK)
    log.info("STATUS UPDATE IMAGE-FIX: COMPLETED!")

    render (imageIntegrityResult as JSON)
  }
}
