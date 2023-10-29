import org.springframework.web.client.RestTemplate
import streama.LdapUserDetailsContextMapper

// Place your Spring DSL code here
beans = {
    ldapUserDetailsMapper(LdapUserDetailsContextMapper) {
    }

    restTemplate(RestTemplate) {
    }
}
