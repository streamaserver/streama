package streama

import static org.springframework.http.HttpStatus.*



class ThetvdbController {

  def thetvdbService

  def fetchByName() {
    String type = params.type
    String showName = params.name

    def xmlContent = new URL( thetvdbService.BASE_PATH + thetvdbService.BY_NAME[type] + URLEncoder.encode(showName, "UTF-8") ).text;
    def response = new XmlSlurper().parseText(xmlContent)

    def thetvdbSeries = []

    response.childNodes().each{
      def series = [:]
      it.childNodes().each{
        series[it.name().toLowerCase()] = it.text()
      }
      thetvdbSeries.add(series)
    }

    respond thetvdbSeries
  }
  
  
  def fetchById(){
    String type = params.type
    String id = params.id


    if(!id){
      render status: NOT_ACCEPTABLE
      return
    }

    def showXml = new URL( thetvdbService.BASE_PATH + thetvdbService.API_TOKEN + "/" + thetvdbService.FETCH[type] + "/" + id).text;
    def bannerXML = new URL( thetvdbService.BASE_PATH + thetvdbService.API_TOKEN + "/" + thetvdbService.FETCH[type] + "/" + id + "/banners.xml").text;
    def response = new XmlSlurper().parseText(showXml)
    def responseBanners = new XmlSlurper().parseText(bannerXML)

    def thetvdbData = [:]
    def banners = []

    response.Series.childNodes().each{
      thetvdbData[it.name().toLowerCase()] = it.text()
    }

    responseBanners.childNodes().each{
      def banner = [:]
      it.childNodes().each{
        banner[it.name().toLowerCase()] = it.text()
      }
      banners.add(banner)
    }

    def jsonResponse = [series: thetvdbData, banners: banners]
    respond jsonResponse
  }

  
  def searchEpisodes(){
    String query = params.query
    String showId = params.showId

    def episodes = thetvdbService.fetchEpisodesForShow(showId)

    episodes = episodes.findAll{
      def seasonString = "s" + it.seasonnumber.padLeft(2, '0') + "e" + it.episodenumber.padLeft(2, '0')
      def foundName = (it.episodename.toLowerCase().indexOf(query.toLowerCase()) > -1)
      def foundEpisode = (seasonString.toLowerCase().indexOf(query.toLowerCase()) > -1)
      
      return (foundName || foundEpisode)
    }
    
    respond episodes

  }
}
