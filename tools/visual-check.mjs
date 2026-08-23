import { chromium } from "file:///C:/Users/Togszera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
import fs from "node:fs/promises";

const baseUrl = process.argv[2] || "http://127.0.0.1:55932/";
const reviewDir = new URL("../.impeccable/review/", import.meta.url);

await fs.mkdir(reviewDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];

async function capture(name, viewport, fullPage, setup, resetScroll = true, reducedMotion = "reduce") {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    reducedMotion
  });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  if (setup) await setup(page);
  if (resetScroll) await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: new URL(`${name}.png`, reviewDir).pathname.slice(1),
    fullPage
  });

  const diagnostics = await page.evaluate(() => ({
    title: document.title,
    lang: document.documentElement.lang,
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    h1: document.querySelector("h1")?.textContent?.trim(),
    theme: document.documentElement.dataset.theme || "light",
    activeStage: document.querySelector('[data-stage][aria-pressed="true"]')?.dataset.stage,
    evidenceLeft: Math.round(document.querySelector("#stage-evidence")?.getBoundingClientRect().left || 0),
    visibleLinks: [...document.querySelectorAll("a")].filter((link) => link.getClientRects().length > 0).length,
    runnerVisible: document.querySelector("[data-scroll-runner]")?.classList.contains("is-visible") || false,
    runnerDisplay: getComputedStyle(document.querySelector("[data-scroll-runner]")).display,
    runnerX: getComputedStyle(document.querySelector("[data-scroll-runner]")).getPropertyValue("--runner-x").trim(),
    runnerFrame: document.querySelector(".scroll-runner__sprite")?.getAttribute("src"),
    bodyColor: getComputedStyle(document.body).color,
    wordmarkColor: getComputedStyle(document.querySelector(".wordmark")).color,
    evidenceColor: getComputedStyle(document.querySelector("#stage-evidence")).color,
    runnerZ: getComputedStyle(document.querySelector("[data-scroll-runner]")).zIndex,
    mainZ: getComputedStyle(document.querySelector("main")).zIndex
  }));

  results.push({ name, viewport, errors, ...diagnostics });
  await context.close();
}

if (process.argv.includes("--blockers")) {
  await capture("final-blocker-light", { width: 1440, height: 1000 }, false, async (page) => {
    await page.locator('[data-language="en"]').click();
    await page.locator(".theme-toggle").click();
  });
  await capture("final-blocker-runner", { width: 1440, height: 900 }, false, async (page) => {
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.42));
    await page.waitForTimeout(80);
  }, false, "no-preference");
} else {
  await capture("final-default-dark-desktop", { width: 1440, height: 1000 }, true);
  await capture("final-default-dark-mobile", { width: 390, height: 844 }, true);
  await capture("final-light-en-hero", { width: 1440, height: 1000 }, false, async (page) => {
    await page.locator('[data-language="en"]').click();
    await page.locator(".theme-toggle").click();
  });
  await capture("final-discovery-hover", { width: 1440, height: 1000 }, false, async (page) => {
    await page.locator('[data-stage="discovery"]').hover();
  });
  await capture("final-runner-desktop", { width: 1440, height: 900 }, false, async (page) => {
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.42));
    await page.waitForTimeout(80);
  }, false, "no-preference");
  await capture("final-runner-mobile", { width: 390, height: 844 }, false, async (page) => {
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.58));
    await page.waitForTimeout(80);
  }, false, "no-preference");
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
