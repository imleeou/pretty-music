<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import routerBeforeEach from "./utils/routerBeforeEach";
onLaunch(() => {
  console.log("App Launch");
  routerBeforeEach();
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style></style>
