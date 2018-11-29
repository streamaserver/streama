package streama

import static java.util.UUID.randomUUID

class User {

	transient springSecurityService
	transient settingsService

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
	boolean pauseVideoOnClick = true
	String uuid
	String language = 'en'
  String fullName
  Integer amountOfMediaEntries

	static transients = ['springSecurityService']

  static hasMany = [favoriteGenres: Genre, profiles: Profile]

	static constraints = {
		username blank: false, unique: true
		password blank: false
		dateCreated nullable: true
		lastUpdated nullable: true
	}

	static mapping = {
		password column: '`password`'
		cache true
	}

	Set<Role> getAuthorities() {
		UserRole.findAllByUser(this).collect { it.role }
	}

	def beforeInsert() {
		if(!password){
			password  = randomUUID() as String
		}

		encodePassword()
	}

	def beforeUpdate() {
		if (isDirty('password')) {
			encodePassword()
		}
	}

	def getInvitationLink(){
		if(invitationSent && uuid){
			return settingsService.baseUrl +  "/invite?uuid=${uuid}"
		}
	}

	protected void encodePassword() {
		password = springSecurityService?.passwordEncoder ? springSecurityService.encodePassword(password) : password
	}
}
