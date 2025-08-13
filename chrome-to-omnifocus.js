// Helper function to create the OmniFocus URL
function createOfUrl(taskName, taskNote) {
  return `omnifocus:///add?name=${encodeURIComponent(taskName)}&note=${encodeURIComponent(taskNote)}`;
}

// Handle initialization message from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "initialize") {
    chrome.action.setPopup({ popup: "" }); // Remove popup after first use
    sendResponse({ success: true });
  }
});

// Handle toolbar button click
chrome.action.onClicked.addListener((tab) => {
  if (tab && tab.url) {
    const taskName = tab.title;
    const taskNote = tab.url;
    const ofUrl = createOfUrl(taskName, taskNote);
    if (tab.url.startsWith('chrome://') || tab.url.startsWith('about:')) {
      // Open in a new tab and focus it for restricted pages to trigger OmniFocus prompt
      chrome.tabs.create({ url: ofUrl, active: true }, (newTab) => {
        setTimeout(() => {
          // Attempt to remove the tab; ignore if already closed by OmniFocus
          try {
            chrome.tabs.get(newTab.id, (tab) => {
              chrome.tabs.remove(newTab.id);
            });
          } catch (error) {
            // Silently ignore "No tab with id" error, as it’s expected if OmniFocus closed it
          }
        }, 10000); // 10 seconds to allow OmniFocus to process
      });
    } else {
      // Use content script for non-restricted pages
      chrome.tabs.sendMessage(tab.id, { action: "openOmniFocusUrl", url: ofUrl }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Message failed:", chrome.runtime.lastError.message);
        } else if (response && !response.success) {
          console.error("No success response from content script");
        }
      });
    }
  } else {
    console.error("Tab or tab.url is undefined");
  }
});
