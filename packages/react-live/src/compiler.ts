import { createHash } from "node:crypto";
import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";

export interface CompileOptions {
  id: string;
  rendererExport?: string;
  rendererModule?: string;
}

export interface LiveModule {
  code: string;
  id: string;
  imports: string[];
  scope: string[];
}

function traverseAst(...args: Parameters<typeof traverseModule>) {
  const traverse =
    (traverseModule as unknown as { default?: typeof traverseModule }).default ??
    traverseModule;
  return traverse(...args);
}

export function analyzeLiveModule(code: string, id: string): LiveModule {
  const ast = parse(code, {
    errorRecovery: false,
    plugins: ["jsx", "typescript"],
    sourceFilename: id,
    sourceType: "module",
  });
  const imports: string[] = [];
  const scope = new Set<string>();
  let defaultExports = 0;

  traverseAst(ast, {
    ExportDefaultDeclaration() {
      defaultExports += 1;
    },
    ImportDeclaration(path) {
      const declaration = path.node;
      imports.push(code.slice(declaration.start ?? 0, declaration.end ?? 0));
      if (declaration.importKind === "type") return;

      for (const specifier of declaration.specifiers) {
        if (
          specifier.type === "ImportSpecifier" &&
          specifier.importKind === "type"
        ) {
          continue;
        }
        scope.add(specifier.local.name);
      }
    },
  });

  if (defaultExports !== 1) {
    throw new Error(
      `[react-live] ${id} must contain exactly one default export; found ${defaultExports}.`,
    );
  }

  return { code, id, imports, scope: [...scope] };
}

export function compileLiveModule(
  code: string,
  options: CompileOptions,
): { code: string; map: null; meta: LiveModule } {
  const meta = analyzeLiveModule(code, options.id);
  const suffix = createHash("sha256")
    .update(`${options.id}\0${code}`)
    .digest("hex")
    .slice(0, 10);
  const rendererModule = options.rendererModule ?? "@vp-tw/react-live/react";
  const rendererExport = options.rendererExport ?? "ReactLive";
  const names = {
    code: `__live_code_${suffix}`,
    component: `__LiveRenderer_${suffix}`,
    createElement: `__createElement_${suffix}`,
    scope: `__live_scope_${suffix}`,
  };
  const scope = meta.scope.length > 0 ? `{ ${meta.scope.join(", ")} }` : "{}";

  return {
    code: [
      `import { createElement as ${names.createElement} } from "react";`,
      `import { ${rendererExport} as ${names.component} } from ${JSON.stringify(rendererModule)};`,
      ...meta.imports,
      `const ${names.code} = ${JSON.stringify(code)};`,
      `const ${names.scope} = ${scope};`,
      `export default function LiveExample() {`,
      `  return ${names.createElement}(${names.component}, { code: ${names.code}, scope: ${names.scope} });`,
      `}`,
    ].join("\n"),
    map: null,
    meta,
  };
}
