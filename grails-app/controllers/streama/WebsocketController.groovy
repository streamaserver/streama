package streama

import org.springframework.messaging.simp.SimpMessagingTemplate

import static org.springframework.http.HttpStatus.OK

class WebsocketController {

  SimpMessagingTemplate brokerMessagingTemplate

  
  def triggerPlayerAction() {
    def socketMessage = [:]
    String socketSessionId = params.socketSessionId
    socketMessage.playerAction = params.playerAction


    brokerMessagingTemplate.convertAndSend "/topic/playerSession/" + socketSessionId, socketMessage;

    render status: OK
  }

}
