package streama

class Certification {

  String certification
  String type
  String description

  static mapping = {
    description type: 'text'
  }

  static constraints = {
    certification nullable: false
    description nullable: true
  }
}
