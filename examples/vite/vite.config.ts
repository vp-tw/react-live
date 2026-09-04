import react from "@vitejs/plugin-react"; import { defineConfig } from "vite"; import { reactLiveUnplugin } from "@vp-tw/react-live/unplugin";
export default defineConfig({base:"/react-live/vite/",resolve:{dedupe:["react","react-dom"]},plugins:[reactLiveUnplugin.vite(),react()]});
