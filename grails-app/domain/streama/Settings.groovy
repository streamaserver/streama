package streama

import grails.converters.JSON
import groovy.json.JsonSlurper

class Settings {

    String settingsKey
    String value
    String defaultValue
    String name
    String description
    String settingsType
    Boolean required
    String metaDataJSON
    transient Map metaData
    Boolean validationRequired = true

    static transients = ['metaData']

    static constraints = {
      settingsKey nullable: false
      metaData bindable: true
    }

    static mapping = {
        metaDataJSON type: 'text'
        description sqlType:"text"
    }


    Object getMetaData() {
      this.metaData = new JsonSlurper().parseText(metaDataJSON ?: '{}')
      return this.metaData
    }

    def setMetaData(Map data){
      this.metaData = data
      this.metaDataJSON = data ? (data as JSON) : '{}'
    }


    def getParsedValue(String propertyName = 'value'){
      String _value = this[propertyName]
      if(this.settingsType == 'boolean'){
        return _value == 'true'
      }
      else if(this.settingsType == 'integer'){
        return _value?.isNumber() ? _value as Integer : null
      }
      else{
        return _value
      }
    }
}
