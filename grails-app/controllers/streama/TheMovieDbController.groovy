package streama

import groovy.json.JsonSlurper

class TheMovieDbController {

  def theMovieDbService

  def search() {
    String type = params.type
    String name = params.name

    def query = URLEncoder.encode(name, "UTF-8")

    def JsonContent = new URL(theMovieDbService.BASE_URL + '/search/' + type + '?query=' + query + '&api_key=' + theMovieDbService.API_KEY).text
    def json = new JsonSlurper().parseText(JsonContent)

    respond json?.results
  }

  def seasonForShow() {
    String apiId = params.apiId
    String season = params.season
    TvShow tvShow = TvShow.get(params.getInt('showId'))

    def JsonContent = new URL(theMovieDbService.BASE_URL + '/tv/' + apiId + '/season/' + season + '?api_key=' + theMovieDbService.API_KEY).text
    def json = new JsonSlurper().parseText(JsonContent)

    def episodes = json?.episodes
    def result = []

    episodes?.each{ episodeData ->
      if(Episode.findByShowAndSeason_numberAndEpisode_number(tvShow, season, episodeData.episode_number)){
        return
      }
      Episode episode = new Episode(episodeData)
      episode.show = tvShow
      episode.save failOnError: true

      result.add(episode)
    }

    respond result

  }


  def availableGenres(){
    HashSet genres = theMovieDbService.movieGenres + theMovieDbService.tvGenres
    respond genres
  }

}
