
// Send message to service worker
function sendMessage(message) {
  if (!chrome.runtime.lastError) {
    chrome.runtime.sendMessage(message, function () {
      void chrome.runtime.lastError;
    });
  }
}

function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

// Register with the worker thread.
sendMessage({action: "tab_register"});


const callback = function(mutationsList, observer) {
  videoElements = document.querySelectorAll("video");
  console.log(videoElements);
  for (i = 0; i < videoElements.length; i++) {
    videoElements[i].onpause = (event) => {
      sendMessage({action: "stop"});
    };
    videoElements[i].onplay = (event) => {
      sendMessage({action: "resume"});
    };
  }
};
const observer = new MutationObserver(callback);
observer.observe(document.body, {childList: true, subtree: true });


// Listen media commands from the service worker
chrome.runtime.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  if (!("action" in request)) {
    return false;
  }
  var videoElements = document.querySelectorAll("video");

  for (i = 0; i < videoElements.length; i++) {
    if (request.action === "stop" && !videoElements[i].paused) {
      videoElements[i].pause();
    } else if (request.action === "resume" && videoElements[i].paused) {
      videoElements[i].play();
    } else if (request.action === "toggle_mute") {
      videoElements[i].muted = !videoElements[i].muted;
    } else if (request.action === "mute") {
      videoElements[i].muted = true;
    } else if (request.action === "unmute") {
      videoElements[i].muted = false;
    } else if (request.action === "toggle") {
      if (videoElements[i].paused) {
        videoElements[i].play();
      } else {
        videoElements[i].pause();
      }
    }
  }
  sendResponse({});
  return true;
});
