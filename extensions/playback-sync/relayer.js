var tabs = []

// Functionality to send messages to tabs
function sendMessage(tab, message) {
  if (!chrome.runtime.lastError) {
    chrome.tabs.sendMessage(tab.id, message, {}, function () {
      void chrome.runtime.lastError;
    });
  }
}

// Media control functions
function stop(tab) {
  sendMessage(tab, { action: "stop" });
}

function resume(tab) {
  sendMessage(tab, { action: "resume" });
}

function toggle(tab) {
  sendMessage(tab, { action: "toggle" });
}

function mute(tab) {
  sendMessage(tab, { action: "mute" });
}

function unmute(tab) {
  sendMessage(tab, { action: "unmute" });
}

function toggle_mute(tab) {
  sendMessage(tab, { action: "toggle_mute" });
}


// Message listener for messages from tabs
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (sender.tab === undefined || chrome.runtime.lastError) {
    return true;
  }


  if(request.action === "tab_register") {
    tabs.push(sender.tab);
    console.log(tabs);
  }

  if (request.action === "stop") {
    for (i = 0; i < tabs.length; i++) {
    console.log("sending stop message !!!");
    console.log(tabs[i]);
      stop(tabs[i]);
    }
  } else if (request.action === "resume") {
    for (i = 0; i < tabs.length; i++) {
      console.log(tabs[i]);
      resume(tabs[i]);
    }
  }

  sendResponse({});
  return true;
});
