package streama

import grails.transaction.Transactional

@Transactional
class TheMovieDbService {
  
  def API_KEY = "e1584c7cc0072947d4776de6df7b8822"
  def BASE_URL = "https://api.themoviedb.org/3"
  
  def serviceMethod() {

  }
}
