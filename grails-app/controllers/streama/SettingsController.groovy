package streama



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class SettingsController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Settings.list(params), [status: OK]
    }

    @Transactional
    def save(Settings settingsInstance) {
        if (settingsInstance == null) {
            render status: NOT_FOUND
            return
        }

        settingsInstance.validate()
        if (settingsInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        settingsInstance.save flush:true
        respond settingsInstance, [status: CREATED]
    }

    @Transactional
    def update(Settings settingsInstance) {
        if (settingsInstance == null) {
            render status: NOT_FOUND
            return
        }

        settingsInstance.validate()
        if (settingsInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        settingsInstance.save flush:true
        respond settingsInstance, [status: OK]
    }

    @Transactional
    def delete(Settings settingsInstance) {

        if (settingsInstance == null) {
            render status: NOT_FOUND
            return
        }

        settingsInstance.delete flush:true
        render status: NO_CONTENT
    }
}
