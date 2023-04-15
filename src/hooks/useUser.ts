import { getLoginStatus } from "@/api/login";
import { getCookieSync } from "@/utils/auth";

export const useUser = () => {
  /** 判断是否有效登录，是否有cookie 或 cookie是否过期
   * @param { boolean } autoTo 是否自动跳转登录页
   * @returns { false | DefaultResponseData } false 未登录，否则返回登录信息
   */
  const verifyLoginStatus = async (autoTo = true) => {
    if (!getCookieSync()) {
      const currentPages = getCurrentPages();
      if (
        autoTo &&
        currentPages.length &&
        currentPages[currentPages.length - 1]?.route !== "/pages/login/index"
      ) {
        uni.redirectTo({
          url: "/pages/login/index",
        });
      }
      return false;
    } else {
      const { data } = await getLoginStatus({
        cookie: getCookieSync(),
      });
      console.log("data", data);
      return data;
    }
  };

  return {
    verifyLoginStatus,
  };
};

export default useUser;
