/** 默认响应类型 */
export interface DefaultResponse<T> {
  cookies: string[];
  data: T;
  headers: any;
  statusCode: number;
  errMsg?: string;
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