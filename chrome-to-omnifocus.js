// Helper function to create the OmniFocus URL
function createOfUrl(taskName, taskNote) {
  return `omnifocus:///add?name=${encodeURIComponent(taskName)}&note=${encodeURIComponent(taskNote)}`;
}

// On startup, restore initialized state so popup doesn't reappear after browser restart
chrome.storage.local.get("initialized", (data) => {
  if (data.initialized) {
    chrome.action.setPopup({ popup: "" });
  }
});

// Handle initialization message from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "initialize") {
    chrome.action.setPopup({ popup: "" });
    chrome.storage.local.set({ initialized: true });
    sendResponse({ success: true });
  }
});

// Handle toolbar button click
chrome.action.onClicked.addListener(async (tab) => {
  if (!tab || !tab.url) {
    showError("Cannot access this tab");
    return;
  }

  const isRestricted = tab.url.startsWith("chrome://") || tab.url.startsWith("about:");

  if (isRestricted) {
    // Can't inject scripts into restricted pages — open OF URL in a new tab
    const ofUrl = createOfUrl(tab.title, tab.url);
    chrome.tabs.create({ url: ofUrl, active: true }, (newTab) => {
      setTimeout(() => {
        chrome.tabs.get(newTab.id, () => {
          if (chrome.runtime.lastError) return; // Tab already closed — expected
          chrome.tabs.remove(newTab.id);
        });
      }, 10000);
    });
    return;
  }

  // Get selected text from the page (if any)
  let selectedText = "";
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.getSelection().toString()
    });
    selectedText = results[0]?.result || "";
  } catch (e) {
    // Script injection failed (e.g., PDF, web store) — fall back to title only
  }

  const taskName = selectedText || tab.title;
  const taskNote = tab.url;
  const ofUrl = createOfUrl(taskName, taskNote);

  // Inject iframe to trigger omnifocus:// URL scheme
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (url) => {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = url;
        document.documentElement.appendChild(iframe);
        setTimeout(() => iframe.remove(), 5000);
      },
      args: [ofUrl]
    });
  } catch (e) {
    // Injection failed — fall back to tab-based approach
    chrome.tabs.create({ url: ofUrl, active: true }, (newTab) => {
      setTimeout(() => {
        chrome.tabs.get(newTab.id, () => {
          if (chrome.runtime.lastError) return;
          chrome.tabs.remove(newTab.id);
        });
      }, 10000);
    });
  }
});

// Show a brief error badge on the toolbar icon
function showError(msg) {
  console.error("Chrome to OmniFocus:", msg);
  chrome.action.setBadgeText({ text: "!" });
  chrome.action.setBadgeBackgroundColor({ color: "#e74c3c" });
  setTimeout(() => chrome.action.setBadgeText({ text: "" }), 3000);
}
