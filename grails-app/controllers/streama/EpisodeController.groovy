package streama



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class EpisodeController {

    def videoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index() {
        TvShow show = TvShow.get(params.getLong("showId"))
        respond Episode.findAllByShowAndDeletedNotEqual(show, true), [status: OK]
    }

    @Transactional
    def save(Episode episodeInstance) {
        if (episodeInstance == null) {
            render status: NOT_FOUND
            return
        }

        episodeInstance.validate()
        if (episodeInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }


        episodeInstance.save flush:true
        respond episodeInstance, [status: CREATED]
    }

    @Transactional
    def update(Episode episodeInstance) {
        if (episodeInstance == null) {
            render status: NOT_FOUND
            return
        }

        episodeInstance.validate()
        if (episodeInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        episodeInstance.save flush:true
        respond episodeInstance, [status: OK]
    }

    @Transactional
    def delete(Episode episodeInstance) {

        if (episodeInstance == null) {
            render status: NOT_FOUND
            return
        }

        videoService.deleteVideoAndAssociations(episodeInstance)
        render status: NO_CONTENT
    }
}
