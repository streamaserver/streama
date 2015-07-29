package streama

import grails.transaction.Transactional

@Transactional
class DefaultDataService {

  def createDefaultRoles(){
    if (Role.count > 0) {
      return;
    }

    new Role(authority:"ROLE_ADMIN").save(failOnError: true)
  }


  def createDefaultUsers(){
    def users = [
        [
            username: 'admin',
            password: 'admin',
            enabled: true,
            role: Role.findByAuthority("ROLE_ADMIN")
        ]
    ]
    
    users.each{ userData ->
      if(!User.findByUsername(userData.username)){
        def user = new User(username: userData.username, password: userData.password, enabled: userData.enabled)
        user.save flush: true, failOnError: true

        UserRole.create(user, userData.role, true)
      }
    }
  }
}
