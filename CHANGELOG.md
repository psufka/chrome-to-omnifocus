# Changelog

Notable changes to Chrome to OmniFocus, newest first. Dates reflect when each version was added to this repository.

## 1.2.3 — 2026-09-11

### Removed

- Blue launch indicator and its status tooltip. OmniFocus Quick Entry provides the visible response; the red error indicator remains.

### Verified

- Live Chrome test opened Quick Entry with the title and URL filled in, without a Chrome permission prompt. The test draft was cancelled without saving.

## 1.2.2 — 2026-09-11

### Changed

- Restored OmniFocus Quick Entry so tasks can be reviewed, edited, assigned to a project, and saved manually.
- Removed automatic Inbox saving while preserving the extension-origin launch that avoids separate Chrome approvals for each website.
- Updated toolbar wording and regression tests for Quick Entry.

## 1.2.1 — 2026-09-11

### Added

- Blue toolbar arrow acknowledging silent launch requests, with the requested task name in the tooltip. This indicator was removed in 1.2.3.

### Verified

- Live captures of a webpage, selected text from another domain, and a Chrome internal page reached the OmniFocus Inbox without additional prompts.

## 1.2.0 — 2026-09-11

### Changed

- Launched OmniFocus through the extension's `chrome.tabs.update` call instead of injecting an iframe into each website. Chrome can remember one approval for the extension across websites.
- Enabled automatic Inbox saving. Quick Entry was subsequently restored in 1.2.2.
- Improved fallback task names when the selection or page title is empty.
- Kept API errors visible in the toolbar badge and tooltip until the next click.

### Removed

- First-time setup popup and the `storage` permission used for initialization.
- Temporary tabs and timed tab-closing cleanup.

### Added

- Twelve regression tests covering URL encoding, selection, restricted-page fallback, invalid tabs, launch errors, and first-click behavior.
- npm test command and Git ignore rules for local artifacts and extension packaging files.

## 1.1.0 — 2026-03-13

### Added

- Selected text as the task name, with the page title as a fallback.
- Persistent initialization so the setup popup does not return after a browser restart.
- Toolbar error feedback.
- Smaller toolbar icon sizes and a compressed main icon.

### Changed

- Read page selection on demand instead of running a content script on every page.
- Reduced permissions by removing broad website access and the `tabs` permission.

## 1.0.2 — 2025-08-12

### Fixed

- Improved temporary-tab removal handling and support for Chrome internal pages.

### Changed

- Renamed the extension to Chrome to OmniFocus by Paul Sufka.

## 1.0.1 — 2025-08-12

### Added

- First-time setup popup.

## 1.0.0 — 2025-08-10

### Added

- Initial Manifest V3 Chrome extension for sending browser content to OmniFocus.
