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
  assert.doesNotMatch(resume, /tel:|\+91|two additional/i);
});
