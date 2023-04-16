<script setup lang="ts">
import { logoutApi } from "@/api/login";

/** 登出 */
const logout = () => {
  uni.showModal({
    content: "确定退出登录吗？",
    success: async (res) => {
      if (res.confirm) {
        await logoutApi();
        uni.clearStorageSync();
        uni.reLaunch({
          url: "/pages/login/index",
        });
      }
    },
    fail: () => {
      uni.showToast({
        title: "退出登录失败",
      });
    },
  });
};
</script>

<template>
  <Layout showTabBar>
    <view class="account-page">
      <button @click="logout" class="logout-button">退出登录</button>
    </view>
  </Layout>
</template>

<style scoped lang="scss">
@import "@/style/variable.scss";
.account-page {
  width: 50%;
  height: 100%;
  border-right: $default-border;
  padding: 20rpx 0;
  .logout-button {
    width: 90%;
    color: $theme-color;
  }
}
</style>
