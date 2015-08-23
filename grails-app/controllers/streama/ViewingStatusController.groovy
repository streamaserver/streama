package streama



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ViewingStatusController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [delete: "DELETE"]
    
    def springSecurityService

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond ViewingStatus.list(params), [status: OK]
    }

    @Transactional
    def save() {
        User currentUser = springSecurityService.currentUser
        Video video = Video.get(params.getInt('videoId'))
        Double currentTime = params.getDouble('currentTime');
        Double runtime = params.getDouble('runtime');
        ViewingStatus viewingStatus
        
        if (!video || !currentTime) {
            render status: NOT_ACCEPTABLE
            return
        }
        
        if(video instanceof Episode){
            viewingStatus = ViewingStatus.findOrCreateByTvShowAndUser(video.show, currentUser)
            viewingStatus.tvShow = video.show
        }else{
            viewingStatus = ViewingStatus.findOrCreateByVideoAndUser(video, currentUser)
        }

        viewingStatus.video = video
        viewingStatus.currentPlayTime = currentTime
        viewingStatus.runtime = runtime
        viewingStatus.user = currentUser


        viewingStatus.validate()
        if (viewingStatus.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        viewingStatus.save flush:true
        respond viewingStatus, [status: CREATED]
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
