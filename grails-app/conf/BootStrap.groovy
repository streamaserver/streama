class BootStrap {

    def marshallerService
    def defaultDataService

    def init = { servletContext ->
        marshallerService.init()
        defaultDataService.createDefaultRoles()
        defaultDataService.createDefaultUsers()
        defaultDataService.createDefaultSettings()
    }
    def destroy = {
    }
}
