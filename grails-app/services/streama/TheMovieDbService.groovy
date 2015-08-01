package streama

import groovy.json.JsonSlurper
import grails.transaction.Transactional

@Transactional
class TheMovieDbService {

  def BASE_URL = "https://api.themoviedb.org/3"

  def getAPI_KEY(){
    return Settings.findBySettingsKey('TheMovieDB API key')?.value
  }


  def validateApiKey(apiKey){
    def JsonContent = new URL(BASE_URL + '/configuration?api_key=' + apiKey).text
    return new JsonSlurper().parseText(JsonContent)
  }

  
  def getImdbIdForShow(showId){
    def JsonContent = new URL(BASE_URL + "/tv/$showId/external_ids?api_key=$API_KEY").text
    def json =  new JsonSlurper().parseText(JsonContent)

    return json["imdb_id"]
  }

  def getFullMovieMeta(movieId){
    def JsonContent = new URL(BASE_URL + "/movie/$movieId?api_key=$API_KEY").text
    def json =  new JsonSlurper().parseText(JsonContent)

    return json
  }
}
