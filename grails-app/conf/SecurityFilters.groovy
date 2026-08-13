package streama

class SecurityFilters {
    def springSecurityService

    def filters = {
        all(controller: '*', action: '*') {
            before = {
                if (!controllerName) {
                    return true
                }

                if (isPublicController(controllerName)) {
                    return true
                }

                if (!springSecurityService.isLoggedIn()) {
                    redirect(controller: 'login', action: 'index')
                    return false
                }

                if (isAdminController(controllerName) && !isAdminUser()) {
                    redirect(controller: 'login', action: 'denied')
                    return false
                }
            }
        }
    }

    private boolean isPublicController(String controllerName) {
        def publicControllers = [
            'login',
            'static',
            'asset',
            'errors'
        ]
        return publicControllers.contains(controllerName)
    }

    private boolean isAdminController(String controllerName) {
        def adminControllers = [
            'admin',
            'settings',
            'userManagement'
        ]
        return adminControllers.contains(controllerName)
    }

    private boolean isAdminUser() {
        def principal = springSecurityService.getPrincipal()
        if (!principal) {
            return false
        }
        def authorities = principal.getAuthorities()
        return authorities.any { it.getAuthority() == 'ROLE_ADMIN' }
    }
}
