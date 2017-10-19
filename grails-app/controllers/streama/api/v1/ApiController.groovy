package streama.api.v1

import grails.converters.JSON
import grails.web.mapping.LinkGenerator
import streama.User

import static org.springframework.http.HttpStatus.UNAUTHORIZED

/**
 * Created by antonia on 2017-02-10.
 */
class ApiController{
  static responseFormats = ['json', 'xml']
  LinkGenerator grailsLinkGenerator
  def springSecurityService


  def validateDomain(){
//    setAccessControlHeaders()
    def result = [:]

    result.accessGranted = true
    result.validationStatus = 'OK'
    result.accessDate = new Date()
    result.basePath = grailsLinkGenerator.link(uri: '/', absolute: true)

    render (result as JSON)
  }


  def currentUser() {
    User user = springSecurityService.currentUser
    if(user){
      render (user as JSON)
    }

    respond status: UNAUTHORIZED
  }

}
