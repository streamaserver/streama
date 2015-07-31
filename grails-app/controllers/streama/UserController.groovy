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

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond User.list(params), [status: OK]
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

        userInstance.delete flush:true
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
    def saveAndInviteUser(User userInstance) {
        if (userInstance == null) {
            render status: NOT_FOUND
            return
        }

        userInstance.validate()
        if (userInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }


        if(!userInstance.invitationSent && userInstance.enabled){
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
        respond userInstance, [status: CREATED]
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

}


