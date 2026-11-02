package streama

import com.fasterxml.jackson.databind.PropertyNamingStrategy
import com.fasterxml.jackson.databind.annotation.JsonNaming

@JsonNaming(PropertyNamingStrategy.UpperCamelCaseStrategy.class)
class SubtitlesResponse {

  String subFileName

  String subDownloadLink

  String languageName

  Long subDownloadsCnt

  String subFormat
}
