import { createSSRApp } from "vue";
import App from "./App.vue";
import '@/style/iconfont.css'
import '@/style/index.scss'
import Layout from '@/components/layout/index.vue'

export function createApp() {
  const app = createSSRApp(App);
  app.component('Layout', Layout)
  return {
    app,
  };
}
