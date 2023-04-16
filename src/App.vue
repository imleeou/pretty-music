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
@import './style/index.scss';
</style>
