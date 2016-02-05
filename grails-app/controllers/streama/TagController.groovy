package streama



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class TagController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Tag.list(params), [status: OK]
    }

    @Transactional
    def save(Tag tagInstance) {
        if (tagInstance == null) {
            render status: NOT_FOUND
            return
        }

        tagInstance.validate()
        if (tagInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        tagInstance.save flush:true
        respond tagInstance, [status: CREATED]
    }

    @Transactional
    def update(Tag tagInstance) {
        if (tagInstance == null) {
            render status: NOT_FOUND
            return
        }

        tagInstance.validate()
        if (tagInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        tagInstance.save flush:true
        respond tagInstance, [status: OK]
    }

    @Transactional
    def delete(Tag tagInstance) {

        if (tagInstance == null) {
            render status: NOT_FOUND
            return
        }

        tagInstance.delete flush:true
        render status: NO_CONTENT
    }
}
