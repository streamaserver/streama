package streama

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*
import org.springframework.security.access.annotation.Secured

@Secured('permitAll')
class ShareController {

  def springSecurityService
  def settingsService

  def show() {
    def mediaType = params.mediaType
    def id = params.long('id')

    if (!mediaType || !id) {
      render status: NOT_FOUND
      return
    }

    def media = null
    def result = [:]

    switch (mediaType) {
      case 'tvShow':
        TvShow tvShow = TvShow.get(id)
        if (!tvShow || tvShow.deleted) { render status: NOT_FOUND; return }
        def episodes = Episode.findAllByShowAndDeletedNotEqual(tvShow, true)
        def seasons = episodes.collect { it.season_number }.unique().sort()
        result = [
          mediaType: 'tvShow',
          id: tvShow.id,
          title: tvShow.name,
          overview: tvShow.overview,
          poster_path: tvShow.getPosterPath(500),
          backdrop_path: buildBackdropUrl(tvShow.backdrop_path),
          first_air_date: tvShow.first_air_date,
          vote_average: tvShow.vote_average,
          vote_count: tvShow.vote_count,
          imdb_id: tvShow.imdb_id,
          genre: tvShow.genre?.collect { [name: it.name] },
          original_language: tvShow.original_language,
          seasonCount: seasons.size(),
          episodeCount: episodes.size(),
          seasons: seasons.collect { seasonNum ->
            def seasonEps = episodes.findAll { it.season_number == seasonNum }
            [number: seasonNum, episodeCount: seasonEps.size()]
          }
        ]
        break

      case 'movie':
        Movie movie = Movie.get(id)
        if (!movie || movie.deleted) { render status: NOT_FOUND; return }
        def runtime = null
        try { runtime = movie.fullMovieMeta?.runtime } catch (e) {}
        result = [
          mediaType: 'movie',
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          poster_path: movie.getPosterPath(500),
          backdrop_path: buildBackdropUrl(movie.backdrop_path),
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          vote_count: movie.vote_count,
          imdb_id: movie.imdb_id,
          genre: movie.genre?.collect { [name: it.name] },
          original_language: movie.original_language,
          trailerKey: movie.trailerKey,
          runtime: runtime
        ]
        break

      default:
        render status: NOT_FOUND
        return
    }

    // Check auth status
    def currentUser = null
    try {
      currentUser = springSecurityService.currentUser
    } catch (e) {}

    result.isLoggedIn = (currentUser != null)
    result.appTitle = Settings.findByName('title')?.value ?: 'Streama'

    render(result as JSON)
  }

  private static String buildBackdropUrl(String path) {
    if (!path) return null
    // If it's a full TMDB URL, swap the size to w1920
    if (path.contains('image.tmdb.org')) {
      return path.replaceAll(/\/t\/p\/w\d+\//, '/t/p/w1920/')
    }
    // Relative path
    if (path.startsWith('/')) {
      return "https://image.tmdb.org/t/p/w1920${path}"
    }
    return path
  }

  def page() {
    def mediaType = params.mediaType
    def id = params.long('id')
    def appTitle = Settings.findByName('title')?.value ?: 'Streama'
    def logoSetting = Settings.findByName('logo')?.value ?: '/assets/logo.png'

    // Fetch media data server-side for OG meta tags
    def ogTitle = appTitle
    def ogDescription = ''
    def ogImage = ''
    def ogType = 'website'

    if (mediaType == 'tvShow' && id) {
      TvShow tvShow = TvShow.get(id)
      if (tvShow && !tvShow.deleted) {
        def episodeCount = Episode.countByShowAndDeletedNotEqual(tvShow, true)
        def seasonCount = Episode.findAllByShowAndDeletedNotEqual(tvShow, true).collect { it.season_number }.unique().size()
        ogTitle = "${tvShow.name} - ${appTitle}"
        ogDescription = tvShow.overview ?: "${tvShow.name} - ${seasonCount} Seasons, ${episodeCount} Episodes"
        ogImage = buildPosterUrl(tvShow.poster_path, tvShow.poster_image)
        ogType = 'video.tv_show'
      }
    } else if (mediaType == 'movie' && id) {
      Movie movie = Movie.get(id)
      if (movie && !movie.deleted) {
        def year = movie.release_date?.take(4) ?: ''
        ogTitle = "${movie.title}${year ? ' (' + year + ')' : ''} - ${appTitle}"
        ogDescription = movie.overview ?: "${movie.title} - Stream now on ${appTitle}"
        ogImage = buildPosterUrl(movie.poster_path, movie.poster_image)
        ogType = 'video.movie'
      }
    }

    // Truncate description for OG
    if (ogDescription.length() > 200) {
      ogDescription = ogDescription.take(197) + '...'
    }

    render(view: 'page', model: [
      mediaType: mediaType,
      mediaId: id,
      appTitle: appTitle,
      logoSetting: logoSetting,
      ogTitle: ogTitle,
      ogDescription: ogDescription,
      ogImage: ogImage,
      ogType: ogType
    ])
  }

  private static String buildPosterUrl(String path, File posterImage) {
    if (posterImage) return posterImage.src
    if (!path) return ''
    if (path.contains('image.tmdb.org')) {
      return path.replaceAll(/\/t\/p\/w\d+\//, '/t/p/w500/')
    }
    if (path.startsWith('/')) {
      return "https://image.tmdb.org/t/p/w500${path}"
    }
    return path
  }
}
