grails.databinding.dateFormats = [
    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", // javascript format in json
    "yyyy-MM-dd HH:mm:ss.S",
    "yyyy-MM-dd'T'HH:mm:ss'Z'",
    "yyyy-MM-dd'T'HH:mm:ssZ",
    "dd.MM.yyyy"
]

//import grails.plugin.springsecurity.SpringSecurityUtils

// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.userLookup.userDomainClassName = 'streama.User'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'streama.UserRole'
grails.plugin.springsecurity.authority.className = 'streama.Role'

grails.plugin.springsecurity.rejectIfNoRule = true
grails.plugin.springsecurity.fii.rejectPublicInvocations = false
grails.plugin.springsecurity.secureChannel.useHeaderCheckChannelSecurity = true
grails.plugin.springsecurity.portMapper.httpPort = 80
grails.plugin.springsecurity.portMapper.httpsPort = 443
grails.plugin.springsecurity.rememberMe.cookieName = 'streama_remember_me'
grails.plugin.springsecurity.rememberMe.alwaysRemember = true
grails.plugin.springsecurity.rememberMe.key = 'streama_Rocks123!!RememberMe'
grails.plugin.springsecurity.successHandler.defaultTargetUrl = "/user/loginTarget"
grails.plugin.springsecurity.successHandler.alwaysUseDefault = true

grails.plugin.springsecurity.controllerAnnotations.staticRules = [

  [pattern:'/',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/index',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/index.gsp',  access :['IS_AUTHENTICATED_REMEMBERED']],

  [pattern:'/viewingStatus/**',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/file/**',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/stomp/**',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/websocket/**',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/video/dash',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/video/show',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/tvShow/show',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/movie/show',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/genericVideo/show',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/watchlistEntry/**',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/tvShow/episodesForTvShow',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/user/saveProfile',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/user/changePassword',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/theMovieDb/availableGenres',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/user/loginTarget',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/dash/**',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/player/**',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/tag.json',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/tag/index',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/settings/index',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/report/save',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/video/markCompleted',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/video/markAsUnviewed',  access :['IS_AUTHENTICATED_REMEMBERED']],

  [pattern:'/subtitles/get',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/subtitles/download',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/subtitles/save',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/subtitles/setDefault',  access :['IS_AUTHENTICATED_REMEMBERED']],
  [pattern:'/subtitles/getVideoSubtitles',  access :['IS_AUTHENTICATED_REMEMBERED']],

  [pattern:'/genericVideo/**',  access :['ROLE_CONTENT_MANAGER']],
  [pattern:'/genre/**',  access :['ROLE_CONTENT_MANAGER']],
  [pattern:'/tvShow/**',  access :['ROLE_CONTENT_MANAGER']],
  [pattern:'/video/**',  access :['ROLE_CONTENT_MANAGER']],
  [pattern:'/theMovieDb/**',  access :['ROLE_CONTENT_MANAGER']],
  [pattern:'/movie/**',  access :['ROLE_CONTENT_MANAGER']],
  [pattern:'/episode/**',  access :['ROLE_CONTENT_MANAGER']],
  [pattern:'/tag/**',  access :['ROLE_CONTENT_MANAGER']],
  [pattern:'/report/**',  access :['ROLE_CONTENT_MANAGER']],

  [pattern:'/user/**',  access :['ROLE_ADMIN']],
  [pattern:'/userActivity/**',  access :['ROLE_ADMIN']],
  [pattern:'/notificationQueue/**',  access :['ROLE_ADMIN']],
  [pattern:'/settings/**',  access :['ROLE_ADMIN']],
  [pattern:'/bulk/**',  access :['ROLE_ADMIN']],
  [pattern:'/monitoring/**',  access :['ROLE_ADMIN']],

  [pattern:'/dbconsole/**', access :['ROLE_ADMIN']],

  [pattern:'/file/serve',  access :['permitAll']],
  [pattern:'/user/current',  access :['permitAll']],
  [pattern:'/invite/**',  access :['permitAll']],
  [pattern:'/assets/**',  access :['permitAll']],
  [pattern:'/**/js/**',  access :['permitAll']],
  [pattern:'/**/css/**',  access :['permitAll']],
  [pattern:'/**/images/**',  access :['permitAll']],
  [pattern:'/**/favicon.ico', access :['permitAll']],



  [pattern:'/api/validateDomain',  access :['permitAll']],
  [pattern:'/api/getInfo',  access :['permitAll']],
  [pattern:'/api/currentUser',  access :['permitAll']],
  [pattern:'/api/v1/dash/**',  access :['IS_AUTHENTICATED_REMEMBERED']]
]

grails.plugin.springsecurity.filterChain.chainMap = [
  [pattern: '/assets/**', filters: 'none'],
  [pattern: '/**/js/**', filters: 'none'],
  [pattern: '/**/css/**', filters: 'none'],
  [pattern: '/**/images/**', filters: 'none'],
  [pattern: '/**/favicon.ico', filters: 'none'],
  [pattern: '/**', filters: 'JOINED_FILTERS']
]


grails.mail.default.from = "Streama <info@streama.com>"

grails.gorm.default.constraints = {
  'dateCreated'(bindable: false)
  'lastUpdated'(bindable: false)
  '*'(nullable: true)
}

environments {
  development{
    grails.dbconsole.enabled = true
  }
}
