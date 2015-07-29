package streama

import grails.transaction.Transactional

@Transactional
class ThetvdbService {


    def API_TOKEN = "2D08531BD9DE5B1C"
    def BASE_PATH_GRAPHICS = "http://thetvdb.com/banners/"
    def BASE_PATH = "http://thetvdb.com/api/"
    def BY_NAME = [
        show: "GetSeries.php?seriesname=",
        movie: "GetSeries.php?seriesname="
    ]
    def FETCH = [
        show: "series",
        movie: "movies"
    ]
    
    
    def fetchEpisodesForShow(showId){
        def episodeXml = new URL( BASE_PATH + API_TOKEN + "/" + FETCH.show + "/" + showId + "/all/en.xml").text;
        def response = new XmlSlurper().parseText(episodeXml)
        def episodes = []

        response.childNodes().each{
            def episode = [:]

            if(it.name() != "Episode"){
                return;
            }

            it.childNodes().each{
                episode[it.name().toLowerCase()] = it.text()
            }
            episodes.add(episode)
        }  
        
        return episodes
    }
}
