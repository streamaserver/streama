package streama

class TvShow {

    Boolean deleted = false
    Date dateCreated
    Date lastUpdated
    
    String name
    String overview
    String apiId
    
    String backdrop_path
    String poster_path
    String first_air_date
    String original_language

    Double vote_average
    Integer vote_count
    Double popularity

    static hasMany = [episodes: Episode]

    static constraints = {
        name nullable: false
        overview size: 1..5000
    }
}
