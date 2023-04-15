import type { LOGIN_QR_STATUS_MAP } from "@/enums/constants";

/** 默认响应类型 */
export interface DefaultResponse<T> {
  cookies: string[];
  data: T;
  headers: any;
  statusCode: number;
  errMsg?: string;
}

/** 接口默认返回结构 */
export interface DefaultResponseData {
  code: number;
  data?: any;
  message?: string;
}

/** 获取二维码key返回值 */
export interface GetLoginQrKeyResponse {
  code: number;
  unikey: string;
}

/** 获取二维码接口返回 */
export interface GetLoginQrResponse {
  qrimg: string;
  qrurl: string;
}

/** 检测登录二维码状态 */
export interface LoginQrStatusQueryResponse {
  /** 二维码状态 */
  code: keyof typeof LOGIN_QR_STATUS_MAP;
  cookie: string;
  message: string;
}

/** 用户信息 */
export interface UserInfo {
  account: {
    id: number;
    userName: string;
    type: number;
    status: number;
    whitelistAuthority: number;
    createTime: number;
    tokenVersion: number;
    ban: number;
    baoyueVersion: number;
    donateVersion: number;
    vipType: number;
    anonimousUser: boolean;
    paidFee: boolean;
  };
  profile: null;
}

/** 登录状态account */
export interface LoginStatusAccount {
  id: number;
  vipType: number;
  status: number;
  [key: string]: any;
}

/** 登录状态profile */
export interface LoginStatusProfile {
  /** 头像 */
  avatarUrl: string;
  accountType: number;
  birthday: number;
  city: number;
  gender: number;
  /** 昵称 */
  nickname: string;
  backgroundUrl: string;
  /** 用户id */
  userId: number;
  [key: string]: any;
}
/** 登录状态 */
export interface LoginStatusResponse {
  code: number;
  account: LoginStatusAccount;
  profile: LoginStatusProfile;
}
