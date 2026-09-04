import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);

test("publishes every ESM entry point", async () => {
  const [root, unplugin, react, docusaurus, renderer, starlight] =
    await Promise.all([
      import("../dist/index.js"),
      import("../dist/unplugin.js"),
      import("../dist/react.js"),
      import("../dist/docusaurus.js"),
      import("../dist/docusaurus-renderer.js"),
      import("../dist/starlight.js"),
    ]);

  assert.equal(typeof root.compileLiveModule, "function");
  assert.equal(typeof unplugin.reactLiveUnplugin.vite, "function");
  assert.equal(typeof react.ReactLive, "function");
  assert.equal(typeof docusaurus.default, "function");
  assert.equal(typeof renderer.DocusaurusLive, "function");
  assert.equal(typeof starlight.default, "function");
});

test("publishes a CommonJS Docusaurus configuration entry", () => {
  const docusaurus = require("../dist/docusaurus.cjs");
  assert.equal(typeof docusaurus.default, "function");
});
