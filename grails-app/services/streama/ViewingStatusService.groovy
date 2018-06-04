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

    if(video instanceof Episode){
      viewingStatus = ViewingStatus.findOrCreateByTvShowAndUser(video.show, currentUser)
      viewingStatus.tvShow = video.show
    }else{
      viewingStatus = ViewingStatus.findOrCreateByVideoAndUser(video, currentUser)
    }

    viewingStatus.video = video
    viewingStatus.currentPlayTime = currentTime
    viewingStatus.runtime = runtime
    viewingStatus.user = currentUser


    viewingStatus.validate()
    if (viewingStatus.hasErrors()) {
      return [hasError: true, code: NOT_ACCEPTABLE]
    }

    viewingStatus.save flush:true

    return viewingStatus
  }
}
