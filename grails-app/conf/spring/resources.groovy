import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import org.springframework.web.client.RestTemplate
import streama.LdapUserDetailsContextMapper

// Place your Spring DSL code here
beans = {

    securityFilterChain(SecurityFilterChain) { bean ->
        bean.factoryMethod = 'securityFilterChain'
        bean.parent = ''
        bean.autowireMode = 2
    }
    
    static securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .ignoringAntMatchers('/api/**', '/web-api/**')
            .and()
            .authorizeRequests()
                .antMatchers('/assets/**', '/**/assets/**').permitAll()
                .anyRequest().authenticated()
        return http.build()
    }
    ldapUserDetailsMapper(LdapUserDetailsContextMapper) {
    }

    restTemplate(RestTemplate) {
    }
}
