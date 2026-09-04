import type { BuildEntry } from "unbuild";
import { defineBuildConfig } from "unbuild";

const entry = {
  builder: "mkdist",
  declaration: true,
  ext: "js",
  format: "esm",
  input: "src",
  outDir: "dist",
} satisfies BuildEntry;

export default defineBuildConfig({
  clean: true,
  entries: [entry],
  failOnWarn: false,
  externals: [
    "@astrojs/react",
    "@astrojs/starlight",
    "@docusaurus/core",
    "@docusaurus/theme-live-codeblock",
    "react",
    "react-dom",
    "react-live",
  ],
});
