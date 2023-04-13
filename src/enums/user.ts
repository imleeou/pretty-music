/** 登录二维码扫描状态 */
export enum LoginQrStatus {
  /** 二维码过期 */
  EXPIRED = 800,
  /** 等待扫码 */
  WAITING = 801,
  /** 待确认 */
  PENDING = 802,
  /** 授权登录成功 */
  SUCCESS = 803,
}