import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
  css:{
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/style/variable.scss";`
      }
    }
  },
  server: {
    port: 9001,
    proxy: {
      "/base-api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/base-api/, ""),
      },
    },
  },
  plugins: [uni()],
});
