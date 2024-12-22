<template>
  <view class="flex flex-col items-center justify-center">
    <image
      class="mb-50rpx mt-200rpx h-200rpx w-200rpx"
      src="@/static/images/logo.png"
      width="200rpx"
      height="200rpx"
    />


    <Tabbar pathName='wall'></Tabbar>
    <!-- #ifdef MP-WEIXIN -->
    <!-- 隐私协议组件 -->
    <agree-privacy v-model="showAgreePrivacy" :disable-check-privacy="false" @agree="handleAgree" />
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">
// #ifdef MP-WEIXIN
import { useShare } from '@/hooks';
// #endif
import { useUserStore } from '@/store';

// #ifdef MP-WEIXIN
// 分享使用示例
const { onShareAppMessage, onShareTimeline } = useShare({
  title: '首页',
  path: 'pages/tab/home/index',
  imageUrl: '',
});
onShareAppMessage();
onShareTimeline();
// #endif

const title = ref<string>();
title.value = import.meta.env.VITE_APP_TITLE;

const showAgreePrivacy = ref(false);

const userStore = useUserStore();
console.log('userStore.user_name', userStore.user_name);

// 同意隐私协议
function handleAgree() {
  console.log('同意隐私政策');
}

</script>
