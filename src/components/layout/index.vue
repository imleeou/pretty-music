<script setup lang="ts">
import TabBar from "./modules/TabBar.vue";
import ControlStrip from "./modules/ControlStrip.vue";

interface Props {
  /** 是否显示tabbar  */
  showTabBar?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showTabBar: false,
});
</script>

<template>
  <view :class="['page-layout', props.showTabBar && 'tabbar-page-layout']">
    <TabBar v-if="props.showTabBar" />
    <view class="layout-content">
      <slot></slot>
    </view>
    <ControlStrip></ControlStrip>
  </view>
</template>

<style scoped lang="scss">
.page-layout {
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  .layout-content {
    width: 100%;
    min-height: 100%;
  }
}
.tabbar-page-layout {
  display: flex;
  .layout-content {
    width: calc(100% - $landscape-tabbar-width);
  }
}
</style>
