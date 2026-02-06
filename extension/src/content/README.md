# ZenShield Floating Ball Content Script

This content script injects a floating ball widget into Twitter (X) and Instagram pages to provide real-time protection status and controls.

## Architecture

### Entry Point
- `index.tsx` - Main entry point that initializes the floating ball on supported domains

### Main Component
- `FloatingBall.tsx` - Root component managing state, position, and mode switching

### Panel Components
- `DailyPanel.tsx` - Shows daily protection stats (green theme)
- `CrisisPanel.tsx` - Shows crisis mode with radar animation (red theme)
- `EndedPanel.tsx` - Shows when protection coverage is exhausted (gray theme)
- `ConfirmModal.tsx` - Confirmation dialog for activating crisis mode

## Features

### 3 Protection Modes
1. **Daily Mode (Green)** - Normal protection with stats
2. **Crisis Mode (Red)** - High-alert mode with radar animation
3. **Ended Mode (Gray)** - Protection coverage exhausted

### Interactions
- **Draggable** - Ball can be repositioned anywhere on the page
- **Collapsible** - Click ball to toggle panel visibility
- **Close Button** - Hover over ball to show X button, click to remove widget
- **Crisis Activation** - Button in daily mode with confirmation modal
- **State Sync** - Syncs with popup and chrome.storage

### State Management
- Uses `chrome.storage.local` for persistence
- Listens to storage changes for real-time updates
- Receives messages from background script for cross-component sync
- Custom event system (`zenshield:stateUpdate`) for internal updates

## Styling

### CSS Isolation
The widget uses Tailwind CSS with custom animations defined in `index.css`.

Key animations:
- `shake` - Light shake on notifications
- `radar-ping` - Expanding circles in crisis mode
- `flash-red-green` - Color transition when mode changes
- `bounce-in` - Modal entrance animation

### Z-Index
The floating ball uses `z-index: 2147483647` to ensure it appears above all page content.

## Build Process

The content script is automatically built by Vite + @crxjs/vite-plugin:
1. `src/content/index.tsx` is the entry point defined in manifest.json
2. Vite bundles all React components and CSS
3. Output goes to `dist/assets/index.tsx-[hash].js` and `dist/assets/index-[hash].css`
4. Manifest references are automatically updated

## Communication Flow

```
Popup ───> Background Script ───> Content Script ───> FloatingBall Component
           (chrome.runtime)       (chrome.tabs)       (custom events)
                  │
                  └──────> chrome.storage.local <──────┘
```

1. User interacts with popup
2. Popup updates chrome.storage.local
3. Background script listens to storage changes
4. Background broadcasts to all content scripts
5. Content script dispatches custom event
6. FloatingBall component updates UI

## Development

To test locally:
```bash
bun run dev
```

To build for production:
```bash
bun run build
```

Load the `dist` folder as an unpacked extension in Chrome.

## Supported Domains
- https://twitter.com/*
- https://x.com/*
- https://www.instagram.com/*
