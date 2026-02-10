package streama

import static java.util.UUID.randomUUID

class PasswordResetController {

    def mailService
    def settingsService

    /**
     * GET /passwordReset/request - Show the "enter email" form
     */
    def request() {
    }

    /**
     * POST /passwordReset/sendResetEmail - Process reset request and send email
     */
    def sendResetEmail() {
        String email = params.email?.trim()

        if (email) {
            User user = User.findByUsername(email)

            if (user && user.enabled && !user.accountLocked) {
                user.passwordResetToken = randomUUID() as String
                user.passwordResetExpiry = new Date(System.currentTimeMillis() + 30 * 60 * 1000) // 30 minutes from now
                user.save(flush: true)

                String baseUrl = Settings.findBySettingsKey('Base URL')?.value ?: 'http://localhost:8080'
                String resetLink = "${baseUrl}/passwordReset?token=${user.passwordResetToken}"

                try {
                    mailService.sendMail {
                        to user.username
                        subject "Password Reset Request"
                        body(view: "/mail/passwordReset", model: [user: user])
                    }
                    log.info("Password reset email sent to ${user.username}")
                } catch (Exception e) {
                    log.warn("Email sending failed - logging reset link instead")
                    log.warn("==============================================")
                    log.warn("PASSWORD RESET LINK for ${user.username}:")
                    log.warn(resetLink)
                    log.warn("==============================================")
                }
            }
        }

        // Always show success message to prevent email enumeration
        flash.message = "PASSWORD_RESET.SUCCESS_MESSAGE"
        redirect(action: 'request')
    }

    /**
     * GET /passwordReset?token=xxx - Show the "set new password" form
     */
    def index() {
        String token = params.token

        if (!token) {
            redirect(action: 'request')
            return
        }

        User user = User.findByPasswordResetToken(token)

        if (!user || !user.passwordResetExpiry || user.passwordResetExpiry < new Date()) {
            render(view: 'expired')
            return
        }

        [token: token]
    }

    /**
     * POST /passwordReset/setPassword - Set the new password
     */
    def setPassword() {
        String token = params.token
        String password = params.password
        String passwordRepeat = params.passwordRepeat

        if (!token) {
            redirect(action: 'request')
            return
        }

        User user = User.findByPasswordResetToken(token)

        // Validate token, expiry, and password
        if (!user || !user.passwordResetExpiry || user.passwordResetExpiry < new Date()) {
            render(view: 'expired')
            return
        }

        if (!password || !passwordRepeat || password != passwordRepeat || password.size() <= 5) {
            flash.error = "PASSWORD_RESET.INVALID_PASSWORD"
            redirect(action: 'index', params: [token: token])
            return
        }

        // Update password and clear reset token
        user.password = password
        user.passwordResetToken = null
        user.passwordResetExpiry = null
        user.save(flush: true, failOnError: true)

        flash.message = "PASSWORD_RESET.PASSWORD_CHANGED"
        redirect(uri: '/')
    }
}
