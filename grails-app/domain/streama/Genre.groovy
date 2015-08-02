package streama

class Genre {

  Integer apiId
  String name

  static constraints = {
    apiId nullable: false
    name nullable: false
  }
}
