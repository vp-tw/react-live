# Examples

Each directory is a runnable production build and a fixture for one supported
integration. `pnpm build:pages` builds every project and assembles the output in
`site/` for GitHub Pages.

| Directory | Coverage |
| --- | --- |
| `vite` | Vite adapter and React 18 runtime |
| `rollup` | Direct Rollup adapter |
| `webpack` | Webpack 5 adapter |
| `rolldown` | Native Rolldown adapter |
| `custom-renderer` | Custom generated-module renderer |
| `docusaurus` | Docusaurus configuration plugin and SSR hydration |
| `starlight` | Astro Starlight integration and hydrated React island |

The remaining examples use React 19, so the examples exercise both supported
React major versions.

All example dependencies are workspace-local development fixtures. They are not
additional published packages.
