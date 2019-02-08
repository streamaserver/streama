package streama

import groovy.json.JsonSlurper

import java.util.zip.GZIPInputStream

class SubtitleApiService {

  def settingsService

  static String BASE_URL = 'https://rest.opensubtitles.org/search/'

  def search(Map options){
    List optionsList = []

    if(options.episode){
      optionsList.add("eposide-${options.episode}")
    }
    if(options.movieByteSize){
      optionsList.add("moviebytesize-${options.movieByteSize}")
    }
    if(options.hash){
      optionsList.add("moviehash-${options.hash}")
    }
    if(options.query){
      String encodedQuery = URLEncoder.encode(options.query, "UTF-8")
      optionsList.add("query-${encodedQuery.toLowerCase()}")
    }
    if(options.season){
      optionsList.add("season-${options.season}")
    }
    if(options.language){
      optionsList.add("sublanguageid-${options.language}")
    }
    String urlString = optionsList.join('/')

    URL url = new URL(BASE_URL + urlString)
    String userAgentSettings = settingsService.getValueForName('open_subtitles_user_agent')
    HttpURLConnection conn = url.openConnection()
    conn.setRequestProperty("User-Agent", userAgentSettings)
    def jsonResult = conn.getInputStream().getText('UTF-8')
    def result = new JsonSlurper().parseText(jsonResult)
    return result
  }


  def downloadSubtitle(subtitleData){
    URL url = new URL(subtitleData.SubDownloadLink)
    String gzName = subtitleData.SubDownloadLink.split('/').takeRight(1)
    String srtName = subtitleData.SubFileName
    URLConnection con = url.openConnection()
    BufferedInputStream inputStreamm = new BufferedInputStream(con.getInputStream())
    FileOutputStream fileOutputStream = new FileOutputStream(gzName)

    Integer i
    byte[] bytesIn = new byte[3000000]
    while ((i = inputStreamm.read(bytesIn)) >= 0) {
      fileOutputStream.write(bytesIn, 0, i)
    }
    fileOutputStream.close()
    inputStreamm.close()
    gunzipIt(inputStreamm, srtName)
  }


  private static void gunzipIt(BufferedInputStream bufferedInputStream, String outputName){

    byte[] buffer = new byte[1024]

    try{

      GZIPInputStream gzis = new GZIPInputStream(bufferedInputStream)
      FileOutputStream out = new FileOutputStream(outputName)

      int len
      while ((len = gzis.read(buffer)) > 0) {
        out.write(buffer, 0, len)
      }

      gzis.close()
      out.close()

    }catch(IOException ex){
      ex.printStackTrace()
    }
  }

}
