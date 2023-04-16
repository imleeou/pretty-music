<script setup lang="ts">
import { ref } from "vue";
import { TABBAR_LIST } from "@/enums/constants/setting";
const activeBar = ref<string>(),
  menuPaths = TABBAR_LIST.map((bar) => bar.path);
const pageInfo = getCurrentPages().pop(),
  currentPagePath = pageInfo?.route ? "/" + pageInfo.route : "";
// 判断当前页面是否在tabbar中
if (currentPagePath && menuPaths.includes(currentPagePath)) {
  activeBar.value = currentPagePath;
}

/** 切换bar */
const toggleBar = (bar: { path: string }) => {
  if (bar.path === activeBar.value) return;
  uni.redirectTo({
    url: bar.path,
  });
};
</script>

<template>
  <view class="tabbar">
    <view
      :class="['bar', activeBar === bar.path && 'active-bar']"
      v-for="(bar, index) in TABBAR_LIST"
      :key="index"
      @click="toggleBar(bar)"
    >
      <view class="icon flex-center"><i :class="['iconfont', bar.icon]"></i></view>
      <text class="name">{{ bar.name }}</text>
    </view>
  </view>
</template>

<style scoped lang="scss">
@import "@/style/variable.scss";
.tabbar {
  width: $landscape-tabbar-width;
  height: 100vh;
  box-shadow: $default-shadow;
  padding: 100rpx 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .bar {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 100rpx;
    color: $default-black;
    .name {
      font-size: 30rpx;
      margin-top: 6rpx;
    }
    .icon {
      padding: 14rpx;
      border-radius: 50%;
      > .iconfont {
      font-size: 50rpx;
    }
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  .active-bar {
    .name {
      color: $theme-color;
      font-weight: bold;
    }
    .icon {
      background-color: $theme-color;
      color: #fff;
    }
  }
}
</style>
