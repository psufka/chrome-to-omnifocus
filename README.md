# Chrome to OmniFocus Chrome Extension

A Chrome extension by Paul Sufka to save the current tab or selected text as a task in OmniFocus. Built with Manifest V3 for compatibility with modern Chrome versions. Download the [latest release](https://github.com/psufka/chrome-to-omnifocus/releases/latest).

## Features
- **Toolbar Button**: Click to save the current tab as an OmniFocus task. The tab title becomes the task name and the URL becomes the note.
- **Selected Text**: If you have text selected on the page, it will be used as the task name instead of the page title.
- **Chrome Internal Pages**: Supports `chrome://` and other restricted pages via a fallback method.
- Uses OmniFocus's URL scheme (`omnifocus:///add`) to create tasks automatically.

## Installation
1. Clone or download this repository (on the web, click the green "Code" button and download the .zip file). Place the unzipped files in a directory of your choosing (e.g., `~/Documents/chrome-to-omnifocus/`).
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" (top right).
4. Click "Load unpacked" and select the folder containing the extension files.
5. The extension icon should appear in your toolbar. You may want to pin it for easier access.

## Usage
- Click the toolbar icon to save the current tab to OmniFocus.
- Select text on a page before clicking to use the selection as the task name.
- **Initial Setup**: On first use, a popup will appear. Click "Start Using" to proceed. After this, the extension will work automatically.

**Requirements**: OmniFocus must be installed and running on your macOS device.

## Compatibility with Chromium-Based Browsers
This extension is compatible with Chromium-based browsers, such as Brave, and others that support Chrome extensions. On first use, approve the popup prompt to allow OmniFocus to open. Some browsers may require manual confirmation for external app launches; approve if prompted.

## Versions
- **v1.1.0**: Selected text support, persistent initialization (no more popup after browser restart), on-demand script injection (reduced permissions), error feedback via toolbar badge.
- **v1.0.2**: Bug fixes, including improved handling of tab removal errors and Chrome internal page support.
- **v1.0.1**: Added a popup for first-time setup to eliminate the need to modify Chrome permissions using Terminal.
- **v1.0.0**: Initial release.

## License
MIT License. Feel free to modify, share, or contribute to this project.

## Contributing
Issues and pull requests are welcome! Report bugs or suggest features via GitHub Issues.
