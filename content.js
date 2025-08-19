// Function to apply CSS
function applyItemWidth(width) {
    const styleId = 'yt-item-width-style';
    let style = document.getElementById(styleId);
    if (!style) {
      style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
    }
  
    style.textContent = `
      ytd-rich-item-renderer {
        width: ${width}px !important;
      }
    `;
  }
  
  // On load: Get saved width and apply
  chrome.storage.sync.get(['itemWidth'], (result) => {
    const width = result.itemWidth || 200;
    applyItemWidth(width);
    console.log("New Thumbnail width: " + width);
  });
  
  // Listener for popup messages
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateWidth") {
      applyItemWidth(request.width);
    }
  });
  