import React from "react";
import type { ReactLiveProps } from "./react.js";
import { ReactLive } from "./react.js";

export function DocusaurusLive(props: ReactLiveProps) {
  return (
    <ReactLive
      {...props}
      labels={{
        editor: "Editable React source",
        preview: "Docusaurus live preview",
        ...props.labels,
      }}
    />
  );
}
