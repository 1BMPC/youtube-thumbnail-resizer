const slider = document.getElementById('widthRange');
const widthValue = document.getElementById('widthValue');
let debounceTimeout;

// Load saved width on popup open
chrome.storage.sync.get(['itemWidth'], (result) => {
  const width = result.itemWidth || 200;
  slider.value = width;
  widthValue.textContent = width;
});

// Send a message to the content script with the new width
function updateYouTubeWidth(width) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "updateWidth",
        width: width
      });
    });
  }  

// When slider changes
slider.addEventListener('input', () => {
  const width = parseInt(slider.value);
  widthValue.textContent = width;

  // Send message to content script for real-time update
  updateYouTubeWidth(width);

  // Debounce saving to storage
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    chrome.storage.sync.set({ itemWidth: width });
  }, 500);  // Save only if user stops sliding for 500ms
});
