package streama
import grails.plugin.springsecurity.annotation.Secured
import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
@Secured(['IS_AUTHENTICATED_REMEMBERED'])
@Transactional(readOnly = true)
class ProfileController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]
    def springSecurityService

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Profile.list(params), model:[profileCount: Profile.count()]
    }

    def show(Profile profile) {
        respond profile
    }

    @Transactional
    def save(Profile profile) {
        if (profile == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (profile.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond profile.errors, view:'create'
            return
        }
        profile.user = springSecurityService.getCurrentUser()
        profile.save flush:true

        respond profile, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Profile profile) {
        if (profile == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (profile.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond profile.errors, view:'edit'
            return
        }

        profile.save flush:true

        respond profile, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Profile profile) {

        if (profile == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        profile.delete flush:true

        render status: NO_CONTENT
    }

    @Transactional
    def getUserProfiles() {
      def result = Profile.findAllByUser(springSecurityService.getCurrentUser())
      respond(result, [status: OK])
    }
}
