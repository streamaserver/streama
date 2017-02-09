package streama

import grails.boot.GrailsApp
import grails.boot.config.GrailsAutoConfiguration
import org.springframework.beans.factory.config.YamlPropertiesFactoryBean
import org.springframework.context.EnvironmentAware
import org.springframework.core.env.Environment
import org.springframework.core.env.PropertiesPropertySource
import org.springframework.core.io.FileSystemResource
import org.springframework.core.io.Resource

class Application extends GrailsAutoConfiguration implements EnvironmentAware {
    static void main(String[] args) {
        GrailsApp.run(Application, args)
    }

    @Override
    void setEnvironment(Environment environment) {
      def configPath = System.properties["local.config.regex"]
      def resourceConfig = new FileSystemResource(configPath)
      if(resourceConfig.exists()) {
        def ypfb = new YamlPropertiesFactoryBean()
        ypfb.setResources([resourceConfig] as Resource[])
        ypfb.afterPropertiesSet()
        def properties = ypfb.getObject()
        def propertySources = new PropertiesPropertySource("local.config.regex", properties)
        def propertyNames = propertySources.getPropertyNames()
        environment.propertySources.addFirst(propertySources)
      }
    }
}
