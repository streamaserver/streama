package streama

import grails.transaction.Transactional

@Transactional(readOnly = true)
class UserActivityController {

    static responseFormats = ['json', 'xml']

    def index(Integer max) {
      params.max = Math.min(max ?: 20, 100)
      params.sort = 'id'
      params.order = 'DESC'
      params.offset = params.int('offset') ?: 0

      def userId = params.long('userId')

      def list = UserActivity.where{
        if(userId){
          user{
            id == userId
          }
        }
      }.list(params)
      return [userActivityCount: UserActivity.count(), userActivityList: list]
    }
}
