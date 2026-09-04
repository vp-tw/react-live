import type { BuildEntry } from "unbuild";
import { defineBuildConfig } from "unbuild";
import { build } from "esbuild";

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
  failOnWarn: true,
  externals: [
    "@astrojs/react",
    "@astrojs/starlight",
    "@docusaurus/core",
    "react",
    "react-dom",
    "react-live",
  ],
  hooks: {
    async "build:done"(ctx) {
      await build({
        bundle: true,
        entryPoints: ["src/docusaurus.tsx"],
        format: "cjs",
        outfile: "dist/docusaurus.cjs",
        packages: "external",
        platform: "node",
      });
      for (const warning of ctx.warnings) {
        if (
          warning.includes("Potential missing package.json files:") &&
          warning.includes("dist/docusaurus.cjs")
        ) {
          ctx.warnings.delete(warning);
        }
      }
    },
  },
});
