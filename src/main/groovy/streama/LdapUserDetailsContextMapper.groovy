package streama

import grails.transaction.Transactional
import org.springframework.ldap.core.DirContextAdapter
import org.springframework.ldap.core.DirContextOperations
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.ldap.userdetails.UserDetailsContextMapper
import grails.plugin.springsecurity.userdetails.GrailsUser

@Transactional
class LdapUserDetailsContextMapper implements UserDetailsContextMapper {
    @Override
    UserDetails mapUserFromContext(DirContextOperations ctx, String username, Collection<? extends GrantedAuthority> authorities) {
        // load the user or create a default profile
        User user = User.findByUsername(username)
        if(!user) {
            user = new User(username: username, enabled: true)
            user.save flush: true, failOnError: true
        }

        // ignore the authorities that came from ldap
        // and replace them with the ones defined in the user profile
        Collection<GrantedAuthority> userAuthorities = user.getAuthorities().collect { new SimpleGrantedAuthority(it.authority) }

        // return the user
        new GrailsUser(username,
            '',
            true,
            true,
            true,
            true,
            userAuthorities,
            user.id)
    }

    @Override
    void mapUserToContext(UserDetails user, DirContextAdapter ctx) {
        throw new IllegalStateException("Only retrieving data from AD is currently supported")
    }
}
