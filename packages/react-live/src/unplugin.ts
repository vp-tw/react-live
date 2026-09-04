import type { FilterPattern, UnpluginFactory } from "unplugin";
import { createUnplugin } from "unplugin";
import { compileLiveModule } from "./compiler.js";

export interface ReactLiveOptions {
  enforce?: "pre" | "post";
  exclude?: FilterPattern;
  include?: FilterPattern;
  rendererExport?: string;
  rendererModule?: string;
}

export const defaultOptions = {
  exclude: /node_modules/,
  include: /\.live\.[jt]sx$/,
  rendererExport: "ReactLive",
  rendererModule: "@vp-tw/react-live/react",
} satisfies ReactLiveOptions;

const factory: UnpluginFactory<ReactLiveOptions | undefined> = (options) => {
  const resolved = { ...defaultOptions, ...options };
  return {
    enforce: resolved.enforce,
    name: "vp-react-live",
    transform: {
      filter: { exclude: resolved.exclude, id: resolved.include },
      handler(code, id) {
        return compileLiveModule(code, {
          id,
          rendererExport: resolved.rendererExport,
          rendererModule: resolved.rendererModule,
        });
      },
    },
  };
};

export const reactLiveUnplugin = createUnplugin(factory);
