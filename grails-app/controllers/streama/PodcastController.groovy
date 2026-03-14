package streama

import grails.converters.JSON
import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class PodcastController {

  static responseFormats = ['json', 'xml']
  static allowedMethods = [save: "POST", delete: "DELETE"]

  def index() {
    def max = params.int('max', 50)
    def offset = params.int('offset', 0)
    def sort = params.sort ?: 'title'
    def order = params.order ?: 'ASC'

    def podcasts = Podcast.findAllByDeletedNotEqual(true, [max: max, offset: offset, sort: sort, order: order])
    def total = Podcast.countByDeletedNotEqual(true)

    render([records: podcasts.collect { marshalPodcast(it) }, total: total] as JSON)
  }

  def show() {
    Podcast podcast = Podcast.get(params.id)
    if (!podcast) {
      render status: NOT_FOUND
      return
    }
    render(marshalPodcastFull(podcast) as JSON)
  }

  @Transactional
  def save() {
    def data = request.JSON

    Podcast podcast = data.id ? Podcast.get(data.id) : new Podcast()
    if (!podcast) {
      render status: NOT_FOUND
      return
    }

    podcast.title = data.title
    podcast.host = data.host
    podcast.overview = data.overview
    if (data.cover_image) {
      podcast.cover_image = File.get(data.cover_image)
    }
    if (data.genre) {
      podcast.genre?.clear()
      data.genre.each { g ->
        def genre = Genre.get(g.id ?: g)
        if (genre) podcast.addToGenre(genre)
      }
    }

    podcast.deleted = false
    podcast.validate()

    if (podcast.hasErrors()) {
      render status: NOT_ACCEPTABLE
      return
    }

    podcast.save flush: true
    render(marshalPodcastFull(podcast) as JSON)
  }

  @Transactional
  def delete() {
    Podcast podcast = Podcast.get(params.id)
    if (!podcast) {
      render status: NOT_FOUND
      return
    }

    podcast.deleted = true
    podcast.save flush: true

    podcast.episodes?.each { track ->
      track.deleted = true
      track.save flush: true
    }

    render status: NO_CONTENT
  }

  private Map marshalPodcast(Podcast podcast) {
    return [
      id: podcast.id,
      mediaType: 'podcast',
      title: podcast.title,
      host: podcast.host,
      cover_path: podcast.coverPath,
      cover_image_src: podcast.cover_image?.src,
      genre: podcast.genre,
      episodeCount: podcast.episodeCount,
      dateCreated: podcast.dateCreated,
      lastUpdated: podcast.lastUpdated
    ]
  }

  private Map marshalPodcastFull(Podcast podcast) {
    def episodes = AudioTrack.findAllByPodcastAndDeletedNotEqual(podcast, true, [sort: 'trackNumber', order: 'DESC'])
    def result = marshalPodcast(podcast)
    result.overview = podcast.overview
    result.episodes = episodes.collect { marshalTrack(it) }
    return result
  }

  private Map marshalTrack(AudioTrack track) {
    return [
      id: track.id,
      title: track.title,
      artist: track.artist,
      trackNumber: track.trackNumber,
      duration: track.duration,
      durationDisplay: track.durationDisplay,
      hasFiles: track.hasFiles(),
      files: track.files?.collect { [id: it.id, src: it.src, originalFilename: it.originalFilename, extension: it.extension] },
      dateCreated: track.dateCreated
    ]
  }
}
