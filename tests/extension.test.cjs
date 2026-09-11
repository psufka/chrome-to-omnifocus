const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'chrome-to-omnifocus.js'), 'utf8');

function harness({ selection = '', injectionError, updateError } = {}) {
  const calls = { scripts: [], updates: [], badges: [], titles: [] };
  let click;
  const chrome = {
    action: {
      onClicked: { addListener(listener) { click = listener; } },
      async setBadgeText(value) { calls.badges.push(value.text); },
      async setBadgeBackgroundColor() {},
      async setTitle(value) { calls.titles.push(value.title); }
    },
    scripting: {
      async executeScript(options) {
        calls.scripts.push(options);
        if (injectionError) throw new Error(injectionError);
        return [{ result: selection }];
      }
    },
    tabs: {
      async update(id, options) {
        calls.updates.push({ id, ...options });
        if (updateError) throw new Error(updateError);
      }
    }
  };
  vm.runInNewContext(source, { chrome, console: { error() {} } });
  return { click, calls };
}

const tab = { id: 12, title: 'An example page', url: 'https://example.com/a?x=1&y=2#section' };

function savedParams(calls) {
  assert.equal(calls.updates.length, 1);
  const url = new URL(calls.updates[0].url);
  assert.equal(url.protocol, 'omnifocus:');
  assert.equal(url.pathname, '/add');
  assert.equal(url.searchParams.get('autosave'), 'true');
  return url.searchParams;
}

test('toolbar sends an autosaving task from the extension, preserving the source tab', async () => {
  const { click, calls } = harness();
  await click(tab);
  const params = savedParams(calls);
  assert.equal(calls.updates[0].id, tab.id);
  assert.equal(params.get('name'), tab.title);
  assert.equal(params.get('note'), tab.url);
  assert.equal(calls.scripts.length, 1);
  assert.equal(calls.badges.at(-1), '→');
});

test('selected text survives URL encoding, including parameter-like text and Unicode', async () => {
  const title = 'Read café ☕ &flag=true #1 / 100% + "quotes"\nnext line';
  const { click, calls } = harness({ selection: `  ${title}  ` });
  await click(tab);
  const params = savedParams(calls);
  assert.equal(params.get('name'), title);
  assert.equal(params.has('flag'), false);
  assert.equal(params.get('note'), tab.url);
});

test('whitespace selection falls back to the title', async () => {
  const { click, calls } = harness({ selection: ' \n\t ' });
  await click(tab);
  assert.equal(savedParams(calls).get('name'), tab.title);
});

for (const url of ['chrome://extensions/', 'about:blank', 'https://chromewebstore.google.com/', 'file:///tmp/report.pdf']) {
  test(`injection denial still saves ${url}`, async () => {
    const { click, calls } = harness({ injectionError: 'Cannot access contents of this page' });
    await click({ ...tab, url });
    assert.equal(savedParams(calls).get('note'), url);
    assert.equal(calls.badges.at(-1), '→');
  });
}

test('a missing or blank title falls back to the URL', async () => {
  for (const title of [undefined, '   ']) {
    const { click, calls } = harness();
    await click({ ...tab, title });
    assert.equal(savedParams(calls).get('name'), tab.url);
  }
});

test('invalid tabs show an actionable error without launching', async () => {
  for (const value of [undefined, {}, { ...tab, id: -1 }, { ...tab, url: '' }]) {
    const { click, calls } = harness();
    await click(value);
    assert.equal(calls.updates.length, 0);
    assert.equal(calls.scripts.length, 0);
    assert.equal(calls.badges.at(-1), '!');
    assert.match(calls.titles.at(-1), /Cannot access this tab/);
  }
});

test('launch errors are shown without a duplicate fallback launch', async () => {
  const { click, calls } = harness({ updateError: 'No tab with id: 12' });
  await click(tab);
  assert.equal(calls.updates.length, 1);
  assert.equal(calls.badges.at(-1), '!');
  assert.match(calls.titles.at(-1), /No tab with id: 12/);
});

test('the injected script only reads selection and handles a missing selection', async () => {
  const { click, calls } = harness();
  await click(tab);
  const script = `(${calls.scripts[0].func.toString()})()`;
  assert.equal(vm.runInNewContext(script, { window: { getSelection: () => null } }), '');
  assert.equal(vm.runInNewContext(script, { window: { getSelection: () => '  hello  ' } }), 'hello');
});

test('manifest works on first click without setup or stored initialization state', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
  assert.equal(manifest.action.default_popup, undefined);
  assert.deepEqual(manifest.permissions, ['activeTab', 'scripting']);
  assert.equal(manifest.background.service_worker, 'chrome-to-omnifocus.js');
});
