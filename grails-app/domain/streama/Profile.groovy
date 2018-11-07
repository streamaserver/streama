package streama

class Profile {

  String profile_name
  String profile_language
  Boolean isKid

  static belongsTo = [user: User]

  static constraints = {
  }
}
