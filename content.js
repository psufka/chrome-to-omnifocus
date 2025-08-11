function openCustomUrl(url) {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = url;
  document.body.appendChild(iframe);
  setTimeout(() => {
    iframe.remove();
  }, 5000);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openOmniFocusUrl") {
    console.log("Received message, opening URL:", message.url);
    openCustomUrl(message.url);
    sendResponse({ success: true });
  }
});
