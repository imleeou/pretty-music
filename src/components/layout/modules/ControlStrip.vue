<script setup lang="ts"></script>

<template>
  <view class="control-strip"> 12</view>
</template>

<style scoped lang="scss">
.control-strip {
  width: 100%;
  height: $control-strip-height;
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: $default-shadow;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
</style>
