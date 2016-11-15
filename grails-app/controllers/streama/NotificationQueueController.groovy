package streama

import grails.converters.JSON

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class NotificationQueueController {

    def mailService
    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index() {
        def notificationQueueList = NotificationQueue.findAllByTypeIsNull()
        respond notificationQueueList, [status: OK]
    }

    @Transactional
    def save(NotificationQueue notificationQueueInstance) {
        if (notificationQueueInstance == null) {
            render status: NOT_FOUND
            return
        }

        notificationQueueInstance.validate()
        if (notificationQueueInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        notificationQueueInstance.save flush:true
        respond notificationQueueInstance, [status: CREATED]
    }

    @Transactional
    def update(NotificationQueue notificationQueueInstance) {
        if (notificationQueueInstance == null) {
            render status: NOT_FOUND
            return
        }

        notificationQueueInstance.validate()
        if (notificationQueueInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        notificationQueueInstance.save flush:true
        respond notificationQueueInstance, [status: OK]
    }

    @Transactional
    def delete(NotificationQueue notificationQueueInstance) {

        if (notificationQueueInstance == null) {
            render status: NOT_FOUND
            return
        }

        notificationQueueInstance.delete flush:true
        render status: NO_CONTENT
    }


    @Transactional
    def addMovieToCurrentNotification(Movie movie) {
        if (movie == null) {
            render status: NOT_FOUND
            return
        }
        NotificationQueue notificationQueueInstance = new NotificationQueue()
        notificationQueueInstance.movie = movie

        notificationQueueInstance.save flush:true
        response.setStatus(OK.value())
        respond notificationQueueInstance
    }


    @Transactional
    def addTvShowToCurrentNotification(TvShow tvShow) {
        if (tvShow == null) {
            render status: NOT_FOUND
            return
        }
        NotificationQueue notificationQueueInstance = new NotificationQueue()
        notificationQueueInstance.tvShow = tvShow
        notificationQueueInstance.description = params.description

        notificationQueueInstance.save flush:true, failOnError: true
        response.setStatus(OK.value())
        respond notificationQueueInstance
    }


    @Transactional
    def sendCurrentNotifcations() {
        def notificationQueues = NotificationQueue.findAllByIsCompletedAndTypeIsNull(false)


        if(!notificationQueues){
            render status: NOT_FOUND
            return
        }

        def users = User.findAllByEnabledAndDeleted(true, false)

        users.each{ user ->
            if(user.username == "admin"){
                return
            }
            mailService.sendMail {
                multipart true
                to user.username
                subject "New Content on Streama"
                text 'you have several new movies & shows in streama. Check it out!'
                body(view: "/mail/notification", model: [notificationQueues: notificationQueues])
            }
        }


        notificationQueues.each{
            it.isCompleted = true
            it.save(failOnError: true)
        }

        render status: OK
    }

    def listNewReleases(){
        respond NotificationQueue.findAllByType('newRelease'), [status: OK]
    }

    @Transactional
    def highlightOnDashboard(){
        def data = request.JSON
        def movie
        def tvShow
        def id = data.mediaId
        def mediaType = data.mediaType
        def videoToPlay = Video.get(data.videoToPlay?.id ?: data.mediaId)
        if(mediaType == 'movie'){
            movie = Movie.get(id)
        }else{
            tvShow = TvShow.get(id)
        }

        if(!videoToPlay){
            response.setStatus(NOT_ACCEPTABLE.value())
            render ([message: 'Internal Server error: no Video selected to play.'] as JSON)
            return
        }

        if(!videoToPlay.hasFiles()){
            response.setStatus(NOT_ACCEPTABLE.value())
            render ([message: 'The video you selected does not have an associated File to play.'] as JSON)
            return
        }

        if(!movie && !tvShow){
            render status: NOT_ACCEPTABLE
            return
        }

        def duplicateCount = NotificationQueue.where{
            type == 'newRelease'
            if(movie){
                movie == movie
            }
            if(tvShow){
                tvShow == tvShow
            }
            if(videoToPlay){
                videoToPlay == videoToPlay
            }
        }.count()
        if(duplicateCount > 0){
            response.setStatus(CONFLICT.value())
            render ([message: 'You already have a highlight for this Video'] as JSON)
            return
        }

        NotificationQueue notification = new NotificationQueue()
        notification.type = 'newRelease'
        notification.description = data.description
        notification.movie = movie
        notification.tvShow = tvShow
        notification.videoToPlay = videoToPlay
        notification.save(failOnError: true)

        respond notification
    }
}
