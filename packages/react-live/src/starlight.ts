import react from "@astrojs/react";
import type { StarlightPlugin } from "@astrojs/starlight/types";
import { reactLiveUnplugin } from "./unplugin.js";

export default function starlightReactLive(): StarlightPlugin {
  return {
    name: "@vp-tw/react-live/starlight",
    hooks: {
      "config:setup"({ addIntegration, astroConfig }) {
        if (!astroConfig.integrations.some(({ name }) => name === "@astrojs/react")) {
          addIntegration(react());
        }
        addIntegration({
          name: "@vp-tw/react-live/astro",
          hooks: {
            "astro:config:setup"({ updateConfig }) {
              updateConfig({ vite: { plugins: [reactLiveUnplugin.vite()] } });
            },
          },
        });
      },
    },
  };
}
