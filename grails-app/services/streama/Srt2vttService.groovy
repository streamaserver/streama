package streama

import grails.transaction.Transactional

@Transactional
class Srt2vttService {

  enum State { Number, TimeStamp, Text };

  def convert(java.io.File srt) {
    String vtt = "WEBVTT\n\n";
    State state=State.Number;

    srt.eachLine{ line ->
      switch(state) {
        case State.Number:
          vtt += line+"\n";
          state=State.TimeStamp;
          break;
        case State.TimeStamp:
          vtt += line.replace(',', '.')+"\n";
          state=State.Text;
          break;
        case State.Text:
          vtt += line+"\n";
          if( line.length()==0)
            state=State.Number;
          break;
      }
    }

    return vtt
  }

//  public static void main(String[] args) throws IOException {
//
//    Srt2Vtt s2v = new Srt2Vtt();
//    s2v.convert(new FileReader("All the Presidents Men.srt"), new PrintWriter( System.out));
//
//
//  }
}
