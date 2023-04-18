<script setup lang="ts">
import { computed, ref, watch } from "vue";

interface Props {
  /** 出现的方向 */
  direction?: "left" | "right";
  width?: string | number;
  /** 是否显示 */
  show: boolean;
  /** 动画过渡时间 */
  duration?: number;
  /** 插入位置 */
  to?: string | HTMLElement;
  /** 抽屉名字 */
  name?: string;
  zIndex?: number;
}
const props = withDefaults(defineProps<Props>(), {
    direction: "right",
    width: "1120rpx",
    duration: 300,
    to: "body",
    zIndex: 100,
  }),
  emits = defineEmits<{
    (e: "update:show", val: boolean): void;
    (e: "close"): void;
  }>();
const drawerShow = ref(props.show);
watch(
  () => drawerShow.value,
  (val) => {
    emits("update:show", val);
  }
);

/** 动态样式 */
const dynamicStyle = computed(() => {
  // 判断是否是纯数字
  const width =
    typeof props.width === "number" ? `${props.width}rpx` : props.width;
  // 通过定位 left 或者 right 来实现
  return {
    width,
    [props.direction]: props.show ? 0 : `-${width}`,
    transition: `${props.direction} ${props.duration}ms`,
    zIndex: props.zIndex,
  };
});

/** 关闭抽屉 */
const close = () => {
  drawerShow.value = false;
  emits("update:show", false);
  emits("close");
};
</script>

<template>
  <view class="pretty-drawer" :style="dynamicStyle">
    <header class="header">
      <i @click="close" class="iconfont icon-drawer-toright"></i>
      <text class="module-tit" v-if="props.name">{{ props.name }}</text>
    </header>
    <slot></slot>
  </view>
</template>

<style scoped lang="scss">
@import '@/style/variable.scss';
.pretty-drawer {
  height: 100%;
  position: fixed;
  top: 0;
  background-color: #fff;
  // 左侧阴影
  box-shadow:$default-shadow;
  .header {
    width: 100%;
    height: 100rpx;
    position: relative;
    padding: 0 20rpx;
    text-align: center;
    line-height: 60rpx;
    > .iconfont {
      font-size: 80rpx;
      position: absolute;
      top: 20rpx;
      left: 20rpx;
      &:active {
        color: #7b7b7b;
      }
    }
  }
}
</style>
