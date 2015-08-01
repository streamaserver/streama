package streama

import static java.util.UUID.randomUUID
import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class UserController {

    def validationService
    def springSecurityService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", delete: "DELETE"]

    def index() {
        respond User.findAllByDeletedNotEqual(true), [status: OK]
    }

    @Transactional
    def save(User userInstance) {
        if (userInstance == null) {
            render status: NOT_FOUND
            return
        }

        userInstance.validate()
        if (userInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        userInstance.save flush:true
        respond userInstance, [status: CREATED]
    }

    def show(User userInstance){
        respond userInstance, [status: OK]
    }

    @Transactional
    def delete(User userInstance) {

        if (userInstance == null) {
            render status: NOT_FOUND
            return
        }

        userInstance.deleted = true
        userInstance.accountExpired = true

        userInstance.save flush: true, failOnError: true

        render status: NO_CONTENT
    }

    def checkAvailability() {
        def username = params.username
        def result = [:]

        if(User.findByUsername(username)){
            result.error = "User with that E-Mail-Address already exists."
        }

        respond result
    }

    @Transactional
    def saveAndInviteUser() {

        def data = request.JSON

        User userInstance = User.findOrCreateById(data.id)

        if (userInstance == null) {
            render status: NOT_FOUND
            return
        }

        userInstance.properties = data

        userInstance.validate()
        if (userInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }


        if(!userInstance.invitationSent && userInstance.enabled && userInstance.username != "admin"){
            userInstance.uuid = randomUUID() as String

            log.debug("invitation email sent to $userInstance.username")

            try{
                sendMail {
                    to userInstance.username
                    subject "You have been invited!"
                    body( view:"/mail/userInvite", model: [user: userInstance])
                }
            }catch (Exception e){}


            userInstance.invitationSent = true
        }


        userInstance.save flush:true

        UserRole.removeAll(userInstance)

        data.authorities?.each{ roleJson ->
          Role role = Role.get(roleJson.id)
          UserRole.create(userInstance, role)
        }

        respond userInstance, [status: CREATED]
    }


    def current(){
      respond springSecurityService.currentUser, [status: OK]
    }

    @Transactional
    def makeUserAdmin(User userInstance) {

        User currentUser = springSecurityService.currentUser

        if (userInstance == null) {
            render status: NOT_FOUND
            return
        }

        Role adminRole = Role.findByAuthority("ROLE_ADMIN")

        if(!currentUser.authorities?.contains(adminRole)){
            render status: UNAUTHORIZED
            return
        }

        UserRole.create(userInstance, adminRole, true)

        respond userInstance, [status: OK]
    }

  def availableRoles(){
    respond Role.list()
  }

  def loginTarget(){
    redirect(uri: '/')
  }

}


