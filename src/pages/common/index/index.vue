<template>
	<view class="tabbar" >
    <view class="tabbar-item" v-for="(item,index) in list" :key="index" @click="changeTab(index)">
      <view class="select"  v-if="current == index">
        <view class="i-t position">
          <image class="img imgactive" mode="widthFix" :src="item.selectedIconPath" v-if="current == index"></image>
          <image class="img" mode="widthFix" :src="item.iconPath" v-else></image>
          <view class="text active" v-if="current == index">{{item.text}}</view>
          <view class="text" v-else>{{item.text}}</view>
        </view>
      </view>
      <view v-else>
        <image class="img" mode="widthFix" :src="item.selectedIconPath" v-if="current == index"></image>
        <image class="img" mode="widthFix" :src="item.iconPath" v-else></image>
        <view class="text active" v-if="current == index">{{item.text}}</view>
        <view class="text" v-else>{{item.text}}</view>
      </view>
    </view>
  </view>
</template>

<script setup>

const IMG_Suffix = `?x-oss-process=image/resize,m_fill,h_100,w_100`
const IMG_prefix = `?x-oss-process=image/resize,m_fill,h_100,w_100`

const tabbarList = ref([
  {
    pagePath: "pages/tab/home/index",
    iconPath: `${IMG_prefix}/tabbar/1733319193233_scq.png${IMG_Suffix}`,
    selectedIconPath: `${IMG_prefix}/tabbar/1733319193233_scq.png${IMG_Suffix}`,
    text: "首页"
  },
  {
    pagePath: "pages/tab/schoolwall/index",
    iconPath: `${IMG_prefix}/tabbar/1733319193233_scq.png${IMG_Suffix}`,
    selectedIconPath: `${IMG_prefix}/tabbar/1733319193233_scq.png${IMG_Suffix}`,
    text: "表白墙"
  },
  {
    pagePath: "pages/tab/order/index",
    iconPath: `${IMG_prefix}/tabbar/1733319193233_scq.png${IMG_Suffix}`,
    selectedIconPath: `${IMG_prefix}/tabbar/1733319193233_scq.png${IMG_Suffix}`,
    text: "订单"
  },
  {
    pagePath: "pages/tab/user/index",
    iconPath: `${IMG_prefix}/tabbar/1733319193233_scq.png${IMG_Suffix}`,
    selectedIconPath: `${IMG_prefix}/tabbar/1733319193233_scq.png${IMG_Suffix}`,
    text: "我的"
  },
])

</script>

<style>

</style>
