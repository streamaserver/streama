package streama

import groovy.json.JsonSlurper

class SubtitleApiService {

  def settingsService

  static String BASE_URL = 'https://rest.opensubtitles.org/search/'

  def search(Map options){
    List optionsList = []

    if(options.episode){
      optionsList.add("eposide-${options.episode}")
    }
    if(options.movieByteSize){
      optionsList.add("moviebytesize-${options.movieByteSize}")
    }
    if(options.hash){
      optionsList.add("moviehash-${options.hash}")
    }
    if(options.query){
      String encodedQuery = URLEncoder.encode(options.query, "UTF-8")
      optionsList.add("query-${encodedQuery.toLowerCase()}")
    }
    if(options.season){
      optionsList.add("season-${options.season}")
    }
    if(options.language){
      optionsList.add("sublanguageid-${options.language}")
    }
    String urlString = optionsList.join('/')

//    URL url = new URL(BASE_URL + urlString)
    String userAgentSettings = settingsService.getValueForName('open_subtitles_user_agent')
    URL url = new URL('http://localhost:8066/prometheus')
    HttpURLConnection hc = (HttpURLConnection) url.openConnection()
    hc.addRequestProperty("User-Agent", userAgentSettings)
    def jsonResult = url.getText("UTF-8")

    def result = new JsonSlurper().parseText(jsonResult)
    return result
  }

}
