import request from "@/utils/request";
import type {
  GetLoginQrKeyResponse,
  GetLoginQrResponse,
  LoginQrStatusQueryResponse,
  LoginStatusResponse,
} from "@/types/response";

/** 获取登录二维码key */
export const getLoginQrKey = (data: { timestamp: number }) => {
  return request<GetLoginQrKeyResponse>("/login/qr/key", {
    method: "GET",
    data,
    isWhite: true,
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
    isWhite: true,
  });
};

/**  二维码检测扫码状态接口 */
export const loginQrStatusQuery = (data: {
  key: string;
  timestamp: number;
}) => {
  return request<LoginQrStatusQueryResponse>("/login/qr/check", {
    method: "GET",
    data,
    isWhite: true,
  });
};

/** 获取登录状态 */
export const getLoginStatus = () => {
  return request<LoginStatusResponse>("/login/status");
};

/** 退出登录 */
export const logoutApi = () => {
  return request('/logout')
};
