package streama.api.v1

import grails.converters.JSON
import grails.transaction.NotTransactional
import streama.Profile
import streama.Video

class PlayerController {
  static responseFormats = ['json', 'xml']

  def springSecurityService
  def playerService

  def video(Video videoInstance){
    if(!videoInstance){
      render status: 404
      return
    }
    JSON.use('player') {
      render (videoInstance as JSON)
    }
  }


  @NotTransactional
  def updateViewingStatus(){
    Long profileId = request.getHeader('profileId')?.toLong()
    Profile profile = Profile.findById(profileId)
    params['profile'] = profile
    def result = playerService.updateViewingStatus(params)
    if(result.error){
      render status: result.statusCode
      return
    }

    respond result.data, [status: result.statusCode]
  }

}
