package streama

import grails.converters.JSON
import grails.transaction.Transactional

import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT

class WatchlistEntryController {
	static responseFormats = ['json', 'xml']
  //static allowedMethods = [post:"POST", delete: "DELETE"]

  def springSecurityService

  @Transactional
  def create(){
    User currentUser = springSecurityService.currentUser
    Long profileId = request.getHeader('profileId')?.toLong()
    Profile currentProfile = Profile.findById(profileId)
    def params = request.JSON.params
    WatchlistEntry watchlistEntry

    if(params.mediaType == "tvShow"){
      def tvShow = TvShow.where {
        id == params.id
      }.first()
      watchlistEntry = new WatchlistEntry(
        user: currentUser,
        profile: currentProfile,
        tvShow: tvShow
      ).save flush: true, failOnError: true
    }
    else {
      def video = Video.where {
        id == params.id
      }.first()
      watchlistEntry = new WatchlistEntry(
        user: currentUser,
        profile: currentProfile,
        video: video
      ).save flush: true, failOnError: true
    }
    JSON.use('dashWatchlist'){
      render (watchlistEntry as JSON)
    }
  }

  @Transactional
  def delete() {
    User currentUser = springSecurityService.currentUser
    Long profileId = request.getHeader('profileId')?.toLong()
    Profile currentProfile = Profile.findById(profileId)
    WatchlistEntry watchlistEntry

    if(params.mediaType == "tvShow"){
      def tvShow = TvShow.where {
        id == params.id
      }.first()
      watchlistEntry =  WatchlistEntry.where{
        user == currentUser
        profile == currentProfile
        tvShow == tvShow
      }.first()
    }
    else {
      def video = Video.where {
        id == params.id
      }.first()

      watchlistEntry =  WatchlistEntry.where {
        user == currentUser
        profile == currentProfile
        video == video
      }.first()
    }

    if(!watchlistEntry){
      respond status: NOT_FOUND
      return
    }
    watchlistEntry.isDeleted = true
    watchlistEntry.save flush: true, failOnError: true
    respond status: NO_CONTENT
  }
}
