# Save to OmniFocus Chrome Extension by Paul Sufka

## Version 1.0.1

A Chrome extension by Paul Sufka to save the current tab, selected text, or link as a task in OmniFocus. Built with Manifest V3 for compatibility with modern Chrome versions.

## Features
- **Toolbar Button**: Saves the current tab's title as the task name and URL as the note, or uses selected text if available.
- Uses OmniFocus's URL scheme (`omnifocus:///add`) to create tasks automatically.

## Installation
1. Clone or download this repository. (On the web, you can click the green <> Code" button and download an entire .zip file). Place the unzipped files in the directory of your choosing (e.g. ~/Documents/chrome-to-omnifocus/)
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" (top right).
4. Click "Load unpacked" and select the folder containing the extension files.
5. The extension icon should appear in your toolbar. _You may want to pin it for easier access._
6. Before first use, either restart your browser, or reload the tab you want to save.

## Usage
- Click the toolbar icon to save the current tab or selected text to OmniFocus.
- You may want to pin the icon to your toolbar for easier access. 

**Requirements**: OmniFocus must be installed and **running** on your macOS device.

## Installation
1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" (top right).
4. Click "Load unpacked" and select the folder containing the extension files.
5. The extension icon should appear in your toolbar. You may want to pin it for easier access.
6. Before first use, either restart your browser or reload the tab you want to save.

## Usage
- Click the toolbar icon to save the current tab or selected text to OmniFocus.

**Requirements**: OmniFocus must be installed and running on your macOS device.

## Initial Setup Prompt
On first use, a popup will appear instructing you to approve a prompt to allow OmniFocus to open. Follow these steps:
- Click the toolbar icon to trigger the popup.
- Approve the OmniFocus prompt when it appears.
- Click "Start Using" in the popup to proceed. After this, the extension will work automatically without further prompts.

## Using in Brave Browser
This extension is compatible with Brave Browser, which is based on Chromium and supports Chrome extensions. To use it in Brave:
- Follow the same installation steps as for Chrome (see "Installation" above).
- On first use, a popup will appear instructing you to approve a prompt to allow OmniFocus to open. Approve it to proceed.
- Click the toolbar icon to save tasks to OmniFocus, ensuring OmniFocus is running on your macOS device.
- Note: Brave’s stricter privacy settings might occasionally require manual confirmation for external app launches. If prompted, approve the action.

## Versions
- **v1.0.0**: Initial release.
- **v1.0.1**: Added a popup for first-time setup to eliminate the need to modify Chrome permissions using Terminal.

## License
MIT License. Feel free to modify, share, or contribute to this project.

## Contributing
Issues and pull requests are welcome! Report bugs or suggest features via GitHub Issues.
