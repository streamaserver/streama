package streama

import grails.transaction.Transactional

import java.util.regex.Matcher

@Transactional
class BulkCreateService {

  def grailsApplication
  def theMovieDbService

  final static STD_MOVIE_REGEX = /^(?<Name>.*)[_.]\(\d{4}\).*/
  final static STD_TVSHOW_REGEX = /^(?<Name>.+)[._]S(?<Season>\d{2})E(?<Episode>\d{2,3}).*/
  final static MATCHER_STATUS = [
    NO_MATCH: 0,
    MATCH_FOUND: 1,
    EXISTING: 2,
    CREATED: 3
  ]
  final static STREAMA_ROUTES = [
    movie: 'movie',
    tv: 'show',
    episode: 'show'
  ]


  def matchMetaDataFromFiles(files) {
    def regexConfig = grailsApplication.config.streama?.regex


    def movieRegex = regexConfig?.movies ?: STD_MOVIE_REGEX
    def tvShowRegex = regexConfig?.shows ?: STD_TVSHOW_REGEX

    def result = []

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
      fileResult.status = MATCHER_STATUS.NO_MATCH
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

        Movie existingMovie = Movie.findByApiIdAndDeletedNotEqual(movieResult.id, true)
        if(existingMovie){
          fileResult.status = MATCHER_STATUS.EXISTING
          fileResult.importedId = existingMovie.id
          fileResult.importedType = STREAMA_ROUTES[type]
        }
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
    fileResult.status = fileResult.status ?: MATCHER_STATUS.MATCH_FOUND
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

        if(!seasonNumber && !episodeNumber){
          TvShow existingTvShow = TvShow.findByApiIdAndDeletedNotEqual(tvShowId, true)
          if(existingTvShow){
            fileResult.status = MATCHER_STATUS.EXISTING
            fileResult.importedId =existingTvShow.id
            fileResult.importedType = STREAMA_ROUTES[type]
          }
          fileResult.apiId = tvShowId
        }


        fileResult.tvShowOverview = movieDbResults.overview[0]
        fileResult.tvShowId = tvShowId
        fileResult.showName = movieDbResults.name[0]
        fileResult.poster_path = movieDbResults.poster_path[0]
        fileResult.backdrop_path = movieDbResults.backdrop_path[0]

        if(seasonNumber && episodeNumber){
          type = 'episode'
          def episodeResult = theMovieDbService.getEpisodeMeta(tvShowId, seasonNumber, episodeNumber)
          Episode existingEpisode = Episode.findByApiIdAndDeletedNotEqual(episodeResult.id, true)
          if(existingEpisode){
            fileResult.status = MATCHER_STATUS.EXISTING
            fileResult.importedId =existingEpisode.showId
            fileResult.importedType = STREAMA_ROUTES[type]
          }

          fileResult.apiId = episodeResult.id
          fileResult.episodeName = episodeResult.name
          fileResult.first_air_date = episodeResult.air_date
          fileResult.episodeOverview = episodeResult.overview
          fileResult.still_path = episodeResult.still_path
        }
      }
    } catch (Exception ex) {
      log.error("Error occured while trying to retrieve data from TheMovieDB. Please check your API-Key.")
      fileResult.name = name
    }
    fileResult.status = fileResult.status ?: MATCHER_STATUS.MATCH_FOUND
    fileResult.message = 'match found'
    fileResult.type = type
    fileResult.season = seasonNumber
    fileResult.episodeNumber = episodeNumber
  }


  def bulkAddMediaFromFile(List<Map> fileMatchers){
    def result = []
    fileMatchers.each{ fileMatcher ->
      String type = fileMatcher.type
      if(fileMatcher.status == MATCHER_STATUS.EXISTING){
        return
      }

      def entity = theMovieDbService.createEntityFromApiId(type, fileMatcher.apiId, fileMatcher)
      if(entity instanceof Video){
        entity.addLocalFile(fileMatcher.file)
      }
      fileMatcher.status = MATCHER_STATUS.CREATED
      fileMatcher.importedId = entity instanceof Episode ? entity.showId : entity.id
      fileMatcher.importedType = STREAMA_ROUTES[type]
      result.add(fileMatcher)
    }

    return result
  }
}
