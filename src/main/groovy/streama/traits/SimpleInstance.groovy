package streama.traits

trait SimpleInstance {

  static simpleInstanceFields = ['name']

  Map getSimpleInstance(Map options) {
    return getSimpleFromInstanceOrId(this, options)
  }

  Map getSimpleInstance(List options) {
    return getSimpleFromInstanceOrId(this, options)
  }

  Map getSimpleInstance() {
    return getSimpleInstance([:])
  }

  static Map getSimpleFromInstanceOrId(Object instance) {
    getSimpleFromInstanceOrId(instance, [:])
  }

  static Map getSimpleFromInstanceOrId(Object instance, List optionsList) {
    Map options = [includes: optionsList]

    getSimpleFromInstanceOrId(instance, options)
  }

  static Map getSimpleFromInstanceOrId(Object instance, Map options) {
    if (!instance) {
      return null
    }

    if (instance instanceof Number) {
      instance = findById(instance)
      if (!instance) {
        return null
      }
    }

    def result = [
      id: instance?.id,
      canonicalName: instance?.class?.canonicalName
    ]
//    if(!instance?.id){
//      return null
//    }

    def optionsList = generateOptionsListFromMap(options, (instance.class?.simpleInstanceFields ?: simpleInstanceFields))
    optionsList.each { String property ->
      def path = property
      if (property ==~ /[a-zA-Z0-9_]*?:.*/) {
        (path, property) = property.split(':', 2)
      }
      def value = instance.getEmbeddedProperty(property)
      if (value != null) {

        instance.setEmbeddedPropertyValue(result, path, value)
      }
    }
    return result
  }

  private static generateOptionsListFromMap(Map options, List simpleInstanceFields) {
    List<String> result = simpleInstanceFields.clone()
    options.includes?.each { String property ->
      if (!result.contains(property)) {
        result.add(property)
      }
    }
    options.excludes?.each { String property ->
      if (result.contains(property)) {
        result.remove(property)
      }
    }
    return result
  }

  Boolean hasEmbeddedProperty(String property) {
    return getEmbeddedProperty(property) != null
  }

  void setEmbeddedPropertyValue(result, String propertyPath, value){
    def parent = result
    def propertyTokens = propertyPath.tokenize(".")
    propertyTokens.eachWithIndex { propertyToken, index ->
      if(index == propertyTokens.size()-1){
        parent."${propertyToken}" = value
        return
      }

      if (!parent.hasProperty(propertyToken)) {
        parent."${propertyToken}" = [:]
      }
      parent = parent."${propertyToken}"
    }
  }

  Object getEmbeddedProperty(String property) {
    def parent = this
    def propertyTokens = property.tokenize(".")
    propertyTokens.each {
      if (!parent.hasProperty(it)) {
        parent = null
        return
      }
      parent = parent."${it}"
    }
    return parent
  }
}
