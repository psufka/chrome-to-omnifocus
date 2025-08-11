# Save to OmniFocus Chrome Extension

A Chrome extension to save the current tab, selected link, or selected text as a task in OmniFocus. Built with Manifest V3 for compatibility with modern Chrome versions.

## Features
- **Toolbar Button**: Saves the current tab's title as the task name and URL as the note.
- **Context Menu**: Right-click on a page, link, or selected text to save:
  - Link: Uses link text (or "Linked Page" if none) as task name, link URL as note.
  - Selection: Uses selected text as task name, page URL as note.
  - Page: Uses page title as task name, page URL as note.
- Uses OmniFocus's URL scheme (`omnifocus:///add`) to create tasks automatically.

## Installation
1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" (top right).
4. Click "Load unpacked" and select the folder containing the extension files.
5. The extension icon should appear in your toolbar.

## Usage
- Click the toolbar icon to save the current tab to OmniFocus.
- Right-click on a page, link, or selected text and select "Save to OmniFocus" from the context menu.

**Requirements**: OmniFocus must be installed and running on your macOS device.

## Fixing the Security Prompt
Chrome may show a prompt asking to confirm opening OmniFocus due to its custom URL protocol. To disable this:
- Open Terminal on macOS and run:
  ```bash
  defaults write com.google.Chrome URLAllowlist -array-add 'omnifocus://*'

## Using in Brave Browser
This extension is compatible with Brave Browser, which is based on Chromium and supports Chrome extensions. To use it in Brave:

Follow the same installation steps as for Chrome (see "Installation" above) but us the following in Terminal to fix the Security Prompt
```bash
defaults write com.brave.Browser URLAllowlist -array-add 'omnifocus://*'
