const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const appSource = fs.readFileSync(path.join(root, "script.js"), "utf8");
const swSource = fs.readFileSync(path.join(root, "sw.js"), "utf8");
const cacheName = swSource.match(/const CACHE_NAME = "([^"]+)"/)[1];

class MockClassList {
  constructor(names = []) {
    this.names = new Set(names);
  }

  add(name) {
    this.names.add(name);
  }

  remove(name) {
    this.names.delete(name);
  }

  toggle(name, force) {
    const enabled = force === undefined ? !this.names.has(name) : force;
    if (enabled) this.names.add(name);
    else this.names.delete(name);
    return enabled;
  }

  contains(name) {
    return this.names.has(name);
  }
}

class MockElement {
  constructor({ dataset = {}, attributes = {}, classes = [], isLink = false } = {}) {
    this.dataset = dataset;
    this.attributes = new Map(Object.entries(attributes));
    this.classList = new MockClassList(classes);
    this.listeners = new Map();
    this.children = [];
    this.textContent = "";
    this.focused = false;
    this.isLink = isLink;
    this.label = null;
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
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }

  replaceChildren(...children) {
    this.children = children;
  }

  querySelector(selector) {
    return selector === ".sr-only" ? this.label : null;
  }

  closest(selector) {
    return selector === "a" && this.isLink ? this : null;
  }

  focus() {
    this.focused = true;
    this.dispatch("focus");
  }
}

function createAppHarness({ reducedMotion = false } = {}) {
  const stages = ["discovery", "privacy", "development", "design", "review", "quality", "automation", "delivery"];
  const nodes = stages.map((stage) => new MockElement({
    dataset: { stage },
    attributes: { "aria-pressed": String(stage === "discovery") },
    classes: stage === "discovery" ? ["is-active"] : []
  }));
  const title = new MockElement();
  title.textContent = "APIs";
  const list = new MockElement();
  const label = new MockElement();
  label.textContent = "Abrir navegação";
  const toggle = new MockElement({ attributes: { "aria-expanded": "false" } });
  toggle.label = label;
  const nav = new MockElement();
  const documentListeners = new Map();
  const documentElement = { classList: new MockClassList() };

  const document = {
    documentElement,
    querySelector(selector) {
      return {
        "#evidence-title": title,
        "#evidence-list": list,
        ".nav-toggle": toggle,
        "#site-nav": nav
      }[selector] || null;
    },
    querySelectorAll(selector) {
      if (selector === "[data-stage]") return nodes;
      if (selector === '.site-nav a[href^="#"]') return [];
      return [];
    },
    createElement() {
      return new MockElement();
    },
    addEventListener(type, listener) {
      const listeners = documentListeners.get(type) || [];
      listeners.push(listener);
      documentListeners.set(type, listeners);
    }
  };

  const window = {
    matchMedia() {
      return { matches: reducedMotion };
    }
  };

  vm.runInNewContext(appSource, {
    document,
    window,
    navigator: {},
    location: { protocol: "file:" },
    console
  });

  return {
    nodes,
    title,
    list,
    toggle,
    nav,
    label,
    documentElement,
    dispatchDocument(type, event) {
      for (const listener of documentListeners.get(type) || []) listener(event);
    }
  };
}

function createSwHarness() {
  const listeners = new Map();
  const opened = [];
  const added = [];
  const deleted = [];
  const cachedResponses = new Map();
  let skipped = false;
  let claimed = false;
  let networkCalls = 0;

  const caches = {
    async open(name) {
      opened.push(name);
      return {
        async addAll(files) {
          added.push(...files);
        }
      };
    },
    async keys() {
      return ["portfolio-v1", "other-project-v7", cacheName];
    },
    async delete(name) {
      deleted.push(name);
      return true;
    },
    async match(request) {
      return cachedResponses.get(request.url || request);
    }
  };

  const self = {
    addEventListener(type, listener) {
      listeners.set(type, listener);
    },
    async skipWaiting() {
      skipped = true;
    },
    clients: {
      async claim() {
        claimed = true;
      }
    }
  };

  vm.runInNewContext(swSource, {
    self,
    caches,
    fetch: async () => {
      networkCalls += 1;
      throw new Error("network unavailable");
    },
    Promise
  });

  return {
    listeners,
    opened,
    added,
    deleted,
    cachedResponses,
    get skipped() { return skipped; },
    get claimed() { return claimed; },
    get networkCalls() { return networkCalls; }
  };
}

function waitableEvent(extra = {}) {
  let promise;
  return {
    event: {
      ...extra,
      waitUntil(value) { promise = value; }
    },
    async done() { await promise; }
  };
}

test("RT-01 P0: click activates every route stage with four matching evidence items", () => {
  const harness = createAppHarness();
  const expected = {
    discovery: ["Descoberta", "Objetivo, público e contexto", "Requisitos e riscos", "Stack e limites", "Escopo verificável"],
    privacy: ["Privacidade", "Dados pessoais", "Base legal quando aplicável", "Segurança e retenção", "Revisão humana"],
    development: ["Desenvolvimento", "Escopo pequeno", "Código limpo", "PWA e arquitetura", "Cenários de borda"],
    design: ["UI/UX", "Hierarquia e fluxo", "Responsividade", "Acessibilidade", "Movimento com propósito"],
    review: ["Code Review", "Regressões e riscos", "Segurança", "Performance", "Cobertura ausente"],
    quality: ["Estratégia QA", "Impacto da mudança", "Casos P0, P1 e P2", "Regressão obrigatória", "Critérios de aceite"],
    automation: ["Automação", "Testes executáveis", "CI em develop e main", "Service Worker", "Smoke tests"],
    delivery: ["Entrega", "Suíte verde", "Diff revisado", "develop para main", "PR para aprovação"]
  };

  for (const node of harness.nodes) {
    node.dispatch("click");
    assert.equal(harness.title.textContent, expected[node.dataset.stage][0]);
    assert.deepEqual(harness.list.children.map((item) => item.textContent), expected[node.dataset.stage].slice(1));
    assert.equal(harness.nodes.filter((item) => item.classList.contains("is-active")).length, 1);
    assert.equal(harness.nodes.filter((item) => item.getAttribute("aria-pressed") === "true").length, 1);
  }
});

test("RT-02 P1: pointerenter deterministically activates a stage", () => {
  const harness = createAppHarness();
  harness.nodes[4].dispatch("pointerenter");
  assert.equal(harness.title.textContent, "Code Review");
  assert.equal(harness.nodes[4].getAttribute("aria-pressed"), "true");
});

test("RT-03 P0: focus updates evidence without trapping the route", () => {
  const harness = createAppHarness();
  for (const node of harness.nodes) node.focus();
  assert.equal(harness.title.textContent, "Entrega");
  assert.ok(harness.nodes.every((node) => node.focused));
});

test("NAV-01 P0: toggle synchronizes class, aria-expanded and accessible label", () => {
  const harness = createAppHarness();
  harness.toggle.dispatch("click");
  assert.equal(harness.toggle.getAttribute("aria-expanded"), "true");
  assert.ok(harness.nav.classList.contains("is-open"));
  assert.equal(harness.label.textContent, "Fechar navegação");
  harness.toggle.dispatch("click");
  assert.equal(harness.toggle.getAttribute("aria-expanded"), "false");
  assert.equal(harness.label.textContent, "Abrir navegação");
});

test("NAV-02 P0: Escape closes an open menu and returns focus only when needed", () => {
  const harness = createAppHarness();
  harness.toggle.dispatch("click");
  harness.dispatchDocument("keydown", { key: "Escape" });
  assert.equal(harness.toggle.getAttribute("aria-expanded"), "false");
  assert.ok(harness.toggle.focused);

  harness.toggle.focused = false;
  harness.dispatchDocument("keydown", { key: "Escape" });
  assert.equal(harness.toggle.focused, false, "closed menu should not steal focus");
});

test("NAV-03 P1: activating a navigation link closes the disclosure", () => {
  const harness = createAppHarness();
  const link = new MockElement({ isLink: true });
  harness.toggle.dispatch("click");
  harness.nav.dispatch("click", { target: link });
  assert.equal(harness.toggle.getAttribute("aria-expanded"), "false");
  assert.equal(harness.nav.classList.contains("is-open"), false);
});

test("NAV-04 P1: breakpoint changes explicitly clear mobile disclosure state", () => {
  assert.match(appSource,
    /(?:addEventListener\("resize"|matchMedia\("\(max-width:\s*760px\)"\)[\s\S]*?addEventListener\("change")/,
    "script.js needs a resize/media-query listener that clears is-open and aria-expanded outside mobile");
});

test("MOT-01/MOT-02 P1/P2: reduced motion suppresses the class and default motion enables it", () => {
  assert.equal(createAppHarness({ reducedMotion: true }).documentElement.classList.contains("has-motion"), false);
  assert.equal(createAppHarness({ reducedMotion: false }).documentElement.classList.contains("has-motion"), true);
});

test("AX-05 P1: section tracking has an IntersectionObserver guard and current-state update", () => {
  assert.match(appSource, /if \(!sections\.length \|\| !\("IntersectionObserver" in window\)\) return/);
  assert.match(appSource, /setAttribute\("aria-current", "true"\)/);
  assert.match(appSource, /removeAttribute\("aria-current"\)/);
});

test("AX-06 P1: returning to the hero clears stale section state and restores visible focus", () => {
  const trackingSource = appSource.match(/function setupSectionTracking\(\)[\s\S]*?(?=\nfunction setupBackToTop)/)?.[0] || "";
  const backToTopSource = appSource.match(/function setupBackToTop\(\)[\s\S]*?(?=\nfunction setupScrollRunner)/)?.[0] || "";
  const sectionIds = ["experiencia", "projetos", "contato"];
  const sections = Object.fromEntries(sectionIds.map((id) => [id, { id }]));
  const links = sectionIds.map((id) => {
    const attributes = new Map([["href", `#${id}`]]);
    return {
      getAttribute: (name) => attributes.get(name) ?? null,
      setAttribute: (name, value) => attributes.set(name, String(value)),
      removeAttribute: (name) => attributes.delete(name)
    };
  });
  let observerCallback;
  class TestObserver {
    constructor(callback) { observerCallback = callback; }
    observe() {}
  }
  const document = {
    querySelectorAll: () => links,
    querySelector: (selector) => sections[selector.slice(1)] || null
  };
  vm.runInNewContext(`${trackingSource}; setupSectionTracking();`, {
    document,
    window: { IntersectionObserver: TestObserver },
    IntersectionObserver: TestObserver
  });

  observerCallback([{ target: sections.contato, isIntersecting: true, intersectionRatio: 0.8 }]);
  assert.equal(links[2].getAttribute("aria-current"), "true");
  observerCallback([{ target: sections.contato, isIntersecting: false, intersectionRatio: 0 }]);
  assert.deepEqual(links.map((link) => link.getAttribute("aria-current")), [null, null, null]);

  let clickHandler;
  let scheduledFocus;
  let focusOptions;
  const backToTop = { addEventListener: (_type, handler) => { clickHandler = handler; } };
  const homeLink = { focus: (options) => { focusOptions = options; } };
  vm.runInNewContext(`${backToTopSource}; setupBackToTop();`, {
    document: {
      querySelector: (selector) => selector === "[data-back-to-top]" ? backToTop : homeLink
    },
    window: { requestAnimationFrame: (callback) => { scheduledFocus = callback; } }
  });
  clickHandler();
  assert.equal(typeof scheduledFocus, "function");
  scheduledFocus();
  assert.equal(focusOptions?.preventScroll, true);
});

test("SW-01 P0: install atomically caches the current version before skipWaiting", async () => {
  const harness = createSwHarness();
  const install = waitableEvent();
  harness.listeners.get("install")(install.event);
  await install.done();
  assert.deepEqual(harness.opened, [cacheName]);
  assert.ok(harness.added.includes("./index.html"));
  assert.ok(harness.added.includes("./assets/avatar-vinicius-128.jpg"));
  assert.ok(harness.skipped);
});

test("SW-02/SW-03 P0: cached app-shell requests work without network", async () => {
  const harness = createSwHarness();
  const cached = { status: 200, source: "cache" };
  const request = { method: "GET", url: "http://local/index.html" };
  harness.cachedResponses.set(request.url, cached);
  let responsePromise;
  harness.listeners.get("fetch")({
    request,
    respondWith(value) { responsePromise = value; }
  });
  assert.equal(await responsePromise, cached);
  assert.equal(harness.networkCalls, 0);
});

test("SW-04 P1: activation removes only old portfolio caches and claims clients", async () => {
  const harness = createSwHarness();
  const activate = waitableEvent();
  harness.listeners.get("activate")(activate.event);
  await activate.done();
  assert.deepEqual(harness.deleted, ["portfolio-v1"]);
  assert.ok(harness.claimed);
});

test("SW-05 P1: registration is guarded and failures are contained", () => {
  assert.match(appSource, /!\("serviceWorker" in navigator\) \|\| location\.protocol === "file:"/);
  assert.match(appSource, /serviceWorker\.register\("\.\/sw\.js"\)\.catch/);
});
