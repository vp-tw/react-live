import {defineConfig} from "rolldown"; import {reactLiveUnplugin} from "@vp-tw/react-live/unplugin";
export default defineConfig({input:"src/main.tsx",output:{dir:"dist",entryFileNames:"app.js",format:"esm"},plugins:[reactLiveUnplugin.rolldown()]});
