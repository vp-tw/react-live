import type { ComponentProps, FC } from "react";
import React, { useMemo } from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import { transformLiveCode } from "./runtime-transform.js";

export { transformLiveCode } from "./runtime-transform.js";

export interface ReactLiveProps
  extends Omit<ComponentProps<typeof LiveProvider>, "children" | "noInline"> {
  labels?: Partial<Record<"editor" | "error" | "preview", string>>;
}

export const reactLiveClassNames = {
  container: "vp-react-live",
  editor: "vp-react-live__editor",
  error: "vp-react-live__error",
  preview: "vp-react-live__preview",
} as const;

export const ReactLive: FC<ReactLiveProps> = ({
  code,
  labels,
  scope,
  ...props
}) => {
  const runtimeScope = useMemo(() => ({ ...React, ...scope }), [scope]);
  return (
    <LiveProvider
      {...props}
      code={code || ""}
      noInline
      scope={runtimeScope}
      transformCode={transformLiveCode}
    >
      <section className={reactLiveClassNames.container}>
        <div
          aria-label={labels?.editor ?? "Editable React source"}
          className={reactLiveClassNames.editor}
        >
          <LiveEditor />
        </div>
        <div
          aria-live="polite"
          className={reactLiveClassNames.error}
          role="status"
        >
          <LiveError />
        </div>
        <div
          aria-label={labels?.preview ?? "Live preview"}
          className={reactLiveClassNames.preview}
        >
          <LivePreview />
        </div>
      </section>
    </LiveProvider>
  );
};

ReactLive.displayName = "ReactLive";
