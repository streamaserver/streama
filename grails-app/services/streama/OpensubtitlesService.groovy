package streama

import grails.transaction.Transactional
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity

import javax.activation.MimetypesFileTypeMap
import java.net.MalformedURLException

@Transactional
class OpensubtitlesService {

  def uploadService
  def restTemplate
  def openSubtitlesHasherService
  def fileService
  def settingsService
  def grailsApplication

  private static final String USER_AGENT = "Streama v1.11"

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
    String resourceUrl = buildSearchUrl(
      opensubtitlesRequest.getQuery(),
      opensubtitlesRequest.getSubLanguageId(),
      opensubtitlesRequest.getSeason(),
      opensubtitlesRequest.getEpisode()
    )
    def apiKey = settingsService.getValueForName('opensubtitles_api_key')
    if (!apiKey) {
      return ResponseEntity.status(400).body([error: true, message: "OpenSubtitles API key required. The old API was discontinued in 2024. " +
        "Get your free API key at opensubtitles.com/consumers and enter it in Admin → Settings → 'OpenSubtitles API Key'"])
    }
    def response = sendSearchRequest(resourceUrl, apiKey)
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
        subtitleUrlList.add(buildHashSearchUrl(file.openSubtitleHash, file.size))
      }
    }
    Set responseSet = []
    def apiKey = settingsService.getValueForName('opensubtitles_api_key')
    if (!apiKey) {
      return ResponseEntity.status(400).body([error: true, message: "OpenSubtitles API key required. The old API was discontinued in 2024. " +
        "Get your free API key at opensubtitles.com/consumers and enter it in Admin → Settings → 'OpenSubtitles API Key'"])
    }

    for (url in subtitleUrlList) {
      def response = sendSearchRequest(url, apiKey)
      if (response.statusCodeValue != 200) {
        return response
      }
      if (response.body instanceof List) {
        responseSet.addAll(response.body)
      }
    }
    responseSet = responseSet?.sort { -(it.subDownloadsCnt ?: 0) }
    def response = ResponseEntity.status(200).body(responseSet)
    return response
  }

  // Allowed domains for subtitle downloads (SSRF mitigation - CWE-918)
  private static final List<String> ALLOWED_SUBTITLE_HOSTS = [
    "dl.opensubtitles.org",
    "www.opensubtitles.org",
    "opensubtitles.org",
    "vip.opensubtitles.org",
    "api.opensubtitles.com",
    "www.opensubtitles.com",
    "opensubtitles.com"
  ]

  /**
   * Validates that a URL is from an allowed subtitle provider.
   * This prevents SSRF attacks by ensuring only whitelisted domains are accessed.
   */
  private boolean isUrlAllowed(String urlString) {
    try {
      URL parsedUrl = new URL(urlString)
      String host = parsedUrl.getHost()?.toLowerCase()
      String protocol = parsedUrl.getProtocol()?.toLowerCase()

      // Only allow HTTPS (or HTTP for backwards compatibility with opensubtitles)
      if (protocol != "https" && protocol != "http") {
        log.warn("Blocked subtitle download attempt with disallowed protocol: ${protocol}")
        return false
      }

      // Check if host is in allowlist
      if (!ALLOWED_SUBTITLE_HOSTS.contains(host)) {
        log.warn("Blocked subtitle download attempt from disallowed host: ${host}")
        return false
      }

      return true
    } catch (MalformedURLException e) {
      log.warn("Blocked subtitle download attempt with malformed URL: ${urlString}")
      return false
    }
  }

  /**
   * Downloads subtitle using the new OpenSubtitles API v1 two-step process:
   * 1. POST to /download with file_id to get temporary download link
   * 2. Download the file from the temporary link
   */
  def downloadSubtitles(String subtitleName, String fileIdOrUrl, String subtitleLanguage, videoId) {
    def videoInstance = Video.findById(videoId)
    if (videoInstance == null) {
      return false
    }

    def apiKey = settingsService.getValueForName('opensubtitles_api_key')
    if (!apiKey) {
      log.warn("OpenSubtitles API key not configured - subtitle download skipped")
      return false
    }

    try {
      // Step 1: Get download link from API
      def downloadUrl = getDownloadLink(fileIdOrUrl, apiKey)
      if (!downloadUrl) {
        log.error("Failed to get download link for file_id: ${fileIdOrUrl}")
        return false
      }

      // Security fix: Validate URL before fetching (SSRF mitigation - CWE-918)
      if (!isUrlAllowed(downloadUrl)) {
        log.error("Security: Blocked subtitle download from unauthorized URL: ${downloadUrl}")
        throw new SecurityException("Subtitle downloads are only allowed from opensubtitles.org/opensubtitles.com")
      }

      // Step 2: Download the actual file
      def stagingDir = uploadService.getDir().uploadDir.toString()
      def filename = downloadUrl.tokenize('/')[-1]
      // Clean up filename - remove query params
      if (filename.contains('?')) {
        filename = filename.split('\\?')[0]
      }
      def filePath = new java.io.File("$stagingDir/$filename")

      new FileOutputStream(filePath).withStream { out ->
        new URL(downloadUrl).openStream().eachByte {
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
    } catch (Exception e) {
      log.error("Failed to download subtitle: ${e.message}", e)
      return false
    }
  }

  /**
   * Gets a temporary download link from the OpenSubtitles API
   */
  private String getDownloadLink(String fileId, String apiKey) {
    def baseUrl = grailsApplication.config.streama.opensubtitleUrl
    def downloadEndpoint = "${baseUrl}/download"

    HttpHeaders headers = new HttpHeaders()
    headers.set("Api-Key", apiKey)
    headers.set("User-Agent", USER_AGENT)
    headers.setContentType(MediaType.APPLICATION_JSON)

    def requestBody = [file_id: Long.parseLong(fileId)]
    HttpEntity<Map> entity = new HttpEntity<>(requestBody, headers)

    try {
      def response = restTemplate.exchange(downloadEndpoint, HttpMethod.POST, entity, OpenSubtitlesDownloadResponse.class)
      if (response.statusCodeValue == 200 && response.body?.link) {
        return response.body.link
      }
    } catch (Exception e) {
      log.error("Failed to get download link: ${e.message}", e)
    }
    return null
  }

  /**
   * Sends search request to OpenSubtitles API v1
   */
  def sendSearchRequest(String url, String apiKey) {
    def headers = createHeaders(apiKey)
    HttpEntity<String> entity = new HttpEntity<String>(headers)
    def response = ResponseEntity.status(400).body([error: true, message: "OpenSubtitles API problems"])

    try {
      def apiResponse = restTemplate.exchange(url, HttpMethod.GET, entity, OpenSubtitlesApiResponse.class)

      // Handle 301 redirect - OpenSubtitles API reorders query params and returns 301
      if (apiResponse.statusCodeValue == 301 || apiResponse.statusCodeValue == 302) {
        def redirectUrl = apiResponse.headers.getLocation()?.toString()
        if (redirectUrl) {
          // Handle relative redirects
          if (redirectUrl.startsWith("/")) {
            def baseUrl = grailsApplication.config.streama.opensubtitleUrl
            // Extract base domain from the original URL
            def baseDomain = baseUrl.replaceAll(/\/api\/v1.*/, "")
            redirectUrl = baseDomain + redirectUrl
          }
          log.info("Following OpenSubtitles redirect to: ${redirectUrl}")
          apiResponse = restTemplate.exchange(redirectUrl, HttpMethod.GET, entity, OpenSubtitlesApiResponse.class)
        }
      }

      if (apiResponse.statusCodeValue == 200) {
        // Convert to legacy format for compatibility with frontend
        def subtitles = apiResponse.body?.data ? convertToLegacyFormat(apiResponse.body.data) : []
        response = ResponseEntity.status(200).body(subtitles)
      } else {
        log.warn("OpenSubtitles API returned status ${apiResponse.statusCodeValue}")
        response = ResponseEntity.status(apiResponse.statusCodeValue).body([])
      }
    } catch (org.springframework.web.client.HttpClientErrorException e) {
      log.error("OpenSubtitles API HTTP error: ${e.message}", e)
      if (e.statusCode.value() == 401) {
        response = ResponseEntity.status(401).body([error: true, message: "Invalid OpenSubtitles API key. Please check your API key in admin settings."])
      } else if (e.statusCode.value() == 429) {
        response = ResponseEntity.status(429).body([error: true, message: "OpenSubtitles rate limit exceeded. Please try again later."])
      } else {
        response = ResponseEntity.status(e.statusCode.value()).body([error: true, message: "OpenSubtitles API error: ${e.statusCode.reasonPhrase}"])
      }
    } catch (Exception e) {
      log.error("OpenSubtitles API exception: ${e.message}", e)
      response = ResponseEntity.status(500).body([error: true, message: "Failed to connect to OpenSubtitles API: ${e.message}"])
    }
    return response
  }

  /**
   * Converts new API v1 response format to legacy format for frontend compatibility
   */
  private List<SubtitlesResponse> convertToLegacyFormat(List<OpenSubtitlesSubtitle> subtitles) {
    return subtitles.collect { sub ->
      def attrs = sub.attributes
      def file = attrs.files?.getAt(0)
      // Determine format from filename extension if not provided
      def fileName = file?.fileName ?: attrs.release ?: "Unknown"
      def format = attrs.format?.toLowerCase()
      if (!format && fileName) {
        def ext = fileName.tokenize('.')[-1]?.toLowerCase()
        format = ext ?: "srt"
      }
      new SubtitlesResponse(
        subFileName: fileName,
        subDownloadLink: file?.fileId?.toString() ?: "", // Store file_id as download link for the download step
        languageName: attrs.language ?: "Unknown",
        subDownloadsCnt: attrs.downloadCount ?: 0,
        subFormat: format ?: "srt"
      )
    }.findAll { response ->
      // Filter to only SRT/VTT after conversion (most compatible formats)
      def fmt = response.subFormat?.toLowerCase()
      fmt == "srt" || fmt == "vtt" || fmt == "sub" || !fmt
    }.sort { -(it.subDownloadsCnt ?: 0) }
  }

  /**
   * Builds search URL with query parameters for the new API v1
   */
  def buildSearchUrl(String query, String subLanguageId, String season, String episode) {
    def baseUrl = grailsApplication.config.streama.opensubtitleUrl
    def params = []

    if (query) {
      params.add("query=${URLEncoder.encode(query, 'UTF-8')}")
    }
    if (subLanguageId) {
      params.add("languages=${subLanguageId}")
    }
    if (season) {
      params.add("season_number=${season}")
    }
    if (episode) {
      params.add("episode_number=${episode}")
    }

    def url = "${baseUrl}/subtitles"
    if (params) {
      url += "?" + params.join("&")
    }
    return url
  }

  /**
   * Builds search URL for hash-based search
   */
  def buildHashSearchUrl(String fileHash, Long fileSize) {
    def baseUrl = grailsApplication.config.streama.opensubtitleUrl
    def params = []

    if (fileHash) {
      params.add("moviehash=${fileHash}")
    }
    if (fileSize) {
      params.add("moviebytesize=${fileSize}")
    }

    def url = "${baseUrl}/subtitles"
    if (params) {
      url += "?" + params.join("&")
    }
    return url
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

  /**
   * Creates headers for API v1 requests with API key authentication
   */
  def createHeaders(String apiKey) {
    HttpHeaders headers = new HttpHeaders()
    headers.set("Api-Key", apiKey)
    headers.set("User-Agent", USER_AGENT)
    headers.setContentType(MediaType.APPLICATION_JSON)
    return headers
  }
}
