package streama

import grails.transaction.Transactional

@Transactional
class MediaService {

  def getFirstEpisode(TvShow tvShow) {
    Episode firstEpisode = tvShow.episodes?.find{it.getVideoFiles() && it.season_number != "0"}

    tvShow.episodes.each{ Episode episode ->
      if((episode.season_number == firstEpisode?.season_number) && (episode.episode_number < firstEpisode?.episode_number) && episode.getVideoFiles()){
        firstEpisode = episode
      }
      else if(episode.season_number < firstEpisode?.season_number && episode.getVideoFiles() && episode.season_number != "0"){
        firstEpisode = episode
      }
    }

    if(firstEpisode && firstEpisode.getVideoFiles()){
      return firstEpisode
    }
  }
}
