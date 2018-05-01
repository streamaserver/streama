package streama

class Settings {

    String settingsKey
    String value
    String defaultValue
    String name
    String description
    String settingsType
    Boolean required
    Boolean validationRequired = true

    static constraints = {
        settingsKey nullable: false
    }

    static mapping = {
        description sqlType:"text"
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
