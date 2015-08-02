package streama

import static java.util.UUID.randomUUID

class User {

	transient springSecurityService

	Date dateCreated
	Date lastUpdated
  boolean deleted = false

	String username
	String password

	boolean enabled = false
	boolean accountExpired
	boolean accountLocked
	boolean passwordExpired
	boolean invitationSent = false
	String uuid

  String fullName

	static transients = ['springSecurityService']

  static hasMany = [favoriteGenres: Genre]

	static constraints = {
		username blank: false, unique: true
		password blank: false
		dateCreated nullable: true
		lastUpdated nullable: true
	}

	static mapping = {
		password column: '`password`'
	}

	Set<Role> getAuthorities() {
		UserRole.findAllByUser(this).collect { it.role }
	}

	def beforeInsert() {
		if(!password){
			password = randomUUID() as String
		}

		encodePassword()
	}

	def beforeUpdate() {
		if (isDirty('password')) {
			encodePassword()
		}
	}

	protected void encodePassword() {
		password = springSecurityService?.passwordEncoder ? springSecurityService.encodePassword(password) : password
	}
}
