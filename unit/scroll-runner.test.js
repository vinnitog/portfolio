const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const source = fs.readFileSync(path.join(root, "script.js"), "utf8");
const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");

class ClassList {
  constructor() { this.names = new Set(); }
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

class Style {
  constructor() { this.values = new Map(); }
  setProperty(name, value) { this.values.set(name, value); }
  getPropertyValue(name) { return this.values.get(name) || ""; }
}

function createClock() {
  let now = 0;
  let nextId = 1;
  const timers = new Map();
  return {
    setTimeout(callback, delay) {
      const id = nextId++;
      timers.set(id, { callback, at: now + delay });
      return id;
    },
    clearTimeout(id) { timers.delete(id); },
    advance(ms) {
      const target = now + ms;
      while (true) {
        const due = [...timers.entries()]
          .filter(([, timer]) => timer.at <= target)
          .sort((a, b) => a[1].at - b[1].at)[0];
        if (!due) break;
        const [id, timer] = due;
        timers.delete(id);
        now = timer.at;
        timer.callback();
      }
      now = target;
    },
    get pending() { return timers.size; }
  };
}

function createHarness({
  reducedMotion = false,
  runnerWidth = 128,
  headerWidth = null,
  innerWidth = 1000,
  innerHeight = 500,
  scrollHeight = 1500
} = {}) {
  const sprite = {
    attributes: new Map([["src", "assets/scroll-runner.png"]]),
    setAttribute(name, value) { this.attributes.set(name, String(value)); },
    getAttribute(name) { return this.attributes.get(name); }
  };
  const runner = {
    classList: new ClassList(),
    style: new Style(),
    querySelector(selector) { return selector === ".scroll-runner__sprite" ? sprite : null; },
    getBoundingClientRect() { return { width: runnerWidth }; }
  };
  const header = { getBoundingClientRect() { return { width: headerWidth ?? window.innerWidth }; } };
  const documentElement = {
    classList: new ClassList(),
    scrollHeight,
    lang: "pt-BR",
    setAttribute() {}
  };
  const document = {
    documentElement,
    body: { scrollHeight },
    title: "",
    querySelector(selector) {
      if (selector === "[data-scroll-runner]") return runner;
      if (selector === "[data-header]") return header;
      return null;
    },
    querySelectorAll() { return []; },
    addEventListener() {},
    createElement() { return { textContent: "" }; }
  };
  const clock = createClock();
  const listeners = new Map();
  const rafCallbacks = new Map();
  let nextRaf = 1;
  let rafRequests = 0;

  const window = {
    scrollY: 0,
    innerWidth,
    innerHeight,
    localStorage: { getItem() { return null; }, setItem() {} },
    matchMedia(query) {
      return { matches: query.includes("prefers-reduced-motion") && reducedMotion };
    },
    addEventListener(type, callback, options) {
      const entries = listeners.get(type) || [];
      entries.push({ callback, options });
      listeners.set(type, entries);
    },
    requestAnimationFrame(callback) {
      rafRequests += 1;
      const id = nextRaf++;
      rafCallbacks.set(id, callback);
      return id;
    },
    setTimeout: clock.setTimeout,
    clearTimeout: clock.clearTimeout
  };

  vm.runInNewContext(source, {
    document,
    window,
    navigator: {},
    location: { protocol: "file:" },
    console,
    Math
  });

  return {
    runner,
    sprite,
    window,
    document,
    clock,
    listeners,
    get rafRequests() { return rafRequests; },
    fire(type) {
      for (const entry of listeners.get(type) || []) entry.callback();
    },
    flushFrame() {
      const callbacks = [...rafCallbacks.values()];
      rafCallbacks.clear();
      for (const callback of callbacks) callback();
      return callbacks.length;
    },
    setRunnerWidth(value) { runnerWidth = value; },
    setHeaderWidth(value) { headerWidth = value; }
  };
}

function runnerX(harness) {
  return Number.parseFloat(harness.runner.style.getPropertyValue("--runner-x"));
}

function setScroll(harness, value) {
  harness.window.scrollY = value;
  harness.fire("scroll");
  assert.equal(harness.flushFrame(), 1);
}

function pngSize(file) {
  const buffer = fs.readFileSync(path.join(root, file));
  assert.equal(buffer.subarray(1, 4).toString(), "PNG");
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

test("THEME-01 P0: dark is applied inline before CSS and light is the only stored override", () => {
  const inline = html.match(/<script>([\s\S]*?)<\/script>\s*<link rel="stylesheet"/)?.[1] || "";
  assert.match(inline, /portfolio_theme/);
  assert.match(inline, /=== "light" \? "light" : "dark"/);
  assert.match(inline, /catch \(_\) \{[\s\S]*?dataset\.theme = "dark"/);
  assert.doesNotMatch(inline, /matchMedia\([^)]*prefers-color-scheme/);
  const toggle = html.match(/<button\b[^>]*class="theme-toggle"[^>]*>/)?.[0] || "";
  assert.match(toggle, /aria-pressed="true"/);
  assert.match(toggle, /aria-label="Ativar tema claro"/);
});

test("HERO-01 P0: summary is visual while the single localized h1 remains semantic", () => {
  const headings = [...html.matchAll(/<h1\b[^>]*>[\s\S]*?<\/h1>/g)];
  assert.equal(headings.length, 1);
  assert.match(headings[0][0], /class="sr-only"/);
  assert.match(headings[0][0], /id="hero-title"/);
  assert.match(headings[0][0], /data-i18n="hero\.title"/);
  const summary = html.match(/<p\b[^>]*class="hero-summary"[^>]*>[\s\S]*?<\/p>/)?.[0] || "";
  assert.match(summary, /data-i18n="hero\.summary"/);
  for (const fact of ["mais de 10 anos", "2019", "Ricochet360", "regras", "dados", "APIs", "interfaces", "automação", "bots", "IA"]) {
    assert.match(summary, new RegExp(fact, "i"), `hero summary missing: ${fact}`);
  }
  assert.match(source, /"hero\.title": "My journey through quality and development"/);
  assert.match(source, /"hero\.summary": "For more than 10 years/);
  assert.match(css, /\.hero-summary\s*\{[\s\S]*?overflow-wrap:\s*anywhere/s);
});

test("IA-REMOVE-01/ROUTE-DOT-01 P0: removed IA and pseudo-dot contracts leave no orphan", () => {
  const all = `${html}\n${css}\n${source}`;
  for (const removed of [/#sobre\b/, /nav\.about/, /section--intro/, /intro-body/, /experience-rail/]) {
    assert.doesNotMatch(all, removed);
  }
  assert.doesNotMatch(css, /\.route-node::(?:before|after)\b/);
  assert.doesNotMatch(html, /data-stage="[^"]+"[^>]*>[\s\S]*?class="route-dot"/);
  assert.match(html, /Ricochet360/);
  assert.match(html, /id="experiencia"/);
});

test("RUN-01 P0: header runner markup, three 288x192 PNG frames and provenance are complete", () => {
  const containers = [...html.matchAll(/<div\b[^>]*data-scroll-runner[^>]*>/g)];
  assert.equal(containers.length, 1);
  assert.match(containers[0][0], /aria-hidden="true"/);
  assert.match(html, /<header[\s\S]*data-scroll-runner[\s\S]*<\/header>/);
  const image = html.match(/<img\b[^>]*src="assets\/scroll-runner\.png"[^>]*>/)?.[0] || "";
  for (const contract of [/alt=""/, /width="288"/, /height="192"/, /decoding="async"/, /fetchpriority="low"/]) {
    assert.match(image, contract);
  }
  for (const file of ["assets/scroll-runner.png", "assets/scroll-runner-frame-2.png", "assets/scroll-runner-frame-3.png"]) {
    assert.deepEqual(pngSize(file), { width: 288, height: 192 });
    assert.ok(fs.statSync(path.join(root, file)).size > 0);
    assert.ok(fs.existsSync(path.join(root, `${file}.origin.txt`)));
  }
});

test("RUN-02/RUN-07 P0: progress is bounded, monotonic and finite across edge dimensions", () => {
  const harness = createHarness();
  assert.equal(runnerX(harness), 0);
  assert.equal(harness.runner.classList.contains("is-visible"), false);
  setScroll(harness, 8);
  const at8 = runnerX(harness);
  assert.equal(harness.runner.classList.contains("is-visible"), false);
  setScroll(harness, 9);
  const at9 = runnerX(harness);
  assert.equal(harness.runner.classList.contains("is-visible"), true);
  setScroll(harness, 500);
  const halfway = runnerX(harness);
  setScroll(harness, 1000);
  const end = runnerX(harness);
  assert.ok(0 <= at8 && at8 <= at9 && at9 <= halfway && halfway <= end);
  assert.equal(end, 1000 - 128);
  setScroll(harness, 5000);
  assert.equal(runnerX(harness), end, "progress above the scroll range must clamp to one");

  const edge = createHarness({ runnerWidth: 0, innerWidth: 20, innerHeight: 500, scrollHeight: 0 });
  edge.window.scrollY = -50;
  edge.fire("resize");
  edge.flushFrame();
  assert.equal(runnerX(edge), 0);
  assert.ok(Number.isFinite(runnerX(edge)));
});

test("RUN-03 P0: direction flips only for deltas whose absolute value exceeds one", () => {
  const harness = createHarness();
  setScroll(harness, 10);
  assert.equal(harness.runner.style.getPropertyValue("--runner-facing"), "1");
  assert.equal(harness.runner.classList.contains("is-reversed"), false);
  assert.equal(harness.runner.classList.contains("is-running"), true);
  setScroll(harness, 9);
  assert.equal(harness.runner.style.getPropertyValue("--runner-facing"), "1");
  assert.equal(harness.runner.classList.contains("is-reversed"), false);
  assert.equal(harness.runner.classList.contains("is-running"), false);
  setScroll(harness, 7);
  assert.equal(harness.runner.style.getPropertyValue("--runner-facing"), "-1");
  assert.equal(harness.runner.classList.contains("is-reversed"), true);
  assert.equal(harness.runner.classList.contains("is-running"), true);
  setScroll(harness, 8);
  assert.equal(harness.runner.style.getPropertyValue("--runner-facing"), "-1");
  assert.equal(harness.runner.classList.contains("is-reversed"), true);
});

test("RUN-03 P0: all three sprite frames alternate deterministically with significant scroll", () => {
  const harness = createHarness();
  assert.equal(harness.sprite.getAttribute("src"), "assets/scroll-runner.png");
  setScroll(harness, 28);
  assert.equal(harness.sprite.getAttribute("src"), "assets/scroll-runner-frame-2.png");
  setScroll(harness, 56);
  assert.equal(harness.sprite.getAttribute("src"), "assets/scroll-runner-frame-3.png");
  setScroll(harness, 84);
  assert.equal(harness.sprite.getAttribute("src"), "assets/scroll-runner.png");
  setScroll(harness, 56);
  assert.equal(harness.sprite.getAttribute("src"), "assets/scroll-runner-frame-3.png",
    "reverse scroll must use the same deterministic frame sequence");
});

test("RUN-04 P1: idle state clears exactly 160ms after the latest meaningful render", () => {
  const harness = createHarness();
  setScroll(harness, 20);
  assert.equal(harness.runner.classList.contains("is-running"), true);
  harness.clock.advance(159);
  assert.equal(harness.runner.classList.contains("is-running"), true);
  harness.clock.advance(1);
  assert.equal(harness.runner.classList.contains("is-running"), false);

  setScroll(harness, 40);
  harness.clock.advance(100);
  setScroll(harness, 60);
  harness.clock.advance(159);
  assert.equal(harness.runner.classList.contains("is-running"), true);
  harness.clock.advance(1);
  assert.equal(harness.runner.classList.contains("is-running"), false);
});

test("RUN-05 P0: scroll bursts coalesce to one passive RAF and a later burst schedules another", () => {
  const harness = createHarness();
  const scrollRegistration = harness.listeners.get("scroll");
  assert.equal(scrollRegistration.length, 1);
  assert.equal(scrollRegistration[0].options.passive, true);
  harness.fire("scroll");
  harness.fire("scroll");
  harness.fire("scroll");
  assert.equal(harness.rafRequests, 1);
  assert.equal(harness.flushFrame(), 1);
  harness.fire("scroll");
  harness.fire("scroll");
  assert.equal(harness.rafRequests, 2);
  assert.equal(harness.flushFrame(), 1);
});

test("RUN-06 P1: resize reuses RAF and recalculates width, range and position", () => {
  const harness = createHarness({ runnerWidth: 100, innerWidth: 1000, innerHeight: 500, scrollHeight: 1500 });
  setScroll(harness, 500);
  assert.equal(runnerX(harness), (1000 - 100) * 0.5);
  harness.window.innerWidth = 600;
  harness.window.innerHeight = 400;
  harness.document.documentElement.scrollHeight = 1400;
  harness.document.body.scrollHeight = 1400;
  harness.setRunnerWidth(80);
  harness.fire("resize");
  assert.equal(harness.flushFrame(), 1);
  assert.equal(runnerX(harness), (600 - 80) * 0.5);
});

test("RUN-06 P0: horizontal travel is bounded by the header instead of the viewport", () => {
  const harness = createHarness({ runnerWidth: 100, headerWidth: 640, innerWidth: 1200 });
  setScroll(harness, 1000);
  assert.equal(runnerX(harness), 540, "runner must stop at header width minus sprite width");
  assert.ok(runnerX(harness) < harness.window.innerWidth - 100,
    "a narrower header must prevent viewport-wide travel");

  harness.setHeaderWidth(420);
  harness.fire("resize");
  assert.equal(harness.flushFrame(), 1);
  assert.equal(runnerX(harness), 320);
});

test("RUN-08 P0: reduced motion installs no runner listeners, RAF or timers", () => {
  const reduced = createHarness({ reducedMotion: true });
  assert.equal(reduced.listeners.has("scroll"), false);
  assert.equal(reduced.listeners.has("resize"), false);
  assert.equal(reduced.rafRequests, 0);
  assert.equal(reduced.clock.pending, 0);
  assert.equal(reduced.document.documentElement.classList.contains("has-motion"), false);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.scroll-runner\s*\{\s*display:\s*none/s);

  const normal = createHarness();
  assert.equal(normal.document.documentElement.classList.contains("has-motion"), true);
  assert.match(source, /scroll-runner-frame-2\.png/);
  assert.match(source, /scroll-runner-frame-3\.png/);
});

test("RUN-10 P2: runner gets a dedicated header lane, stays noninteractive, pixelated and responsive", () => {
  assert.match(css, /\.scroll-runner\s*\{[\s\S]*?position:\s*absolute;[\s\S]*?z-index:\s*1;[\s\S]*?bottom:\s*-0\.18rem;[\s\S]*?width:\s*clamp\(3\.4rem,\s*4\.1vw,\s*4\.25rem\);[\s\S]*?pointer-events:\s*none;/s);
  assert.match(css, /\.site-header\s*\{[\s\S]*?position:\s*sticky;[\s\S]*?min-height:\s*7rem;[\s\S]*?padding-bottom:\s*1\.75rem;[\s\S]*?border-bottom:\s*1px dashed var\(--header-rule\);[\s\S]*?isolation:\s*isolate;/s);
  assert.match(css, /\.site-header > :not\(\.scroll-runner\)\s*\{[\s\S]*?position:\s*relative;[\s\S]*?z-index:\s*2;/s,
    "header content must stay in the foreground while the runner occupies its dedicated lower lane");
  assert.match(css, /\.scroll-runner__sprite\s*\{[\s\S]*?image-rendering:\s*pixelated;[\s\S]*?transform:\s*scaleX\(var\(--runner-facing,\s*1\)\)/s);
  assert.match(css, /@media \(max-width:\s*760px\)[\s\S]*?\.site-header\s*\{[\s\S]*?min-height:\s*6rem;[\s\S]*?padding-bottom:\s*1\.35rem;/s);
  assert.match(css, /@media \(max-width:\s*760px\)[\s\S]*?\.scroll-runner\s*\{[\s\S]*?bottom:\s*-0\.15rem;[\s\S]*?width:\s*3\.1rem;/s);
});

test("SW22-01/02 P0: all runner frames are in the exact v22 atomic app shell", () => {
  assert.match(sw, /const CACHE_NAME = "portfolio-v22"/);
  const shell = sw.match(/const APP_SHELL = \[([\s\S]*?)\];/)?.[1] || "";
  for (const file of ["scroll-runner.png", "scroll-runner-frame-2.png", "scroll-runner-frame-3.png"]) {
    assert.match(shell, new RegExp(`"\\.\\/assets\\/${file.replaceAll(".", "\\.")}"`));
  }
  assert.match(sw, /cache\.addAll\(APP_SHELL\)[\s\S]*?self\.skipWaiting\(\)/);
  assert.match(sw, /key\.startsWith\(CACHE_PREFIX\) && key !== CACHE_NAME[\s\S]*?self\.clients\.claim\(\)/);
});
