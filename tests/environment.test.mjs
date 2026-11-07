import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolveSiteEnvironment } from "../src/lib/environment.ts";

test("production needs an explicit valid HTTPS origin and indexing flag", () => {
  const production = { NEXT_PUBLIC_SITE_ENV: "production" };
  assert.throws(() => resolveSiteEnvironment(production));
  for (const value of ["http://localhost:3000", "https://example.com/a", "https://example.com?x=1", "https://example.com#x", "https://u:p@example.com", "https://demo.vercel.app", "https://127.0.0.1", "https://example.com:3000"])
    assert.throws(() => resolveSiteEnvironment({ ...production, NEXT_PUBLIC_SITE_URL: value }));
  assert.deepEqual(resolveSiteEnvironment({ ...production, NEXT_PUBLIC_SITE_URL: "https://viditpujara.me/" }), { siteUrl: "https://viditpujara.me", isProductionSite: true });
});
test("preview/development hosts cannot enable indexing accidentally", () => {
  assert.equal(resolveSiteEnvironment({}).isProductionSite, false);
  for (const VERCEL_ENV of ["preview", "development"])
    assert.throws(() => resolveSiteEnvironment({ VERCEL_ENV, NEXT_PUBLIC_SITE_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://viditpujara.me" }));
  assert.throws(() => resolveSiteEnvironment({ VERCEL_ENV: "production" }));
});
test("route inventory matches filesystem and detail content", () => {
  const routes = JSON.parse(readFileSync("src/content/routes.json", "utf8"));
  const expected = [];
  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory() && !entry.name.startsWith("[")) walk(path);
      if (entry.name === "page.tsx") expected.push(dir.replace("src/app", "") || "/");
    }
  }
  walk("src/app");
  for (const [file, prefix] of [["case-studies", "/case-studies"], ["projects", "/projects"]]) {
    for (const match of readFileSync(`src/content/${file}.ts`, "utf8").matchAll(/^\s+slug: "([^"]+)"/gm)) expected.push(`${prefix}/${match[1]}`);
  }
  assert.equal(routes.length, new Set(routes).size);
  assert.deepEqual([...routes].sort(), expected.sort());
  assert.ok(existsSync("public/vidit-pujara-oracle-fusion-technical-consultant-resume.pdf"));
});
test("résumé facts match the confirmed identity and avoid stale support counts", () => {
  const resume = readFileSync("docs/resume.json", "utf8");
  assert.match(resume, /Consultant I \| Mastek/);
  assert.match(resume, /CERTIFICATIONS/);
  assert.doesNotMatch(resume, /two additional/i);
  const site = readFileSync("src/content/site.ts", "utf8");
  const phone = JSON.parse(resume).phone;
  assert.ok(phone && site.includes(`phone: "${phone}"`), "résumé and site phone numbers must match");
});
test("web and PDF résumé summaries share the agreed key phrases", () => {
  const sections = JSON.parse(readFileSync("docs/resume.json", "utf8")).pages.flat();
  const pdfSummary = sections.find((section) => section.title === "PROFESSIONAL SUMMARY").blocks[0].text;
  const web = readFileSync("src/content/pages.ts", "utf8");
  for (const phrase of [
    "Oracle Integration Cloud (OIC) integrations for Oracle Fusion HCM and Financials",
    "mapping Oracle load errors back to source records for correction and reprocessing",
    "Oracle APEX Cloud Certified Developer Professional.",
  ]) {
    assert.ok(pdfSummary.includes(phrase), `PDF summary lacks: ${phrase}`);
    assert.ok(web.includes(phrase), `Web résumé summary lacks: ${phrase}`);
  }
});
test("descriptions used for metadata and structured data stay within 155 characters", () => {
  const site = readFileSync("src/content/site.ts", "utf8");
  const positioning = site.match(/positioning:\s*"([^"]+)"/)[1];
  assert.ok(positioning.length <= 155, `identity.positioning is ${positioning.length} characters`);
  const files = [];
  (function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) walk(path);
      else if (entry.name === "page.tsx") files.push(path);
    }
  })("src/app");
  for (const file of files) {
    for (const match of readFileSync(file, "utf8").matchAll(/description:\s*"([^"]+)"/g))
      assert.ok(match[1].length <= 155, `${file} description is ${match[1].length} characters`);
  }
});
