package streama

class Settings {

    String settingsKey
    String value
    String description
    String settingsType
    Boolean required

    static constraints = {
        settingsKey nullable: false
    }

    static mapping = {
        description sqlType:"text"
    }
}
