package streama

import grails.converters.JSON

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class TvShowController {

    def thetvdbService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST",  delete: "DELETE"]

    def index() {
        JSON.use('fullShow'){
            respond TvShow.findAllByDeletedNotEqual(true), [status: OK]
        }
    }

    @Transactional
    def save() {
        def data = request.JSON
        
        if (data == null) {
            render status: NOT_FOUND
            return
        }
        
        TvShow tvShowInstance = new TvShow()
        tvShowInstance.properties = data

        tvShowInstance.validate()
        if (tvShowInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        tvShowInstance.save flush:true
        respond tvShowInstance, [status: CREATED]
    }
    
    def show(TvShow tvShowInstance){
        JSON.use('fullShow'){
            respond tvShowInstance, [status: OK]
        }
    }

    def episodesForTvShow(TvShow tvShowInstance){
        respond Episode.findAllByShow(tvShowInstance), [status: OK]
    }

    @Transactional
    def delete(TvShow tvShowInstance) {

        if (tvShowInstance == null) {
            render status: NOT_FOUND
            return
        }
        
        tvShowInstance.deleted = true
        tvShowInstance.save flush: true, failOnError: true

        render status: NO_CONTENT
    }
}
