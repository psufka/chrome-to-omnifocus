console.log("Service worker started");

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

// Handle toolbar button click
chrome.action.onClicked.addListener((tab) => {
  console.log("Toolbar button clicked", tab);
  if (tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('about:')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: getSelectionOrTabDetails,
      args: [tab]
    }).then((results) => {
      const { taskName, taskNote } = results[0].result;
      const ofUrl = `omnifocus:///add?name=${encodeURIComponent(taskName)}&note=${encodeURIComponent(taskNote)}`;
      chrome.tabs.sendMessage(tab.id, { action: "openOmniFocusUrl", url: ofUrl }, (response) => {
        if (chrome.runtime.lastError || !response?.success) {
          console.error("Message failed:", chrome.runtime.lastError);
        }
      });
    }).catch((error) => {
      console.error("Script execution failed:", error);
    });
  } else {
    console.log("Cannot access this tab:", tab.url);
  }
});

// Function to get selection or tab details
function getSelectionOrTabDetails(tab) {
  let taskName = tab.title;
  let taskNote = tab.url;
  if (window.getSelection && window.getSelection().toString()) {
    taskName = window.getSelection().toString();
    taskNote = tab.url;
  }
  return { taskName, taskNote };
}
