package streama



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class NotificationQueueController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index() {
        respond NotificationQueue.list(), [status: OK]
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
        render status: OK
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

        notificationQueueInstance.save flush:true
        render status: OK
    }


    @Transactional
    def sendCurrentNotifcations() {
        def notificationQueues = NotificationQueue.findAllByIsCompleted(false)


        if(!notificationQueues){
            render status: NOT_FOUND
            return
        }

        def users = User.findAllByEnabledAndDeleted(true, false)

        users.each{ user ->
            if(user.username == "admin"){
                return
            }
            sendMail {
                to user.username
                subject "New Content on Streama"
                body(view: "/mail/notification", model: [notificationQueues: notificationQueues])
            }
        }


        notificationQueues.each{
            it.isCompleted = true
            it.save(failOnError: true)
        }

        render status: OK
    }
}
