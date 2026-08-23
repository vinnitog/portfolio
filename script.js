const STORAGE_KEYS = {
  language: "portfolio_language",
  theme: "portfolio_theme"
};

const THEME_COLORS = {
  light: "#f9f6f5",
  dark: "#0f1719"
};

const TRANSLATIONS = {
  pt: {
    documentTitle: "Vinícius Tognoli — QA Engineer",
    metaDescription: "Portfólio de Vinícius Tognoli, QA Engineer especializado em automação, IA e qualidade end-to-end.",
    ogTitle: "Vinícius Tognoli — QA Engineer",
    ogDescription: "Test Automation, IA e qualidade end-to-end: Database, Backend, APIs e Frontend.",
    ogImageAlt: "Qualidade que conecta Database, Backend, APIs e Frontend — portfólio de Vinícius Tognoli.",
    skip: "Pular para o conteúdo",
    "identity.home": "Vinícius Tognoli — início",
    "identity.linkedin": "Abrir LinkedIn de Vinícius Tognoli",
    "nav.label": "Navegação principal",
    "nav.experience": "Experiência",
    "nav.projects": "Projetos",
    "nav.contact": "Contato",
    "nav.open": "Abrir navegação",
    "nav.close": "Fechar navegação",
    "controls.language": "Selecionar idioma",
    "controls.portuguese": "Usar português do Brasil",
    "controls.english": "Usar inglês americano",
    "controls.dark": "Ativar tema escuro",
    "controls.light": "Ativar tema claro",
    "hero.title": "Minha trajetória em qualidade e desenvolvimento",
    "hero.summary": "Há mais de 10 anos eu trabalho no encontro entre qualidade e desenvolvimento. Desde 2019, na Ricochet360, investigo regras, dados, APIs e interfaces — e atualmente uso automação, bots e IA para transformar problemas complexos em entregas mais seguras.",
    "route.label": "Meu fluxo de projeto, do contexto à entrega",
    "route.summary": "Cada parada abre as evidências e cuidados que aplico antes de avançar.",
    "route.discovery": "Descoberta",
    "route.privacy": "Privacidade",
    "route.development": "Desenvolvimento",
    "route.design": "UI/UX",
    "route.review": "Code Review",
    "route.quality": "Estratégia QA",
    "route.automation": "Automação",
    "route.delivery": "Entrega",
    "experience.title": "Qualidade como prática de engenharia.",
    "experience.roleSummary": "Validação end-to-end de produtos, cobrindo banco de dados, backend, APIs, integrações e frontend.",
    "experience.investigate": "Investigar",
    "experience.investigateBody": "Falhas em dados, regras de negócio, integrações e interfaces.",
    "experience.automate": "Automatizar",
    "experience.automateBody": "Testes, bots e ferramentas que reduzem trabalho repetitivo e ampliam a cobertura.",
    "experience.anticipate": "Antecipar",
    "experience.anticipateBody": "Cenários, critérios de aceitação e riscos antes de a entrega chegar à produção.",
    "experience.collaborate": "Colaborar",
    "experience.collaborateBody": "Desenvolvimento e produto alinhados durante todo o ciclo de entrega.",
    "method.title": "Do requisito à evidência.",
    "method.summary": "Uma sequência simples para reduzir incerteza sem transformar qualidade em uma etapa isolada.",
    "method.understand": "Entender",
    "method.understandBody": "Contexto, regra de negócio e risco.",
    "method.model": "Modelar",
    "method.modelBody": "Cenários, dados e critérios testáveis.",
    "method.validate": "Validar",
    "method.validateBody": "Camadas, integrações e experiência real.",
    "method.automate": "Automatizar",
    "method.automateBody": "O que precisa continuar verdadeiro.",
    "skills.title": "Ferramentas a serviço da investigação.",
    "skills.summary": "A stack muda. O compromisso com rastreabilidade, segurança e clareza permanece.",
    "skills.quality": "Qualidade",
    "skills.development": "Desenvolvimento",
    "skills.data": "Dados",
    "skills.dataItems": "SQL · PostgreSQL · Supabase · RLS · Autenticação · Integrações",
    "skills.delivery": "Entrega",
    "skills.deliveryItems": "Playwright · GitHub Actions · Automação de pipelines · Segurança · IA aplicada ao desenvolvimento e QA",
    "projects.title": "Projetos que colocam o método em prática.",
    "projects.summary": "Um case principal e um índice direto de produtos, ferramentas e experimentos que já transformei em software.",
    "projects.verbaTitle": "Cálculos trabalhistas com memória, casos e contexto jurídico.",
    "projects.verbaBody": "PWA de apoio profissional com autenticação, casos protegidos no Supabase, memória por rubrica, 30 modelos explicados em glossário e assinaturas via Stripe.",
    "projects.featureLabel": "Case principal",
    "projects.ready": "Pronto para uso",
    "projects.ledgerLabel": "Outros projetos selecionados",
    "projects.txBody": "PWA com autenticação via Supabase, ledger de créditos, Edge Functions, Mercado Pago em ambiente de teste, controles de segurança e automação com Playwright.",
    "projects.rdpBody": "PWA para Registro de Pensamentos em TCC, com experiências distintas para paciente e psicólogo, convites, autenticação, RLS, Edge Functions e testes.",
    "projects.headsUpBody": "Dashboard PWA que reúne clima, alertas regionais, notícias de Marília-SP e registros de bolas de fogo da NASA/JPL, com falhas isoladas por fonte.",
    "projects.headsUpStack": "React · Vite · Recharts · APIs públicas",
    "projects.gamesBody": "PWA mobile-first para agenda, placares, transmissões e fases das principais competições acompanhadas no Brasil, com cache e operação degradada offline.",
    "projects.coleusBody": "MVP de atendimento por regras com catálogo configurável, painel protegido, integração preparada para WhatsApp Cloud API e cotação de frete Jadlog.",
    "projects.coleusStack": "Node.js · WhatsApp Cloud API · Jadlog · Segurança",
    "projects.repository": "Examinar repositório",
    "projects.verbaRepository": "Examinar repositório do VerbaJus",
    "projects.txRepository": "Examinar repositório do TX Raio-X",
    "projects.rdpRepository": "Examinar repositório do RDP Pro",
    "projects.headsUpRepository": "Examinar repositório do Togs Heads Up",
    "projects.gamesRepository": "Examinar repositório do Jogos de Hoje",
    "projects.coleusRepository": "Examinar repositório da Casa dos Coleus",
    "contact.title": "Vamos construir entregas que resistem ao caminho inteiro.",
    "contact.summary": "Veja o código, acompanhe meu trabalho ou inicie uma conversa pelos perfis onde você já me encontrou.",
    "footer.built": "Projetado e desenvolvido com qualidade end-to-end.",
    "footer.back": "Voltar ao início"
  },
  en: {
    documentTitle: "Vinícius Tognoli — QA Engineer",
    metaDescription: "Portfolio of Vinícius Tognoli, a QA Engineer specializing in automation, AI, and end-to-end quality.",
    ogTitle: "Vinícius Tognoli — QA Engineer",
    ogDescription: "Test Automation, AI, and end-to-end quality across Database, Backend, APIs, and Frontend.",
    ogImageAlt: "Quality connecting Database, Backend, APIs, and Frontend — Vinícius Tognoli's portfolio.",
    skip: "Skip to content",
    "identity.home": "Vinícius Tognoli — home",
    "identity.linkedin": "Open Vinícius Tognoli's LinkedIn profile",
    "nav.label": "Main navigation",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.open": "Open navigation",
    "nav.close": "Close navigation",
    "controls.language": "Select language",
    "controls.portuguese": "Use Brazilian Portuguese",
    "controls.english": "Use American English",
    "controls.dark": "Enable dark theme",
    "controls.light": "Enable light theme",
    "hero.title": "My journey through quality and development",
    "hero.summary": "For more than 10 years, I’ve worked where quality and development meet. Since 2019 at Ricochet360, I’ve investigated rules, data, APIs, and interfaces — and I currently use automation, bots, and AI to turn complex problems into safer releases.",
    "route.label": "My project flow, from context to delivery",
    "route.summary": "Each stop reveals the evidence and safeguards I apply before moving forward.",
    "route.discovery": "Discovery",
    "route.privacy": "Privacy",
    "route.development": "Development",
    "route.design": "UI/UX",
    "route.review": "Code Review",
    "route.quality": "QA Strategy",
    "route.automation": "Automation",
    "route.delivery": "Delivery",
    "experience.title": "Quality as an engineering practice.",
    "experience.roleSummary": "End-to-end product validation across databases, backend, APIs, integrations, and frontend.",
    "experience.investigate": "Investigate",
    "experience.investigateBody": "Failures in data, business rules, integrations, and interfaces.",
    "experience.automate": "Automate",
    "experience.automateBody": "Tests, bots, and tools that reduce repetitive work and expand coverage.",
    "experience.anticipate": "Anticipate",
    "experience.anticipateBody": "Scenarios, acceptance criteria, and risks before a release reaches production.",
    "experience.collaborate": "Collaborate",
    "experience.collaborateBody": "Development and product aligned throughout the delivery cycle.",
    "method.title": "From requirement to evidence.",
    "method.summary": "A simple sequence to reduce uncertainty without turning quality into an isolated stage.",
    "method.understand": "Understand",
    "method.understandBody": "Context, business rule, and risk.",
    "method.model": "Model",
    "method.modelBody": "Scenarios, data, and testable criteria.",
    "method.validate": "Validate",
    "method.validateBody": "Layers, integrations, and real user experience.",
    "method.automate": "Automate",
    "method.automateBody": "What must remain true over time.",
    "skills.title": "Tools in service of investigation.",
    "skills.summary": "The stack changes. The commitment to traceability, security, and clarity remains.",
    "skills.quality": "Quality",
    "skills.development": "Development",
    "skills.data": "Data",
    "skills.dataItems": "SQL · PostgreSQL · Supabase · RLS · Authentication · Integrations",
    "skills.delivery": "Delivery",
    "skills.deliveryItems": "Playwright · GitHub Actions · Pipeline automation · Security · AI applied to development and QA",
    "projects.title": "Projects that put the method into practice.",
    "projects.summary": "One primary case and a direct index of products, tools, and experiments I have already turned into software.",
    "projects.verbaTitle": "Brazilian labor calculations with memory, cases, and legal context.",
    "projects.verbaBody": "A professional-support PWA with authentication, protected Supabase cases, calculation memory by category, 30 models documented in a glossary, and Stripe subscriptions.",
    "projects.featureLabel": "Primary case",
    "projects.ready": "Ready to use",
    "projects.ledgerLabel": "Other selected projects",
    "projects.txBody": "A PWA with Supabase authentication, a credit ledger, Edge Functions, Mercado Pago in a test environment, security controls, and Playwright automation.",
    "projects.rdpBody": "A CBT thought record PWA with distinct patient and psychologist experiences, invitations, authentication, RLS, Edge Functions, and tests.",
    "projects.headsUpBody": "A PWA dashboard that brings together weather, regional alerts, news from Marília, and NASA/JPL fireball records, with isolated failure handling for each source.",
    "projects.headsUpStack": "React · Vite · Recharts · Public APIs",
    "projects.gamesBody": "A mobile-first PWA for schedules, scores, broadcasts, and tournament stages across major competitions followed in Brazil, with caching and graceful offline operation.",
    "projects.coleusBody": "A rule-based service MVP with a configurable catalog, protected management panel, WhatsApp Cloud API integration groundwork, and Jadlog shipping quotes.",
    "projects.coleusStack": "Node.js · WhatsApp Cloud API · Jadlog · Security",
    "projects.repository": "View repository",
    "projects.verbaRepository": "View the VerbaJus repository",
    "projects.txRepository": "View the TX Raio-X repository",
    "projects.rdpRepository": "View the RDP Pro repository",
    "projects.headsUpRepository": "View the Togs Heads Up repository",
    "projects.gamesRepository": "View the Jogos de Hoje repository",
    "projects.coleusRepository": "View the Casa dos Coleus repository",
    "contact.title": "Let's build releases that hold up across the entire path.",
    "contact.summary": "Browse the code, follow my work, or start a conversation through the profiles where you already found me.",
    "footer.built": "Designed and developed with end-to-end quality.",
    "footer.back": "Back to top"
  }
};

const STAGE_CONTENT = {
  pt: {
    discovery: { title: "Descoberta", items: ["Objetivo, público e contexto", "Requisitos e riscos", "Stack e limites", "Escopo verificável"] },
    privacy: { title: "Privacidade", items: ["Dados pessoais", "Base legal quando aplicável", "Segurança e retenção", "Revisão humana"] },
    development: { title: "Desenvolvimento", items: ["Escopo pequeno", "Código limpo", "PWA e arquitetura", "Cenários de borda"] },
    design: { title: "UI/UX", items: ["Hierarquia e fluxo", "Responsividade", "Acessibilidade", "Movimento com propósito"] },
    review: { title: "Code Review", items: ["Regressões e riscos", "Segurança", "Performance", "Cobertura ausente"] },
    quality: { title: "Estratégia QA", items: ["Impacto da mudança", "Casos P0, P1 e P2", "Regressão obrigatória", "Critérios de aceite"] },
    automation: { title: "Automação", items: ["Testes executáveis", "CI em develop e main", "Service Worker", "Smoke tests"] },
    delivery: { title: "Entrega", items: ["Suíte verde", "Diff revisado", "develop para main", "PR para aprovação"] }
  },
  en: {
    discovery: { title: "Discovery", items: ["Goal, audience, and context", "Requirements and risks", "Stack and constraints", "Verifiable scope"] },
    privacy: { title: "Privacy", items: ["Personal data", "Legal basis when applicable", "Security and retention", "Human review"] },
    development: { title: "Development", items: ["Small scope", "Clean code", "PWA and architecture", "Edge cases"] },
    design: { title: "UI/UX", items: ["Hierarchy and flow", "Responsiveness", "Accessibility", "Purposeful motion"] },
    review: { title: "Code Review", items: ["Regressions and risks", "Security", "Performance", "Missing coverage"] },
    quality: { title: "QA Strategy", items: ["Change impact", "P0, P1, and P2 cases", "Required regression", "Acceptance criteria"] },
    automation: { title: "Automation", items: ["Executable tests", "CI on develop and main", "Service Worker", "Smoke tests"] },
    delivery: { title: "Delivery", items: ["Green test suite", "Reviewed diff", "develop to main", "PR for approval"] }
  }
};

function readPreference(key, fallback) {
  try {
    return window.localStorage?.getItem(key) || fallback;
  } catch (_) {
    return fallback;
  }
}

function savePreference(key, value) {
  try {
    window.localStorage?.setItem(key, value);
  } catch (_) {
    // Preferences remain session-only when storage is unavailable.
  }
}

let currentLanguage = readPreference(STORAGE_KEYS.language, "pt") === "en" ? "en" : "pt";
let currentTheme = readPreference(STORAGE_KEYS.theme, "dark") === "light" ? "light" : "dark";
let refreshActiveStage = () => {};

function copy(key) {
  return TRANSLATIONS[currentLanguage][key] || TRANSLATIONS.pt[key] || key;
}

function updateControlLabels() {
  const navToggle = document.querySelector(".nav-toggle");
  const navLabel = navToggle?.querySelector(".sr-only");
  const isNavOpen = navToggle?.getAttribute("aria-expanded") === "true";
  if (navLabel) navLabel.textContent = copy(isNavOpen ? "nav.close" : "nav.open");

  document.querySelectorAll("[data-language]").forEach((button) => {
    const isActive = button.dataset.language === currentLanguage;
    button.setAttribute("aria-pressed", String(isActive));
    button.setAttribute("aria-label", copy(button.dataset.language === "pt" ? "controls.portuguese" : "controls.english"));
  });

  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(currentTheme === "dark"));
    themeToggle.setAttribute("aria-label", copy(currentTheme === "dark" ? "controls.light" : "controls.dark"));
  }
}

function applyLanguage(language, persist = true) {
  currentLanguage = language === "en" ? "en" : "pt";
  document.documentElement.lang = currentLanguage === "en" ? "en-US" : "pt-BR";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = copy(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", copy(element.dataset.i18nAriaLabel));
  });

  document.title = copy("documentTitle");
  document.querySelector('meta[name="description"]')?.setAttribute("content", copy("metaDescription"));
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", copy("ogTitle"));
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", copy("ogDescription"));
  document.querySelector('meta[property="og:image:alt"]')?.setAttribute("content", copy("ogImageAlt"));
  refreshActiveStage();
  updateControlLabels();
  if (persist) savePreference(STORAGE_KEYS.language, currentLanguage);
}

function applyTheme(theme, persist = true) {
  currentTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute?.("data-theme", currentTheme);
  document.querySelector("#theme-color")?.setAttribute("content", THEME_COLORS[currentTheme]);
  updateControlLabels();
  if (persist) savePreference(STORAGE_KEYS.theme, currentTheme);
}

function setupPreferences() {
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.language));
  });

  document.querySelector(".theme-toggle")?.addEventListener("click", () => {
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });

  applyTheme(currentTheme, false);
  applyLanguage(currentLanguage, false);
}

function setupRoute() {
  const nodes = [...document.querySelectorAll("[data-stage]")];
  const evidence = document.querySelector("#stage-evidence");
  const title = document.querySelector("#evidence-title");
  const list = document.querySelector("#evidence-list");

  if (!nodes.length || !title || !list) return;

  const activateStage = (node) => {
    const content = STAGE_CONTENT[currentLanguage][node.dataset.stage];
    if (!content) return;

    nodes.forEach((item) => {
      const isActive = item === node;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    title.textContent = content.title;
    list.replaceChildren(...content.items.map((item) => {
      const element = document.createElement("li");
      element.textContent = item;
      return element;
    }));

    const nodeX = node.style?.getPropertyValue("--node-x");
    if (nodeX) evidence?.style?.setProperty("--evidence-x", nodeX);
    if (evidence && typeof node.after === "function") node.after(evidence);
  };

  refreshActiveStage = () => {
    const activeNode = nodes.find((node) => node.getAttribute("aria-pressed") === "true") || nodes[0];
    activateStage(activeNode);
  };

  nodes.forEach((node) => {
    node.addEventListener("click", () => activateStage(node));
    node.addEventListener("focus", () => activateStage(node));
    node.addEventListener("pointerenter", () => activateStage(node));
  });

  refreshActiveStage();
}

function setupNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");
  if (!toggle || !nav) return;

  const setNavigationState = (isOpen) => {
    toggle.setAttribute("aria-expanded", String(isOpen));
    nav.classList.toggle("is-open", isOpen);
    updateControlLabels();
  };

  const closeNavigation = (returnFocus = false) => {
    const wasOpen = toggle.getAttribute("aria-expanded") === "true";
    setNavigationState(false);
    if (returnFocus && wasOpen) toggle.focus();
  };

  toggle.addEventListener("click", () => {
    setNavigationState(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeNavigation();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation(true);
  });

  const mobileNavigation = window.matchMedia("(max-width: 760px)");
  if (typeof mobileNavigation.addEventListener === "function") {
    mobileNavigation.addEventListener("change", () => closeNavigation());
  }
}

function setupSectionTracking() {
  const links = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length || !("IntersectionObserver" in window)) return;

  const intersections = new Map(sections.map((section) => [section, -1]));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      intersections.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : -1);
    });
    const visible = [...intersections]
      .filter(([, intersectionRatio]) => intersectionRatio >= 0)
      .sort(([, ratioA], [, ratioB]) => ratioB - ratioA)[0]?.[0];

    links.forEach((link) => {
      const isCurrent = visible && link.getAttribute("href") === `#${visible.id}`;
      if (isCurrent) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-25% 0px -60%", threshold: [0.05, 0.25, 0.5] });

  sections.forEach((section) => observer.observe(section));
}

function setupBackToTop() {
  const backToTop = document.querySelector("[data-back-to-top]");
  const homeLink = document.querySelector(".wordmark");
  if (!backToTop || !homeLink) return;

  backToTop.addEventListener("click", () => {
    const focusHome = () => homeLink.focus({ preventScroll: true });
    if (typeof window.requestAnimationFrame === "function") window.requestAnimationFrame(focusHome);
    else focusHome();
  });
}

function setupScrollRunner() {
  const runner = document.querySelector("[data-scroll-runner]");
  const sprite = runner?.querySelector?.(".scroll-runner__sprite");
  const header = document.querySelector("[data-header]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!runner || reducedMotion.matches || typeof window.addEventListener !== "function") return;

  const frames = [
    "assets/scroll-runner.png",
    "assets/scroll-runner-frame-2.png",
    "assets/scroll-runner-frame-3.png"
  ];
  if (typeof window.Image === "function") {
    frames.slice(1).forEach((src) => {
      const image = new window.Image();
      image.src = src;
    });
  }

  let previousY = Math.max(0, window.scrollY || 0);
  let frameId = null;
  let idleTimer = null;
  const requestFrame = typeof window.requestAnimationFrame === "function"
    ? window.requestAnimationFrame.bind(window)
    : (callback) => window.setTimeout(callback, 16);

  const render = () => {
    frameId = null;
    const scrollY = Math.max(0, window.scrollY || 0);
    const pageHeight = Math.max(document.documentElement.scrollHeight || 0, document.body?.scrollHeight || 0);
    const scrollRange = Math.max(1, pageHeight - (window.innerHeight || 0));
    const progress = Math.min(1, scrollY / scrollRange);
    const runnerWidth = runner.getBoundingClientRect?.().width || 128;
    const headerWidth = header?.getBoundingClientRect?.().width || window.innerWidth || 0;
    const travel = Math.max(0, headerWidth - runnerWidth);
    const delta = scrollY - previousY;

    runner.style?.setProperty("--runner-x", `${travel * progress}px`);
    if (Math.abs(delta) > 1) {
      runner.style?.setProperty("--runner-facing", delta > 0 ? "1" : "-1");
      runner.classList?.toggle("is-reversed", delta < 0);
      sprite?.setAttribute?.("src", frames[Math.floor(scrollY / 28) % frames.length]);
    }
    runner.classList?.toggle("is-visible", scrollY > 8);
    runner.classList?.toggle("is-running", Math.abs(delta) > 1);
    previousY = scrollY;

    if (idleTimer) window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(() => runner.classList?.remove("is-running"), 160);
  };

  const scheduleRender = () => {
    if (frameId !== null) return;
    frameId = requestFrame(render);
  };

  window.addEventListener("scroll", scheduleRender, { passive: true });
  window.addEventListener("resize", scheduleRender);
  render();
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || location.protocol === "file:") return;
  navigator.serviceWorker.register("./sw.js").catch(() => {
    // The portfolio remains fully usable when service workers are unavailable.
  });
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("has-motion");
}

setupRoute();
setupNavigation();
setupPreferences();
setupSectionTracking();
setupBackToTop();
setupScrollRunner();
registerServiceWorker();
