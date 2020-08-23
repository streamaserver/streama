package streama

import grails.transaction.Transactional
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.ResponseEntity

import javax.activation.MimetypesFileTypeMap

@Transactional
class OpensubtitlesService {

  def uploadService
  def restTemplate
  def openSubtitlesHasherService
  def fileService
  def settingsService
  def grailsApplication

  def setDefaultSubtitle(def subtileId, def videoId) {
    def video = Video.findById(videoId)
    if (video != null) {
      def subtitles = video.getSubtitles()
      def currentDefaultSubtitle = subtitles.find { it.isDefault == true }
      def subtitle = subtitles.find { it.id == Long.valueOf(subtileId) }

      if (subtitle != null) {
        subtitle.isDefault = true
        subtitle.save flush: true
        if (currentDefaultSubtitle != null && currentDefaultSubtitle.id != subtitle.id) {
          currentDefaultSubtitle.isDefault = false
          currentDefaultSubtitle.save flush: true
        }
      }
    }
  }

  def getSubtitles(SubtitlesRequest opensubtitlesRequest) {
    String resourceUrl = buildUrl(opensubtitlesRequest.getEpisode(), opensubtitlesRequest.getQuery(), opensubtitlesRequest.getSeason(), opensubtitlesRequest.getSubLanguageId())
    def credentials = settingsService.getValueForName('credentials_opensubtitles')
    def response = sendRequest(resourceUrl, credentials)
    if (response.statusCodeValue == 200) {
      response.body.findAll { it.subFormat.equals("srt") || it.subFormat.equals("vtt") }.sort { -it.subDownloadsCnt }
    }
    return response
  }

  def getSubtitlesByHash(def videoId) {
    def video = Video.findById(videoId)
    Set subtitleUrlList = []
    for (file in video.files) {
      if (fileService.allowedVideoFormats.contains(file.extension)) {
        if (file.openSubtitleHash?.isEmpty() ?: true) {
          def filePath = uploadService.getPath(file)
          try {
            file.openSubtitleHash = openSubtitlesHasherService.computeHash(new java.io.File(filePath))
            file.save flush: true
          } catch (Exception e) {
            log.error("Failed to save openSubtitleHash, ${e.message}", e)
          }
        }
        subtitleUrlList.add(buildUrl(file.openSubtitleHash, file.size))
      }
    }
    Set responseSet = []
    def credentials = settingsService.getValueForName('credentials_opensubtitles')

    for (url in subtitleUrlList) {
      def response = sendRequest(url, credentials)
      if (response.statusCodeValue != 200) {
        return response
      }
      responseSet.addAll(response.body)
    }
    responseSet?.sort { -it.subDownloadsCnt }
    def response = ResponseEntity.status(200).body(responseSet)
    return response
  }

  def downloadSubtitles(String subtitleName, String url, String subtitleLanguage, videoId) {
    def videoInstance = Video.findById(videoId)
    if (videoInstance != null) {
      def stagingDir = uploadService.getDir().uploadDir.toString()
      def filename = url.tokenize('/')[-1]
      def filePath = new java.io.File("$stagingDir/$filename")

      new FileOutputStream(filePath).withStream { out ->
        new URL(url).openStream().eachByte {
          out.write(it)
        }
      }

      try {
        def fileName = ZipHelper.unzipFile(stagingDir, filename, subtitleName)
        def fileDb = saveFile(stagingDir, fileName, subtitleName, subtitleLanguage)
        if (fileDb != null) {
          if (videoInstance.getSubtitles().isEmpty()) {
            fileDb.setIsDefault(true)
          }
          videoInstance.addToFiles(fileDb)
          videoInstance.save flush: true, failOnError: true
        }
        return true
      } catch (Exception e) {
        log.error(e.message, e)
        return false
      } finally {
        filePath.delete()
      }
    }
  }

  // If the request to the opensubtitle API receives the status code 403, sends a request for access.
  // Then the request to get subtitles is sent again
  def sendRequest(String url, String credentials, boolean retry = true) {
    def headers = createHeaders(credentials)
    HttpEntity<String> entity = new HttpEntity<String>(headers)
    def response = ResponseEntity.status(400).body("Opensubtitle API problems")
    try {
      response = restTemplate.exchange(url, HttpMethod.GET, entity, SubtitlesResponse[].class)
    } catch (Exception e) {
      log.error("Opensubtitle API exception, ${e.message}", e)
      if (e.statusCode.value == 403) {
        if (retry) {
          def accessHeader = createHeadersToAccess(credentials)
          HttpEntity<String> accessEntity = new HttpEntity<String>(accessHeader)
          def spUrl = buildUrl(null, generateRandomName(), null, "eng")
          try {
            //Access request
            restTemplate.exchange(spUrl, HttpMethod.GET, accessEntity, SubtitlesResponse[].class)
          } catch (Exception ex) {
          }
          //Retry subtitle request
          return sendRequest(url, credentials, false)
        }

        response = ResponseEntity.status(e.statusCode.value).body("Looks like you have invalid credentials for opensubtitles API, please check admin settings page")
      }
    }
    return response
  }

  def buildUrl(String episode, String query, String season, String subLanguageId) {

    def episodeParam = episode ? "/episode-${episode}" : ""
    def queryParam = query ? "/query-${query.replaceAll(" ", "%20").toLowerCase()}" : ""
    def seasonParam = season ? "/season-${season}" : ""
    def subLanguageIdParam = subLanguageId ? "/sublanguageid-${subLanguageId}" : ""

    def url = grailsApplication.config.streama.opensubtitleUrl + episodeParam + queryParam + seasonParam + subLanguageIdParam
  }

  def buildUrl(String fileHash, Long fileSize) {

    def moviebytesize = fileSize ? "/moviebytesize-${fileSize}" : ""
    def moviehash = fileHash ? "/moviehash-${fileHash}" : ""
    def url = grailsApplication.config.streama.opensubtitleUrl + moviebytesize + moviehash
  }

  def saveFile(String stagingDir, String fileName, String subtitleName, String subtitleLanguage) {
    def file = new java.io.File("$stagingDir/$fileName")
    MimetypesFileTypeMap mimeTypesMap = new MimetypesFileTypeMap()
    def contentType = mimeTypesMap.getContentType(file)
    def indexForFileName = fileName.lastIndexOf('.')
    def sha256Hex = fileName[0..(indexForFileName - 1)]
    def indexForSubtitleName = subtitleName.lastIndexOf('.')
    String extension = subtitleName[indexForSubtitleName..-1]
    def originalFilenameNoExt = subtitleName[0..(indexForSubtitleName - 1)]
    def map = [size: file.length(), language: subtitleLanguage]
    uploadService.createFileFromUpload(sha256Hex, file, extension, originalFilenameNoExt + extension, contentType, null, map)
  }

  def getVideoSubtitles(videoId) {
    def video = Video.findById(videoId)
    return video.getSubtitles()
  }

  def generateRandomName() {
    def pool = ['a'..'z'].flatten()
    Random rand = new Random(System.currentTimeMillis())
    def nameChars = (0..5).collect { pool[rand.nextInt(pool.size())] }
    def name = nameChars.join()
  }

  def createHeaders(String credentials){
    HttpHeaders headers = new HttpHeaders()
    def encoderCredentials = credentials.encodeAsBase64()
    headers.set("Authorization", "Basic $encoderCredentials")
    headers.set("User-Agent", "curl/7.65.3")
    return headers
  }

  def createHeadersToAccess(String credentials){
    HttpHeaders headers = new HttpHeaders()
    def encoderCredentials = credentials.encodeAsBase64()
    headers.set("Authorization", "Basic $encoderCredentials")
    headers.set("User-Agent", "UserAgent")
    return headers
  }
}
