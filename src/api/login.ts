import request from "@/utils/request";
import type { GetLoginQrKeyResponse, GetLoginQrResponse } from "@/types/response";

/** 获取登录二维码key */
export const getLoginQrKey = (data: { timestamp: number }) => {
  return request<GetLoginQrKeyResponse>("/login/qr/key", {
    method: "GET",
    data,
  });
};

/** 获取登录二维码 */
export const getLoginQr = (data: {
  key: string;
  qrimg?: boolean;
  timestamp: number;
}) => {
  return request<GetLoginQrResponse>("/login/qr/create", {
    method: "GET",
    data,
  });
};
