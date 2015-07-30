package streama

class InviteController {
    
    def index(){
    }

    def setPassword() {
        def password = params.password        
        def passwordRepeat = params.passwordRepeat
        String uuid = params.uuid

        User user = User.findByUuid(uuid)
        
        if(!uuid || !user || !password || !passwordRepeat || password != passwordRepeat || password.size() <= 5){
            redirect(action: 'index')
        }

        user.password = password
        user.uuid = null
        user.save flush: true, failOnError: true

        redirect(uri: '/')
    }
}
