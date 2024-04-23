import { fileURLToPath, URL } from "node:url"

import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
//引入emelui
import Components from "unplugin-vue-components/vite"
// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite"
const env = loadEnv(process.env.NODE_ENV, process.cwd())
console.log(env, "env")

// https://vitejs.dev/config/
export default defineConfig({
  //项目根目录
  base: "/",
  //静态资源
  build: {
    //生成静态资源包
    outDir: "dist",
    //assets命名
    assetsDir: "assetss"
  },
  //配置跨越
  server: {
    //ip地址设置成0.0.0.0可以用本机的ip加端口号用于别人访问
    host: "0.0.0.0",
    //端口号
    port: 5175,
    //当前端口被占用的话，设置true会暂停启动，false会自动寻找一个可用的端口
    strictPort: true,
    //代理
    proxy: {
      [env.VITE_APP_BASE_API]: {
        //代理路径
        target: env.VITE_APP_BASE_URL,
        //是否开启
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp("^" + env.VITE_APP_BASE_API), "")
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      //安装两行后你会发现在组件中不用再导入ref，reactive等
      imports: ["vue", "vue-router"],
      //存放的位置
      dts: "src/auto-import.d.ts",
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  //代理名称
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@compon": fileURLToPath(new URL("./src/components", import.meta.url))
    }
  }
})
