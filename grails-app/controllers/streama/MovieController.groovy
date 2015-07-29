package streama



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class MovieController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Movie.list(params), [status: OK]
    }

    @Transactional
    def save(Movie movieInstance) {
        if (movieInstance == null) {
            render status: NOT_FOUND
            return
        }

        movieInstance.validate()
        if (movieInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        movieInstance.save flush:true
        respond movieInstance, [status: CREATED]
    }

    def show(Movie movieInstance){
        respond movieInstance, [status: OK]
    }
    
    @Transactional
    def delete(Movie movieInstance) {

        if (movieInstance == null) {
            render status: NOT_FOUND
            return
        }

        movieInstance.delete flush:true
        render status: NO_CONTENT
    }
}
