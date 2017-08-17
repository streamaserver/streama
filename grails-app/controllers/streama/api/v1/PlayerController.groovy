package streama.api.v1

import grails.converters.JSON
import streama.Video

class PlayerController {
  static responseFormats = ['json', 'xml']
  def springSecurityService


  def video(Video videoInstance){
    JSON.use('player') {
      render (videoInstance as JSON)
    }
  }

}
