package streama

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*

import static org.springframework.http.HttpStatus.*
@Secured(['IS_AUTHENTICATED_REMEMBERED'])
class ProfileController {
	static responseFormats = ['json', 'xml']

  static allowedMethods = [save: "POST", delete: "DELETE"]

  def springSecurityService

    def index() { }

  def save(Profile profileInstance) {
    profileInstance.user = springSecurityService.getCurrentUser()
    profileInstance.save()
    respond profileInstance, [status: CREATED]
  }
}
