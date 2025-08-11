// Helper function to create the OmniFocus URL
function createOfUrl(taskName, taskNote) {
  return `omnifocus:///add?name=${encodeURIComponent(taskName)}&note=${encodeURIComponent(taskNote)}`;
}

// Function to get selection or tab details (injected into tab context)
function getSelectionOrTabDetails(tab) {
  let taskName = tab.title;
  let taskNote = tab.url;
  if (window.getSelection && window.getSelection().toString()) {
    taskName = window.getSelection().toString();
  }
  return { taskName, taskNote };
}

// Handle toolbar button click
chrome.action.onClicked.addListener((tab) => {
  if (tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('about:')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: getSelectionOrTabDetails,
      args: [tab]
    }).then((results) => {
      const { taskName, taskNote } = results[0].result;
      const ofUrl = createOfUrl(taskName, taskNote);
      chrome.tabs.sendMessage(tab.id, { action: "openOmniFocusUrl", url: ofUrl }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Message failed:", chrome.runtime.lastError.message);
        } else if (response && !response.success) {
          console.error("No success response from content script");
        }
      });
    }).catch((error) => {
      console.error("Script execution failed:", error.message);
    });
  }
});
