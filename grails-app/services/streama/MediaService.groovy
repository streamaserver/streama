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
      elseif (episode.season_number < firstEpisode?.season_number && episode.videoFiles && episode.season_number != '0') {
        firstEpisode = episode
      }
    }

    if (firstEpisode && firstEpisode.videoFiles) {
      return firstEpisode
    }
  }

  def getRandomEpisode(TvShow tvShow) {
    Integer r = new SecureRandom().nextInt(this.episodes?.size())
    Episode randomEpisode = Episode.createCriteria().setFirstResult(r).setMaxResults(1).uniqueResult()
    if (randomEpisode && randomEpisode.videoFiles) {
      return randomEpisode
    }
  }

}
