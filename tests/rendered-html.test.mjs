import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Gigóia guest atlas", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Gigóia Rio \| Guest Atlas<\/title>/i);
  assert.match(html, /Your island starts here/i);
  assert.match(html, /GIGOIA/i);
  assert.doesNotMatch(html, /Your site is taking shape|Codex is working/i);
});
test("keeps prototype data honest and includes the approved v0 surfaces", async () => {
  const [page, data, map] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/IslandMap.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /CONCIERGE_WHATSAPP = ""/);
  assert.doesNotMatch(page, /wa\.me\/5521|tel:\+55/);
  assert.match(data, /Nine-island circuit/);
  assert.match(data, /Boat to the Tijucas Islands/);
  assert.match(data, /Hang gliding or paragliding/);
  assert.match(data, /Helicopter flight to Christ the Redeemer/);
  assert.match(map, /maplibre-gl@5\.6\.0/);
  assert.match(map, /tiles\.openfreemap\.org\/styles\/liberty/);
  assert.match(map, /status: "prototype"/);
});
