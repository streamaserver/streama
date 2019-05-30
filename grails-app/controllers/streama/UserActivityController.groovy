package streama

import grails.gorm.DetachedCriteria
import grails.transaction.Transactional

@Transactional(readOnly = true)
class UserActivityController {

    static responseFormats = ['json', 'xml']

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
