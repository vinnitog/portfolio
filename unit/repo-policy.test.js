const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

test("workflow kit files exist", () => {
  for (const file of ["AGENTS.md", "CLAUDE.md", "PROJECT_CONTEXT.md", "SKILLS.md", "test.cmd", "package.json", ".gitignore"]) {
    assert.ok(fs.existsSync(path.join(root, file)), `${file} should exist`);
  }
});

test("codex and claude share the mandatory workflow", () => {
  const agents = read("AGENTS.md");
  const claude = read("CLAUDE.md");
  for (const content of [agents, claude]) {
    const order = ["senior-dev", "impeccable", "code-reviewer", "qa-senior", "qa-automate"];
    let lastIndex = -1;
    for (const step of order) {
      const index = content.indexOf(step);
      assert.ok(index > lastIndex, `${step} should appear after the previous workflow step`);
      lastIndex = index;
    }
    assert.match(content, /develop/);
    assert.match(content, /Nunca.*push direto.*main|Nunca faca push direto para `main`/s);
  }
});

test("frontend work requires impeccable", () => {
  const agents = read("AGENTS.md");
  const claude = read("CLAUDE.md");
  assert.match(agents, /deve usar a skill vendorizada `impeccable`/);
  assert.match(claude, /Use a skill vendorizada/);
});

test("product and privacy gates are documented", () => {
  const agents = read("AGENTS.md");
  const claude = read("CLAUDE.md");
  for (const content of [agents, claude]) {
    assert.match(content, /pricing-strategy/);
    assert.match(content, /lgpd-legal-basis/);
    assert.match(content, /lgpd-audit/);
  }
});

test("vendored skills are discoverable by codex and claude", () => {
  const skills = read("SKILLS.md");
  assert.match(skills, /\.agents\/skills/);
  assert.match(skills, /\.claude\/skills/);
  const enabled = [...skills.matchAll(/^- `([^`]+)`$/gm)].map((match) => match[1]);
  for (const skill of enabled) {
    assert.ok(fs.existsSync(path.join(root, ".agents", "skills", skill, "SKILL.md")));
    assert.ok(fs.existsSync(path.join(root, ".claude", "skills", skill, "SKILL.md")));
  }
});

test("templates were fully resolved", () => {
  for (const file of ["AGENTS.md", "CLAUDE.md", "PROJECT_CONTEXT.md", "SKILLS.md", "package.json"]) {
    assert.doesNotMatch(read(file), /\{\{[A-Z_]+\}\}/, `${file} contains an unresolved token`);
  }
});

test("browser blocked by client policy is documented", () => {
  const agents = read("AGENTS.md");
  const claude = read("CLAUDE.md");
  for (const content of [agents, claude]) {
    assert.match(content, /ERR_BLOCKED_BY_CLIENT/);
    assert.match(content, /file:\/\//);
    assert.match(content, /localhost/);
    assert.match(content, /127\.0\.0\.1/);
  }
});

test("project context records stack decision", () => {
  const context = read("PROJECT_CONTEXT.md");
  assert.match(context, /## Stack Escolhida/);
  assert.match(context, /## Motivo Da Stack/);
  assert.match(context, /## Alternativas Rejeitadas/);
  assert.match(context, /Revisao Obrigatoria De Stack/);
});

