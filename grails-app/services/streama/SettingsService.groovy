package streama

import grails.transaction.Transactional

@Transactional
class SettingsService {

  def theMovieDbService

  def getBaseUrl() {
    return Settings.findBySettingsKey('Base URL')?.value
  }

  def validate(Settings settingsInstance) {
    def resultValue = [:]

    if (settingsInstance.settingsKey == 'Base URL') {
        validateURL(settingsInstance.value, resultValue)
    }
    if (settingsInstance.settingsKey == 'Upload Directory') {
      validateUploadDirectoryPermissions(settingsInstance.value + '/upload', resultValue)
    }
    if (settingsInstance.settingsKey == 'Second Directory') {
      def additionalReadStorages = settingsInstance.value?.split(/\|/)
      additionalReadStorages.each{ value ->
        validateUploadDirectoryPermissions(value + '/upload', resultValue)
      }
    }
    if (settingsInstance.settingsKey == 'Local Video Files') {
      validateUploadDirectoryPermissions(settingsInstance.value, resultValue)
    }
    if (settingsInstance.settingsKey == 'TheMovieDB API key') {
      validateTheMovieDbAPI(settingsInstance, resultValue)
    }

    return resultValue;
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

  def validateURL(String url, resultValue) {
    try {
        def actualUrl = new java.net.URL(url);
        actualUrl.getContent();
        resultValue.success = true;
        resultValue.message = "The entered url is valid."
    }
    catch (Exception ex) {
        resultValue.error = true;
        resultValue.message = "The entered url is invalid."
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

}
