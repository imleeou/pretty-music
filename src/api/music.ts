import type { GetPlaylistMusicResponse } from "@/types/response";
import request from "@/utils/request";

/** 获取歌单所有歌曲 */
export const getPlaylistMusicApi = (data: {
  /** 歌单id */
  id: number;
  limit?: number;
  offset?: number;
}) => {
  return request<GetPlaylistMusicResponse>("/playlist/track/all", {
    data,
  });
};
