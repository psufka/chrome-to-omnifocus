# Chrome to OmniFocus

A Chrome extension by Paul Sufka that sends the current tab or selected text to OmniFocus Quick Entry, ready to review and save.

## Features

- Click the toolbar button to open OmniFocus Quick Entry with the task filled in. Edit it, choose a project or tags, then save when ready.
- Selected text becomes the task name; otherwise, the page title is used. The full page URL becomes the note.
- Chrome's external-app permission belongs to the extension, so one remembered approval covers different websites.
- Browser-internal pages, PDFs, and pages that prohibit selection access fall back to the title and URL.
- Your current page stays open. No temporary tabs or delayed tab-closing timers.
- A blue `→` badge acknowledges the Quick Entry request. The task is not saved until you save it in OmniFocus.
- A red `!` badge indicates an API error; hover over the toolbar button for details. The next click clears the error.

## Install or update

1. Clone or download this repository to a permanent folder.
2. Open `chrome://extensions/` in Chrome and enable **Developer mode**.
3. Click **Load unpacked** and select this folder. If it is already installed, click the extension's **Reload** button after updating its files.
4. Pin **Chrome to OmniFocus by Paul Sufka** to the toolbar.

OmniFocus must be installed on your Mac and set up with a database. macOS can launch it when needed.

## One-time Chrome approval

On the first save, Chrome may show **Open OmniFocus?**. Check **Always allow … to open links of this type in the associated app**, then click **Open OmniFocus**. The origin should refer to this extension (`chrome-extension://…`), rather than the website you are saving.

That approval should cover subsequent saves from any website in the same Chrome profile. The old website-specific approvals do not transfer, so upgrading from 1.1.0 can require one new approval. Moving an unpacked extension to another folder can change its ID and require approval again.

Chrome owns this dialog. The extension cannot check the box or suppress it itself. Browser policies, clearing permissions, different profiles, or other Chromium browsers may affect whether approval is remembered. If the prompt still names the website, confirm that version **1.2.2** is loaded and reload the extension.

Tasks open in OmniFocus Quick Entry for review; automatic saving is disabled. This is separate from Chrome's permission to launch OmniFocus. Chrome does not tell the extension whether its external-app dialog was accepted or whether you saved the task in OmniFocus, so the blue arrow indicates a launch request, not a saved task. It remains until the next click, and hovering shows which task was requested. If you cancel the dialog, no task is sent; click the toolbar button again when ready.

## Privacy and permissions

Only `activeTab` and `scripting` are required. The extension reads the title, URL, and selection of the tab you explicitly click it on. It has no broad website permission, analytics, server, or native helper. It sends the task to the local OmniFocus app; OmniFocus handles any configured task syncing.

The URL launch happens through `chrome.tabs.update` in the extension service worker. Earlier versions injected an iframe into each website, causing Chrome to remember approval separately for each site's origin. Chrome's [tabs implementation](https://github.com/chromium/chromium/blob/main/chrome/browser/extensions/api/tabs/tabs_api.cc) assigns the extension origin to `tabs.update` navigations; its [external protocol handler](https://github.com/chromium/chromium/blob/main/chrome/browser/external_protocol/external_protocol_handler.cc) stores approval by origin and protocol. OmniFocus documents its [URL scheme](https://inside.omnifocus.com/url-schemes).

## Development and verification

No build step or npm dependencies are required. With Node.js 18 or newer:

```sh
npm test
```

The regression tests cover selection and URL encoding, Quick Entry without autosave, restricted-page fallback, invalid tabs, API errors, and the absence of a setup popup. They mock Chrome's APIs; they cannot verify Chrome's external-app dialog or OmniFocus's actual task creation.

For a live smoke test after reloading:

1. Click the extension on a disposable page and remember Chrome's extension approval if prompted.
2. Confirm OmniFocus Quick Entry opens with the page title and URL. Cancel the test draft, or save and verify the task in the Inbox.
3. Repeat on another domain and confirm Quick Entry still opens without another Chrome permission prompt.
4. Try selected text, then a `chrome://` page; check task names and URL notes in Quick Entry.
5. Confirm each source tab stays open and no extra tab remains. Cancel test drafts or delete any disposable tasks saved during testing.

## Versions

- **1.2.2**: Restores OmniFocus Quick Entry for review and saving, while retaining the extension-origin launch that avoids per-website Chrome permission prompts.
- **1.2.1**: Visible toolbar feedback for silent captures. Live-tested on macOS with normal pages, selected text from different domains, and Chrome internal pages; verified the resulting Inbox tasks.
- **1.2.0**: Extension-origin launch to reduce repeated prompts, direct Inbox saving, no setup popup or storage permission, no temporary-tab cleanup, improved fallback titles and error feedback, regression tests.
- **1.1.0**: Selected text support, persistent initialization, on-demand script injection, error badge.
- **1.0.2**: Tab removal fixes and Chrome internal page support.
- **1.0.1**: First-time setup popup.
- **1.0.0**: Initial release.

## License

MIT. Issues and pull requests are welcome at [GitHub](https://github.com/psufka/chrome-to-omnifocus).
