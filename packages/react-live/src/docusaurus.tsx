import { reactLiveUnplugin } from "./unplugin.js";

export default function docusaurusReactLive() {
  return {
    name: "@vp-tw/react-live/docusaurus",
    configureWebpack() {
      return {
        plugins: [
          reactLiveUnplugin.webpack({
            enforce: "pre",
            rendererExport: "DocusaurusLive",
            rendererModule: "@vp-tw/react-live/docusaurus/renderer",
          }),
        ],
      };
    },
  };
}
