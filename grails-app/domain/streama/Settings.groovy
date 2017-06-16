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
}
