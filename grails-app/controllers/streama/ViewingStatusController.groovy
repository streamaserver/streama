package streama



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ViewingStatusController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [delete: "DELETE"]

    def springSecurityService
    def viewingStatusService

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond ViewingStatus.list(params), [status: OK]
    }

    @Transactional
    def save() {
      def result = [:]
      Long profileId = request.getHeader('profileId')?.toLong()
      Profile profile = Profile.findById(profileId)
      def data = params + [profile: profile]
      try{
        result = viewingStatusService.createNew(data)
      }catch(e){
        log.error(e.message)
        result.hasError = true
        result.code = NOT_ACCEPTABLE
      }

      if(result instanceof Map && result.hasError){
        render status: result.code
        return
      }
      respond result, [status: CREATED]
    }

    def show(ViewingStatus viewingStatusInstance){
        respond viewingStatusInstance, [status: OK]
    }


    @Transactional
    def delete(ViewingStatus viewingStatusInstance) {

        if (viewingStatusInstance == null) {
            render status: NOT_FOUND
            return
        }

        viewingStatusInstance.delete flush:true
        render status: NO_CONTENT
    }

    @Transactional
    def markCompleted(ViewingStatus viewingStatusInstance){
        if (viewingStatusInstance == null) {
            render status: NOT_FOUND
            return
        }
        viewingStatusInstance.completed = true
        viewingStatusInstance.save flush:true
        respond viewingStatusInstance, [status: OK]
    }
}
