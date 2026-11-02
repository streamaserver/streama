package streama

import grails.gorm.DetachedCriteria
import grails.transaction.Transactional

@Transactional(readOnly = true)
class UserActivityController {

    static responseFormats = ['json', 'xml']

    def springSecurityService

    def lastLogin() {
      def currentUser = springSecurityService.currentUser
      if (!currentUser) {
        render status: 401
        return
      }

      def lastLoginActivity = UserActivity.createCriteria().get {
        eq('user', currentUser)
        or {
          eq('type', 'login')
          isNull('type')
        }
        order('dateCreated', 'desc')
        maxResults(1)
      }

      respond lastLoginActivity
    }

    def index(Integer max) {
      params.max = Math.min(max ?: 20, 100)
      params.sort = params.sort ?: 'id'
      params.order = 'DESC'
      params.offset = params.int('offset') ?: 0

      def userId = params.long('userId')

      def query = UserActivity.where {
        if (userId) {
          user {
            id == userId
          }
        }
        if (params.type == 'login') {
          type == params.type || type == null
        } else {
          type == params.type
        }
      }

      def list = query.list(params)
      Integer count = query.count()
      return [userActivityCount: count, userActivityList: list]
    }
}
