import { cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const target = resolve(root, "site");
const examples = [
  "vite",
  "rollup",
  "webpack",
  "rolldown",
  "custom-renderer",
  "docusaurus",
  "starlight",
];

await rm(target, { force: true, recursive: true });
await mkdir(target, { recursive: true });
await cp(resolve(root, "pages"), target, { recursive: true });
for (const example of examples) {
  await cp(resolve(root, "examples", example, "dist"), resolve(target, example), {
    recursive: true,
  });
}
