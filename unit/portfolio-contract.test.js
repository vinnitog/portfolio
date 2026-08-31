const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)=(?:"([^"]*)"|'([^']*)')/g)]
      .map((match) => [match[1], match[2] ?? match[3]])
  );
}

function imageSize(file) {
  const buffer = fs.readFileSync(path.join(root, file));
  if (buffer.subarray(1, 4).toString() === "PNG") {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = buffer[offset + 1];
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
        return { width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5) };
      }
      offset += 2 + buffer.readUInt16BE(offset + 2);
    }
  }

  throw new Error(`Unsupported image format: ${file}`);
}

function appShell(sw) {
  const block = sw.match(/const APP_SHELL = \[([\s\S]*?)\];/);
  assert.ok(block, "sw.js should declare APP_SHELL");
  return [...block[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);
}

test("CT-01 P0: essential approved content is present", () => {
  const text = visibleText(read("index.html"));
  for (const expected of [
    "Vinícius Tognoli",
    "Minha trajetória em qualidade e desenvolvimento",
    "Há mais de 10 anos eu trabalho no encontro entre qualidade e desenvolvimento.",
    "QA Engineer",
    "Ricochet360",
    "Descoberta",
    "Privacidade",
    "Desenvolvimento",
    "Code Review",
    "Estratégia QA",
    "Automação",
    "Entrega",
    "VerbaJus",
    "TX Raio-X",
    "RDP Pro",
    "Togs Heads Up",
    "Jogos de Hoje",
    "Casa dos Coleus",
    "LinkedIn",
    "GitHub"
  ]) {
    assert.ok(text.includes(expected), `missing approved content: ${expected}`);
  }
});

test("CT-02 P0: every internal anchor resolves and sticky offset is defined", () => {
  const html = read("index.html");
  const css = read("styles.css");
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
  const anchors = [...html.matchAll(/<a\b[^>]*href="#([^"]+)"[^>]*>/g)].map((match) => match[1]);
  assert.ok(anchors.length > 0);
  for (const target of anchors) assert.ok(ids.has(target), `anchor target #${target} should exist`);
  assert.match(css, /scroll-padding-top:\s*[^;]+;/, "sticky header offset should be declared");
});

test("CT-03 P0: external destinations are exact and new tabs are safe", () => {
  const html = read("index.html");
  const links = [...html.matchAll(/<a\b[^>]*href="https:[^"]+"[^>]*>/g)].map((match) => attributes(match[0]));
  const expected = [
    "https://www.linkedin.com/in/vin%C3%ADcius-tognoli-8b028765/",
    "https://github.com/vinnitog",
    "https://github.com/vinnitog/TX-Raio-X",
    "https://github.com/vinnitog/RDP-Pro",
    "https://github.com/vinnitog/togs-heads-up",
    "https://github.com/vinnitog/jogos-de-hoje"
  ];
  for (const href of expected) assert.ok(links.some((link) => link.href === href), `missing ${href}`);
  for (const link of links) {
    assert.equal(link.target, "_blank", `${link.href} should open in a new tab`);
    assert.match(link.rel || "", /\bnoreferrer\b/, `${link.href} should block window.opener`);
  }
});

test("CT-04 P0: internal header/footer anchors stay in-page while external links keep safe new-tab behavior", () => {
  const html = read("index.html");
  const anchorTags = [...html.matchAll(/<a\b[^>]*>/g)].map((match) => match[0]);
  const links = anchorTags.map((tag) => ({ tag, ...attributes(tag) }));
  const header = html.match(/<header\b[\s\S]*?<\/header>/)?.[0] || "";
  const headerAnchorTags = [...header.matchAll(/<a\b[^>]*>/g)].map((match) => match[0]);
  const headerLinks = headerAnchorTags.map((tag) => ({ tag, ...attributes(tag) }));
  const internalMenuLinks = headerLinks.filter((link) => link.href?.startsWith("#"));
  const internalMenuTags = new Set(internalMenuLinks.map((link) => link.tag));
  const footer = html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0] || "";
  const footerBackTag = footer.match(/<a\b[^>]*href="#inicio"[^>]*>/)?.[0] || "";
  const footerBackLink = attributes(footerBackTag);
  const skipLink = links.find((link) => link.href === "#conteudo");
  const currentDocumentTags = new Set([...internalMenuTags, footerBackTag]);

  assert.deepEqual(internalMenuLinks.map((link) => link.href), [
    "#inicio", "#experiencia", "#projetos", "#contato"
  ], "header must expose only the four approved in-page destinations, in DOM order");
  assert.match(internalMenuLinks[0].class || "", /\bwordmark\b/,
    "the #inicio exception belongs to the wordmark");
  for (const link of internalMenuLinks) {
    assert.equal(link.target, undefined, `${link.href} should navigate in the current document`);
    assert.equal(link.rel, undefined, `${link.href} should not carry a new-tab relation`);
  }
  assert.ok(footerBackTag, "footer must expose the approved #inicio destination");
  assert.match(footerBackTag, /\sdata-back-to-top(?:\s|>)/,
    "footer #inicio must expose the focus-restoration hook");
  assert.equal(footerBackLink.target, undefined, "footer #inicio should navigate in the current document");
  assert.equal(footerBackLink.rel, undefined, "footer #inicio should not carry a new-tab relation");
  assert.ok(skipLink, "skip link must remain available");
  assert.equal(skipLink.target, undefined, "skip link should navigate in the current document");
  assert.equal(skipLink.rel, undefined, "skip link should not carry a new-tab relation");

  const headerExternalLinks = headerLinks.filter((link) => !link.href?.startsWith("#"));
  assert.equal(headerExternalLinks.length, 1, "only the LinkedIn identity chip is external in the header");
  assert.match(headerExternalLinks[0].class || "", /\bidentity-chip\b/);

  for (const link of links.filter((item) => item.href && item.href !== "#conteudo" && !currentDocumentTags.has(item.tag))) {
    assert.equal(link.target, "_blank", `${link.href} should open in a new tab`);
    assert.match(link.rel || "", /\bnoreferrer\b/, `${link.href} should block window.opener`);
  }
  assert.equal(links.some((link) => link.href?.startsWith("mailto:")), false,
    "contact actions should open Gmail compose instead of delegating to an unknown local mail client");
});

test("MAIL-01 P0: project and general contact actions open addressed Gmail drafts", () => {
  const html = read("index.html");
  const links = [...html.matchAll(/<a\b[^>]*href="https:\/\/mail\.google\.com\/mail\/\?[^\"]+"[^>]*>/g)]
    .map((match) => attributes(match[0]));
  const expectedSubjects = [
    "Contato sobre o VerbaJus",
    "Contato sobre a Casa dos Coleus",
    "Contato pelo portfólio"
  ];

  assert.equal(links.length, 3, "the two private projects and contact email should open Gmail compose");
  assert.deepEqual(links.map((link) => {
    const destination = new URL(link.href.replaceAll("&amp;", "&"));
    return {
      origin: destination.origin,
      path: destination.pathname,
      view: destination.searchParams.get("view"),
      fullscreen: destination.searchParams.get("fs"),
      recipient: destination.searchParams.get("to"),
      subject: destination.searchParams.get("su"),
      target: link.target,
      rel: link.rel
    };
  }), expectedSubjects.map((subject) => ({
    origin: "https://mail.google.com",
    path: "/mail/",
    view: "cm",
    fullscreen: "1",
    recipient: "vinnitog@gmail.com",
    subject,
    target: "_blank",
    rel: "noreferrer"
  })));
});

test("IA-PIPELINE-01 P0: retired route endpoints, CTAs and Ricochet360 period leave no orphan", () => {
  const html = read("index.html");
  const css = read("styles.css");
  const script = read("script.js");
  const runtime = `${html}\n${css}\n${script}`;
  for (const retired of ["project-destination", "route-actions", "route.explore", "experience.period"]) {
    assert.equal(runtime.includes(retired), false, `retired contract should be absent: ${retired}`);
  }
  const routeMap = html.match(/<div class="route-map"[\s\S]*?<\/div>\s*<\/section>/)?.[0] || "";
  assert.doesNotMatch(routeMap, /<a\b/, "pipeline must not restore old project/CTA links");
  assert.match(html, /Desde 2019, na Ricochet360/,
    "the factual employment date remains in the narrative without a redundant period element");
});

test("PRJ-01 P0/P1: projects use one featured case and a compact five-row editorial ledger", () => {
  const html = read("index.html");
  const css = read("styles.css");
  const script = read("script.js");
  const section = html.match(/<section class="section section--projects"[\s\S]*?<\/section>/)?.[0] || "";
  const projectLinks = [...section.matchAll(/<a\b[^>]*class="project-link"[^>]*>/g)]
    .map((match) => attributes(match[0]))
    .filter((link) => link.href?.startsWith("https://github.com/"));
  const rows = [...section.matchAll(/<article class="project-row"[^>]*>([\s\S]*?)<\/article>/g)]
    .map((match) => match[1]);
  const expectedLinks = [
    ["https://github.com/vinnitog/TX-Raio-X", "projects.txRepository"],
    ["https://github.com/vinnitog/RDP-Pro", "projects.rdpRepository"],
    ["https://github.com/vinnitog/togs-heads-up", "projects.headsUpRepository"],
    ["https://github.com/vinnitog/jogos-de-hoje", "projects.gamesRepository"]
  ];

  assert.equal((section.match(/class="project-feature"/g) || []).length, 1);
  assert.equal((section.match(/class="project-row"/g) || []).length, 5);
  assert.deepEqual(projectLinks.map((link) => [link.href, link["data-i18n-aria-label"]]), expectedLinks,
    "each project must preserve its repository destination and localized accessible name");
  assert.deepEqual(rows.map((row) => row.match(/<h3>([^<]+)<\/h3>/)?.[1]), [
    "TX Raio-X", "RDP Pro", "Togs Heads Up", "Jogos de Hoje", "Casa dos Coleus"
  ], "the compact ledger must keep the approved five-project order");
  assert.match(section, /class="project-ledger" role="list"/);
  assert.equal((section.match(/role="listitem"/g) || []).length, 5);
  assert.equal((section.match(/data-i18n-aria-label="projects\.[A-Za-z]+Repository"/g) || []).length, 4);
  assert.match(section, /class="project-feature"[\s\S]*?VerbaJus[\s\S]*?projects\.ready/);
  assert.match(section, /data-i18n="projects\.summary">Um case principal e um índice direto/,
    "the no-JS fallback must match the current Portuguese project summary");
  assert.doesNotMatch(section, /case-study|case-diagram/);

  for (const key of ["verbaTitle", "verbaBody", "featureLabel", "ready", "ledgerLabel", "headsUpBody", "headsUpStack", "gamesBody", "coleusBody", "coleusStack", "private", "contactProject", "verbaContact", "coleusContact"]) {
    assert.match(script, new RegExp(`"projects\\.${key}"\\s*:`), `missing project translation: ${key}`);
  }
  assert.match(css, /\.section--projects\s*\{[\s\S]*?padding-top:\s*clamp\(5rem, 8vw, 7rem\)/s);
  assert.match(css, /\.project-feature\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0, 1\.35fr\)/s);
  assert.match(css, /\.project-row\s*\{[\s\S]*?grid-template-columns:[^;]+;/s);
  assert.match(css, /\.project-link\s*\{[\s\S]*?min-height:\s*3rem/s,
    "repository actions must keep a 48px touch target");
  assert.match(css, /@media \(max-width: 1050px\)[\s\S]*?\.project-feature\s*\{[\s\S]*?grid-template-columns:\s*1fr/s);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*?\.project-row\s*\{[\s\S]*?grid-template-columns:\s*1fr/s);
});

test("PRJ-02 P0: private projects expose honest status and contact instead of broken repository links", () => {
  const html = read("index.html");
  const section = html.match(/<section class="section section--projects"[\s\S]*?<\/section>/)?.[0] || "";
  const privateActions = [...section.matchAll(/<div class="project-access project-access--private">([\s\S]*?)<\/div>/g)]
    .map((match) => match[1]);

  assert.equal(privateActions.length, 2, "VerbaJus and Casa dos Coleus must be identified as private");
  assert.doesNotMatch(section, /github\.com\/vinnitog\/(?:VerbaJus|Casa-dos-Coleus)/,
    "anonymous visitors must not be sent to private repository 404 pages");
  assert.equal((section.match(/data-i18n="projects\.private"/g) || []).length, 2);
  assert.equal((section.match(/href="https:\/\/mail\.google\.com\/mail\/\?[^\"]+"/g) || []).length, 2);
  assert.match(privateActions[0], /data-i18n-aria-label="projects\.verbaContact"/);
  assert.match(privateActions[1], /data-i18n-aria-label="projects\.coleusContact"/);
  for (const action of privateActions) {
    assert.match(action, /target="_blank"/);
    assert.match(action, /rel="noreferrer"/);
  }
});

test("RT-03 P0: route controls keep keyboard-native order and visible focus", () => {
  const html = read("index.html");
  const css = read("styles.css");
  const stages = [...html.matchAll(/<button class="route-node[^"]*"([^>]*)data-stage="([^"]+)"([^>]*)>/g)];
  assert.deepEqual(stages.map((match) => match[2]), [
    "discovery", "privacy", "development", "design", "review", "quality", "automation", "delivery"
  ]);
  for (const match of stages) assert.match(match[0], /type="button"/);
  assert.match(css, /:focus-visible\s*\{[\s\S]*?outline:\s*3px\s+solid/s);
});

test("RT-04 P1: route state exposes one pressed node and a live controlled region", () => {
  const html = read("index.html");
  const controls = [...html.matchAll(/<button class="route-node[\s\S]*?<\/button>/g)];
  assert.equal(controls.length, 8);
  assert.equal(controls.filter((match) => /aria-pressed="true"/.test(match[0])).length, 1);
  for (const control of controls) assert.match(control[0], /aria-controls="stage-evidence"/);
  assert.match(html, /id="stage-evidence"[^>]*aria-live="polite"/);
});

test("RT-05 P0: pipeline exposes exactly the approved eight localized stages", () => {
  const html = read("index.html");
  const script = read("script.js");
  const expected = ["discovery", "privacy", "development", "design", "review", "quality", "automation", "delivery"];
  const stages = [...html.matchAll(/data-stage="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(stages, expected);
  for (const stage of expected) {
    assert.match(script, new RegExp(`"route\\.${stage}"\\s*:`), `missing localized route label: ${stage}`);
    assert.match(script, new RegExp(`\\b${stage}:\\s*\\{\\s*title:`), `missing stage evidence: ${stage}`);
  }
});

test("UI-DIVIDER-01 P1: every editorial section gets a full-width winding dashed route with an X terminal", () => {
  const css = read("styles.css");
  const before = css.match(/\.section::before\s*\{([\s\S]*?)\}/)?.[1] || "";
  assert.match(before, /left:\s*50%/);
  assert.match(before, /width:\s*100vw/);
  assert.match(before, /height:\s*5rem/);
  assert.match(before, /background:\s*color-mix\(in srgb, var\(--route\) 72%, var\(--paper\)\)/);
  assert.match(before, /-webkit-mask:[\s\S]*data:image\/svg\+xml/);
  assert.match(before, /mask:[\s\S]*data:image\/svg\+xml/);
  assert.match(before, /C80 12 130 70 215 42/);
  assert.match(before, /stroke-dasharray='9 11'/);
  assert.doesNotMatch(before, /border-top/);
  assert.match(before, /pointer-events:\s*none/);
  assert.match(before, /transform:\s*translateX\(-50%\)/);

  const after = css.match(/\.section::after\s*\{([\s\S]*?)\}/)?.[1] || "";
  assert.match(after, /right:\s*calc\(50% - 50vw \+ max\(0\.5rem, 1vw\)\)/);
  assert.match(after, /linear-gradient\(45deg/);
  assert.match(after, /linear-gradient\(-45deg/);
  assert.match(after, /var\(--amber\)/);

  const sections = [...read("index.html").matchAll(/<section\b[^>]*>/g)].map((match) => match[0]);
  assert.equal(sections.length, 6, "hero plus five editorial sections should remain explicit");
  assert.doesNotMatch(sections[0], /class="[^"]*\bsection\b/, "hero does not receive an editorial divider");
  for (const section of sections.slice(1)) {
    assert.match(section, /class="[^"]*\bsection\b/, `editorial divider selector must cover ${section}`);
  }
});

test("UI-HERO-ALIGN-01 P1: first-section copy shares one responsive left gutter", () => {
  const css = read("styles.css");
  const hero = css.match(/\.hero\s*\{([\s\S]*?)\}/)?.[1] || "";
  const heroCopy = css.match(/\.hero-copy\s*\{([\s\S]*?)\}/)?.[1] || "";
  const routeHeading = css.match(/\.route-heading\s*\{([\s\S]*?)\}/)?.[1] || "";
  const routeIntro = css.match(/\.route-intro\s*\{([\s\S]*?)\}/)?.[1] || "";
  assert.match(hero, /--hero-copy-gutter:\s*clamp\(0rem, 2vw, 3rem\)/);
  assert.match(heroCopy, /margin-left:\s*var\(--hero-copy-gutter\)/);
  assert.match(routeHeading, /margin:[^;]*var\(--hero-copy-gutter\)/);
  assert.match(routeIntro, /margin:[^;]*var\(--hero-copy-gutter\)/);
  assert.match(css, /@media \(max-width:\s*1050px\)[\s\S]*?\.hero\s*\{[\s\S]*?--hero-copy-gutter:\s*0rem/s);
});

test("NAV-01 P0: mobile disclosure has an accessible closed state", () => {
  const html = read("index.html");
  const css = read("styles.css");
  const script = read("script.js");
  assert.match(html, /class="nav-toggle"[^>]*aria-expanded="false"[^>]*aria-controls="site-nav"/);
  assert.match(html, /<span class="sr-only">Abrir navegação<\/span>/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*?\.site-nav\s*\{[\s\S]*?display:\s*none/s);
  assert.match(css, /\.site-nav\.is-open\s*\{[\s\S]*?display:\s*grid/s);
  assert.match(script, /Fechar navegação/);
});

test("VP contracts P0/P1: responsive route and touch target rules exist", () => {
  const css = read("styles.css");
  assert.match(css, /@media \(max-width: 1050px\)/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /@media \(max-width: 1050px\)[\s\S]*?\.route-track\s*\{[\s\S]*?width:\s*3px/s);
  assert.match(css, /\.nav-toggle\s*\{[\s\S]*?width:\s*3rem;[\s\S]*?height:\s*3rem/s);
  assert.match(css, /\.button\s*\{[\s\S]*?min-height:\s*3\.25rem/s);
});

test("AX-01 P0: structural semantics, headings, IDs and ARIA references resolve", () => {
  const html = read("index.html");
  assert.match(html, /<html lang="pt-BR">/);
  assert.equal((html.match(/<main\b/g) || []).length, 1);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  for (const landmark of ["header", "nav", "main", "footer"]) assert.match(html, new RegExp(`<${landmark}\\b`));

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, "IDs should be unique");
  const idSet = new Set(ids);
  for (const match of html.matchAll(/aria-(?:labelledby|controls)="([^"]+)"/g)) {
    for (const id of match[1].split(/\s+/)) assert.ok(idSet.has(id), `ARIA reference #${id} should resolve`);
  }

  const levels = [...html.matchAll(/<h([1-6])\b/g)].map((match) => Number(match[1]));
  for (let index = 1; index < levels.length; index += 1) {
    assert.ok(levels[index] <= levels[index - 1] + 1, `heading jumps from h${levels[index - 1]} to h${levels[index]}`);
  }
});

test("AX-02 P0: skip link is visible on focus and targets a focusable main", () => {
  const html = read("index.html");
  const css = read("styles.css");
  const skipTag = html.match(/<a\b[^>]*class="[^"]*\bskip-link\b[^"]*"[^>]*>Pular para o conteúdo<\/a>/);
  assert.ok(skipTag, "skip link should keep its Portuguese default label");
  const skipAttrs = attributes(skipTag[0]);
  assert.equal(skipAttrs.href, "#conteudo");
  assert.equal(skipAttrs["data-i18n"], "skip");
  assert.match(html, /<main id="conteudo"[^>]*tabindex="-1"/,
    "main should accept programmatic focus when the skip link is activated");
  assert.match(css, /\.skip-link:focus\s*\{[\s\S]*?transform:\s*translateY\(0\)/s);
});

test("AX-03 P1: key controls and decorative media have accessible names", () => {
  const html = read("index.html");
  const navTag = html.match(/<nav\b[^>]*>/)?.[0];
  assert.ok(navTag);
  assert.equal(attributes(navTag)["aria-label"], "Navegação principal");
  assert.equal(attributes(navTag)["data-i18n-aria-label"], "nav.label");
  const identityTag = html.match(/<a\b[^>]*class="[^"]*\bidentity-chip\b[^"]*"[^>]*>/)?.[0];
  assert.ok(identityTag);
  assert.equal(attributes(identityTag)["aria-label"], "Abrir LinkedIn de Vinícius Tognoli");
  assert.equal(attributes(identityTag)["data-i18n-aria-label"], "identity.linkedin");
  assert.match(html, /<img[^>]*avatar-vinicius-128\.jpg[^>]*alt=""/);
  const routeHeading = html.match(/<h2\b[^>]*id="route-title"[^>]*>/)?.[0];
  assert.ok(routeHeading);
  assert.match(attributes(routeHeading).class || "", /\broute-heading\b/);
  assert.equal(attributes(routeHeading)["data-i18n"], "route.label");
  assert.match(html, /class="route-track"[^>]*aria-hidden="true"/);
  assert.match(html, /class="route-pulse-track"/);
  assert.match(html, /class="route-icon" aria-hidden="true"/);
});

test("PWA-01 P0: manifest contract is coherent with the page theme", () => {
  const manifest = JSON.parse(read("manifest.webmanifest"));
  const html = read("index.html");
  const css = read("styles.css");
  assert.equal(manifest.lang, "pt-BR");
  assert.equal(manifest.start_url, "./");
  assert.equal(manifest.scope, "./");
  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.background_color, "#0f1719");
  assert.equal(manifest.theme_color, "#0f1719");
  const themeMeta = html.match(/<meta\b[^>]*name="theme-color"[^>]*>/)?.[0];
  assert.ok(themeMeta);
  assert.equal(attributes(themeMeta).content, "#0f1719");
  assert.equal(attributes(themeMeta).id, "theme-color");
  assert.match(css, /--paper:\s*#f9f6f5/);
});

test("PWA-02 P0: installable icons exist with declared dimensions and provenance", () => {
  const manifest = JSON.parse(read("manifest.webmanifest"));
  const expected = [
    ["assets/icon-192.png", 192, 192, "any"],
    ["assets/icon-512.png", 512, 512, "any"],
    ["assets/icon-maskable-512.png", 512, 512, "maskable"]
  ];
  for (const [src, width, height, purpose] of expected) {
    const icon = manifest.icons.find((item) => item.src === src);
    assert.ok(icon, `${src} should be declared`);
    assert.equal(icon.type, "image/png");
    assert.match(icon.purpose, new RegExp(`\\b${purpose}\\b`));
    assert.deepEqual(imageSize(src), { width, height });
    assert.ok(exists(`${src}.origin.txt`), `${src} should have provenance`);
  }
  assert.match(read("assets/icon-maskable-512.png.origin.txt"), /safe zone/i);
});

test("AS-01 P0: every local runtime asset and APP_SHELL entry resolves", () => {
  const html = read("index.html");
  const css = read("styles.css");
  const manifest = JSON.parse(read("manifest.webmanifest"));
  const sw = read("sw.js");
  const refs = new Set([
    ...[...html.matchAll(/(?:src|href|content)="(assets\/[^"]+|manifest\.webmanifest|styles\.css|script\.js)"/g)].map((match) => match[1]),
    ...[...css.matchAll(/url\("?([^)"]+)"?\)/g)]
      .map((match) => match[1])
      .filter((reference) => !reference.startsWith("data:")),
    ...manifest.icons.map((icon) => icon.src),
    ...appShell(sw).filter((file) => !["./", "./index.html"].includes(file)).map((file) => file.replace(/^\.\//, ""))
  ]);
  for (const file of refs) {
    assert.ok(exists(file), `${file} should exist with matching case`);
    assert.ok(fs.statSync(path.join(root, file)).size > 0, `${file} should not be empty`);
  }
});

test("AS-02 P0: every shipping raster has provenance and manifest resolution", () => {
  const rasters = [
    "assets/avatar-vinicius.jpg",
    "assets/avatar-vinicius-128.jpg",
    "assets/social-card.png",
    "assets/icon-192.png",
    "assets/icon-512.png",
    "assets/icon-maskable-512.png"
  ];
  for (const raster of rasters) assert.ok(exists(`${raster}.origin.txt`), `${raster} should have .origin.txt`);
  const assetManifest = read(".impeccable/assets-manifest.md");
  assert.match(assetManifest, /## Ações resolvidas no build/);
  for (const file of rasters.slice(1)) assert.ok(assetManifest.includes(path.basename(file)), `${file} should be recorded`);
});

test("AS-03 P1: WOFF2 is served while source TTF and OFL licenses remain", () => {
  const css = read("styles.css");
  for (const family of ["archivo", "manrope"]) {
    assert.match(css, new RegExp(`assets/fonts/${family}-latin\\.woff2`));
    assert.ok(exists(`assets/fonts/${family}-latin.woff2`));
    assert.ok(exists(`assets/fonts/${family}-variable.ttf`));
  }
  assert.ok(exists("assets/fonts/LICENSE-Archivo.txt"));
  assert.ok(exists("assets/fonts/LICENSE-Manrope.txt"));
  assert.equal((css.match(/font-display:\s*swap/g) || []).length, 2);
});

test("AS-04 P1: runtime uses derived media and never ships approved mocks", () => {
  const html = read("index.html");
  const sw = read("sw.js");
  assert.match(html, /assets\/avatar-vinicius-128\.jpg/);
  assert.doesNotMatch(html, /assets\/avatar-vinicius\.jpg/);
  assert.match(sw, /assets\/avatar-vinicius-128\.jpg/);
  assert.doesNotMatch(sw, /assets\/avatar-vinicius\.jpg/);
  assert.deepEqual(imageSize("assets/avatar-vinicius-128.jpg"), { width: 128, height: 128 });
  assert.deepEqual(imageSize("assets/social-card.png"), { width: 1200, height: 630 });
  assert.doesNotMatch(`${html}\n${sw}`, /\.impeccable|mix-rota-evidencias/);
});

test("CL-02 P0: visible content contains no unapproved impact claims", () => {
  const text = visibleText(read("index.html"));
  assert.doesNotMatch(text, /\b\d+(?:[.,]\d+)?\s*%/);
  assert.doesNotMatch(text, /\b(?:prêmio|premiado|award|ranking|top\s+\d+)\b/i);
  assert.doesNotMatch(text, /\b(?:depoimento|testimonial|clientes satisfeitos)\b/i);
  assert.match(read("PRODUCT.md"), /Mais de 10 anos de experiência/);
});

test("MOT-01/MOT-02 P1/P2: motion is gated and the route pulse is reduced-motion safe", () => {
  const script = read("script.js");
  const css = read("styles.css");
  assert.match(script, /prefers-reduced-motion:\s*reduce/);
  assert.match(script, /classList\.add\("has-motion"\)/);
  assert.match(css, /\.has-motion \.route-pulse-track\s*\{[\s\S]*?animation:\s*route-pulse/s);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});
