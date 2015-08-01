package streama

class Role {

	String authority
	String displayName

	static mapping = {
		cache true
	}

	static constraints = {
		authority blank: false, unique: true
	}
}
