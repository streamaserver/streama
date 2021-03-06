package streama

class Certification {

  String certification
  String type
  String description
  Integer level

  static mapping = {
    description type: 'text'
  }

  static constraints = {
    certification nullable: false
    description nullable: true
  }
}
