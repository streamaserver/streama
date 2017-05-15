package streama

import grails.transaction.Transactional

import java.util.regex.Matcher

@Transactional
class BulkCreateService {

  def grailsApplication
  def theMovieDbService

  final static STD_MOVIE_REGEX = /^(?<Name>.*)[_.]\(\d{4}\).*/
  final static STD_TVSHOW_REGEX = /^(?<Name>.+)[._]S(?<Season>\d{2})E(?<Episode>\d{2,3}).*/


  def matchMetaDataFromFiles(files) {
    def config = grailsApplication.config

    def isMovieConfigAvailable = config.containsProperty("Movies.regex")
    def isTvShowConfigAvailable = config.containsProperty("Shows.regex")

    def movieRegex = isMovieConfigAvailable ?
        config.getProperty("Movies.regex") : STD_MOVIE_REGEX
    def tvShowRegex = isTvShowConfigAvailable ?
        config.getProperty("Shows.regex") : STD_TVSHOW_REGEX

    def result = []
    log.debug(files)

    files.each { file ->
      def fileResult = matchSingleFile(file, movieRegex, tvShowRegex)
      result.add(fileResult)
    }

    return result
  }

  private matchSingleFile(file, movieRegex, tvShowRegex) {
    def fileResult = [file: file.path]

    String fileName = file.name
    def tvShowMatcher = fileName =~ tvShowRegex
    def movieMatcher = fileName =~ movieRegex

    if (tvShowMatcher.matches()) {
      matchTvShowFromFile(tvShowMatcher, fileResult)
    } else if (movieMatcher.matches()) {
      matchMovieFromFile(movieMatcher, fileResult)
    } else {
      fileResult.status = 0
      fileResult.message = 'No match found'
    }

    return fileResult
  }


  private void matchMovieFromFile(Matcher movieMatcher, LinkedHashMap<String, Object> fileResult) {
    def name = movieMatcher.group('Name').replaceAll(/[._]/, " ")
    def type = "movie"

    try {
      def json = theMovieDbService.searchForEntry(type, name)
      def movieDbResults = json?.results

      if (movieDbResults) {
        def movieId = movieDbResults.id[0]

        def movieResult = theMovieDbService.getFullMovieMeta(movieId)

        fileResult.apiId = movieResult.id
        fileResult.overview = movieResult.overview
        fileResult.release_date = movieResult.release_date
        fileResult.title = movieResult.title
        fileResult.poster_path = movieResult.poster_path
        fileResult.backdrop_path = movieResult.backdrop_path
        fileResult.genres = movieResult.genres
      }
    } catch (Exception ex) {
      log.error("Error occured while trying to retrieve data from TheMovieDB. Please check your API-Key.")
      fileResult.title = name
    }
    fileResult.status = 1
    fileResult.message = 'match found'
    fileResult.type = type
  }


  private void matchTvShowFromFile(Matcher tvShowMatcher, LinkedHashMap<String, Object> fileResult) {
    def name = tvShowMatcher.group('Name').replaceAll(/[._]/, " ")
    def seasonNumber = tvShowMatcher.group('Season').toInteger()
    def episodeNumber = tvShowMatcher.group('Episode').toInteger()
    def type = "tv"

    try {
      def json = theMovieDbService.searchForEntry(type, name)
      def movieDbResults = json?.results

      if (movieDbResults) {
        // Why do i need to access index 0? Worked just fine without before extracting to service
        def tvShowId = movieDbResults.id[0]

        def episodeResult = theMovieDbService.getEpisodeMeta(tvShowId, seasonNumber, episodeNumber)

        fileResult.tvShowApiId = tvShowId
        fileResult.tvShowOverview = movieDbResults.overview[0]
        fileResult.showName = movieDbResults.name[0]
        fileResult.poster_path = movieDbResults.poster_path[0]
        fileResult.backdrop_path = movieDbResults.backdrop_path[0]

        fileResult.episodeName = episodeResult.name
        fileResult.first_air_date = episodeResult.air_date
        fileResult.episodeApiId = episodeResult.id
        fileResult.episodeOverview = episodeResult.overview
        fileResult.still_path = episodeResult.still_path
      }
    } catch (Exception ex) {
      log.error("Error occured while trying to retrieve data from TheMovieDB. Please check your API-Key.")
      fileResult.name = name
    }
    fileResult.status = 1
    fileResult.message = 'match found'
    fileResult.type = type
    fileResult.season = seasonNumber
    fileResult.episodeNumber = episodeNumber
  }
}
