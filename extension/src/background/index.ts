// Background service worker for MindShield extension
// Handles messaging between popup and content scripts

console.log('MindShield background service worker loaded');

// Listen for state changes from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background received message:', message);

  if (message.type === 'ACTIVATE_CRISIS') {
    // Broadcast to all content scripts
    broadcastToContentScripts({
      type: 'STATE_UPDATE',
      data: message.data
    });
    sendResponse({ success: true });
  }

  if (message.type === 'DEACTIVATE_CRISIS') {
    // Broadcast to all content scripts
    broadcastToContentScripts({
      type: 'STATE_UPDATE',
      data: message.data
    });
    sendResponse({ success: true });
  }

  if (message.type === 'STATE_SYNC') {
    // Sync state from popup to content scripts
    broadcastToContentScripts({
      type: 'STATE_UPDATE',
      data: message.data
    });
    sendResponse({ success: true });
  }

  return true; // Keep message channel open for async response
});

// Listen for storage changes and broadcast to content scripts
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.protectionState) {
    console.log('Storage changed, broadcasting to content scripts');
    broadcastToContentScripts({
      type: 'STATE_UPDATE',
      data: changes.protectionState.newValue
    });
  }
});

// Helper to broadcast to all content scripts
async function broadcastToContentScripts(message: any) {
  try {
    const tabs = await chrome.tabs.query({});
    for (const tab of tabs) {
      if (tab.id && isTargetDomain(tab.url)) {
        chrome.tabs.sendMessage(tab.id, message).catch(() => {
          // Ignore errors for tabs without content script
          console.log(`Could not send message to tab ${tab.id}`);
        });
      }
    }
  } catch (error) {
    console.error('Error broadcasting to content scripts:', error);
  }
}

// Check if URL is a target domain (Twitter/Instagram)
function isTargetDomain(url?: string): boolean {
  if (!url) return false;
  return url.includes('twitter.com') ||
         url.includes('x.com') ||
         url.includes('instagram.com');
}

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log('MindShield installed:', details.reason);

  if (details.reason === 'install') {
    // Set default state on first install
    chrome.storage.local.set({
      protectionState: {
        mode: 'daily',
        interceptedCount: 0,
        blockedCount: 0,
        activatedAt: null,
        claimsRemaining: 3,
        coverageMonths: 6,
        threatLevel: 'normal',
        anomalyDetected: false,
      }
    });
  }
});

export {};
