// Function to open the OmniFocus URL via hidden iframe
function openCustomUrl(url) {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = url;
  document.body.appendChild(iframe);
  setTimeout(() => {
    iframe.remove();
  }, 5000);
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openOmniFocusUrl") {
    openCustomUrl(message.url);
    sendResponse({ success: true });
  }
  return true; // Keep the message channel open for async response
});
