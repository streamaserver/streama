package streama

import grails.transaction.Transactional

@Transactional
class TheMovieDbService {
  
  def grailsApplication
  
  def BASE_URL = "https://api.themoviedb.org/3"
  
  def getAPI_KEY(){
    return grailsApplication.config.streama["themoviedbAPI"]
  }
}
