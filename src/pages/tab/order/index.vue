<template>
  <view class="page-wrap">
   <view class="top" :style="{ paddingTop: bHeight }">
      <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/21.png"  width="690rpx" height="388rpx" bg-color="#0000" class="rd-20rpx"/>
      <view class="bg-white">
        <view class="flex justify-around mt-52rpx">
          <view>
            <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/3.png"  width="64rpx" height="50rpx" bg-color="#0000"/>
            <text class="font-medium text-24rpx leading-40rpx text-black text-opacity-90 mt-8rpx">分类1</text>
          </view>
          <view>
            <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/8.png"  width="64rpx" height="50rpx" bg-color="#0000"/>
            <text class="font-medium text-24rpx leading-40rpx text-black text-opacity-90 mt-8rpx">分类1</text>
          </view>
          <view>
            <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/9.png"  width="64rpx" height="50rpx" bg-color="#0000"/>
            <text class="font-medium text-24rpx leading-40rpx text-black text-opacity-90 mt-8rpx">分类1</text>
          </view>
          <view>
            <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/10.png"  width="64rpx" height="50rpx" bg-color="#0000"/>
            <text class="font-medium text-24rpx leading-40rpx text-black text-opacity-90 mt-8rpx">分类1</text>
          </view>
          <view>
            <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/11.png"  width="64rpx" height="50rpx" bg-color="#0000"/>
            <text class="font-medium text-24rpx leading-40rpx text-black text-opacity-90 mt-8rpx">分类2</text>
          </view>
        </view>
        <view class="flex justify-around mt-48rpx">
          <view>
            <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/12.png"  width="64rpx" height="50rpx" bg-color="#0000"/>
            <text class="font-medium text-24rpx leading-40rpx text-black text-opacity-90 mt-8rpx">分类2</text>
          </view>
          <view>
            <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/13.png"  width="64rpx" height="50rpx" bg-color="#0000"/>
            <text class="font-medium text-24rpx leading-40rpx text-black text-opacity-90 mt-8rpx">分类2</text>
          </view>
          <view>
            <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/14.png"  width="64rpx" height="50rpx" bg-color="#0000"/>
            <text class="font-medium text-24rpx leading-40rpx text-black text-opacity-90 mt-8rpx">分类2</text>
          </view>
          <view>
            <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/15.png"  width="64rpx" height="50rpx" bg-color="#0000"/>
            <text class="font-medium text-24rpx leading-40rpx text-black text-opacity-90 mt-8rpx">分类2</text>
          </view>
          <view>
            <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/16.png"  width="64rpx" height="50rpx" bg-color="#0000"/>
            <text class="font-medium text-24rpx leading-40rpx text-black text-opacity-90 mt-8rpx">分类2</text>
          </view>
        </view>
      </view>
    </view>
    <view class="mt-30rpx">
      <view class="recommend-title mt-26rpx ml-30rpx text-40rpx text-black font-normal leading-60rpx">推荐商家</view>
      <view class="flex whitespace-nowrap overflow-x-auto mt-24rpx">
        <view v-for="(item,index) in list" :key="index">
          <view class="flex items-center justify-center  text-24rpx text-black text-opacity-60 font-medium bg-white rd-8rpx ml-20rpx px-28rpx py-8rpx">{{item.name}}</view>
        </view>
      </view>
      <view>
        <view v-for="(item,index) in merchants" :index="index"></view>
      </view>
    </view>
    <Tabbar pathName='order'></Tabbar>
  </view>
</template>

<script setup lang="ts">
import {ref,reactive} from "vue";
import { barHeight } from '@/utils';
const bHeight = computed(() => {
  return barHeight();
});
const list=reactive([
  {
    name:"附近"
  },
  {
    name:"维修保养"
  },
  {
    name:"维修保养"
  },
  {
    name:"维修保养"
  },
  {
    name:"维修保养"
  },
  {
    name:"维修保养"
  }
])
const merchants=reactive([
  {
    name:"龙膜七工匠授权店玻璃膜·隐形车衣",
    star:"5",
    address:"美容洗车 中粮大悦城",
    img:"https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/7.png",
    old_price_1:"32.00",
    new_price_1:"12.00",
    product_1:"【龙膜】玻璃贴膜【前挡智选】",
    type:"1"   ,//1为营业中，2为未营业
  }
])
</script>
<style scoped lang="scss">
  .page-wrap {
    background-color: #F1F1F1;
    .top{
      background-image: url('https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/7.png');
      background-repeat: no-repeat;
      background-size: 750rpx 546rpx;
    }
    .recommend-title{
      background-image: url('https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/3.png');
      background-repeat: no-repeat;
      background-position: 23px 15px;
      background-size: 145.41rpx 36.28rpx;
    }
  }
</style>
