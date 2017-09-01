package streama

import groovy.json.JsonSlurper
import grails.transaction.Transactional

@Transactional
class TheMovieDbService {

  def BASE_URL = "https://api.themoviedb.org/3"

  def getAPI_PARAMS(){
    return "api_key=$API_KEY&language=$API_LANGUAGE"
  }

  def getAPI_KEY(){
    return Settings.findBySettingsKey('TheMovieDB API key')?.value
  }

  def getAPI_LANGUAGE(){
    return Settings.findBySettingsKey('TheMovieDB API language')?.value
  }

  def validateApiKey(apiKey){
    def JsonContent = new URL(BASE_URL + '/configuration?api_key=' + apiKey).text
    return new JsonSlurper().parseText(JsonContent)
  }

  def validateLanguage(language){
    def locale = Locale.forLanguageTag(language)
    return locale.toLanguageTag().equals(language)
  }

  def getSimilarMovies(movieId){
    def JsonContentSimilarMovies = new URL(BASE_URL + "/movie/$movieId/similar?$API_PARAMS").text
    def JsonSimilarMovies = new JsonSlurper().parseText(JsonContentSimilarMovies)
    JsonSimilarMovies?.results?.each { SimilarMovie ->
      def JsonContentTrailer = new URL(BASE_URL + "/movie/$SimilarMovie.id/videos?$API_PARAMS").text
      def JsonTrailerData = new JsonSlurper().parseText(JsonContentTrailer)
      SimilarMovie.mediatype = "Movie"
      SimilarMovie.trailerKey = JsonTrailerData?.results[0]?.key
    }
    return JsonSimilarMovies
  }

  def getExternalLinks(showId){
    def JsonContent = new URL(BASE_URL + "/tv/$showId/external_ids?$API_PARAMS").text
    return new JsonSlurper().parseText(JsonContent)
  }

  def getMovieGenres(){
    if(!API_KEY){
      return []
    }
    try{
      def JsonContent = new URL(BASE_URL + "/genre/movie/list?$API_PARAMS").text
      def genres =  new JsonSlurper().parseText(JsonContent).genres

      genres?.each{ genre ->
        genre["apiId"] = genre.id
        genre.id = null
      }

      return genres
    }catch (e){
      log.warn("could not load genres this time, " + e.message)
      return []
    }

  }

  def getTvGenres(){
    if(!API_KEY){
      return []
    }
    try{
      def JsonContent = new URL(BASE_URL + "/genre/tv/list?$API_PARAMS").text
      def genres =  new JsonSlurper().parseText(JsonContent).genres

      genres?.each{ genre ->
        genre["apiId"] = genre.id
        genre.id = null
      }

      return genres
    }catch (e){
      log.warn("could not load genres this time, " + e.message)
      return []
    }
  }

  def getTrailerForMovie(movieId){
    def JsonContent = new URL(BASE_URL + "/movie/$movieId/videos?$API_PARAMS").text
    def videos =  new JsonSlurper().parseText(JsonContent).results

    def trailer = videos.findAll{it.type == "Trailer"}.max{it.size}
    return trailer
  }

  def getFullMovieMeta(movieId){
    try{
      def JsonContent = new URL(BASE_URL + "/movie/$movieId?$API_PARAMS").text
      return new JsonSlurper().parseText(JsonContent)
    }catch (e){
      log.warn("could not load fullMeta for Movie this time, " + e.message)
    }

  }

  def getFullTvShowMeta(tvId){
    try{
      def JsonContent = new URL(BASE_URL + "/tv/$tvId?$API_PARAMS").text
      return new JsonSlurper().parseText(JsonContent)
    }catch (e){
      log.warn("could not load fullMeta for TV SHOW this time, " + e.message)
    }
  }

  def getEpisodeMeta(tvApiId, seasonNumber, episodeNumber){
    def JsonContent = new URL(BASE_URL + "/tv/$tvApiId/season/$seasonNumber/episode/$episodeNumber?$API_PARAMS").text
    return new JsonSlurper().parseText(JsonContent)
  }

  def searchForEntry(type, name) {
    def query = URLEncoder.encode(name, "UTF-8")

    def JsonContent = new URL(BASE_URL + '/search/' + type + '?query=' + query + '&api_key=' + API_KEY).text
    return new JsonSlurper().parseText(JsonContent)
  }
}
