package streama

class DashController {

    def searchMedia() {
      String query = params.query
      def movies = Movie.findAllByDeletedNotEqual(true)
      def shows = TvShow.findAllByDeletedNotEqual(true)


      def result = [
          shows:shows.findAll{it.name.toLowerCase().contains(query.toLowerCase())},
          movies:movies.findAll{it.title.toLowerCase().contains(query.toLowerCase())}
      ]
      respond result
    }
}
