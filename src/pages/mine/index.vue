<script setup lang="ts">
import { ref } from "vue";
import { getUserPlaylistApi } from "@/api/user";
import { USER_PROFILE_KEY } from "@/enums/constants/setting";
import type { LoginStatusProfile } from "@/types/response";
import type { UserPlaylist } from "@/types/user";
import PrettyDrawer from "@/components/PrettyDrawer/index.vue";

interface CurrentPlayList extends UserPlaylist {
  /** 歌单下的歌曲 */
  musics: [];
}

const userInfo: LoginStatusProfile = uni.getStorageSync(USER_PROFILE_KEY),
  /** 保存歌单信息 */
  playlist = ref<UserPlaylist[]>([]),
  /** 歌单是否加载完毕 */
  isPlaylistLoaded = ref(true),
  /** 是否显示抽屉 */
  show = ref(false),
  /** 保存当前歌单信息 */
  currentPlaylist = ref<CurrentPlayList>();
/** 获取用户歌单 */
const getUserPlaylist = async () => {
  const { data } = await getUserPlaylistApi({
    uid: userInfo.userId,
    offset: 0,
    limit: 20,
  });
  playlist.value = data.playlist;
  isPlaylistLoaded.value = !data.more;
};
getUserPlaylist();

/** 点击歌单 */
const clickPlayList = (item: UserPlaylist) => {
  show.value = true;
  currentPlaylist.value = {
    ...item,
    musics: [],
  };
  console.log("clickPlayList", item, show.value);
};
</script>

<template>
  <Layout showTabBar>
    <view class="mine-list">
      <view class="module-title">
        <text class="tit">我创建的歌单（{{ playlist.length }}）</text>
        <text class="tip" v-if="!isPlaylistLoaded">查看更多</text>
      </view>
      <view class="play-list">
        <view
          class="play"
          v-for="l in playlist"
          :key="l.id"
          @click="clickPlayList(l)"
        >
          <image class="cover-image" :src="l.coverImgUrl" />
          <view class="play-list-info">
            <text class="name">{{ l.name }}</text>
            <text class="track-count">{{ l.trackCount }} 首</text>
          </view>
        </view>
      </view>
    </view>
    <PrettyDrawer v-model:show="show" :name="currentPlaylist?.name"> 123 </PrettyDrawer>
  </Layout>
</template>

<style scoped lang="scss">
@import "@/style/variable.scss";
.mine-list {
  width: 50%;
  height: 100%;
  border-right: $default-border;
  padding: 0 50rpx;
  .module-title {
    font-size: 40rpx;
    padding: 20rpx 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tip {
      font-size: 34rpx;
      color: $default-gray;
    }
  }
  .play-list {
    width: 100%;
    .play {
      width: 100%;
      height: 150rpx;
      margin-bottom: 20rpx;
      display: flex;
      align-items: center;
      &:last-child {
        margin-bottom: 0;
      }
      &:active {
        background-color: $default-active-bg;
      }
      .cover-image {
        width: 150rpx;
        height: 150rpx;
        flex-shrink: 0;
        object-fit: cover;
      }
      .play-list-info {
        display: flex;
        flex-direction: column;
        margin-left: 20rpx;
        width: calc(100% - 120rpx);
        .name {
          margin-bottom: 10rpx;
          font-size: 40rpx;
          max-width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .track-count {
          font-size: 30rpx;
          color: $default-gray;
        }
      }
    }
  }
}
</style>
