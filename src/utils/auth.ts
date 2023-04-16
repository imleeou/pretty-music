import { LOGIN_COOKIE_KEY } from "../enums/constants/setting";

/** 缓存接口返回的Cookie字段信息 */
export function setCookieSync(cookie: string) {
  uni.setStorageSync(LOGIN_COOKIE_KEY, cookie);
}

/** 获取缓存的Cookie字段信息 */
export function getCookieSync() {
  return uni.getStorageSync(LOGIN_COOKIE_KEY);
}

/** 移除Cookie字段信息 */
export function removeCookieSync() {
  uni.removeStorageSync(LOGIN_COOKIE_KEY);
}