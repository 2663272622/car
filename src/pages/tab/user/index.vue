<template>
  <view class="page-wrap">
    <view class="mb-20rpx flex justify-between" :style="{ paddingTop: bHeight }">
      <view class="mx-10rpx mt-100rpx flex">
        <up-image
          :show-loading="true" width="122rpx" height="122rpx"
          src="https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/20.png" shape="circle" bg-color="#0000" class="mr-10rpx"
        />
        <view class="mr-10rpx flex flex-col">
          <view>
            <text class="mr-15rpx text-36rpx font-bold">
              哇哈哈
            </text>
            <text class="text-24rpx text-black/60 font-bold tracking-widest">
              编辑资料
            </text>
          </view>
          <view class="real-name mt-20rpx h-38rpx w-118rpx rd-100rpx text-center text-24rpx text-#00B551 leading-38rpx tracking-widest">
            已实名
          </view>
        </view>
      </view>

      <view class="mt-100rpx h-50rpx flex flex-row items-center rounded-bl-30rpx rounded-tl-30rpx bg-#DEFB7B">
        <up-image
          :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/31.png" bg-color="#0000"
          width="32rpx" height="32rpx" class="ml-20rpx"
        />
        <text class="mx-10rpx text-24rpx tracking-widest">
          我的推荐码
        </text>
      </view>
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
        285
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
    <view class="mb-300rpx mt-20rpx h-130rpx flex items-center justify-between rd-20rpx rounded-40rpx bg-white pt-40rpx">
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
import { barHeight } from '@/utils';
// const { setClipboardData, getClipboardData } = useClipboard();
const bHeight = computed(() => {
  return barHeight();
});
// 复制
// const toCopy = async () => {
//   await setClipboardData({ data: '1234567890' });
//   const data = await getClipboardData();
//   console.log('[ data ] >', data);
// };

// 登录鉴权，微信小程序端点击tabbar的底层逻辑不触发uni.switchTab，需要在页面onShow生命周期中校验权限
onShow(async () => {
  // const hasPermission = await usePermission();
  // console.log(hasPermission ? '已登录' : '未登录，拦截跳转');
});
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
    background-image: url('https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/20.png'),
                      url('https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/5.png');
    background-repeat: no-repeat,no-repeat;
    background-position: right 100rpx,top center;
    background-size:258rpx 302rpx ,100% 518rpx;

    .real-name{
      background: linear-gradient( 270deg, #DEFB7B 0%, #BFF281 100%);
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
