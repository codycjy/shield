// Content script entry point - Injects FloatingBall into web pages
import React from 'react';
import { createRoot } from 'react-dom/client';
import FloatingBall from './FloatingBall';
import './index.css';

// Create and inject floating ball without shadow DOM for simpler Tailwind integration
function initFloatingBall() {
  // Check if already initialized
  if (document.getElementById('zenshield-floating-ball-root')) {
    return;
  }

  // Create container with high z-index
  const container = document.createElement('div');
  container.id = 'zenshield-floating-ball-root';
  container.style.cssText = 'all: initial; position: fixed; z-index: 2147483647;';
  document.body.appendChild(container);

  // Mount React app directly (Tailwind will be injected by Vite)
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <FloatingBall />
    </React.StrictMode>
  );
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFloatingBall);
} else {
  initFloatingBall();
}

// Listen for messages from background/popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'STATE_UPDATE') {
    // Broadcast to FloatingBall component via custom event
    window.dispatchEvent(new CustomEvent('zenshield:stateUpdate', {
      detail: message.data
    }));
  }
  sendResponse({ success: true });
  return true;
});
