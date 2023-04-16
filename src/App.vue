<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import routerBeforeEach from "./utils/routerBeforeEach";
import useUser from "./hooks/useUser";
onLaunch(async () => {
  console.log("App Launch");
  // 注册路由守卫
  routerBeforeEach();
  const useUserApi = useUser();
  await useUserApi.verifyLoginStatus();
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
// 通配符样式卸载index.scss中不生效
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  padding-top: var(--status-bar-height);
}
</style>
