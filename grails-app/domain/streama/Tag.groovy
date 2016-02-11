package streama

class Tag {

  Date dateCreated
  Date lastUpdated
  boolean deleted = false
  String name


  static constraints = {
    name unique: true, blank: false
  }
}
