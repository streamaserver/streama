package streama

import grails.transaction.Transactional

import static java.util.UUID.randomUUID
import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class UserController {

  def validationService
  def mailService
  def springSecurityService
  def passwordEncoder

  static responseFormats = ['json', 'xml']
  static allowedMethods = [save: "POST", delete: "DELETE"]

  def index() {
    respond User.findAllByDeletedNotEqual(true), [status: OK]
  }

  @Transactional
  def save(User userInstance) {
    if (userInstance == null) {
      render status: NOT_FOUND
      return
    }

    userInstance.validate()
    if (userInstance.hasErrors()) {
      render status: NOT_ACCEPTABLE
      return
    }

    userInstance.save flush: true
    respond userInstance, [status: CREATED]
  }

  def show(User userInstance) {
    respond userInstance, [status: OK]
  }

  @Transactional
  def delete(User userInstance) {

    if (userInstance == null) {
      render status: NOT_FOUND
      return
    }

    userInstance.deleted = true
    userInstance.username = userInstance.username + (randomUUID() as String)
    userInstance.accountExpired = true

    userInstance.save flush: true, failOnError: true

    render status: NO_CONTENT
  }

  def checkAvailability() {
    def username = params.username
    def isInvite = params.isInvite
    def result = [:]

    if (User.findByUsername(username)) {
      result.error = (isInvite == "true") ? "User with that E-Mail-Address already exists." : "Username already exists."
    }

    respond result
  }

  @Transactional
  def saveAndInviteUser() {

    def data = request.JSON

    User userInstance = data.id ? User.get(data.id) : new User()

    if (userInstance == null) {
      render status: NOT_FOUND
      return
    }

    userInstance.properties = data

    userInstance.validate()
    if (userInstance.hasErrors()) {
      render status: NOT_ACCEPTABLE
      return
    }


    if (!userInstance.invitationSent && userInstance.enabled && userInstance.username != "admin") {
      userInstance.uuid = randomUUID() as String

      try {
        mailService.sendMail {
          to userInstance.username
          subject "You have been invited!"
          body(view: "/mail/userInvite", model: [user: userInstance])
        }
        log.debug("invitation email sent to $userInstance.username")
      } catch (Exception e) {
      }


      userInstance.invitationSent = true
    }


    userInstance.save flush: true

    UserRole.removeAll(userInstance)

    data.authorities?.each { roleJson ->
      Role role = Role.get(roleJson.id)
      UserRole.create(userInstance, role)
    }

    respond userInstance, [status: CREATED]
  }

  @Transactional
  def saveAndCreateUser() {

    def data = request.JSON

    User userInstance = data.id ? User.get(data.id) : new User()

    if (userInstance == null) {
      render status: NOT_FOUND
      return
    }

    userInstance.properties = data

    userInstance.validate()
    if (userInstance.hasErrors()) {
      render status: NOT_ACCEPTABLE
      return
    }

    userInstance.save flush: true

    UserRole.removeAll(userInstance)

    data.authorities?.each { roleJson ->
      Role role = Role.get(roleJson.id)
      UserRole.create(userInstance, role)
    }

    respond userInstance, [status: CREATED]
  }

  def current() {
    User user = springSecurityService.currentUser
    if(user){
      return [user: user]
    }

    response.setStatus(UNAUTHORIZED.value())
    render 'Not logged in'
  }

  @Transactional
  def saveProfile() {
    def userData = request.JSON
    User currentUser = springSecurityService.currentUser

    if (userData == null) {
      render status: NOT_FOUND
      return
    }

    if (userData.id != currentUser.id) {
      render status: UNAUTHORIZED
      return
    }

    userData.favoriteGenres?.collect{
      Genre.findOrCreateByApiId(it.apiId)
    }

    bindData(currentUser, userData, [exclude: ['username', 'password']])

    currentUser.save failOnError: true, flush: true

    respond currentUser, [status: OK]
  }


  @Transactional
  def changePassword() {
    def passwordData = request.JSON
    User currentUser = springSecurityService.currentUser
    def result = [:]

    if (passwordData == null || !currentUser || !passwordData.oldPassword || !passwordData.newPassword || !passwordData.repeatPassword) {
      result.message = "You have some missing Data. Please check the form again and re-submit."
      response.setStatus(NOT_ACCEPTABLE.value)
      respond result
      return
    }

    if(!passwordEncoder.isPasswordValid(currentUser.password, passwordData.oldPassword, null)){
      result.message = "The old password does not match with your current password. Please try again."
      response.setStatus(NOT_ACCEPTABLE.value)
      respond result
      return
    }

    if(passwordData.newPassword != passwordData.repeatPassword){
      result.message = "Your new passwords do not match. Please try again."
      response.setStatus(NOT_ACCEPTABLE.value)
      respond result
      return
    }

    if(passwordData.newPassword.size() < 6){
      result.message = "Your new passwords needs to contain at least 6 characters."
      response.setStatus(NOT_ACCEPTABLE.value)
      respond result
      return
    }

    currentUser.password = passwordData.newPassword
    currentUser.save failOnError: true
    respond currentUser, status: ACCEPTED
  }

  def availableRoles() {
    respond Role.list()
  }

  def loginTarget() {
    redirect(uri: '/')
  }

}


