import type { DefaultResponse, DefaultResponseData } from "@/types/response";
import { getCookieSync } from "./auth";
interface RequestConfig {
  data?: any;
  method?: "GET" | "POST";
  header?: {
    "Content-Type"?: string;
    Cookie?: string;
    [key: string]: any;
  };
  /** 是否白名单 */
  isWhite?: boolean;
  /** 开启后可在headers中编辑cookie */
  enableCookie?: boolean;
  /**  跨域请求时是否携带凭证（cookies）*/
  withCredentials?: boolean;
}

const BASE_URL = import.meta.env.VITE_API_URL as string;
/** 默认配置 */
const defaultOptions: RequestConfig = {
  method: "POST",
  header: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  withCredentials: true,
};

const request = <R = DefaultResponseData>(
  url: string,
  options: RequestConfig = defaultOptions
): Promise<DefaultResponse<R>> => {
  return new Promise((resolve, reject) => {
    // 如果不是白名单，添加cookie
    if (!options?.isWhite) {
      const cookie = getCookieSync();
      if (!cookie) {
        uni.showToast({
          title: "未登录或登录已过期",
          icon: "none",
        });
        uni.redirectTo({
          url: "/pages/login/index",
        });
        return false;
      }
      // 手动添加cookie
      options.data = {
        ...options.data,
        cookie,
      };
    }
    // POST 请求 url 必须添加时间戳,使每次请求 url 不一样,不然请求会被缓存
    const postUrl =
      options?.method === "POST" || !options.method
        ? url + "?timestamp=" + Date.now()
        : url;
    uni.request({
      url: BASE_URL + postUrl,
      ...defaultOptions,
      ...options,
      success: (res) => {
        const data = res.data;
        resolve({
          ...res,
          // 判断data下是否有data字段，如果有则返回data.data，否则返回data
          data: (data as any)?.data ? (data as any)?.data : data,
        } as unknown as DefaultResponse<R>);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

export default request;
