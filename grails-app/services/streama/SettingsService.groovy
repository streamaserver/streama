package streama

import grails.transaction.Transactional
import org.apache.commons.validator.routines.UrlValidator

@Transactional
class SettingsService {

  def theMovieDbService

  def getBaseUrl() {
    return Settings.findBySettingsKey('Base URL')?.value
  }

  Boolean getAnonymousAccess() {
    return Boolean.valueOf(Settings.findByName('anonymous_access')?.value)
  }

  def enableAnonymousUser() {
    User anonymous = User.findByUsername("anonymous")
    if (anonymous) {
        anonymous.enabled = true
        anonymous.deleted = false   /** If user has been previously mark as deleted, clear the field **/
    } else {  /** If the user not exists, or has been deleted, create it **/
        anonymous = new User(username: 'anonymous', password: 'anonymous', fullName: 'Anonymous', enabled: true)
    }
    anonymous.save failOnError: true
  }

  def changeAnonymousAccess(String value) {
    Settings setting = Settings.findByName("anonymous_access" )
    setting.value = value
    setting.save failOnError: true
  }

  def disableAnonymousUser() {
    /** Delete the user of the database */
    User anonymous = User.findByUsername("anonymous")
    if (anonymous) {
      anonymous.delete failOnError: true
    }
  }

  def validate(Settings settingsInstance) {
    def resultValue = [:]

    if (settingsInstance.settingsKey == 'Upload Directory') {
      validateUploadDirectoryPermissions(settingsInstance.value + '/upload', resultValue)
    }
    if (settingsInstance.settingsKey == 'Second Directory') {
      def additionalReadStorages = settingsInstance.value?.split(/\|/)
      additionalReadStorages.each{ value ->
        validateLocalDirectoryPermissions(value + '/upload', resultValue)
      }
    }
    if (settingsInstance.settingsKey == 'Local Video Files') {
      validateLocalDirectoryPermissions(settingsInstance.value, resultValue)
    }
    if (settingsInstance.settingsKey == 'TheMovieDB API key') {
      validateTheMovieDbAPI(settingsInstance, resultValue)
    }
    if (settingsInstance.settingsKey == 'TheMovieDB API language') {
      validateTheMovieDbLanguage(settingsInstance, resultValue)
    }

    return resultValue;
  }

  def validateLocalDirectoryPermissions(String path, resultValue) {
    def uploadDir = new java.io.File(path)
    try {
      if (uploadDir.canRead()) {
        resultValue.success = true;
        resultValue.message = "The directory was successfully accessed by the application";
      } else {
        resultValue.error = true;
        resultValue.message = "The directory could not be accessed by the application. Please make sure that the directory exists and that you set the correct permissions.";
      }
    }
    catch (Exception io) {
      resultValue.error = true;
      resultValue.message = "The directory could not be accessed by the application. Please make sure that the directory exists and that you set the correct permissions.";
    }
  }

  def validateUploadDirectoryPermissions(String path, resultValue) {
    def uploadDir = new java.io.File(path)
    try {
      uploadDir.mkdirs()
      if (uploadDir.canWrite()) {
        resultValue.success = true;
        resultValue.message = "The directory was successfully accessed by the application";
      } else {
        resultValue.error = true;
        resultValue.message = "The directory could not be accessed by the application. Please make sure that the directory exists and that you set the correct permissions.";
      }
    }
    catch (Exception io) {
      resultValue.error = true;
      resultValue.message = "The directory could not be accessed by the application. Please make sure that the directory exists and that you set the correct permissions.";
    }
  }

  def validateTheMovieDbAPI(Settings settingsInstance, resultValue) {
    try {
      theMovieDbService.validateApiKey(settingsInstance.value)
      resultValue.success = true;
      resultValue.message = "The API-Key is valid and can be used!";
    }

    catch (Exception io) {
      resultValue.error = true;
      resultValue.message = "Invalid API key: You must be granted a valid key.";
    }
  }

  def validateTheMovieDbLanguage(Settings settingsInstance, resultValue) {
    if (theMovieDbService.validateLanguage(settingsInstance.value)) {
      resultValue.success = true;
      resultValue.message = "The API-Language is valid and can be used!";
    } else {
      resultValue.error = true;
      resultValue.message = "Invalid API language: The entered language is not an IETF language tag.";
    }
  }
}
