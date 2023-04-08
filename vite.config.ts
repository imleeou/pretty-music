import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9001,
    proxy: {
      "/base-api": {
        target: "http://music.leeou.cc",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/base-api/, ""),
      },
    },
  },
  plugins: [uni()],
});
