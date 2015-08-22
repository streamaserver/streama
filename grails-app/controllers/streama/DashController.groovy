package streama

class DashController {

    def searchMedia() {
      String query = params.query
      def movies = Movie.list()
      def shows = TvShow.list()


      def result = [
          shows:shows.findAll{it.name.toLowerCase().contains(query.toLowerCase())},
          movies:movies.findAll{it.title.toLowerCase().contains(query.toLowerCase())}
      ]
      respond result
    }
}
