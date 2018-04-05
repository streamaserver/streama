package streama

import eu.bitwalker.useragentutils.UserAgent
import grails.transaction.Transactional

import javax.servlet.http.HttpServletRequest

@Transactional
class UserActivityService {
    def springSecurityService
    def settingsService

    def createActivityEntry(HttpServletRequest request) {
      UserActivity userActivity = new UserActivity()
      UserAgent userAgent = UserAgent.parseUserAgentString(request.getHeader('user-agent'))
      userActivity.user = springSecurityService.currentUser
      userActivity.ipAddress = request.remoteHost
      userActivity.operatingSystem = userAgent.operatingSystem.name
      userActivity.device = userAgent.operatingSystem.deviceType.name
      userActivity.browser = userAgent.browser.name

      userActivity.save(flush: true, failOnError: true)


      def userActivityRotation = settingsService.getValueForName('user_activity_rotation')
      if(userActivityRotation){
        UserActivity.where{
          user == springSecurityService.currentUser
        }.list(offset: userActivityRotation, sort: 'id', order: 'DESC')*.delete(flush: true)
      }


    }
}
