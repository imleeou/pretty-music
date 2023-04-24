import { createSSRApp } from "vue";
import * as Pinia from "pinia";
import App from "./App.vue";
import "@/style/iconfont.css";
import Layout from "@/components/layout/index.vue";

export function createApp() {
  const app = createSSRApp(App);
  app.component("Layout", Layout)
  app.use(Pinia.createPinia());
  return {
    app,
    Pinia,
  };
}
