<template>
  <view class="page-wrap">
    <view class="mb-20rpx ml-30rpx flex" :style="{ paddingTop: Hheight()}">
      <up-image :show-loading="true" width="120rpx" height="120rpx" :src="userStore.avatar" shape="circle"
        bg-color="#0000" class="mr-24rpx" />
      <view class="flex flex-col">
        <view>
          <text class="text-40rpx font-semibold text-opacity-90">
            {{ userStore.userName }}
          </text>
        </view>
        <view class="mt-14rpx h-40rpx w-176rpx text-center text-28rpx text-black text-opacity-60 leading-40rpx">
          {{userStore.phoneNumber.slice(0,4)}}****{{userStore.phoneNumber.slice(-4)}}
        </view>
      </view>
    </view>
    <view class="flex mt-36rpx mx-30rpx">
      <view class="moveCar mr-30rpx flex items-center" @click="handleCarCode">
        <text class="text-30rpx leading-32rpx font-semibold text-white ml-30rpx">挪车码</text>
      </view>
      <view class="shops flex items-center relative"  @click="handleMyMerchants">

        <button v-if='userStore.identityType*1 === 1' open-type="contact"  class="absolute top-0 bottom-0 left-0 right-0 opacity-0">申请入驻</button>
        <text  class="text-30rpx leading-32rpx font-semibold text-white ml-30rpx" >{{userStore.identityType*1 === 1 ? '申请入驻' :'我的店铺'}}</text>
      </view>
    </view>
    <view class="flex mt-30rpx bg-white h-158rpx mx-30rpx rd-20rpx">
      <view class="flex w-315rpx h-98rpx my-30rpx bg-#EFF7FF rd-10rpx ml-20rpx mr-18rpx" @click='handleToOilwear'>
        <view class="flex ml-48rpx items-center mt-10rpx">
          <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/19.png"
            width="62rpx" height="70rpx" bg-color="#0000" />
          <text class="text-opacity-90 text-black text-26rpx leading-32rpx ml-22rpx font-medium">油耗计算器</text>
        </view>
      </view>
      <view class="flex w-315rpx h-98rpx my-30rpx bg-#EFF7FF rd-10rpx mr-20rpx" @click="handleToGasoline">
        <view class="flex mt-10rpx items-center ml-52rpx">
          <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/23.png"
            width="62rpx" height="70rpx" bg-color="#0000" />
          <text class="text-opacity-90 text-black text-26rpx leading-32rpx ml-16rpx font-medium">今日油价</text>
        </view>
      </view>
    </view>
    <view class="flex mt-22rpx rd-20rpx bg-white h-202rpx w-690rpx mx-30rpx">
      <view class="flex h-126rpx mx-20rpx bg-#EFF7FF rd-20rpx mt-26rpx items-center w-650rpx ">
        <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/20.png"
          width="64rpx" height="64rpx" bg-color="#0000" class="ml-18rpx" />
        <text class="text-24rpx text-opacity-90 text-black font-medium leading-32rpx text-center ml-14rpx mr-42rpx"
          @click='handleWechatMsg'>开启通知</text>
        <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/21.png"
          width="64rpx" height="64rpx" bg-color="#0000" />
        <text class="text-24rpx text-opacity-90 text-black font-medium leading-32rpx text-center ml-14rpx mr-42rpx"
          @click="handleMyNotice">编辑通知</text>
        <view class="flex relative items-center">
          <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/22.png"
            width="64rpx" height="64rpx" bg-color="#0000" />
          <text
            class="text-24rpx text-opacity-90 text-black font-medium leading-32rpx text-center ml-14rpx mr-18rpx bg-#EFF7FF">联系客服</text>
          <view class="absolute top-0 left-0 opacity-0">
            <button open-type="contact">联系客服</button>
          </view>
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
  import { Hheight } from '@/utils';
  import { getToken, isLogin } from '@/utils/auth';
  import carMerchantsAPI from "@/api/carMerchants";
  // const { setClipboardData, getClipboardData } = useClipboard();
  const userStore = useUserStore();
  const loginStatus = ref(false);

  onShow(async () => {
    try{
      uni.hideTabBar()
    }catch(e){}
    loginStatus.value = await usePermission();
    console.log('asdasd', loginStatus.value);
    loginStatus.value = isLogin();
    const ttt = await getToken();
    userStore.info()
  });

  const query : any = ref()
  onLoad((query : any) => {
    // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    const scene = decodeURIComponent(query.scene)
  })

  const handleWechatMsg = () => {
    wx.requestSubscribeMessage({
      tmplIds: ["--nrmwvHNV4R7Mj_QEYqRlWcT5ebXo5tR_9ijkQ4Ntc"],
      success(res) {
        if (res['--nrmwvHNV4R7Mj_QEYqRlWcT5ebXo5tR_9ijkQ4Ntc'] == "accept") {
          uni.$u.toast("已开启微信通知");
        } else {
          uni.$u.toast("已关闭微信通知");
        }
      },
      fail() {
        uni.$u.toast("已取消");
      }
    })

  }

  // 跳转查看油价
  const handleToGasoline = () => {
    uni.navigateTo({ url: `/pages/common/asoline/index` })
  }
  // 跳转查看油价
  const handleToOilwear = () => {
    uni.navigateTo({ url: `/pages/common/oilwear/index` })
  }
  // 跳转查看我的挪车吗
  const handleCarCode = () => {
    uni.navigateTo({ url: `/pages/common/carcode/index` })
  }
  //跳转查看我的店铺
  const handleMyMerchants = async() => {
    if(userStore.identityType*1 === 1){
      return false;
      // await userStore.info()
      // await nextTick()
      // if(userStore.identityType*1 === 1){
      //   return uni.$u.toast("点击");
      // }
    }
    carMerchantsAPI.get(userStore.openId).then(cdata => {
      if (cdata) {
        uni.navigateTo({ url: `/pages/common/mymerchants/index` })
      } else {
        uni.$u.toast("暂无店铺信息，请联系客服开通");
      }
    })
  }
  //跳转查看我的通知
  const handleMyNotice = () => {
    uni.navigateTo({ url: `/pages/common/mynotice/index` })
  }

  //登录后获取用户昵称和手机号

  // 获取当前经纬度
  const handleLocation = () => {
    console.log("获取位置")
    wx.getFuzzyLocation({
      type: "wgs84",
      success(res) {
        console.log(res)
        toNav(res)
      }
    })
  }
  // 传入经纬度 调用导航
  const toNav = (res) => {
    const latitude = res.latitude;
    const longitude = res.longitude;
    uni.openLocation({
      latitude: latitude,
      longitude: longitude,
      success: function () {
        console.log('success');
      }
    });

  }
</script>

<style lang="scss">
  .page-wrap {
    background-image: url('https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/7.png');
    background-repeat: no-repeat;
    background-size: 750rpx 522rpx;

    .moveCar {
      width: 330rpx;
      height: 154rpx;
      background-image: url('https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/17.png'), linear-gradient(129deg, #4C6BE1 0%, #7B92FF 100%);
      background-repeat: no-repeat no-repeat;
      background-position: bottom right, center;
      background-size: 166rpx 150rpx, 100% 100%;
      border-radius: 20rpx 20rpx 20rpx 20rpx;
    }

    .shops {
      width: 330rpx;
      height: 154rpx;
      background-image: url('https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/18.png'), linear-gradient(129deg, #5DA9F8 0%, #8AC2FF 100%);
      background-repeat: no-repeat no-repeat;
      background-position: bottom right, center;
      background-size: 166rpx 150rpx, 100% 100%;
      border-radius: 20rpx 20rpx 20rpx 20rpx;
    }
  }
</style>
