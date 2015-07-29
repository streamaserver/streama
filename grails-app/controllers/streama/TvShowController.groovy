package streama

import grails.converters.JSON

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class TvShowController {

    def thetvdbService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST",  delete: "DELETE"]

    def index() {
        JSON.use('fullShow'){
            respond TvShow.findAllByDeletedNotEqual(true), [status: OK]
        }
    }

    @Transactional
    def save() {
        def data = request.JSON
        data.fanart = thetvdbService.BASE_PATH_GRAPHICS + data.fanart
        
        if (data == null) {
            render status: NOT_FOUND
            return
        }
        
        TvShow tvShowInstance = new TvShow()
        tvShowInstance.properties = data

        tvShowInstance.validate()
        if (tvShowInstance.hasErrors()) {
            render status: NOT_ACCEPTABLE
            return
        }

        tvShowInstance.save flush:true
        respond tvShowInstance, [status: CREATED]
    }
    
    def show(TvShow tvShowInstance){
        JSON.use('fullShow'){
            respond tvShowInstance, [status: OK]
        }
    }

    def episodesForTvShow(TvShow tvShowInstance){
        respond Episode.findAllByShow(tvShowInstance), [status: OK]
    }

    @Transactional
    def delete(TvShow tvShowInstance) {

        if (tvShowInstance == null) {
            render status: NOT_FOUND
            return
        }
        
        tvShowInstance.deleted = true
        tvShowInstance.save flush: true, failOnError: true

        render status: NO_CONTENT
    }

    @Transactional
    def fetchAndCreateAllEpisodes(TvShow tvShowInstance) {

        if (tvShowInstance == null) {
            render status: NOT_FOUND
            return
        }

        def episodes = thetvdbService.fetchEpisodesForShow(tvShowInstance.seriesid)
        def savedEpisodes = []
        
        episodes.each{ episode ->
            def episodeString = "s" + episode.seasonnumber.padLeft(2, '0') + "e" + episode.episodenumber.padLeft(2, '0')
            def existingEpisode = Video.findByTypeAndShowAndEpisodeString('Episode', tvShowInstance, episodeString)
            if(!existingEpisode){
                def video = new Video()         
                video.properties = episode
                if(episode.filename){
                    video.image = thetvdbService.BASE_PATH_GRAPHICS + episode.filename
                }
                video.episodeString = episodeString
                video.name = episode.episodename
                video.episodeId = episode.id
                video.show = tvShowInstance
                video.type = 'Episode'

                video.save failOnError: true
                savedEpisodes.add(video)
            }else{
                savedEpisodes.add(existingEpisode)
            } 
        }

        respond savedEpisodes
    }
}
