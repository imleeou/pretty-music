<script setup lang="ts">
import { ref } from "vue";
import { getUserPlaylistApi } from "@/api/user";
import { USER_PROFILE_KEY } from "@/enums/constants/setting";
import type { LoginStatusProfile } from "@/types/response";
import type { UserPlaylist } from "@/types/user";
import PrettyDrawer from "@/components/PrettyDrawer/index.vue";
import { getPlaylistMusicApi } from "@/api/music";
import type { Song } from "@/types/music";

interface CurrentPlayList extends UserPlaylist {
  /** 歌单下的歌曲 */
  musics: Song[];
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
  getPlaylistMusics(currentPlaylist.value.id);
};

/** 获取歌单歌曲
 * @param id 歌单id
 */
const getPlaylistMusics = async (id: number) => {
  const { data } = await getPlaylistMusicApi({
    id,
  });
  currentPlaylist.value = {
    ...currentPlaylist.value,
    musics: data.songs,
  } as CurrentPlayList;
};

/** 点击歌曲 */
const playMusic = (s: Song) => {
  console.log("song", s);
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
    <PrettyDrawer v-model:show="show" :name="currentPlaylist?.name">
      <view class="drawer-header">
        <view
          class="bg"
          :style="{
            backgroundImage: `url(${currentPlaylist?.coverImgUrl})`,
          }"
        ></view>
        <image
          class="cover"
          :src="currentPlaylist?.coverImgUrl"
          mode="scaleToFill"
        />
        <view class="info">
          <text>{{ currentPlaylist?.name }}</text>
          <view class="creator">
            <image
              class="avatar"
              :src="currentPlaylist?.creator.avatarUrl"
              mode="scaleToFill"
            />
            <text class="nickname">{{
              currentPlaylist?.creator.nickname
            }}</text>
          </view>
        </view>
      </view>
      <view class="songs">
        <view
          class="song"
          v-for="(s, index) in currentPlaylist?.musics"
          :key="s.id"
          @click="playMusic(s)"
        >
          <view class="song-info">
            <text class="sort">{{ index + 1 }}</text>
            <view class="info">
              <text class="name">
                {{ s.name }}
                <text v-if="s.alia.length" class="alia">({{ s.alia[0] }})</text>
              </text>
              <text class="singer">{{ s.ar[0].name }} - {{ s.al.name }}</text>
            </view>
          </view>
        </view>
      </view>
    </PrettyDrawer>
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

.drawer-header {
  width: 100%;
  height: 400rpx;
  display: flex;
  padding: 50rpx;
  position: relative;
  align-items: center;
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    filter: blur(20rpx) brightness(70%);
    background-repeat: no-repeat;
    background-size: cover;
    left: 0;
    top: 0;
    z-index: -1;
  }
  .cover {
    width: 200rpx;
    height: 200rpx;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    margin-left: 50rpx;
    .creator {
      display: flex;
      align-items: center;
      margin-top: 20rpx;

      > .avatar {
        width: 60rpx;
        height: 60rpx;
        border-radius: 50%;
      }
      > .nickname {
        font-size: 30rpx;
        margin-left: 10rpx;
        color: #e1e1e1;
      }
    }
  }
}

.songs {
  padding: 40rpx 20rpx;
  .song {
    display: flex;
    align-items: center;
    padding: 20rpx 0;
    &:last-child {
      padding-bottom: 0;
    }
    &:active {
      background-color: $default-active-bg;
    }
    .song-info {
      display: flex;
      align-items: center;
      width: 100%;
      overflow: hidden;
      .sort {
        padding: 0 40rpx;
        font-size: 40rpx;
        color: $default-gray;
      }
      .info {
        display: flex;
        flex-direction: column;
        width: 84%;
        .name {
          font-size: 40rpx;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex-grow: 0;

          .alia {
            font-size: 30rpx;
            color: $default-gray;
          }
        }
        .singer {
          font-size: 30rpx;
          color: $default-gray;
        }
      }
    }
  }
}
</style>
