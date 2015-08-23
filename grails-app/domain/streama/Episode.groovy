package streama

class Episode extends Video{

  String name
  String air_date
  int season_number
  int episode_number
  String episodeString
  
  String still_path

  TvShow show
  
  static constraints = {
  }

  static mapping = {
    cache true
    show cache: true
  }
  
  def beforeUpdate(){
    episodeString = "s" + season_number.toString().padLeft(2, '0') + "e" + episode_number.toString().padLeft(2, '0')

  }
}
