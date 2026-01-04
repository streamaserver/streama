package streama

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.databind.PropertyNamingStrategy
import com.fasterxml.jackson.databind.annotation.JsonNaming

/**
 * Response wrapper for OpenSubtitles API v1 search results
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
class OpenSubtitlesApiResponse {
  Integer totalPages
  Integer totalCount
  Integer perPage
  Integer page
  List<OpenSubtitlesSubtitle> data
}

/**
 * Individual subtitle entry from search results
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
class OpenSubtitlesSubtitle {
  String id
  String type
  OpenSubtitlesAttributes attributes
}

/**
 * Subtitle attributes containing metadata and files
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
class OpenSubtitlesAttributes {
  String subtitleId
  String language
  Integer downloadCount
  String release
  List<OpenSubtitlesFile> files
  String format
}

/**
 * File entry containing the file_id needed for download
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
class OpenSubtitlesFile {
  Long fileId
  String fileName
}

/**
 * Response from the download endpoint
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
class OpenSubtitlesDownloadResponse {
  String link
  String fileName
  Integer requests
  Integer remaining
  String message
  String resetTime
  String resetTimeUtc
}
