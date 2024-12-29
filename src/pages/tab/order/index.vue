<template>
  <view class="page-wrap">
    <view class="h-100vh" :style="{ paddingTop: bHeight }">
        <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/30.png"
          width="690rpx" height="388rpx" bg-color="#0000" shape="square" radius="20rpx"
          class="mx-30rpx relative z-10" />
        <view class="bg-white w-full h-18rpx absolute top-464rpx"></view>
        <view class="bg-white pt-50rpx">
          <view class="flex justify-around items-baseline">
            <view>
              <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/30.png"
                width="64rpx" height="50rpx" bg-color="#0000" class="translate-y--2rpx" />
              <text class="font-medium text-24rpx leading-40rpx text-black text-opacity-90 mt-8rpx">分类1</text>
            </view>
            <view>
              <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/8.png"
                width="52rpx" height="50rpx" bg-color="#0000" class="translate-y--2rpx" />
              <text class="font-medium text-24rpx leading-40rpx text-black text-opacity-90 mt-8rpx">分类1</text>
            </view>
            <view>
              <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/9.png"
                width="50rpx" height="54rpx" bg-color="#0000" />
              <text class="font-medium text-24rpx leading-40rpx text-black text-opacity-90 mt-8rpx">分类1</text>
            </view>
            <view>
              <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/10.png"
                width="46rpx" height="50rpx" bg-color="#0000" class="translate-x-6rpx translate-y--4rpx" />
              <text class="font-medium text-24rpx leading-40rpx text-black text-opacity-90 mt-8rpx">分类1</text>
            </view>
            <view>
              <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/11.png"
                width="56rpx" height="56rpx" bg-color="#0000" />
              <text class="font-medium text-24rpx leading-40rpx text-black text-opacity-90 mt-8rpx">分类2</text>
            </view>
          </view>
          <view class="flex justify-around mt-48rpx items-baseline pb-20rpx">
            <view>
              <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/12.png"
                width="44rpx" height="44rpx" bg-color="#0000" class="translate-x-8rpx" />
              <text class="font-medium text-24rpx leading-40rpx text-black text-opacity-90 mt-8rpx">分类2</text>
            </view>
            <view>
              <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/13.png"
                width="46rpx" height="50rpx" bg-color="#0000" class="translate-x-8rpx" />
              <text class="font-medium text-24rpx leading-40rpx text-black text-opacity-90 mt-8rpx">分类2</text>
            </view>
            <view>
              <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/14.png"
                width="60rpx" height="44rpx" bg-color="#0000" />
              <text class="font-medium text-24rpx leading-40rpx text-black text-opacity-90 mt-8rpx">分类2</text>
            </view>
            <view>
              <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/15.png"
                width="56rpx" height="54rpx" bg-color="#0000" class="translate-x-2rpx" />
              <text class="font-medium text-24rpx leading-40rpx text-black text-opacity-90 mt-8rpx">分类2</text>
            </view>
            <view>
              <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/16.png"
                width="64rpx" height="50rpx" bg-color="#0000" />
              <text class="font-medium text-24rpx leading-40rpx text-black text-opacity-90 mt-8rpx">分类2</text>
            </view>
          </view>
        </view>
      <view class="bottom mt-30rpx">
        <view class="recommend-title pt-30rpx ml-30rpx text-40rpx text-black font-normal leading-60rpx">推荐商家</view>
        <view class="flex whitespace-nowrap overflow-x-auto mt-24rpx">
          <view v-for="(item,index) in list" :key="index">
            <view
              class="text-24rpx text-black text-opacity-60 font-medium bg-white rd-8rpx ml-20rpx px-28rpx py-8rpx">
              {{item.name}}
            </view>
          </view>
        </view>
        <view class="">
          <view v-for="(item,index) in merchants" :index="index">
            <view class="bg-white rd-20rpx mx-30rpx mt-30rpx mb-20rpx flex whitespace-nowrap overflow-hidden" @click="navigator">
              <view class="mt-30rpx ml-20rpx mr-12rpx">
                <up-image :show-loading="true" :src="item.img" width="160rpx" height="160rpx" bg-color="#0000" />
              </view>
              <view class="mt-30rpx pr-20rpx w-478rpx">
                <view class="text-28rpx font-semibold text-black text-opacity-90 leading-40rpx overflow-hidden">
                  {{item.name}}</view>
                <view class="flex justify-between mt-6rpx">
                  <view class="flex items-center">
                    <up-rate v-model="item.star" readonly allowHalf="true" active-color="#F25730"
                      gutter="2rpx"></up-rate>
                    <text class="font-semibold text-26rpx text-#F25730 leading-40rpx ml-6rpx">{{item.star}}</text>
                  </view>
                  <view class=" font-normal text-24rpx leading-52rpx">
                    <view v-if="item.type==='1'" class="text-#1764FF">营业中</view>
                    <view v-else-if="item.type==='2'">休息中</view>
                  </view>
                </view>
                <view class="flex mt-16rpx justify-between text-black text-opacity-60 items-center">
                  <view class="text-24rpx font-normal leading-40rpx">
                    {{item.address}}
                  </view>
                  <view class="flex">
                    <up-icon name="map"></up-icon>
                    <text class="leading-52rpx">1.2km</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <Tabbar pathName='order'></Tabbar>
  </view>
</template>

<script setup lang="ts">
  import { ref, reactive } from "vue";
  import { barHeight } from '@/utils';
  const bHeight = computed(() => {
    return barHeight();
  });
  const list = reactive([
    {
      name: "附近"
    },
    {
      name: "维修保养"
    },
    {
      name: "维修保养"
    },
    {
      name: "维修保养"
    },
    {
      name: "维修保养"
    },
    {
      name: "维修保养"
    }
  ])
  const merchants = reactive([
    {
      name: "龙膜七工匠授权店玻璃膜·隐形车衣212412341231",
      star: '5.0',
      address: "美容洗车 中粮大悦城",
      img: "https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/7.png",
      old_price_1: "32.00",
      new_price_1: "12.00",
      product_1: "【龙膜】玻璃贴膜【前挡智选】123124124123",
      type: "1",//1为营业中，2为未营业
    },
    {
      name: "龙膜七工匠授权店玻璃膜·隐形车衣",
      star: '4.0',
      address: "美容洗车 中粮大悦城",
      img: "https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/7.png",
      old_price_1: "32.00",
      new_price_1: "12.00",
      product_1: "【龙膜】玻璃贴膜【前挡智选】123124124123",
      type: "2",//1为营业中，2为未营业
    }
  ])

function navigator(){
  uni.navigateTo({
    url:'/pages/common/merchants/index'
  })
}
</script>
<style scoped lang="scss">
  .page-wrap {
    background-color: #F1F1F1;
    overflow-y: auto;
    background-image: url('https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/7.png');
    background-repeat: no-repeat;
    background-size: 750rpx 482rpx;
    .bottom {
      background: linear-gradient(180deg, #FFFFFF 0%, #F1F1F1 35%);

      .recommend-title {
        font-family: ZiZhiQuXiMaiTi;
        background-image: url('https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/3.png');
        background-repeat: no-repeat;
        background-position: 23px 15px;
        background-size: 145.41rpx 36.28rpx;
      }

      .preferential-bg {
        background-color: rgba(242, 87, 48, 0.2);
        width: 28rpx;
        height: 28rpx;
      }
    }
  }
</style>
