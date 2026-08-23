const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

test("PAGES-01 P0: deployment is limited to main with the required Pages permissions and job chain", () => {
  const workflow = read(".github/workflows/pages.yml");

  assert.match(workflow,
    /^on:\r?\n  push:\r?\n    branches: \[main\]\r?\n  workflow_dispatch:\s*$/m,
    "Pages should deploy automatically only from main, with an explicit manual trigger");
  assert.match(workflow,
    /^permissions:\r?\n  contents: read\r?\n  pages: write\r?\n  id-token: write\s*$/m,
    "the workflow should keep the minimum documented Pages permissions");
  assert.match(workflow,
    /^concurrency:\r?\n  group: pages\r?\n  cancel-in-progress: true\s*$/m);
  assert.match(workflow, /build:\r?\n\s+if: github\.ref == 'refs\/heads\/main'/,
    "manual dispatches from non-main refs must not publish");

  for (const action of [
    "actions/checkout@v4",
    "actions/configure-pages@v5",
    "actions/upload-pages-artifact@v3",
    "actions/deploy-pages@v4"
  ]) {
    assert.match(workflow, new RegExp(`uses: ${action.replace("/", "\\/")}`), `missing pinned action: ${action}`);
  }

  assert.match(workflow, /deploy:\r?\n[\s\S]*?needs: build/,
    "deployment must wait for a successful artifact build");
  assert.match(workflow, /- name: Test\r?\n\s+run: npm test/,
    "the build must stop before packaging when the automated suite fails");
  assert.match(workflow, /name: github-pages\r?\n\s+url: \$\{\{ steps\.deployment\.outputs\.page_url \}\}/,
    "the protected Pages environment should expose the deployment URL");
  assert.match(workflow, /id: deployment\r?\n\s+uses: actions\/deploy-pages@v4/,
    "the environment URL must reference the deploy step output");
});

test("PAGES-02 P0: the uploaded _site artifact contains the complete app shell and no repository-wide copy", () => {
  const workflow = read(".github/workflows/pages.yml");
  const serviceWorker = read("sw.js");
  const prepare = workflow.match(/- name: Prepare static site[\s\S]*?(?=\r?\n\s+- name: Configure Pages)/)?.[0] || "";
  const rootCopy = prepare.match(/^\s*cp\s+(.+?)\s+_site\/\s*$/m);
  const copiedRootFiles = rootCopy?.[1].trim().split(/\s+/) || [];
  const expectedRootFiles = [
    "index.html", "styles.css", "script.js", "sw.js", "manifest.webmanifest"
  ];

  assert.deepEqual(copiedRootFiles, expectedRootFiles,
    "the artifact recipe should copy only the approved root runtime files");
  assert.match(prepare, /^\s*mkdir -p _site\/assets\/fonts\s*$/m);
  assert.doesNotMatch(prepare, /cp\s+-R|cp\s+assets\/\.\s/,
    "the artifact must not copy the complete source asset tree");
  assert.match(prepare, /^\s*touch _site\/\.nojekyll\s*$/m);
  assert.match(prepare, /test "\$\(find _site -type f \| wc -l\)" -eq 17/,
    "the workflow should reject an unexpected artifact inventory");
  assert.match(workflow,
    /uses: actions\/upload-pages-artifact@v3\r?\n\s+with:\r?\n\s+path: _site\s*$/m,
    "GitHub Pages must receive the prepared directory, not the repository root");

  const appShellBody = serviceWorker.match(/const APP_SHELL = \[([\s\S]*?)\];/)?.[1] || "";
  const appShellPaths = [...appShellBody.matchAll(/["']([^"']+)["']/g)]
    .map((match) => match[1].replace(/^\.\//, ""));
  assert.ok(appShellPaths.length > 0, "the service worker should declare an app shell");

  const copiedAssetPaths = [...prepare.matchAll(/\bassets\/[^\s]+/g)]
    .map((match) => match[0])
    .filter((assetPath) => !assetPath.startsWith("assets/fonts/") || assetPath.endsWith(".woff2"));

  for (const appShellPath of appShellPaths) {
    if (!appShellPath || appShellPath === "index.html") continue;
    if (appShellPath.startsWith("assets/")) {
      assert.ok(copiedAssetPaths.includes(appShellPath),
        `${appShellPath} should be explicitly copied to the Pages artifact`);
      continue;
    }
    assert.ok(copiedRootFiles.includes(appShellPath),
      `${appShellPath} should be copied to the Pages artifact root`);
  }

  for (const sourceOnlyPattern of [".origin.txt", "avatar-vinicius.jpg", ".ttf", "LICENSE-"]) {
    assert.equal(prepare.includes(sourceOnlyPattern), false,
      `source-only asset should not enter the Pages recipe: ${sourceOnlyPattern}`);
  }
});
