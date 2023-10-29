package streama

import grails.transaction.Transactional
import java.security.SecureRandom

@Transactional
class MediaService {

  def getFirstEpisode(TvShow tvShow) {
    Episode firstEpisode = tvShow.episodes?.find { it.videoFiles && it.season_number != '0' }

    tvShow.episodes.each { Episode episode ->
      if ((episode.season_number == firstEpisode?.season_number) && (episode.episode_number < firstEpisode?.episode_number) && episode.videoFiles) {
        firstEpisode = episode
      }
      else if (episode.season_number < firstEpisode?.season_number && episode.videoFiles && episode.season_number != '0') {
        firstEpisode = episode
      }
    }

    if (firstEpisode && firstEpisode.videoFiles) {
      return firstEpisode
    }
  }

  def getRandomEpisode(TvShow tvShow) {
    List<Episode> episodesWithFiles = tvShow.listEpisodesWithFiles()
    List<Long> episodeIds = episodesWithFiles*.id
    Integer randomNum = new SecureRandom().nextInt(episodeIds?.size())
    return episodesWithFiles.find{it.id == episodeIds.getAt(randomNum-1)}
  }

}
