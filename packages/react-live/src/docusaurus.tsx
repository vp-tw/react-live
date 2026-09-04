import type { ReactLiveProps } from "./react.js";
import PlaygroundModule from "@docusaurus/theme-live-codeblock/lib/theme/Playground/index.js";
import React, { type ComponentType, useMemo } from "react";
import { transformLiveCode } from "./runtime-transform.js";
import { reactLiveUnplugin } from "./unplugin.js";

interface PlaygroundProps extends ReactLiveProps {
  noInline?: boolean;
  transformCode?: (code: string) => string;
}

const Playground = PlaygroundModule as unknown as ComponentType<PlaygroundProps>;

export function DocusaurusLive({ scope, ...props }: ReactLiveProps) {
  const runtimeScope = useMemo(() => ({ ...React, ...scope }), [scope]);
  return (
    <Playground
      {...props}
      noInline
      scope={runtimeScope}
      transformCode={transformLiveCode}
    />
  );
}

export default function docusaurusReactLive() {
  return {
    name: "@vp-tw/react-live/docusaurus",
    configureWebpack() {
      return {
        plugins: [
          reactLiveUnplugin.webpack({
            enforce: "pre",
            rendererExport: "DocusaurusLive",
            rendererModule: "@vp-tw/react-live/docusaurus",
          }),
        ],
      };
    },
  };
}
