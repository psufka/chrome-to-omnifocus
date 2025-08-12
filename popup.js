document.getElementById('start').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: "initialize" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Initialization failed:", chrome.runtime.lastError.message);
    } else {
      window.close(); // Close popup after successful init
    }
  });
});
