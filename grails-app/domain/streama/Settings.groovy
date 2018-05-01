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


    def getParsedValue(){
      if(this.settingsType == 'boolean'){
        return this.value == 'true'
      }
      else if(this.settingsType == 'integer'){
        return this.value?.isNumber() ? this.value as Integer : null
      }
      else{
        return this.value
      }
    }
}
