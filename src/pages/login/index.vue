<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import { DEVICE_ORIENTATION_MAP } from "@/enums/constants";
import { getLoginQr, getLoginQrKey, loginQrStatusQuery } from "@/api/login";
import { LoginQrStatus } from "@/enums/user";
import { setCookieSync } from "@/utils/auth";
/** 保存系统信息 */
const systemInfo = ref<UniApp.GetSystemInfoResult>(),
  /** 二维码key */
  qrCodeKey = ref<string>(),
  /** 二维码 */
  qrCodeUrl = ref<string>(),
  /** 轮询二维码状态定时器 */
  timer = ref<number>(),
  /** 二维码状态 */
  qrCodeStatus = ref<LoginQrStatus>();
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
  qrCodeKey.value = data.unikey;
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
  // 设置状态轮询
  pollingLoginStatus(key);
};

/** 定时查询二维码状态 */
const pollingLoginStatus = (key: string) => {
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = undefined;
  }
  timer.value = setInterval(async () => {
    const { data } = await loginQrStatusQuery({
      timestamp: Date.now(),
      key,
    });
    qrCodeStatus.value = data.code;
    //  如果二维码失效，重新获取
    if (data.code === LoginQrStatus.EXPIRED) {
      clearInterval(timer.value);
      getQrCodeKey();
    } else if (data.code === LoginQrStatus.SUCCESS) {
      // 登录成功
      clearInterval(timer.value);
      setCookieSync(data.cookie);
      // 跳转到首页
      uni.redirectTo({
        url: "/pages/home/index",
      });
    }
  }, 3000);
};

/** 点击二维码刷新 */
const clickQr = () => {
  clearInterval(timer.value);
  getQrCodeKey();
};

onUnmounted(() => {
  clearInterval(timer.value);
});
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
      <view class="qrcode-box">
        <image @click="clickQr" v-if="qrCodeUrl" :src="qrCodeUrl" />
      </view>
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
  .qrcode-box {
    width: 400rpx;
    height: 400rpx;
    margin: 0 auto;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
