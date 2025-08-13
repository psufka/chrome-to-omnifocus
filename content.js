// Function to open the OmniFocus URL via hidden iframe
function openCustomUrl(url) {
  try {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    document.documentElement.appendChild(iframe);
    setTimeout(() => {
      iframe.remove();
    }, 5000);
  } catch (error) {
    console.error("Iframe creation failed:", error.message);
  }
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openOmniFocusUrl") {
    openCustomUrl(message.url);
    sendResponse({ success: true });
  }
  return true; // Keep the message channel open for async response
});
