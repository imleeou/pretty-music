import { DeviceOrientation } from "./system";

/** 系统名称 */
export const SYSTEM_NAME = "Pretty Music";

/** 设备方向映射 */
export const DEVICE_ORIENTATION_MAP = {
  [DeviceOrientation.PORTRAIT]: "竖屏",
  [DeviceOrientation.LANDSCAPE]: "横屏",
};
/** 横向tabbar展示内容 */
export const TABBAR_LIST = [
  {
    name: "音悦台",
    icon: "icon-music-station",
    path: "/pages/home/index",
  },
  {
    name: "我的",
    icon: "icon-playlist",
    path: "/pages/playlist/index",
  },
  {
    name: "账号",
    icon: "icon-account",
    path: "/pages/account/index",
  },
];
