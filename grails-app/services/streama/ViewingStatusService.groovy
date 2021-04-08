package streama

import grails.transaction.Transactional

import static org.springframework.http.HttpStatus.NOT_ACCEPTABLE

@Transactional
class ViewingStatusService {

  def springSecurityService

  def createNew(params){
    User currentUser = springSecurityService.currentUser
    Video video = Video.get(params.getInt('videoId'))
    Double currentTime = params.getDouble('currentTime')
    Double runtime = params.getDouble('runtime')
    ViewingStatus viewingStatus

    if (!video || !currentTime) {
      return [hasError: true, code: NOT_ACCEPTABLE]
    }

    viewingStatus = ViewingStatus.where{
      user == currentUser
      video == video
      profile == params.profile
    }.get()

    if(!viewingStatus){

      TvShow show

      if(video.hasProperty('show')){
        show = video.show
      }else{
        show = null
      }

      viewingStatus = new ViewingStatus(tvShow: show, user: currentUser, video: video, profile: params.profile)
    }


    if(video instanceof Episode){
      ViewingStatus.where{
        user == currentUser
        tvShow == video.show
        profile == params.profile
      }.updateAll([isActive: false])

    }

    viewingStatus.isActive = true
    viewingStatus.video = video
    viewingStatus.currentPlayTime = currentTime
    viewingStatus.runtime = runtime
    viewingStatus.user = currentUser


    if(viewingStatus.hasVideoEnded()){
      viewingStatus.completed = true
      viewingStatus.isActive = false

      if(video instanceof Episode){
        ViewingStatusService.createNewForNextEpisode(viewingStatus)
     }
    }

    //TODO update other active viewingStatuses from the same tvShow to isActive=false
    viewingStatus.validate()
    if (viewingStatus.hasErrors()) {
      return [hasError: true, code: NOT_ACCEPTABLE]
    }

    viewingStatus.save flush:true

    return viewingStatus
  }

  static ViewingStatus createNewForNextEpisode(ViewingStatus continueWatchingItem) {
    Episode nextEpisode = continueWatchingItem.video?.getNextEpisode()
    if(!nextEpisode){
      return
    }
    ViewingStatus viewingStatus = new ViewingStatus()
    viewingStatus.runtime = continueWatchingItem.runtime
    viewingStatus.currentPlayTime = 0
    viewingStatus.tvShow = continueWatchingItem.tvShow
    viewingStatus.user = continueWatchingItem.user
    viewingStatus.profile = continueWatchingItem.profile
    viewingStatus.video = nextEpisode
    viewingStatus.isActive = true
    viewingStatus.save()

    return viewingStatus
  }
}
