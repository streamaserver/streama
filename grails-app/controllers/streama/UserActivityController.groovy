package streama

import grails.transaction.Transactional

@Transactional(readOnly = true)
class UserActivityController {

    static responseFormats = ['json', 'xml']

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond UserActivity.list(params), model:[userActivityCount: UserActivity.count()]
    }
}
