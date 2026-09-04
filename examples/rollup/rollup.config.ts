import commonjs from "@rollup/plugin-commonjs"; import resolve from "@rollup/plugin-node-resolve"; import typescript from "@rollup/plugin-typescript"; import {reactLiveUnplugin} from "@vp-tw/react-live/unplugin";
import replace from "@rollup/plugin-replace";
export default {input:"src/main.tsx",output:{dir:"dist",entryFileNames:"app.js",format:"esm"},plugins:[replace({preventAssignment:true,"process.env.NODE_ENV":JSON.stringify("production")}),reactLiveUnplugin.rollup(),resolve({extensions:[".js",".jsx",".ts",".tsx"]}),commonjs(),typescript({jsx:"react-jsx",outDir:"dist"})]};
