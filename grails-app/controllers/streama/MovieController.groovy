package streama

import grails.converters.JSON

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class MovieController {
  def videoService
  def theMovieDbService

  static responseFormats = ['json', 'xml']
  static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

  def index() {
    return videoService.listMovies(params, [includeEmpty: true])
  }

  @Transactional
  def save() {
    def data = request.JSON
    Movie movieInstance = data.id ? Movie.get(data.id) : new Movie()

    if (movieInstance == null) {
      render status: NOT_FOUND
      return
    }

    if(data.apiId && !movieInstance.id){
      movieInstance = theMovieDbService.createEntityFromApiId('movie', data.apiId)
    }else{
      movieInstance.properties = data
    }

    List tags = []
    data.tags?.each{ tagData ->
      Tag tag = Tag.findByIdOrName(tagData.id, tagData.name)
      if(!tag){
        tag = new Tag(tagData)
        tag.save(flush: true, failOnError: true)
      }

      tags.add(tag)
    }

    data.tags = tags*.id
    movieInstance.properties.dateCreated = new Date()

    movieInstance.validate()
    if (movieInstance.hasErrors()) {
      render status: NOT_ACCEPTABLE
      return
    }

    movieInstance.save flush: true
    respond movieInstance, [status: CREATED]
  }

  def show(Movie movie) {
    if(!movie){
      render status: NOT_FOUND
      return
    }
    respond movie, [status: OK]
  }

  @Transactional
  def delete(Movie movieInstance) {

    if (movieInstance == null) {
      render status: NOT_FOUND
      return
    }

    movieInstance.deleted = true
    movieInstance.save failOnError: true, flush: true
    render status: NO_CONTENT
  }
  def getsimilar(){
    def movieId = params.id
    Movie movie = Movie.get(movieId)
    def similarMovies = movie.getSimilarMovies()
    render(similarMovies.results as JSON)
  }

}
