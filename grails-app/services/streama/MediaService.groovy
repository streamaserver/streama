package streama

import grails.transaction.Transactional

@Transactional
class MediaService {

  def getFirstEpisode(TvShow tvShow) {
    Episode firstEpisode = tvShow.episodes?.find{it.files && it.season_number != "0"}

    tvShow.episodes.each{ Episode episode ->
      if((episode.season_number == firstEpisode?.season_number) && (episode.episode_number < firstEpisode?.episode_number) && episode.files){
        firstEpisode = episode
      }
      else if(episode.season_number < firstEpisode?.season_number && episode.files && episode.season_number != "0"){
        firstEpisode = episode
      }
    }

    if(firstEpisode && firstEpisode.files){
      return firstEpisode
    }
  }
}
