<template>
  <view class="page-wrap">
    <view class="mb-20rpx ml-30rpx mt-64rpx flex" :style="{ paddingTop: bHeight }">
        <up-image
          :show-loading="true" width="120rpx" height="120rpx"
          :src="userStore.avatar" shape="circle" bg-color="#0000" class="mr-24rpx"
        />
        <view class="flex flex-col">
          <view>
            <text class="text-40rpx font-semibold text-opacity-90">
              {{ userStore.userName }}
            </text>
          </view>
          <view class="mt-14rpx h-40rpx w-176rpx text-center text-28rpx text-black text-opacity-60 leading-40rpx">
            1323****3253
          </view>
        </view>
    </view>
    <view class="flex mt-36rpx mx-30rpx">
      <view class="moveCar mr-30rpx">

      </view>
      <view class="shops"></view>
    </view>
    <view class="score">
      <view class="ml-20rpx flex flex-row items-center">
        <up-image
          :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/16.png"
          width="38rpx" height="38rpx"
        />
        <text class="score-name ml-5rpx text-40rpx font-normal">
          我的积分
        </text>
      </view>
      <view class="mr-56rpx text-50rpx c-#0DD031FF font-bold">
        {{ userStore.integral }}
      </view>
    </view>
    <view class="integral">
      <view class="flex items-center text-40rpx text-#FFBE0B">
        <up-image
          :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/21.png"
          width="110rpx" height="104rpx" bg-color="#0000" class="relative bottom-25rpx"
        />
        <text class="font-bold; tracking-widest">
          积分排行榜
        </text>
      </view>
      <view v-for="(item, index) in rankList" :key="index" class="mx-20rpx mb-20rpx flex items-center justify-between">
        <view class="flex items-center">
          <up-image
            v-if="item.id === 1" :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/27.png" bg-color="#0000"
            width="78rpx" height="50rpx"
          />
          <up-image
            v-else-if="item.id === 2" :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/28.png" bg-color="#0000"
            width="78rpx" height="50rpx"
          />
          <up-image
            v-else-if="item.id === 3" :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/26.png" bg-color="#0000"
            width="78rpx" height="50rpx"
          />
          <text v-else-if="item.id === 4" class="h-50rpx w-78rpx text-center text-40rpx font-bold">
            4
          </text>
          <text v-else-if="item.id === 5" class="h-50rpx w-78rpx text-center text-40rpx font-bold">
            5
          </text>
          <up-image
            :show-loading="true" :src="item.avatar" bg-color="#0000"
            width="76rpx" height="76rpx"
          />
          <text class="ml-10rpx text-24rpx font-medium">
            {{ item.name }}
          </text>
        </view>
        <view>
          <text class="text-32rpx font-extrabold">
            {{ item.score }}
          </text>
          <text class="text-28rpx font-medium">
            积分
          </text>
        </view>
      </view>
    </view>
    <view class="mb-300rpx mt-28rpx h-130rpx flex items-center justify-between rd-20rpx rounded-40rpx bg-white pt-40rpx">
      <view v-for="(item, index) of homeProjects" :key="index" class="home-projectIttem w-full rounded-20rpx">
        <up-image
          :show-loading="true" :src="item.url" width="62rpx" height="76rpx" bg-color="#0000"
          class="translate-x-70rpx translate-y--22rpx"
        />
        <view class="translate-x-10rpx translate-y--15rpx text-center text-28rpx c-#000000E6 font-medium leading-33rpx">
          {{ item.name }}
        </view>
      </view>
    </view>
  </view>
  <!-- <u-navbar title="" placeholder left-icon="" right-icon="camera-fill" /> -->

  <Tabbar path-name="user" />
</template>

<script setup lang="ts">
import { usePermission } from '@/hooks';
import { useUserStore } from '@/store';
import { barHeight } from '@/utils';
import { getToken, isLogin } from '@/utils/auth';
// const { setClipboardData, getClipboardData } = useClipboard();
const bHeight = computed(() => {
  return barHeight();
});
const userStore = useUserStore();
const loginStatus = ref(false);

// onShow(async () => {
//   loginStatus.value = await usePermission();
//   console.log('asdasd', loginStatus.value);
//   loginStatus.value = isLogin();
//   console.log(loginStatus.value ? '已1231登录' : '进入home没有登陆');
//   const ttt = await getToken();
//   console.log('打印token', ttt);
// });
// 动态获取排行榜的数据
const rankList = [
  { id: 1, name: '大宝宝', avatar: 'https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/2.png', score: 458 },
  { id: 2, name: '华清', avatar: 'https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/2.png', score: 400 },
  { id: 3, name: '忘记人', avatar: 'https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/2.png', score: 382 },
  { id: 4, name: '不干了', avatar: 'https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/2.png', score: 345 },
  { id: 5, name: 'pk', avatar: 'https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/2.png', score: 321 },
];
const homeProjects = ref([
  {
    name: '骑手入驻申请',
    url: 'https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/17.png',
  },
  {
    name: '收益明细',
    url: 'https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/22.png',
  },
  {
    name: '收货地址',
    url: 'https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/23.png',
  },
  {
    name: '联系我们',
    url: 'https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/24.png',
  },
]);
</script>

<style lang="scss">
  .page-wrap {
    // font-family: PingFang SC;
    background-image: url('https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/7.png');
    background-repeat: no-repeat;
    background-size:750rpx 522rpx;
    .moveCar{
      width: 330rpx;
      height: 154rpx;
      background: linear-gradient( 129deg, #4C6BE1 0%, #7B92FF 100%);
      border-radius: 20rpx 20rpx 20rpx 20rpx;
    }
    .shops{
      width: 330rpx;
      height: 154rpx;
      background: linear-gradient( 129deg, #5DA9F8 0%, #8AC2FF 100%);
      border-radius: 20rpx 20rpx 20rpx 20rpx;

    }
    .score {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 660rpx;
      height: 128rpx;
      margin:0 auto;
      background-image:url('https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/30.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;

      .score-name{
        color:transparent;
        // font-family: YouSheBiaoTiHei;
        background:linear-gradient(270deg, #AAFFC3 0%, #37C50B 100%);
        background-clip: text;
      }

    }

    .integral{
      background:linear-gradient(to bottom,#FEE0A0,white 25%);
      background-color: #fff;
      border: 1rpx solid #ccc;
      border-radius: 30rpx;
    }
}
</style>
