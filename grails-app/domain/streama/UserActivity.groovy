package streama

class UserActivity {


	Date dateCreated
	Date lastUpdated
  User user
  String ipAddress
  String operatingSystem
  String device
  String browser
  Video video
  String type

	static constraints = {
    lastUpdated nullable: true
	}

	static mapping = {

	}
}
