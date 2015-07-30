package streama

class Settings {
    
    String settingsKey
    String value
    String description

    static constraints = {
        settingsKey nullable: false
    }

    static mapping = {
        description sqlType:"text"
    }
}
