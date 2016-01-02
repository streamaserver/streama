// locations to search for config files that get merged into the main config;
// config files can be ConfigSlurper scripts, Java properties files, or classes
// in the classpath in ConfigSlurper format

// grails.config.locations = [ "classpath:${appName}-config.properties",
//                             "classpath:${appName}-config.groovy",
//                             "file:${userHome}/.grails/${appName}-config.properties",
//                             "file:${userHome}/.grails/${appName}-config.groovy"]

// if (System.properties["${appName}.config.location"]) {
//    grails.config.locations << "file:" + System.properties["${appName}.config.location"]
// }

grails.config.locations = ['file:/streama-data/config.properties']

grails.project.groupId = appName // change this to alter the default package name and Maven publishing destination

// The ACCEPT header will not be used for content negotiation for user agents containing the following strings (defaults to the 4 major rendering engines)
grails.mime.disable.accept.header.userAgents = ['Gecko', 'WebKit', 'Presto', 'Trident']
grails.mime.types = [ // the first one is the default format
    all:           '*/*', // 'all' maps to '*' or the first available format in withFormat
    atom:          'application/atom+xml',
    css:           'text/css',
    csv:           'text/csv',
    form:          'application/x-www-form-urlencoded',
    html:          ['text/html','application/xhtml+xml'],
    js:            'text/javascript',
    json:          ['application/json', 'text/json'],
    multipartForm: 'multipart/form-data',
    rss:           'application/rss+xml',
    text:          'text/plain',
    hal:           ['application/hal+json','application/hal+xml'],
    xml:           ['text/xml', 'application/xml']
]

// URL Mapping Cache Max Size, defaults to 5000
//grails.urlmapping.cache.maxsize = 1000

// Legacy setting for codec used to encode data with ${}
grails.views.default.codec = "html"

// The default scope for controllers. May be prototype, session or singleton.
// If unspecified, controllers are prototype scoped.
grails.controllers.defaultScope = 'singleton'

// GSP settings
grails {
    views {
        gsp {
            encoding = 'UTF-8'
            htmlcodec = 'xml' // use xml escaping instead of HTML4 escaping
            codecs {
                expression = 'html' // escapes values inside ${}
                scriptlet = 'html' // escapes output from scriptlets in GSPs
                taglib = 'none' // escapes output from taglibs
                staticparts = 'none' // escapes output from static template parts
            }
        }
        // escapes all not-encoded output at final stage of outputting
        // filteringCodecForContentType.'text/html' = 'html'
    }
}

grails.gorm.default.constraints = {
  '*'(nullable: true)
}


grails.mail.default.from = "Streama <info@streama.com>"


grails.converters.encoding = "UTF-8"
// scaffolding templates configuration
grails.scaffolding.templates.domainSuffix = 'Instance'

// Set to false to use the new Grails 1.2 JSONBuilder in the render method
grails.json.legacy.builder = false
// enabled native2ascii conversion of i18n properties files
grails.enable.native2ascii = true
// packages to include in Spring bean scanning
grails.spring.bean.packages = []
// whether to disable processing of multi part requests
grails.web.disable.multipart=false

// request parameters to mask when logging exceptions
grails.exceptionresolver.params.exclude = ['password']

// configure auto-caching of queries by default (if false you can cache individual queries with 'cache: true')
grails.hibernate.cache.queries = false

// configure passing transaction's read-only attribute to Hibernate session, queries and criterias
// set "singleSession = false" OSIV mode in hibernate configuration after enabling
grails.hibernate.pass.readonly = false
// configure passing read-only to OSIV session by default, requires "singleSession = false" OSIV mode
grails.hibernate.osiv.readonly = false

environments {
    development {
        grails.logging.jul.usebridge = true
    }
    production {
        grails.logging.jul.usebridge = false
        // TODO: grails.serverURL = "http://www.changeme.com"
    }
}


grails {
  assets {
    angular {
      // Defaults
      templateRoot = "templates"
      moduleSeparator = "."
      compressHtml = true
      preserveHtmlComments = false
    }
    excludes = ["jquery/src/*", "jquery/src/**/*"]
  }
}


// log4j configuration
log4j.main = {
    // Example of changing the log pattern for the default console appender:
    //
    //appenders {
    //    console name:'stdout', layout:pattern(conversionPattern: '%c{2} %m%n')
    //}

    error  'org.codehaus.groovy.grails.web.servlet',        // controllers
           'org.codehaus.groovy.grails.web.pages',          // GSP
           'org.codehaus.groovy.grails.web.sitemesh',       // layouts
           'org.codehaus.groovy.grails.web.mapping.filter', // URL mapping
           'org.codehaus.groovy.grails.web.mapping',        // URL mapping
           'org.codehaus.groovy.grails.commons',            // core / classloading
           'org.codehaus.groovy.grails.plugins',            // plugins
           'org.codehaus.groovy.grails.orm.hibernate',      // hibernate integration
           'org.springframework',
           'org.hibernate',
           'net.sf.ehcache.hibernate'

//  debug 'org.springframework.security'
  debug "grails.app"
}


grails.mail.default.from = "Streama.club <info@streama.club>"


grails.databinding.dateFormats = [
    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", // javascript format in json
    "yyyy-MM-dd HH:mm:ss.S",
    "yyyy-MM-dd'T'hh:mm:ss'Z'"
]

grails.app.context="/"

// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.userLookup.userDomainClassName = 'streama.User'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'streama.UserRole'
grails.plugin.springsecurity.authority.className = 'streama.Role'
grails.plugin.springsecurity.successHandler.defaultTargetUrl = '/user/loginTarget'
grails.plugin.springsecurity.successHandler.alwaysUseDefault = true
//
//grails.plugin.springsecurity.useSecurityEventListener = true
//grails.plugin.springsecurity.onAbstractAuthenticationFailureEvent = { e, appCtx ->
//  println "\nERROR auth failed for user $e.authentication.name: $e.exception.message\n"
//}



grails.plugin.springsecurity.controllerAnnotations.staticRules = [
	'/':                                ['IS_AUTHENTICATED_REMEMBERED'],
	'/index':                           ['IS_AUTHENTICATED_REMEMBERED'],
	'/index.gsp':                       ['IS_AUTHENTICATED_REMEMBERED'],

	'/viewingStatus/**':                ['IS_AUTHENTICATED_REMEMBERED'],
	'/file/**':                         ['IS_AUTHENTICATED_REMEMBERED'],
	'/stomp/**':                        ['IS_AUTHENTICATED_REMEMBERED'],
	'/websocket/**':                    ['IS_AUTHENTICATED_REMEMBERED'],
	'/video/dash':                      ['IS_AUTHENTICATED_REMEMBERED'],
	'/video/show':                      ['IS_AUTHENTICATED_REMEMBERED'],
	'/tvShow/episodesForTvShow':        ['IS_AUTHENTICATED_REMEMBERED'],
	'/user/saveProfile':                ['IS_AUTHENTICATED_REMEMBERED'],
	'/user/changePassword':             ['IS_AUTHENTICATED_REMEMBERED'],
	'/theMovieDb/availableGenres':      ['IS_AUTHENTICATED_REMEMBERED'],
	'/user/loginTarget':                ['IS_AUTHENTICATED_REMEMBERED'],
	'/dash/**':                         ['IS_AUTHENTICATED_REMEMBERED'],

  '/tvShow/**':                       ['ROLE_CONTENT_MANAGER'],
  '/video/**':                        ['ROLE_CONTENT_MANAGER'],
  '/theMovieDb/**':                   ['ROLE_CONTENT_MANAGER'],
  '/movie/**':                        ['ROLE_CONTENT_MANAGER'],
  '/episode/**':                      ['ROLE_CONTENT_MANAGER'],

	'/user/**':                         ['ROLE_ADMIN'],
	'/notificationQueue/**':            ['ROLE_ADMIN'],
	'/settings/**':                     ['ROLE_ADMIN'],
  '/bulk/**':                         ['ROLE_ADMIN'],
  '/monitoring/**':                   ['ROLE_ADMIN'],


  '/user/current':                    ['permitAll'],
  '/invite/**':                       ['permitAll'],
	'/assets/**':                       ['permitAll'],
	'/**/js/**':                        ['permitAll'],
	'/**/css/**':                       ['permitAll'],
	'/**/images/**':                    ['permitAll'],
	'/**/favicon.ico':                  ['permitAll']
]
