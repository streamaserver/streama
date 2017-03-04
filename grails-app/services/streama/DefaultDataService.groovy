package streama

import grails.transaction.Transactional

@Transactional
class DefaultDataService {

  def createDefaultRoles(){
    def roles = [
      [authority: "ROLE_ADMIN", displayName: "Admin"],
      [authority: "ROLE_CONTENT_MANAGER", displayName: "Content Manager"],
    ]

    roles.each { role ->
      def roleInstance = Role.findOrCreateByAuthority(role.authority)
      roleInstance.properties = role
      roleInstance.save flush: true, failOnError: true
    }
  }


  def createDefaultUsers(){
    def users = [
        [
            username: 'admin',
            password: 'admin',
            fullName: 'Administrator',
            enabled: true,
            roles: [Role.findByAuthority("ROLE_ADMIN"), Role.findByAuthority("ROLE_CONTENT_MANAGER")]
        ]
    ]

    users.each{ userData ->
      if(!User.findByUsername(userData.username)){
        def user = new User(username: userData.username, password: userData.password, enabled: userData.enabled)
        user.save flush: true, failOnError: true

        userData.roles?.each{ role ->
          UserRole.create(user, role)
        }
      }
    }
  }


  def createDefaultSettings(){
    def settings = [
        [
            settingsKey: 'Upload Directory',
            description: 'This setting provides the application with your desired upload-path for all files. ' +
                'The default so far has been /data/streama. Remember: if you change this path, copy all the files (that were previously added) into the new directory.',
            settingsType: 'string',
            required: true
        ],
        [
            settingsKey: 'TheMovieDB API key',
            description: "API stands for Application Programming Interface. TheMovieDB's movie/TV show information database is accessible only by registering at https://www.themoviedb.org/account/signup and requesting an API-key. " +
              "After you have sent a request form, you can see your API-key by going to the API section in your profile's settings in TheMovieDB. The API-key is required by this application to fetch " +
              "all the nice Movie/Episode/Show data for you.",
            settingsType: 'string',
            required: true
        ],
        [
            settingsKey: 'Base URL',
            value: 'http://localhost:8080',
            description: 'The Base-URL is used for the videos and the link in the invitation-email.',
            settingsType: 'string',
            required: true
        ],
        [
            settingsKey: 'Second Directory',
            description: 'Enter one or more directories, split with |. Example: /data/streama|/mnt/streama. These directories are only used for reading previously uploaded files. This can be useful if you want to spread your video files over two or more directories, for instance by mounting a second or third drive and rsyncing everything over.',
            settingsType: 'string',
            required: false
        ],
        [
            settingsKey: 'Local Video Files',
            description: 'If you already have a directory with your videos, put it here and you will be able to choose them when creating movies or TV shows.',
            settingsType: 'string',
            required: false
        ],
        [
            settingsKey: 'First Time Login Info',
            description: 'Should the First-Time login info (admin/admin) be shown in the login screen?',
            settingsType: 'boolean'
        ],
        [
            settingsKey: 'Show Version Number',
            name: 'show_version_num',
            description: 'Should the Streama version number be shown in the header of the application',
            settingsType: 'boolean',
            value: 'true'
        ],
        [
            settingsKey: 'Logo',
            name: 'logo',
            description: 'Upload your custom Streama Logo here',
            settingsType: 'fileUpload',
            value: '/assets/logo.png',
            defaultValue: '/assets/logo.png'
        ],
        [
            settingsKey: 'Streama title',
            name: 'title',
            description: 'Change Name of Application',
            settingsType: 'string',
            value: 'Streama',
            required: true,
            validationRequired: false
        ],
//        [
//            settingsKey: 'Remove Source After Convert',
//            value: 'yes',
//            settingsType: 'radio',
//            description: 'If this is set to "yes", after successful file-conversion the original file will be removed from the Upload Directory. This may be useful in case you have limited disk space.'
//        ],
    ]

    settings.each{ settingData ->
      if(!Settings.findBySettingsKey(settingData.settingsKey)){
        def setting = new Settings(settingData)
        setting.save flush: true, failOnError: true
      }

      Settings changedSetting = Settings.findBySettingsKeyAndDescriptionNotEqual(settingData.settingsKey, settingData.description)
      if(changedSetting){
        changedSetting.description = settingData.description
        changedSetting.save flush: true, failOnError: true
      }
    }
  }
}
