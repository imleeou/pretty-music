import { getCookieSync } from "./auth";

/** 路由白名单 */
const whiteList = ["/", "/pages/login/index"];

export default async function () {
  // 为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
  const list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
  list.forEach((item) => {
    uni.addInterceptor(item, {
      invoke(e) {
        // 获取要跳转的页面路径（url去掉"?"和"?"后的参数）
        const url = e.url.split("?")[0];
        // 判断当前窗口是白名单，如果是则不重定向路由
        let pass;
        if (whiteList) {
          pass = whiteList.some((item) => {
            return url === item;
          });
        }

        // 不是白名单并且没有cookie
        if (!pass && !getCookieSync()) {
          uni.showToast({
            title: "未登录或登录已过期",
            icon: "none",
          });
          uni.navigateTo({
            url: "/pages/login/index",
          });
          return false;
        }
        return e;
      },
      fail(err) {
        // 失败回调拦截
        console.log(err);
      },
    });
  });
}
