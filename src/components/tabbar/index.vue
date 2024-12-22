<template>
  <view class="custom-tabbar">
    <view class="tab-contaion">
      <view class="tab-c-item" v-for="(item,index) of tabbarDatas" :key='index' @click="changeTab(item)" >
        <image style="width: 48.45rpx; height: 48.45rpx;" :src="props.pathName != item.pagePath ? item.iconPath : item.selectedIconPath" mode=""></image>
        <text :class="props.pathName == item.pagePath ? 'checkTab' : ''">{{item.text}}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useClipboard, usePermission } from '@/hooks';

  const props = defineProps({
    pathName: {
      type: String,
      default: 'home',
      required: false,
    },
  });
  const emit = defineEmits(['change']);


  const tabbarDatas = ref([
    {
      iconPath: "https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/tabbar/home.png?x-oss-process=image/resize,m_fill,h_100,w_100",
      selectedIconPath: "https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/tabbar/home-c.png?x-oss-process=image/resize,m_fill,h_100,w_100",
      pagePath: "home",
      path:"/pages/tab/home/index",
      text: "首页"
    },
    {
      iconPath: "https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/tabbar/wall.png?x-oss-process=image/resize,m_fill,h_100,w_100",
      selectedIconPath: "https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/tabbar/wall-c.png?x-oss-process=image/resize,m_fill,h_100,w_100",
      pagePath: "wall",
      path:"/pages/tab/schoolwall/index",
      text: "校园墙"
    },
    {
      iconPath: "https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/tabbar/order.png?x-oss-process=image/resize,m_fill,h_100,w_100",
      selectedIconPath: "https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/tabbar/order-c.png?x-oss-process=image/resize,m_fill,h_100,w_100",
      pagePath: "order",
      path:"/pages/tab/order/index",
      text: "订单"
    },
    {
      iconPath: "https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/tabbar/user.png?x-oss-process=image/resize,m_fill,h_100,w_100",
      selectedIconPath: "https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/tabbar/user-c.png?x-oss-process=image/resize,m_fill,h_100,w_100",
      pagePath: "user",
      path:"/pages/tab/user/index",
      text: "我的"
    },
  ])

  const changeTab = async(item)=>{
    if(item.pagePath != props.pathName){
      console.log("页面切换",item.path)

      const isLogin = await usePermission();
      // if(isLogin)
      // if
      uni.switchTab({
        url:item.path
      });
    }
  }

</script>

<style lang="scss" scoped>
  .custom-tabbar{
    height:127.91rpx;
    width: 100%;
    bottom:79.46rpx;
    left: 0;
    padding: 0 50.39rpx;
    box-sizing: border-box;
    position: fixed;
    .tab-contaion{
      width: 100%;
      height:100%;
      display: flex;
      background: #FFFFFF;
      box-shadow: 0rpx 0rpx 70rpx 0rpx rgba(0,119,210,0.16);
      border-radius: 58rpx 58rpx 58rpx 58rpx;
      border: 1rpx solid #E7E7E7;
      padding: 0 52.33rpx;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .tab-c-item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text{
          font-family: PingFang SC, PingFang SC;
          font-weight: 400;
          font-size: 19rpx;
          color: rgba(0,0,0,0.5);
          line-height: 31rpx;
          text-align: center;
          font-style: normal;
          text-transform: none;
          margin-top: 1.94rpx;
        }
        text.checkTab{
          color:#74D42D
        }
      }
    }

  }

</style>
