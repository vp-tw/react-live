# @vp-tw/react-live

Build editable React examples from the same component source files that an
application or documentation site imports. A `*.live.tsx` module keeps normal
imports and a single default export; the build plugin turns it into an editor,
runtime errors, and a live preview.

This repository is the next-generation successor to
[`react-live-unplugin`](https://github.com/VdustR/react-live-unplugin). The first
review build is not published to npm yet.

## Status

- One npm package with explicit subpath exports; no nested package family.
- Vite, Rollup, Webpack, and Rolldown adapters.
- Docusaurus and Astro Starlight integrations.
- React 18 and newer are represented by the peer dependency contract.
- Node.js 22.22.1, 24.11.0, and future even-numbered releases are represented by
  the workspace engine and CI matrix.

Every supported integration has a production-built project in
[`examples`](./examples). The GitHub Pages workflow publishes all seven browser
demos from one index.

## Module contract

Create a file such as `Counter.live.tsx`:

```tsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

The module must contain exactly one default export. Imports become the runtime
scope available to the editor. Type-only imports are excluded. Re-exports are
rejected because they do not provide editable component source.

## Entry points

| Entry point | Purpose |
| --- | --- |
| `@vp-tw/react-live` | Compiler and runtime exports |
| `@vp-tw/react-live/unplugin` | Vite, Rollup, Webpack, and Rolldown adapters |
| `@vp-tw/react-live/react` | Default React live renderer |
| `@vp-tw/react-live/docusaurus` | Docusaurus configuration plugin |
| `@vp-tw/react-live/docusaurus/renderer` | Docusaurus renderer used by generated modules |
| `@vp-tw/react-live/starlight` | Astro Starlight integration |

The custom-renderer example demonstrates how to replace the default UI while
keeping the same compiler.

## Development

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm check
corepack pnpm build:pages
```

Track architecture and migration work in
[migration epic #1](https://github.com/vp-tw/react-live/issues/1). Publishing,
moving users, and archiving the legacy repository require separate approval.
