package streama

import grails.converters.JSON

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class GenericVideoController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        JSON.use('admin') {
            respond GenericVideo.where{deleted != true}.list(max: 9999), [status: OK]
        }
    }

    @Transactional
    def save(GenericVideo genericVideoInstance) {
        if (genericVideoInstance == null) {
            render status: NOT_FOUND
            return
        }

        genericVideoInstance.validate()
        if (genericVideoInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        genericVideoInstance.save flush:true
        respond genericVideoInstance, [status: CREATED]
    }

    @Transactional
    def update(GenericVideo genericVideoInstance) {
        if (genericVideoInstance == null) {
            render status: NOT_FOUND
            return
        }

        genericVideoInstance.validate()
        if (genericVideoInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        genericVideoInstance.save flush:true
        respond genericVideoInstance, [status: OK]
    }

    @Transactional
    def delete(GenericVideo genericVideoInstance) {

        if (genericVideoInstance == null) {
            render status: NOT_FOUND
            return
        }

        genericVideoInstance.deleted = true
        genericVideoInstance.save(flush:true)
        render status: NO_CONTENT
    }


    def show(GenericVideo genericVideoInstance) {

            respond genericVideoInstance, [status: OK]

    }
}
