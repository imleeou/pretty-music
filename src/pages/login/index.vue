<script setup lang="ts">
import { ref } from "vue";
/** 保存系统信息 */
const systemInfo = ref<UniApp.GetSystemInfoResult>(),
  /** 二维码key */
  qrCodeKey = ref<string>(),
  /** 二维码 */
  qrCodeUrl = ref<string>();

/** 获取系统信息 */
const getSystemInfo = () => {
  systemInfo.value = uni.getSystemInfoSync();
};
getSystemInfo();

/** 获取二维码key */
const getQrCodeKey = () => {
  uni.request({
    url: "/base-api/login/qr/key",
    method: "GET",
    data: {
      timestamp: Date.now(),
    },
    success: (res: any) => {
      qrCodeKey.value = res.data.data.unikey;
      console.log("res.data", res.data.data);
      getQrCode(res.data.data.unikey);
    },
  });
};
getQrCodeKey();

/** 获取登录二维码 */
const getQrCode = (key: string) => {
  uni.request({
    url: "/base-api/login/qr/create",
    method: "GET",
    data: {
      timestamp: Date.now(),
      key,
      qrimg: true,
    },
    success: (res: any) => {
      qrCodeUrl.value = res.data.data.qrimg;
    },
  });
};
</script>

<template>
  <h2 class="system-name">Pretty Music</h2>
  <view class="page-content">
    <view class="device-info">
      <view>设备信息:</view>
      <ul>
        <li>设备类型：{{ systemInfo?.deviceType }}</li>
        <li>系统名称：{{ systemInfo?.osName }}</li>
        <li>ua：{{ systemInfo?.ua }}</li>
        <li>
          屏幕宽度：{{ systemInfo?.screenWidth }} - 屏幕高度：{{
            systemInfo?.screenHeight
          }}
        </li>
        <li>
          可使用宽度：{{ systemInfo?.windowWidth }} - 可使用高度：{{
            systemInfo?.windowHeight
          }}
        </li>
      </ul>
    </view>
    <view class="login">
      <view>扫码登录</view>
      <image v-if="qrCodeUrl" :src="qrCodeUrl" />
    </view>
  </view>
</template>

<style scoped lang="scss">
.system-name {
  font-size: 36px;
  color: #8f8f94;
  text-align: center;
}
.page-content {
  width: 100%;
  display: flex;
  border: 1px solid #8f8f94;
  view {
    width: 50%;
    flex: 1;
  }
  .device-info {
    border-right: 1px solid #8f8f94;
    li:nth-child(2n) {
      background-color: #8f8f9463;
    }
  }
}
</style>
