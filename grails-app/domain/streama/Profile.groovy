package streama

class Profile {

  String profile_name
  String profile_language
  Boolean isKid
  String avatar_color

  static belongsTo = [user: User]

  static constraints = {
  }
}
