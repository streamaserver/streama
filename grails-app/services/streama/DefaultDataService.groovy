package streama

import grails.transaction.Transactional

@Transactional
class DefaultDataService {

  def createDefaultRoles(){
    def roles = [
      [authority: "ROLE_ADMIN", displayName: "Admin"],
      [authority: "ROLE_CONTENT_MANAGER", displayName: "Content Manager"],
      [authority: "ROLE_TRUSTED_USER", displayName: "Trusted User"],
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
            roles: [Role.findByAuthority("ROLE_ADMIN"), Role.findByAuthority("ROLE_CONTENT_MANAGER"),Role.findByAuthority("ROLE_TRUSTED_USER")]
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
          settingsKey: 'TheMovieDB API language',
          description: "Language support on TMDb is based on the language query parameter you send along with your API key. " +
            "For example, you could type es-ES for getting responses in spanish. Be careful with your country, es-ES is not the same as es-MX. " +
            "More information at https://en.wikipedia.org/wiki/IETF_language_tag",
          settingsType: 'string',
          required: false,
          value: 'en'
        ],
        [
            settingsKey: 'Base URL',
            value: 'http://localhost:8080',
            description: 'The Base-URL is used for the link in the invitation-email.',
            settingsType: 'string',
            required: true,
            validationRequired: false
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
            settingsType: 'boolean',
            value: 'true'
        ],
        [
            settingsKey: 'Allow anonymous access',
            name: 'anonymous_access',
            description: 'Allow to reproduce videos without login in the application',
            settingsType: 'boolean',
            value: 'false'
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
            settingsKey: 'Favicon',
            name: 'favicon',
            description: 'Upload your custom Favicon here. For most compatibility, use 16x16 .ico file',
            settingsType: 'fileUpload',
            value: '/assets/favicon.ico',
            defaultValue: '/assets/favicon.ico'
        ],
        [
          settingsKey: 'loginBG',
          name: 'loginBackground',
          description: 'Upload your custom login background',
          settingsType: 'fileUpload',
          value: '/assets/bg.jpg',
          defaultValue: '/assets/bg.jpg'
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
        [
            settingsKey: 'User Activity Rotation',
            name: 'user_activity_rotation',
            description: 'Input a number here. Limits the amount of stored User Activity entries in the database to the amount supplied here. If none is given, all records will be stored without deletion. ',
            settingsType: 'integer',
            value: '',
            required: false,
            validationRequired: false
        ],
        [
            settingsKey: 'Let users download Videos',
            name: 'player_showDownloadButton',
            description: 'When this value is set to true, the player-interface will get an additional download-button for all users. This will download the raw movie file. ',
            settingsType: 'boolean',
            value: 'false',
            required: false,
            validationRequired: false
        ],
        [
            settingsKey: 'All Users can download (otherwise only Trusted)',
            name: 'player_downloadForAllUsers',
            description: 'If the download feature is enabled, by default only users with the role "Trusted User" can download videos. With this checkmark you can allow all users to download',
            settingsType: 'boolean',
            value: 'false',
            required: false,
            validationRequired: false
        ],
        [
            settingsKey: 'Hidden Dash sections',
            name: 'hidden_dash_sections',
            description: 'You can here add a comma-separted list of all the dash sections you would like to hide. To find out the name, check for vm.isDashSectionHidden(\'SECTION-NAME\'). example value: "continue-watching,new-releases"',
            settingsType: 'string',
            value: '',
            required: false,
            validationRequired: false
        ],
		[
            settingsKey: 'Guess Subtitle Label',
            name: 'guess_subtitle_label',
            description: 'Tries to guess the subtitle label automatically when adding a \'.vtt\' or \'.srt\' file. This is the default behaviour, to change it, change the \'subtitles\' regex in \'application.yml\'',
            settingsType: 'boolean',
            value: 'false',
            required: false,
            validationRequired: false
        ],
		[
            settingsKey: 'Subtitle Auto Load',
            name: 'subtitle_auto_load',
            description: 'Auto loads the first subtitle track on media that has subtitles.',
            settingsType: 'boolean',
            value: 'false',
            required: false,
            validationRequired: false
        ],
		[
            settingsKey: 'Hide Help/FAQ section',
            name: 'hide_help_faq',
            description: 'Determines whether the help/faq section should be displayed for the users',
            settingsType: 'boolean',
            value: 'false',
            required: false,
            validationRequired: false
        ],
		[
            settingsKey: 'Hide Dashboard Header-links',
            name: 'hide-dash-sections',
            description: 'Determines whether the the top Dashboard Links \'Tv Shows\', \'Movies\' and \'My List\' should be hidden',
            settingsType: 'boolean',
            value: 'false',
            required: false,
            validationRequired: false
        ],
		[
            settingsKey: 'Hide Dashboard Search',
            name: 'hide-dash-search',
            description: 'Determines whether the the top Dashboard Search should be hidden',
            settingsType: 'boolean',
            value: 'false',
            required: false,
            validationRequired: false
        ],
		[
            settingsKey: 'Enable Random Episode button',
            name: 'enable-random-episode-button',
            description: 'Determines whether the shuffle / random play button in the dashboard cards should appear. ',
            settingsType: 'boolean',
            value: 'false',
            required: false,
            validationRequired: false
        ],
		    [
            settingsKey: 'Footer Content',
            name: 'footer-content',
            description: 'HTML Content for the Footer',
            settingsType: 'wysiwyg',
            value: '',
            required: false,
            validationRequired: false
        ],
        [
          settingsKey: 'Hide \'Dashboard\' button',
          name: 'hide-dash-button',
          description: 'Determines whether the the top Dashboard button should be hidden',
          settingsType: 'boolean',
          value: 'false',
          required: false,
          validationRequired: false
        ],
        [
          settingsKey: 'Hide \'My List\' button',
          name: 'hide-mylist-button',
          description: 'Determines whether the \'My List\' button should be hidden. In contrast to the \'Dashboard Header-links\' setting this will only hide \'My List\'',
          settingsType: 'boolean',
          value: 'false',
          required: false,
          validationRequired: false
        ],
        [
          settingsKey: 'Amount of profiles users can create',
          name: 'profile-count',
          description: 'Determines how much profiles each individual user can create. Defaults to 4.',
          settingsType: 'integer',
          value: '4',
          required: true,
          validationRequired: false
        ],
//        [
//            settingsKey: 'Remove Source After Convert',
//            value: 'yes',
//            settingsType: 'radio',
//            description: 'If this is set to "yes", after successful file-conversion the original file will be removed from the Upload Directory. This may be useful in case you have limited disk space.'
//        ],

        [
          settingsKey: 'Credentials for opensubtitles',
          name: 'credentials_opensubtitles',
          description: 'Credentials which are used to authenticate the user on the opensubtitles website. Enter username and password, separated by :. Example: username:password. ' +
            'To use the opensubtitles search, you must activate the User Agent. More information at https://trac.opensubtitles.org/projects/opensubtitles/wiki/DevReadFirst',
          settingsType: 'string',
          value: '',
          required: false,
          validationRequired: true
        ],
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
