package streama

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.*
import grails.converters.*

import static org.springframework.http.HttpStatus.*
@Secured(['IS_AUTHENTICATED_REMEMBERED'])
class ProfileController {
	static responseFormats = ['json', 'xml']

  static allowedMethods = [save: "POST", delete: "DELETE"]
	
    def index() { }

  def save(Profile profileInstance) {
    System.out.println('Save Subprofile')
    System.out.println(profileInstance)
    profileInstance.save()
    respond profileInstance, [status: CREATED]
  }
}
