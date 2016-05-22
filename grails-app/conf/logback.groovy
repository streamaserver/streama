import grails.util.BuildSettings
import grails.util.Environment

// See http://logback.qos.ch/manual/groovy.html for details on configuration
appender('STDOUT', ConsoleAppender) {
    encoder(PatternLayoutEncoder) {
        pattern = "%level %logger - %msg%n"
    }
}

root(ERROR, ['STDOUT'])

logger("streama", DEBUG)
logger 'grails.app', INFO
logger 'grails.app.controllers', DEBUG
logger 'grails.app.services', DEBUG

// logger 'grails.plugin.springsecurity', TRACE
// logger 'org.springframework.security', DEBUG
// logger 'org.hibernate.SQL', DEBUG
// logger 'org.hibernate.type.descriptor.sql.BasicBinder', TRACE

def targetDir = BuildSettings.TARGET_DIR
if (Environment.isDevelopmentMode() && targetDir) {
    appender("FULL_STACKTRACE", FileAppender) {
        file = "${targetDir}/stacktrace.log"
        append = true
        encoder(PatternLayoutEncoder) {
            pattern = "%level %logger - %msg%n"
        }
    }
    logger("StackTrace", ERROR, ['FULL_STACKTRACE'], false)
}
