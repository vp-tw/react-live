import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  clean: true,
  declaration: true,
  entries: [
    "src/index",
    "src/unplugin",
    "src/react",
    "src/docusaurus",
    "src/starlight",
  ],
  externals: [
    "@astrojs/react",
    "@astrojs/starlight",
    "@docusaurus/core",
    "@docusaurus/theme-live-codeblock",
    "react",
    "react-dom",
    "react-live",
  ],
  rollup: { emitCJS: false },
});
