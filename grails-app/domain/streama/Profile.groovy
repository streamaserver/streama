package streama

class Profile {

  String profileName
  String profileLanguage
  Boolean isChild
  Boolean isDeleted = false
  String avatarColor

  static belongsTo = [user: User]

  static constraints = {
  }
}
