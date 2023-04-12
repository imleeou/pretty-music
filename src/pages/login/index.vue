<script setup lang="ts">
import { ref } from "vue";
import { DEVICE_ORIENTATION_MAP } from "@/enums/constants";
import { getLoginQr, getLoginQrKey } from "@/api/login";
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
const getQrCodeKey = async () => {
  const { data } = await getLoginQrKey({
    timestamp: Date.now(),
  });
  getQrCode(data.unikey);
};
getQrCodeKey();

/** 获取登录二维码 */
const getQrCode = async (key: string) => {
  const { data } = await getLoginQr({
    timestamp: Date.now(),
    key,
    qrimg: true,
  });
  qrCodeUrl.value = data.qrimg;
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
          设备方向：{{ DEVICE_ORIENTATION_MAP[systemInfo?.deviceOrientation!] }}
        </li>
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
