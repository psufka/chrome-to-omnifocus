# Chrome to OmniFocus Chrome Extension by Paul Sufka

A Chrome extension by Paul Sufka to save the current tab, selected text, or link as a task in OmniFocus. Built with Manifest V3 for compatibility with modern Chrome versions. Download the [latest release](https://github.com/psufka/chrome-to-omnifocus/releases/latest).

## Features
- **Toolbar Button**: Saves the current tab's title as the task name and URL as the note, or uses selected text if available. Supports Chrome internal pages (e.g., `chrome://`) where possible.
- Uses OmniFocus's URL scheme (`omnifocus:///add`) to create tasks automatically.

## Installation
1. Clone or download this repository (on the web, click the green "Code" button and download the .zip file). Place the unzipped files in a directory of your choosing (e.g., `~/Documents/chrome-to-omnifocus/`).
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" (top right).
4. Click "Load unpacked" and select the folder containing the extension files.
5. The extension icon should appear in your toolbar. You may want to pin it for easier access.
6. Before first use, either restart your browser or reload the tab you want to save.

## Usage
- Click the toolbar icon to save the current tab or selected text to OmniFocus.
- **Initial Setup**: On first use, a popup will appear instructing you to approve a prompt to allow OmniFocus to open. Follow these steps:
  - Click the toolbar icon to trigger the popup.
  - Approve the OmniFocus prompt when it appears.
  - Click "Start Using" in the popup to proceed. After this, the extension will work automatically without further prompts (except for Chrome internal pages, such as chrome://).

**Requirements**: OmniFocus must be installed and running on your macOS device.

## Compatibility with Chromium-Based Browsers
This extension is compatible with Chromium-based browsers, such as Brave, and others that support Chrome extensions. On first use, approve the popup prompt to allow OmniFocus to open. Some browsers may require manual confirmation for external app launches, including Chrome internal pages; approve if prompted.

## Versions
- **v1.0.0**: Initial release.
- **v1.0.1**: Added a popup for first-time setup to eliminate the need to modify Chrome permissions using Terminal.
- **v1.0.2**: Bug fixes, including improved handling of tab removal errors and Chrome internal page support.

## License
MIT License. Feel free to modify, share, or contribute to this project.

## Contributing
Issues and pull requests are welcome! Report bugs or suggest features via GitHub Issues.
