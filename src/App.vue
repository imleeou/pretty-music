<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import routerBeforeEach from "./utils/routerBeforeEach";
import useUser from "./hooks/useUser";
onLaunch(async () => {
  console.log("App Launch");
  // 注册路由守卫
  routerBeforeEach();
  const useUserApi = useUser();
  if (await useUserApi.verifyLoginStatus()) {
    // 登录有效，跳转到首页
    uni.redirectTo({
      url: "/pages/home/index",
    });
  }
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import "@/style/index.scss";
// 通配符样式卸载index.scss中不生效
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
