package auth

import grails.core.GrailsApplication
import grails.util.Holders

class CsrfTokenService {

    static final String TOKEN_ATTR = 'csrfToken'
    static final int TOKEN_LENGTH = 32

    GrailsApplication grailsApplication

    String generateToken() {
        def session = getSession()
        if (!session) {
            return null
        }
        String token = generateSecureToken()
        session.setAttribute(TOKEN_ATTR, token)
        return token
    }

    String getCurrentToken() {
        def session = getSession()
        if (!session) {
            return null
        }
        return session.getAttribute(TOKEN_ATTR)
    }

    boolean validateToken(String token) {
        if (!token) {
            return false
        }
        def session = getSession()
        if (!session) {
            return false
        }
        String storedToken = session.getAttribute(TOKEN_ATTR)
        return token == storedToken
    }

    void invalidateToken() {
        def session = getSession()
        if (session) {
            session.removeAttribute(TOKEN_ATTR)
        }
    }

    protected String generateSecureToken() {
        SecureRandom random = new SecureRandom()
        byte[] bytes = new byte[TOKEN_LENGTH]
        random.nextBytes(bytes)
        return bytes.encodeBase64Url().toString()
    }

    protected def getSession() {
        try {
            return Holders.getGrailsWebRequest()?.getSession()
        } catch (Exception e) {
            return null
        }
    }
}
