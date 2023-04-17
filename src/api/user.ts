import type { GetUserPlaylistResponse } from "@/types/response";
import request from "@/utils/request";

/** 获取用户歌单 */
export const getUserPlaylistApi = (data: {
  uid: number;
  limit?: number;
  offset?: number;
}) => {
  return request<GetUserPlaylistResponse>("/user/playlist", {
    data,
  });
};
