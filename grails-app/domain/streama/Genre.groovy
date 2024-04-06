package streama

class Genre {

  Integer apiId
  String name

  static constraints = {
    apiId nullable: true
    name nullable: false
  }
}
