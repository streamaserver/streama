package streama

import grails.converters.JSON
import grails.transaction.Transactional

import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK

class WatchlistEntryController {
	static responseFormats = ['json', 'xml']
  static allowedMethods = [post:"POST", delete: "DELETE"]

  def springSecurityService

  @Transactional
  def create(){
    User currentUser = springSecurityService.currentUser
    Long profileId = request.getHeader('profileId')?.toLong()
    Profile currentProfile = Profile.findById(profileId)
    def params = request.JSON.params
    WatchlistEntry watchlistEntry

    if(params.mediaType == "tvShow"){
      TvShow tvShow = TvShow.where {
        id == params.id
      }.first()
      watchlistEntry = new WatchlistEntry(
        user: currentUser,
        profile: currentProfile,
        tvShow: tvShow
      ).save flush: true, failOnError: true
    }
    else {
      Video video = Video.where {
        id == params.id
      }.first()
      watchlistEntry = new WatchlistEntry(
        user: currentUser,
        profile: currentProfile,
        video: video
      ).save flush: true, failOnError: true
    }
    JSON.use('watchlist'){
      render (watchlistEntry as JSON)
    }
  }

  @Transactional
  def delete() {
    User currentUser = springSecurityService.currentUser
    Long profileId = request.getHeader('profileId')?.toLong()
    Profile currentProfile = Profile.findById(profileId)
    WatchlistEntry watchlistEntry
    def result

    if(params.mediaType == "tvShow"){
      TvShow tvShow = TvShow.where {
        id == params.id
      }.first()
      watchlistEntry =  WatchlistEntry.where{
        user == currentUser
        profile == currentProfile
        tvShow == tvShow
        isDeleted == false
      }.first()
      result = tvShow
    }
    else {
      Video video = Video.where {
        id == params.id
      }.first()
      watchlistEntry =  WatchlistEntry.where {
        user == currentUser
        profile == currentProfile
        video == video
        isDeleted == false
      }.first()
      result = video
    }

    if(!watchlistEntry){
      respond status: NOT_FOUND
      return
    }
    watchlistEntry.isDeleted = true
    watchlistEntry.save flush: true, failOnError: true

    respond result, [status: OK]
  }

  def list(){
    User currentUser = springSecurityService.getCurrentUser()
    Long profileId = request.getHeader('profileId')?.toLong()
    Profile currentProfile = Profile.findById(profileId)

    def sortingColumn =  params.column ? params.column : 'id'
    def sortingOrder =  params.order ? params.order : 'DESC'

    List<WatchlistEntry> watchlistEntries = WatchlistEntry.where {
      user == currentUser
      profile == currentProfile
      isDeleted == false
      video != null || tvShow != null
    }.list(sort: sortingColumn, order: sortingOrder)
    if(!watchlistEntries){
      render status: NO_CONTENT
      return
    }

    def result = [total: watchlistEntries.size(), list: watchlistEntries]

    JSON.use ('watchlist') {
      render (result as JSON)
    }
  }
}
