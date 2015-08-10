package streama

import grails.transaction.Transactional

@Transactional
class VideoConverterService {

  def grailsApplication

  def convertToH264(sourceFilePath) {

    def process

    java.io.File convertVideoH264File = grailsApplication.mainContext.getResource("tools/convertVideoH264.sh").file
    java.io.File HandBrakeCLIFile = grailsApplication.mainContext.getResource("tools/HandBrakeCLI").file

    if(!convertVideoH264File.canExecute()){
      convertVideoH264File.setExecutable(true)
    }
    if(!HandBrakeCLIFile.canExecute()){
      HandBrakeCLIFile.setExecutable(true)
    }

    String convertVideoH264Path = convertVideoH264File.toString()

    if(Settings.findBySettingsKey('Remove Source After Convert').value == "yes"){
      process = ["$convertVideoH264Path", sourceFilePath, true].execute()
    }else{
      process = ["$convertVideoH264Path", sourceFilePath].execute()
    }

    process.in.eachLine { line ->
      log.debug("convertVideoH264: " + line)
    }

    process.waitFor()

    log.info('convertToH264 executed with targetFilePath: ' + process.exitValue())
  }
}
