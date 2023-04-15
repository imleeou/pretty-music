import { DeviceOrientation } from "../system";
import { LoginQrStatus } from "../user";

/** 系统名称 */
export const SYSTEM_NAME = "Pretty Music";

/** 登录获取的cookie */
export const LOGIN_COOKIE_KEY = "__login_cookie__"; 
/** 用户account */
export const USER_ACCOUNT_KEY = "__user_account__";
/** 用户profile */
export const USER_PROFILE_KEY = "__user_profile__";

/** 设备方向映射 */
export const DEVICE_ORIENTATION_MAP = {
  [DeviceOrientation.PORTRAIT]: "竖屏",
  [DeviceOrientation.LANDSCAPE]: "横屏",
};

/** 二维码状态映射 */
export const LOGIN_QR_STATUS_MAP = {
  [LoginQrStatus.EXPIRED]: "二维码过期",
  [LoginQrStatus.WAITING]: "等待扫码",
  [LoginQrStatus.PENDING]: "待确认",
  [LoginQrStatus.SUCCESS]: "授权登录成功",
}