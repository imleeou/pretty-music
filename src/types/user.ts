/** 用户歌单 */
export interface UserPlaylist {
  subscribed: boolean;
  id: number;
  creator: {
    defaultAvatar: boolean;
    avatarUrl: string;
    signature: string;
    description: string;
    backgroundUrl: string;
    nickname: string;
  },
  /** 歌单名 */
  name: string;
  /** 歌曲数量 */
  trackCount: number;
  /** 封面图 */
  coverImgUrl: string;
  artists: null;
  tracks: null;
}