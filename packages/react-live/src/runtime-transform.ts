import type { PluginObject } from "@babel/core";
import { transform } from "@babel/standalone";

export function transformLiveCode(code: string): string {
  const result = transform(code, {
    filename: "example.live.tsx",
    plugins: [
      function liveModulePlugin({ types: t }): PluginObject {
        return {
          visitor: {
            ExportDefaultDeclaration(path) {
              const declaration = path.node.declaration;
              let reference;

              if (declaration.type === "FunctionDeclaration") {
                const identifier = declaration.id ?? t.identifier("LiveDefault");
                declaration.id = identifier;
                reference = identifier;
                path.replaceWith(declaration);
              } else if (declaration.type === "ClassDeclaration") {
                const identifier = declaration.id ?? t.identifier("LiveDefault");
                declaration.id = identifier;
                reference = identifier;
                path.replaceWith(declaration);
              } else if (t.isIdentifier(declaration)) {
                reference = declaration;
                path.remove();
              } else {
                const identifier = t.identifier("LiveDefault");
                reference = identifier;
                path.replaceWith(
                  t.variableDeclaration("const", [
                    t.variableDeclarator(identifier, declaration),
                  ]),
                );
              }

              path.insertAfter(
                t.expressionStatement(
                  t.callExpression(t.identifier("render"), [
                    t.callExpression(
                      t.memberExpression(
                        t.identifier("React"),
                        t.identifier("createElement"),
                      ),
                      [reference],
                    ),
                  ]),
                ),
              );
            },
            ExportNamedDeclaration(path) {
              if (path.node.source) {
                throw path.buildCodeFrameError(
                  "Re-exports are not supported in live example modules.",
                );
              }
              if (path.node.declaration) path.replaceWith(path.node.declaration);
              else path.remove();
            },
            ImportDeclaration(path) {
              path.remove();
            },
          },
        };
      },
    ],
    presets: [
      ["typescript", { ignoreExtensions: true }],
      ["react", { runtime: "classic" }],
    ],
    sourceType: "module",
  });
  if (!result.code) throw new Error("React Live produced no executable code.");
  return result.code;
}
