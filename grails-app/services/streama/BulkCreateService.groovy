package streama

import grails.transaction.NotTransactional
import grails.transaction.Transactional

import java.util.regex.Matcher
import java.util.regex.Pattern

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
    CREATED: 3,
    LIMIT_REACHED: 4,
    EXISTING_FOR_SUBTITLE: 5,
    SUBTITLE_MATCH: 6,
    SUBTITLE_ADDED: 7
  ]
  final static STREAMA_ROUTES = [
    movie: 'movie',
    tv: 'show',
    episode: 'show'
  ]


  def matchMetaDataFromFiles(files) {
    def regexConfig = grailsApplication.config.streama?.regex


    def movieRegex = regexConfig?.movies ?: STD_MOVIE_REGEX
	def movieRegexList = movieRegex instanceof List ? movieRegex : [movieRegex]
    def tvShowRegex = regexConfig?.shows ?: STD_TVSHOW_REGEX
    def tvShowRegexList = tvShowRegex instanceof List ? tvShowRegex : [tvShowRegex]

    def result = []

    files.each { file ->
      def fileResult = matchSingleFile(file, movieRegexList, tvShowRegexList)
      result.add(fileResult)
    }

    return result
  }

  private matchSingleFile(file, List<Pattern> movieRegexList, List<Pattern> tvShowRegexList) {
    def fileResult = [file: file.path]
    def foundMatch = false

    String fileName = file.name

    foundMatch = tvShowRegexList.any{ tvShowRegex ->
      def tvShowMatcher = fileName =~ '(?i)' + tvShowRegex

      if (tvShowMatcher.matches()) {
        matchTvShowFromFile(tvShowMatcher, fileResult)
        return true
      }
    }

    if(foundMatch){
      return fileResult
    }

	foundMatch = movieRegexList.any { movieRegex ->
		def movieMatcher = fileName =~ '(?i)' + movieRegex
		
		if (movieMatcher.matches()) {
			matchMovieFromFile(movieMatcher, fileResult, movieRegex)
			return true
			return fileResult
		}
	}
	
	if (foundMatch) {
		return fileResult
	}

    fileResult.status = MATCHER_STATUS.NO_MATCH
    fileResult.message = 'No match found'
    return fileResult
  }


  private void matchMovieFromFile(Matcher movieMatcher, LinkedHashMap<String, Object> fileResult, movieRegex) {
    def name = movieMatcher.group('Name').replaceAll(/[._]/, " ")
    def year = movieRegex.contains('<Year>') ? movieMatcher.group('Year') : null
    def type = "movie"
    Boolean isSubtitle = VideoHelper.isSubtitleFile(fileResult.file)

    try {
      def json = theMovieDbService.searchForEntry(type, name, year)
      def movieDbResults = json?.results

      if (movieDbResults) {
        fileResult.message = 'match found'
        fileResult.status = MATCHER_STATUS.MATCH_FOUND

        def movieId = movieDbResults.id[0]

        def movieResult = theMovieDbService.getFullMovieMeta(movieId)
        Movie existingMovie = Movie.findByApiIdAndDeletedNotEqual(movieResult.id, true)
        if(existingMovie){
          if(isSubtitle){
            fileResult.status = MATCHER_STATUS.EXISTING_FOR_SUBTITLE
          }else{
            fileResult.status = MATCHER_STATUS.EXISTING
          }
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
      } else {
        fileResult.message = 'no found'
        fileResult.status = MATCHER_STATUS.NO_MATCH
      }
    } catch (Exception ex) {
      log.error("Error occured while trying to retrieve data from TheMovieDB. Please check your API-Key.", ex)
      fileResult.status = MATCHER_STATUS.LIMIT_REACHED
      fileResult.errorMessage = ex.message
      fileResult.title = name
    }
    if(fileResult.status == MATCHER_STATUS.MATCH_FOUND && isSubtitle){
      fileResult.status = MATCHER_STATUS.SUBTITLE_MATCH
    }
    fileResult.type = type
  }


  private void matchTvShowFromFile(Matcher tvShowMatcher, LinkedHashMap<String, Object> fileResult) {
    def name = tvShowMatcher.group('Name').replaceAll(/[._]/, " ")
    def seasonNumber = tvShowMatcher.group('Season').toInteger()
    def episodeNumber = tvShowMatcher.group('Episode').toInteger()
    def type = "tv"
    Boolean isSubtitle = VideoHelper.isSubtitleFile(fileResult.file)
    fileResult.type = type
    try {
      TvShow existingTvShow
      def tvShowData
      def tvShowId

      def json = theMovieDbService.searchForEntry(type, name)
      tvShowData = json?.results[0]
      tvShowId = tvShowData.id
      existingTvShow = TvShow.findByApiIdAndDeletedNotEqual(tvShowId, true)

      fileResult.tvShowOverview = tvShowData.overview
      fileResult.tvShowId = tvShowId
      fileResult.showName = tvShowData.name
      fileResult.poster_path = tvShowData.poster_path
      fileResult.backdrop_path = tvShowData.backdrop_path
      fileResult.status = MATCHER_STATUS.MATCH_FOUND
      if(!seasonNumber && !episodeNumber){
        if(existingTvShow){
          if(isSubtitle){
            fileResult.status = MATCHER_STATUS.EXISTING_FOR_SUBTITLE
          }else{
            fileResult.status = MATCHER_STATUS.EXISTING
          }
          fileResult.importedId = existingTvShow.id
          fileResult.importedType = STREAMA_ROUTES[type]
        }
        fileResult.apiId = tvShowId
      } else {
        fileResult = extractDataForEpisode(existingTvShow, seasonNumber, episodeNumber, fileResult, tvShowId)
        fileResult.season = seasonNumber
        fileResult.episodeNumber = episodeNumber
      }
      fileResult.message = 'match found'
    } catch (ex) {
      log.error("Error occured while trying to retrieve data from TheMovieDB. Please check your API-Key.", ex)
      fileResult.status = MATCHER_STATUS.LIMIT_REACHED
      fileResult.errorMessage = ex.message
      fileResult.name = name
    }
    if(fileResult.status == MATCHER_STATUS.MATCH_FOUND && isSubtitle){
      fileResult.status = MATCHER_STATUS.SUBTITLE_MATCH
    }
  }

  private extractDataForEpisode(TvShow existingTvShow, seasonNumber, episodeNumber, fileResult, tvShowId) {
    fileResult.type = 'episode'
    Boolean isSubtitle = VideoHelper.isSubtitleFile(fileResult.file)
    Episode existingEpisode

    if (existingTvShow) {
      existingEpisode = Episode.where {
        show == existingTvShow
        season_number == seasonNumber
        episode_number == episodeNumber
        deleted != true
      }.get()
    }

    if (existingEpisode) {
      fileResult.status = isSubtitle ? MATCHER_STATUS.EXISTING_FOR_SUBTITLE : MATCHER_STATUS.EXISTING
      fileResult.importedId = existingEpisode.showId
      fileResult.importedType = STREAMA_ROUTES[fileResult.type]
      fileResult.apiId = existingEpisode.apiId
    }
    else {
      def episodeResult = theMovieDbService.getEpisodeMeta(tvShowId, seasonNumber, episodeNumber)
      existingEpisode = Episode.findByApiIdAndDeletedNotEqual(episodeResult.id, true)
      if (existingEpisode) {
        fileResult.status = isSubtitle ? MATCHER_STATUS.EXISTING_FOR_SUBTITLE : MATCHER_STATUS.EXISTING
        fileResult.importedId = existingEpisode.showId
        fileResult.importedType = STREAMA_ROUTES[fileResult.type]
      }

      fileResult.apiId = episodeResult.id
      fileResult.episodeName = episodeResult.name
      fileResult.first_air_date = episodeResult.air_date
      fileResult.episodeOverview = episodeResult.overview
      fileResult.still_path = episodeResult.still_path
    }
    return fileResult
  }


  @NotTransactional
  def bulkAddMediaFromFile(List<Map> fileMatchers){
    def result = []
    List<Map> videoFiles = fileMatchers.findAll{!VideoHelper.isSubtitleFile(it.file)}
    List<Map> subtitleFiles = fileMatchers.findAll{VideoHelper.isSubtitleFile(it.file)}

    videoFiles.each{ fileMatcher ->
      String type = fileMatcher.type
      def entity
      if(fileMatcher.status == MATCHER_STATUS.EXISTING){
        return
      }

      try{
        entity = theMovieDbService.createEntityFromApiId(type, fileMatcher.apiId, fileMatcher)
      }catch (e){
        log.error(e.message)
      }
      if(!entity){
        fileMatcher.status = MATCHER_STATUS.LIMIT_REACHED
        result.add(fileMatcher)
        return
      }
      if(entity instanceof Video){
        entity.addLocalFile(fileMatcher.file)
      }

      log.debug("creating entity of type ${entity.getClass().canonicalName} with id ${entity.id}")

      fileMatcher.status = MATCHER_STATUS.CREATED
      fileMatcher.importedId = entity instanceof Episode ? entity.showId : entity.id
      fileMatcher.importedType = STREAMA_ROUTES[type]
      result.add(fileMatcher)
    }

    subtitleFiles.each{ fileMatcher ->
      String type = fileMatcher.type
      Video videoInstance

      if(type == 'movie'){
        videoInstance = Movie.findByApiIdAndDeletedNotEqual(fileMatcher.apiId, true)
      }
      else if(type == 'episode'){
        videoInstance = Episode.findByApiIdAndDeletedNotEqual(fileMatcher.apiId, true)
      }

      if(!videoInstance){
        log.error("no video found for subtitle")
        return
      }
      videoInstance.addLocalFile(fileMatcher.file)

      fileMatcher.status = MATCHER_STATUS.SUBTITLE_ADDED
      fileMatcher.importedId = videoInstance instanceof Episode ? videoInstance.showId : videoInstance.id
      fileMatcher.importedType = STREAMA_ROUTES[type]
      result.add(fileMatcher)
    }

    return result
  }
}
