const DEFAULT_TITLE = "Send to OmniFocus Quick Entry";

function createOfUrl(taskName, taskNote) {
  return `omnifocus:///add?name=${encodeURIComponent(taskName)}&note=${encodeURIComponent(taskNote)}`;
}

// Read only the selection. Launching an iframe inside the page would make
// Chrome ask for permission separately for every website's origin.
function readSelection() {
  return window.getSelection()?.toString().trim() || "";
}

chrome.action.onClicked.addListener(async (tab) => {
  try {
    await chrome.action.setBadgeText({ text: "" });
    await chrome.action.setTitle({ title: DEFAULT_TITLE });

    if (!Number.isInteger(tab?.id) || tab.id < 0 || !tab.url) {
      throw new Error("Cannot access this tab");
    }

    let selectedText = "";
    try {
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: readSelection
      });
      selectedText = results[0]?.result?.trim() || "";
    } catch {
      // PDFs, the Web Store, and browser-internal pages may prohibit injection.
      // They can still be saved using their title and URL.
    }

    const taskName = selectedText || tab.title?.trim() || tab.url;
    // tabs.update attributes the launch to this extension's origin. Chrome can
    // remember one approval for all sites, and the external protocol leaves
    // the current page in place. No iframe, temporary tab, or cleanup timer.
    await chrome.tabs.update(tab.id, { url: createOfUrl(taskName, tab.url) });
    // A completed API call only means the launch was requested. Chrome doesn't
    // report whether the user accepted its dialog or OmniFocus saved the task.
    // A visible arrow acknowledges the click without claiming verified delivery.
    await chrome.action.setBadgeBackgroundColor({ color: "#2563eb" });
    await chrome.action.setBadgeText({ text: "→" });
    await chrome.action.setTitle({
      title: `Quick Entry requested: ${taskName}. Review and save in OmniFocus.`
    });
  } catch (error) {
    await showError(error.message || "Could not open OmniFocus");
  }
});

async function showError(message) {
  console.error("Chrome to OmniFocus:", message);
  // Keep the message available until the next click: service-worker timers
  // aren't reliable, and a disappearing badge is easy to miss.
  await chrome.action.setBadgeBackgroundColor({ color: "#e74c3c" });
  await chrome.action.setBadgeText({ text: "!" });
  await chrome.action.setTitle({ title: `${DEFAULT_TITLE}: ${message}` });
}
