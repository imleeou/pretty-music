/** 歌手 */
export interface Singer {
  /** 歌手id */
  id: number;
  /** 歌手名 */
  name: string;
  /** 别名 */
  alias: string[];
}
/** 歌曲信息 */
export interface Song {
  /** 歌曲id */
  id: number;
  /** 歌曲名 */
  name: string;
  /** 歌手信息 */
  ar: Singer[];
  /** 别名 */
  alia: string[];
  /** 专辑信息 */
  al: {
    /** 专辑id */
    id: number;
    /** 专辑名 */
    name: string;
    /** 封面图 */
    picUrl: string;
  };
}
