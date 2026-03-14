package streama

import grails.converters.JSON
import grails.transaction.Transactional
import org.springframework.security.access.annotation.Secured

@Secured('permitAll')
class SetupController {

  static responseFormats = ['json', 'xml']

  def status() {
    def userCount = User.countByDeletedNotEqual(true)
    render([setupRequired: userCount == 0] as JSON)
  }

  @Transactional
  def init() {
    def data = request.JSON

    // Gate: only allow when no users exist
    if (User.countByDeletedNotEqual(true) > 0) {
      response.status = 403
      render([error: 'Setup already completed'] as JSON)
      return
    }

    // Validate
    if (!data.username?.trim()) {
      response.status = 400
      render([error: 'Username is required'] as JSON)
      return
    }
    if (!data.password || data.password.size() < 6) {
      response.status = 400
      render([error: 'Password must be at least 6 characters'] as JSON)
      return
    }

    // Ensure roles exist
    ['ROLE_ADMIN', 'ROLE_CONTENT_MANAGER', 'ROLE_TRUSTED_USER'].each { authority ->
      if (!Role.findByAuthority(authority)) {
        new Role(authority: authority).save(flush: true, failOnError: true)
      }
    }

    // Create the admin user
    User user = new User()
    user.username = data.username.trim()
    user.password = data.password
    user.fullName = data.fullName?.trim() ?: data.username.trim()
    user.enabled = true
    user.save(flush: true, failOnError: true)

    // Assign all roles
    [Role.findByAuthority('ROLE_ADMIN'),
     Role.findByAuthority('ROLE_CONTENT_MANAGER'),
     Role.findByAuthority('ROLE_TRUSTED_USER')].each { role ->
      if (role) {
        UserRole.create(user, role)
      }
    }

    log.info("Initial admin user '${user.username}' created via setup")

    render([status: 'ok'] as JSON)
  }
}
