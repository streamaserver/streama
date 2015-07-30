'use strict';

streamaApp.factory('socketService', ['$rootScope', 'apiService', '$timeout', function ($rootScope, apiService, $timeout) {



  return {
    subscription: null,
    
    getUUID: function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    },
    
    registerPlayerSessonListener: function (projectSessionId) {
      var that = this;

      var urlBase = $('base').attr('href');

      var socket = new SockJS(urlBase + 'stomp');
      var client = Stomp.over(socket);


      client.connect({}, function() {
        that.subscription = client.subscribe("/topic/playerSession/" + projectSessionId, function(data) {
          $rootScope.$broadcast('playerSession', data);
        });
      });
    },

    unsubscribe: function () {
      if(this.subscription){
        this.subscription.unsubscribe();
      }
    }
  }
}]);
