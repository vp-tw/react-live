import {defineConfig} from "astro/config"; import starlight from "@astrojs/starlight"; import starlightReactLive from "@vp-tw/react-live/starlight";
export default defineConfig({site:"https://vp-tw.github.io",base:"/react-live/starlight",integrations:[starlight({title:"React Live · Starlight",plugins:[starlightReactLive()],sidebar:[{label:"Demo",slug:"demo"}]})]});
