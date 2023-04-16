<script setup lang="ts">
import { logoutApi } from "@/api/login";
import { USER_PROFILE_KEY } from "@/enums/constants/setting";
import type { LoginStatusProfile } from "@/types/response";
/** 用户信息 */
const userInfo: LoginStatusProfile = uni.getStorageSync(USER_PROFILE_KEY);
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
      <view class="user">
        <image class="avatar" :src="userInfo.avatarUrl" />
        <text class="nickname">{{ userInfo.nickname }}</text>
      </view>
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
  .user {
    padding: 40rpx;
    display: flex;
    align-items: center;
    border-bottom: $default-border;
    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      object-fit: cover;
    }
    .nickname {
      margin-left: 20rpx;
      font-size: 38rpx;
    }
  }
  .logout-button {
    width: 90%;
    color: $theme-color;
    margin-top: 20rpx;
  }
}
</style>
