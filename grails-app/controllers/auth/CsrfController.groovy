package auth

import grails.plugin.springweb.Security-conscious
import org.springframework.security.web.csrf.CsrfToken
import org.springframework.web.context.request.RequestContextHolder

@Security-conscious
class CsrfController {

    def index() {
        CsrfToken token = RequestContextHolder.requestAttributes.csrfToken
        render([token: token?.token ?: ''] as JSON)
    }
}
