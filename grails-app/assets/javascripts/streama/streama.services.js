//= wrapped

angular.module('streama').factory('$streamaPlayerCleanup', [
  '$window', '$timeout',
  function($window, $timeout) {

    var cleanupConfig = {
      verbose: false,
      timeout: 100
    };


    function log() {
      if (cleanupConfig.verbose && console) {
        console.log.apply(console, ['[streama-player-cleanup]'].concat(Array.prototype.slice.call(arguments)));
      }
    }

    function removeEventListeners(element) {
      if (!element) return;

      var clone = element.cloneNode(false);
      clone.removeAttribute('id');
      clone.removeAttribute('src');
      clone.load && clone.load();

      while (element.parentNode && element.parentNode.children.length > 0) {
        try {
          element.parentNode.replaceChild(clone, element.parentNode.lastChild);
        } catch (e) {
          break;
        }
      }
    }

    function clearMediaSource(element) {
      if (!element || !element.src) return;

      try {
        var oldSrc = element.src;
        element.removeAttribute('src');
        element.load && element.load();

        if ($window.URL && $window.URL.createObjectURL) {
          if (oldSrc && oldSrc.startsWith('blob:')) {
            $window.URL.revokeObjectURL(oldSrc);
          }
        }
      } catch (e) {
        log('Error clearing media source:', e);
      }
    }

    function pauseAndReset(element) {
      if (!element) return;

      try {
        element.pause();
        element.currentTime = 0;
        element.removeAttribute('src');
        element.load && element.load();
        element.poster = '';
      } catch (e) {
        log('Error pausing and resetting element:', e);
      }
    }

    function removeVideoElements(container) {
      if (!container) return;

      var videos = container.querySelectorAll ? container.querySelectorAll('video') : [];

      angular.forEach(videos, function(video) {
        pauseAndReset(video);
        clearMediaSource(video);
        removeEventListeners(video);
      });

      log('Removed', videos.length, 'video element(s)');
    }

    function clearSourceBufferExtension() {
      if (!HTMLMediaElement || !HTMLMediaElement.prototype) return;


      try {
        delete HTMLMediaElement.prototype.disconnect;
        delete HTMLMediaElement.prototype.connectMediaSource;
      } catch (e) {
        log('Could not clear source buffer extension:', e);
      }
    }

    function forceCleanup(container) {
      log('Starting force cleanup');

      removeVideoElements(container || document.body);

      clearSourceBufferExtension();

      $timeout(function() {
        log('Force cleanup completed');
      }, cleanupConfig.timeout);
    }

    function setVerbose(mode) {
      cleanupConfig.verbose = !!mode;
    }

    return {
      forceCleanup: forceCleanup,
      setVerbose: setVerbose,
      pauseAndReset: pauseAndReset,
      clearMediaSource: clearMediaSource,
      removeEventListeners: removeEventListeners
    };
  }
]);
