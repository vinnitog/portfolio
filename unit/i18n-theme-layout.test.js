const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const appSource = fs.readFileSync(path.join(root, "script.js"), "utf8");
const swSource = fs.readFileSync(path.join(root, "sw.js"), "utf8");

function parseAttributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)=(?:"([^"]*)"|'([^']*)')/g)]
      .map((match) => [match[1], match[2] ?? match[3]])
  );
}

function extractTags(attribute) {
  return [...html.matchAll(new RegExp(`<[^>]+\\s${attribute}="[^"]+"[^>]*>`, "g"))]
    .map((match) => parseAttributes(match[0]));
}

class ClassList {
  constructor(names = []) {
    this.names = new Set(names);
  }

  add(name) { this.names.add(name); }
  remove(name) { this.names.delete(name); }
  contains(name) { return this.names.has(name); }
  toggle(name, force) {
    const enabled = force === undefined ? !this.names.has(name) : force;
    if (enabled) this.names.add(name);
    else this.names.delete(name);
    return enabled;
  }
}

class StyleDeclaration {
  constructor(values = {}) {
    this.values = new Map(Object.entries(values));
  }

  getPropertyValue(name) { return this.values.get(name) || ""; }
  setProperty(name, value) { this.values.set(name, value); }
}

class Element {
  constructor({ dataset = {}, attributes = {}, classes = [], style = {}, isLink = false } = {}) {
    this.dataset = { ...dataset };
    this.attributes = new Map(Object.entries(attributes));
    this.classList = new ClassList(classes);
    this.style = new StyleDeclaration(style);
    this.listeners = new Map();
    this.children = [];
    this.textContent = "";
    this.label = null;
    this.isLink = isLink;
    this.focused = false;
    this.afterTarget = null;
  }

  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) || [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }

  dispatch(type, event = {}) {
    for (const listener of this.listeners.get(type) || []) listener({ target: this, ...event });
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
    if (name === "data-theme") this.dataset.theme = String(value);
  }

  getAttribute(name) { return this.attributes.get(name) ?? null; }
  removeAttribute(name) { this.attributes.delete(name); }
  replaceChildren(...children) { this.children = children; }
  querySelector(selector) { return selector === ".sr-only" ? this.label : null; }
  closest(selector) { return selector === "a" && this.isLink ? this : null; }
  after(element) { element.afterTarget = this; }
  focus() { this.focused = true; this.dispatch("focus"); }
}

function createStorage(initial = {}, throws = false) {
  const values = new Map(Object.entries(initial));
  return {
    values,
    getItem(key) {
      if (throws) throw new Error("storage unavailable");
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      if (throws) throw new Error("storage unavailable");
      values.set(key, String(value));
    }
  };
}

function createHarness({ storageValues = {}, storageThrows = false, reducedMotion = false } = {}) {
  const storage = createStorage(storageValues, storageThrows);
  const stages = [
    ["discovery", "11%"],
    ["privacy", "22%"],
    ["development", "33%"],
    ["design", "44%"],
    ["review", "56%"],
    ["quality", "67%"],
    ["automation", "78%"],
    ["delivery", "89%"]
  ];
  const nodes = stages.map(([stage, nodeX]) => new Element({
    dataset: { stage },
    attributes: { "aria-pressed": String(stage === "discovery") },
    classes: stage === "discovery" ? ["is-active"] : [],
    style: { "--node-x": nodeX }
  }));

  const translated = extractTags("data-i18n").map((attrs) => new Element({
    dataset: { i18n: attrs["data-i18n"] }
  }));
  const ariaTranslated = extractTags("data-i18n-aria-label").map((attrs) => new Element({
    dataset: { i18nAriaLabel: attrs["data-i18n-aria-label"] },
    attributes: { "aria-label": attrs["aria-label"] || "" }
  }));

  const pt = new Element({ dataset: { language: "pt" }, attributes: { "aria-pressed": "true" } });
  const en = new Element({ dataset: { language: "en" }, attributes: { "aria-pressed": "false" } });
  const navLabel = new Element();
  navLabel.textContent = "Abrir navegação";
  const navToggle = new Element({ attributes: { "aria-expanded": "false" } });
  navToggle.label = navLabel;
  const nav = new Element();
  const themeToggle = new Element({ attributes: { "aria-pressed": "true", "aria-label": "Ativar tema claro" } });
  const evidence = new Element({ style: { "--evidence-x": "11%" } });
  const evidenceTitle = new Element();
  const evidenceList = new Element();
  const themeMeta = new Element({ attributes: { content: "#0f1719" } });
  const descriptionMeta = new Element({ attributes: { content: "" } });
  const ogTitleMeta = new Element({ attributes: { content: "" } });
  const ogDescriptionMeta = new Element({ attributes: { content: "" } });
  const ogImageAltMeta = new Element({ attributes: { content: "" } });
  const documentElement = new Element({ attributes: { lang: "pt-BR" } });
  documentElement.lang = "pt-BR";
  const documentListeners = new Map();

  const selectorMap = new Map([
    [".nav-toggle", navToggle],
    ["#site-nav", nav],
    [".theme-toggle", themeToggle],
    ["#stage-evidence", evidence],
    ["#evidence-title", evidenceTitle],
    ["#evidence-list", evidenceList],
    ["#theme-color", themeMeta],
    ['meta[name="description"]', descriptionMeta],
    ['meta[property="og:title"]', ogTitleMeta],
    ['meta[property="og:description"]', ogDescriptionMeta],
    ['meta[property="og:image:alt"]', ogImageAltMeta]
  ]);

  const document = {
    documentElement,
    title: "",
    querySelector(selector) { return selectorMap.get(selector) || null; },
    querySelectorAll(selector) {
      if (selector === "[data-stage]") return nodes;
      if (selector === "[data-language]") return [pt, en];
      if (selector === "[data-i18n]") return translated;
      if (selector === "[data-i18n-aria-label]") return ariaTranslated;
      if (selector === '.site-nav a[href^="#"]') return [];
      return [];
    },
    createElement() { return new Element(); },
    addEventListener(type, listener) {
      const listeners = documentListeners.get(type) || [];
      listeners.push(listener);
      documentListeners.set(type, listeners);
    }
  };

  const mediaListeners = [];
  const window = {
    localStorage: storage,
    matchMedia(query) {
      return {
        matches: query.includes("prefers-reduced-motion") ? reducedMotion : false,
        addEventListener(type, listener) { if (type === "change") mediaListeners.push(listener); }
      };
    }
  };
  const context = {
    document,
    window,
    navigator: {},
    location: { protocol: "file:" },
    console
  };

  vm.runInNewContext(`${appSource}\n;globalThis.__portfolio = { TRANSLATIONS, STAGE_CONTENT, STORAGE_KEYS, THEME_COLORS, applyLanguage, applyTheme };`, context);

  return {
    exports: context.__portfolio,
    storage,
    document,
    documentElement,
    translated,
    ariaTranslated,
    nodes,
    pt,
    en,
    nav,
    navToggle,
    navLabel,
    themeToggle,
    evidence,
    evidenceTitle,
    evidenceList,
    themeMeta,
    descriptionMeta,
    ogTitleMeta,
    ogDescriptionMeta,
    ogImageAltMeta,
    dispatchDocument(type, event) {
      for (const listener of documentListeners.get(type) || []) listener(event);
    }
  };
}

function cssRule(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return css.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}`, "m"))?.[1] || "";
}

test("THEME-01 P0: PT-BR and dark are deterministic defaults", () => {
  const harness = createHarness();
  assert.equal(harness.documentElement.lang, "pt-BR");
  assert.equal(harness.documentElement.getAttribute("data-theme"), "dark");
  assert.equal(harness.pt.getAttribute("aria-pressed"), "true");
  assert.equal(harness.en.getAttribute("aria-pressed"), "false");
  assert.equal(harness.themeToggle.getAttribute("aria-pressed"), "true");
  assert.equal(harness.themeToggle.getAttribute("aria-label"), "Ativar tema claro");
  assert.equal(harness.themeMeta.getAttribute("content"), "#0f1719");
  assert.equal(harness.document.title, harness.exports.TRANSLATIONS.pt.documentTitle);
  assert.equal(harness.descriptionMeta.getAttribute("content"), harness.exports.TRANSLATIONS.pt.metaDescription);
  assert.ok(harness.translated.every((element) => element.textContent && !element.textContent.includes("undefined")));
});

test("UX9-I18N-02 P0: every declared translatable element and metadata switches to en-US", () => {
  const harness = createHarness();
  harness.en.dispatch("click");
  assert.equal(harness.documentElement.lang, "en-US");
  assert.equal(harness.pt.getAttribute("aria-pressed"), "false");
  assert.equal(harness.en.getAttribute("aria-pressed"), "true");

  for (const element of harness.translated) {
    assert.equal(element.textContent, harness.exports.TRANSLATIONS.en[element.dataset.i18n], element.dataset.i18n);
  }
  for (const element of harness.ariaTranslated) {
    assert.equal(element.getAttribute("aria-label"), harness.exports.TRANSLATIONS.en[element.dataset.i18nAriaLabel]);
  }
  assert.equal(harness.document.title, harness.exports.TRANSLATIONS.en.documentTitle);
  assert.equal(harness.descriptionMeta.getAttribute("content"), harness.exports.TRANSLATIONS.en.metaDescription);
  assert.equal(harness.ogTitleMeta.getAttribute("content"), harness.exports.TRANSLATIONS.en.ogTitle);
  assert.equal(harness.ogDescriptionMeta.getAttribute("content"), harness.exports.TRANSLATIONS.en.ogDescription);
  assert.equal(harness.ogImageAltMeta.getAttribute("content"), harness.exports.TRANSLATIONS.en.ogImageAlt);
});

test("UX9-I18N-02 P0: PT and EN dictionaries have parity and cover the HTML contract", () => {
  const harness = createHarness();
  const { TRANSLATIONS } = harness.exports;
  assert.deepEqual(Object.keys(TRANSLATIONS.en).sort(), Object.keys(TRANSLATIONS.pt).sort());
  const usedKeys = new Set([
    ...extractTags("data-i18n").map((attrs) => attrs["data-i18n"]),
    ...extractTags("data-i18n-aria-label").map((attrs) => attrs["data-i18n-aria-label"])
  ]);
  for (const key of usedKeys) {
    assert.ok(TRANSLATIONS.pt[key], `missing PT translation: ${key}`);
    assert.ok(TRANSLATIONS.en[key], `missing EN translation: ${key}`);
  }
});

test("UX9-ROUTE-01..05/I18N-03 P0: each activation moves evidence to its node and language preserves stage", () => {
  const harness = createHarness();
  const centers = [];
  for (const node of harness.nodes) {
    for (const mode of ["pointerenter", "click", "focus"]) {
      node.dispatch(mode);
      assert.equal(harness.nodes.filter((item) => item.getAttribute("aria-pressed") === "true").length, 1);
      assert.equal(node.getAttribute("aria-pressed"), "true");
      assert.equal(harness.evidence.style.getPropertyValue("--evidence-x"), node.style.getPropertyValue("--node-x"));
      assert.equal(harness.evidence.afterTarget, node, "mobile DOM placement should follow the active node");
      assert.equal(harness.evidenceList.children.length, 4);
    }
    centers.push(Number.parseFloat(harness.evidence.style.getPropertyValue("--evidence-x")));
  }
  assert.deepEqual(centers, [...centers].sort((a, b) => a - b), "panel positions must be monotonic");

  harness.nodes[2].dispatch("click");
  harness.en.dispatch("click");
  assert.equal(harness.nodes[2].getAttribute("aria-pressed"), "true");
  assert.equal(harness.evidenceTitle.textContent, "Development");
  assert.deepEqual(
    harness.evidenceList.children.map((item) => item.textContent),
    ["Small scope", "Clean code", "PWA and architecture", "Edge cases"]
  );
  harness.pt.dispatch("click");
  assert.equal(harness.nodes[2].getAttribute("aria-pressed"), "true");
  assert.equal(harness.evidenceList.children.length, 4, "language changes must replace, not duplicate, evidence");
});

test("UX9-I18N-04/MOBILE-01 P0/P1: menu and preference controls keep localized accessible states", () => {
  const harness = createHarness();
  harness.navToggle.dispatch("click");
  assert.equal(harness.navLabel.textContent, "Fechar navegação");
  harness.en.dispatch("click");
  assert.equal(harness.navLabel.textContent, "Close navigation");
  assert.equal(harness.pt.getAttribute("aria-label"), "Use Brazilian Portuguese");
  assert.equal(harness.en.getAttribute("aria-label"), "Use American English");
  harness.themeToggle.dispatch("click");
  assert.equal(harness.themeToggle.getAttribute("aria-label"), "Enable dark theme");
  assert.equal(harness.navToggle.getAttribute("aria-expanded"), "true", "preferences should not close mobile nav");
  harness.dispatchDocument("keydown", { key: "Escape" });
  assert.equal(harness.navToggle.getAttribute("aria-expanded"), "false");
  assert.equal(harness.navLabel.textContent, "Open navigation");
  assert.equal(harness.navToggle.focused, true);
});

test("THEME-02 P0: dark/light/dark toggles synchronize root, icon contract, ARIA and theme-color", () => {
  const harness = createHarness();
  harness.themeToggle.dispatch("click");
  assert.equal(harness.documentElement.getAttribute("data-theme"), "light");
  assert.equal(harness.themeToggle.getAttribute("aria-pressed"), "false");
  assert.equal(harness.themeToggle.getAttribute("aria-label"), "Ativar tema escuro");
  assert.equal(harness.themeMeta.getAttribute("content"), "#f9f6f5");
  harness.themeToggle.dispatch("click");
  assert.equal(harness.documentElement.getAttribute("data-theme"), "dark");
  assert.equal(harness.themeToggle.getAttribute("aria-pressed"), "true");
  assert.equal(harness.themeToggle.getAttribute("aria-label"), "Ativar tema claro");
  assert.equal(harness.themeMeta.getAttribute("content"), "#0f1719");
  assert.match(css, /\.theme-icon--moon,\s*html\[data-theme="dark"\] \.theme-icon--sun\s*\{\s*display:\s*none/s);
  assert.match(css, /html\[data-theme="dark"\] \.theme-icon--moon\s*\{\s*display:\s*block/s);
});

test("UX9-THEME-03 P0: dark theme defines complete readable component tokens and focus", () => {
  const darkRule = cssRule('html[data-theme="dark"]');
  for (const token of [
    "--paper", "--paper-raised", "--ink", "--ink-soft", "--route", "--route-soft",
    "--rule", "--shadow", "--destination-shadow", "--diagram-surface", "--button-hover"
  ]) {
    assert.match(darkRule, new RegExp(`${token.replace("--", "--")}\\s*:`), `dark token missing: ${token}`);
  }
  assert.match(css, /:focus-visible\s*\{[\s\S]*?outline:\s*3px\s+solid\s+var\(--amber\)/s);
  assert.match(darkRule, /--amber\s*:/, "dark mode must override the token used by focus rings");
});

test("THEME-02 P0: explicit light preference and language persist independently across reload", () => {
  const first = createHarness();
  first.en.dispatch("click");
  first.themeToggle.dispatch("click");
  assert.equal(first.storage.values.get("portfolio_language"), "en");
  assert.equal(first.storage.values.get("portfolio_theme"), "light");

  const second = createHarness({ storageValues: Object.fromEntries(first.storage.values) });
  assert.equal(second.documentElement.lang, "en-US");
  assert.equal(second.documentElement.getAttribute("data-theme"), "light");
  assert.equal(second.evidenceList.children[0].textContent, "Goal, audience, and context");
  second.pt.dispatch("click");
  assert.equal(second.storage.values.get("portfolio_language"), "pt");
  assert.equal(second.storage.values.get("portfolio_theme"), "light");

  const third = createHarness({ storageValues: Object.fromEntries(second.storage.values) });
  third.themeToggle.dispatch("click");
  assert.equal(third.storage.values.get("portfolio_language"), "pt");
  assert.equal(third.storage.values.get("portfolio_theme"), "dark");
});

test("THEME-01/02 P0: unavailable or corrupt storage safely falls back to PT/dark", () => {
  const unavailable = createHarness({ storageThrows: true });
  assert.equal(unavailable.documentElement.lang, "pt-BR");
  assert.equal(unavailable.documentElement.getAttribute("data-theme"), "dark");
  assert.doesNotThrow(() => unavailable.en.dispatch("click"));
  assert.doesNotThrow(() => unavailable.themeToggle.dispatch("click"));
  assert.equal(unavailable.documentElement.lang, "en-US");
  assert.equal(unavailable.documentElement.getAttribute("data-theme"), "light");

  const corrupt = createHarness({
    storageValues: { portfolio_language: "fr", portfolio_theme: "neon" }
  });
  assert.equal(corrupt.documentElement.lang, "pt-BR");
  assert.equal(corrupt.documentElement.getAttribute("data-theme"), "dark");
});

test("UX9-ROUTE-06..09 P0/P1: layout contracts prevent panel, border and responsive overflow regressions", () => {
  const evidenceRule = cssRule(".stage-evidence");
  assert.match(evidenceRule, /left:\s*var\(--evidence-x,\s*11%\)/);
  assert.match(evidenceRule, /transform:\s*translateX\(-50%\)/);
  assert.match(evidenceRule, /width:\s*min\(14rem,\s*22vw\)/);
  assert.match(cssRule(".stage-evidence li"), /line-height:\s*1\.45/);

  assert.doesNotMatch(html, /project-destination|route-actions/);
  assert.match(css, /@media \(max-width:\s*1050px\)[\s\S]*?\.route-track\s*\{[\s\S]*?width:\s*3px/s);
  assert.match(css, /@media \(max-width:\s*1050px\)[\s\S]*?\.stage-evidence[\s\S]*?position:\s*relative/s);
  assert.doesNotMatch(evidenceRule, /white-space:\s*nowrap/,
    "evidence container must retain normal wrapping for translated text");
  assert.doesNotMatch(cssRule(".stage-evidence li"), /white-space:\s*nowrap/,
    "evidence bullets must retain normal wrapping");
  assert.match(evidenceRule, /overflow-wrap:\s*anywhere/);
  assert.match(cssRule(".button"), /overflow-wrap:\s*anywhere/);
});

test("UX9-FOOTER-01 P0: center footer content occupies the mathematical center column", () => {
  const footerRule = cssRule(".site-footer");
  assert.match(footerRule, /grid-template-columns:\s*1fr\s+auto\s+1fr/);
  assert.match(cssRule(".site-footer p:nth-child(2)"), /justify-self:\s*center/);
  assert.match(cssRule(".site-footer p:nth-child(2)"), /text-align:\s*center/);
  assert.match(css, /@media \(max-width:\s*760px\)[\s\S]*?\.site-footer\s*\{[\s\S]*?grid-template-columns:\s*1fr/s);
});

test("UX9-MOBILE-01/02 P0/P1: preference controls stay in the responsive navigation flow", () => {
  const headerControls = html.match(/<div class="header-controls">[\s\S]*?<\/div>\s*<\/nav>/)?.[0] || "";
  assert.match(headerControls, /data-language="pt"/);
  assert.match(headerControls, /data-language="en"/);
  assert.match(headerControls, /class="theme-toggle"/);
  assert.match(css, /@media \(max-width:\s*760px\)[\s\S]*?\.header-controls\s*\{[\s\S]*?justify-self:\s*start/s);
  assert.match(css, /\.header-controls\s*\{[\s\S]*?display:\s*flex/s);
});

test("SW23-01 P0: v23 precaches the atomic localized/themed app shell", () => {
  assert.match(swSource, /const CACHE_PREFIX = "portfolio-v"/);
  assert.match(swSource, /const CACHE_NAME = "portfolio-v23"/);
  const shell = swSource.match(/const APP_SHELL = \[([\s\S]*?)\];/)?.[1] || "";
  for (const entry of [
    "./index.html", "./styles.css", "./script.js", "./manifest.webmanifest",
    "./assets/icon.svg", "./assets/avatar-vinicius-128.jpg",
    "./assets/fonts/archivo-latin.woff2", "./assets/fonts/manrope-latin.woff2",
    "./assets/scroll-runner.png", "./assets/scroll-runner-frame-2.png", "./assets/scroll-runner-frame-3.png"
  ]) assert.ok(shell.includes(`"${entry}"`), `missing v22 app-shell entry: ${entry}`);
  assert.match(swSource, /key\.startsWith\(CACHE_PREFIX\) && key !== CACHE_NAME/);
  assert.match(swSource, /self\.skipWaiting\(\)/);
  assert.match(swSource, /self\.clients\.claim\(\)/);
});
