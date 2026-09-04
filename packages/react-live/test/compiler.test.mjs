import assert from "node:assert/strict";
import test from "node:test";
import {
  analyzeLiveModule,
  compileLiveModule,
} from "../dist/index.mjs";

test("collects runtime imports and excludes type-only bindings", () => {
  const source = `
import type { ComponentProps } from "react";
import React, { useState, type ReactNode } from "react";
import * as icons from "./icons";
export default function Demo() { return <icons.Check />; }
`;
  const result = analyzeLiveModule(source, "/Demo.live.tsx");
  assert.deepEqual(result.scope, ["React", "useState", "icons"]);
});

test("requires exactly one default export", () => {
  assert.throws(
    () => analyzeLiveModule("export const value = 1", "/invalid.live.tsx"),
    /exactly one default export/,
  );
});

test("produces deterministic wrapper names", () => {
  const source = "export default function Demo() { return <p>Hello</p>; }";
  const first = compileLiveModule(source, { id: "/Demo.live.tsx" });
  const second = compileLiveModule(source, { id: "/Demo.live.tsx" });
  assert.equal(first.code, second.code);
  assert.match(first.code, /@vp-tw\/react-live\/react/);
});
