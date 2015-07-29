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


grails.mail.host = "smtp.strato.de"
grails.mail.port = 465
grails.mail.username = "test@systaro.com"
grails.mail.password = "planetQuak3"
grails.mail.props = ["mail.smtp.auth"                  : "true",
                     "mail.smtp.socketFactory.port"    : "465",
                     "mail.smtp.socketFactory.class"   : "javax.net.ssl.SSLSocketFactory",
                     "mail.smtp.socketFactory.fallback": "false"]

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
  }
}


environments {
  development {
    grails.serverURL = "http://localhost:8080/streama"
  }
  production {
    grails.serverURL = "https://h2465311.stratoserver.net"
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

  debug "grails.app"
}


streama {
  storage {
    path = "/data/streama" 
  }
  thetvdb = "2D08531BD9DE5B1C"
}

grails.databinding.dateFormats = ["yyyy-MM-dd'T'hh:mm:ss.SSS'Z'"]

// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.userLookup.userDomainClassName = 'streama.User'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'streama.UserRole'
grails.plugin.springsecurity.authority.className = 'streama.Role'
grails.plugin.springsecurity.controllerAnnotations.staticRules = [
	'/':                              ['IS_AUTHENTICATED_REMEMBERED'],
	'/index':                         ['IS_AUTHENTICATED_REMEMBERED'],
	'/index.gsp':                     ['IS_AUTHENTICATED_REMEMBERED'],
    
	'/tvShow/**':                       ['IS_AUTHENTICATED_REMEMBERED'],
	'/video/**':                      ['IS_AUTHENTICATED_REMEMBERED'],
	'/viewingStatus/**':              ['IS_AUTHENTICATED_REMEMBERED'],
	'/user/**':                       ['IS_AUTHENTICATED_REMEMBERED'],
	'/thetvdb/**':                       ['IS_AUTHENTICATED_REMEMBERED'],
	'/theMovieDb/**':                       ['IS_AUTHENTICATED_REMEMBERED'],
	'/file/**':                       ['IS_AUTHENTICATED_REMEMBERED'],
	'/movie/**':                       ['IS_AUTHENTICATED_REMEMBERED'],
	'/episode/**':                       ['IS_AUTHENTICATED_REMEMBERED'],

  '/invite/**':                        ['permitAll'],
	'/assets/**':                     ['permitAll'],
	'/**/js/**':                      ['permitAll'],
	'/**/css/**':                     ['permitAll'],
	'/**/images/**':                  ['permitAll'],
	'/**/favicon.ico':                ['permitAll']
]

