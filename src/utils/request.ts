import type { DefaultResponse } from "@/types/response";

interface RequestConfig {
  data?: any;
  method?: "GET" | "POST";
  header?: any;
}

const BASE_URL = import.meta.env.VITE_API_URL as string;
/** 默认配置 */
const defaultOptions = {
  methods: "POST",
  header: {
    "Content-Type": "application/json;charset=UTF-8",
  },
};

const request = <R>(
  url: string,
  options?: RequestConfig
): Promise<DefaultResponse<R>> => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
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
