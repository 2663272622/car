<template>
  <view class="back" @click="goBack">
    <up-icon name="arrow-left" size="50rpx"></up-icon>
  </view>
  <view class="c-#F1F1F1">
    <view class="h-428rpx ">
      <up-swiper :list="img" indicator indicatorMode="line" circular height="428rpx" bg-color="#000"
        @click="previewImage(img)"></up-swiper>
    </view>
    <view class="bg-white relative z-1 top--64rpx rounded-tl-40rpx">
      <view class="pt-52rpx ml-30rpx text-black text-opacity-90 leading-32rpx font-semibold text-36rpx">
        {{merchants.merchantName}}
      </view>
      <view class="mt-24rpx flex ml-30rpx">
        <up-rate v-model="merchants.score" readonly allowHalf="true" active-color="#F25730" gutter="2rpx"></up-rate>
        <text class="font-semibold text-26rpx text-#F25730 leading-40rpx ml-6rpx">{{merchants.score}}</text>
      </view>
      <view class="mt-16rpx ml-30rpx flex whitespace-nowrap overflow-x-auto">
        <view v-for="(item,index) in img" :key="index" class="mr-20rpx">
          <up-image :show-loading="true" :src="item.url" width="216rpx" height="150rpx" bg-color="#0000" />
        </view>
      </view>
      <view class="flex justify-between items-center mt-32rpx">
        <view>
          <view class="flex font-semibold text-26rpx leading-40rpx items-center ml-30rpx">
            <view>
              <view v-if="merchants.ext2==='营业中'" class="text-#0B86FA">营业中</view>
              <view v-else class="text-black text-opacity-60">休息中</view>
            </view>
            <!-- <view class="text-black text-opacity-90 mx-12rpx">{{merchants.day}}</view> -->
            <view class="text-black text-opacity-90">&nbsp;&nbsp;{{openTime}}-{{closeTime}}</view>
            <up-icon name="arrow-right" size="26rpx" color="black" class="ml-28rpx"></up-icon>
          </view>
          <view class="flex u-flex-wrap">
            <!--            <view v-for="(item,index) in merchants.tag.split(',')" :key="index" class=" mt-16rpx ml-16rpx whitespace-nowrap">
              <up-tag type="info"  :text="item" color="rgba(0,0,0,0.6)" bgColor="#F0F0F0"></up-tag>
            </view> -->
          </view>
        </view>
        <view class="mr-38rpx ml-30rpx" @click="call">
          <up-icon name="phone" size="40rpx"></up-icon>
          <text class="text-black text-opacity-60 text-20rpx leading-52rpx font-medium">电话</text>
        </view>
      </view>
      <view class="flex mt-48rpx justify-between items-center">
        <view>
          <view class="flex items-center ml-30rpx">
            <text
              class="font-semibold text-26rpx text-black text-opacity-90 leading-40rpx">{{merchants.storeAddress}}</text>
            <up-icon name="arrow-right" size="26rpx" class="ml-18rpx"></up-icon>
          </view>
          <view v-if="merchants.distance" class="flex mt-16rpx ml-32rpx items-center mb-22rpx">
            <up-icon name="map" size="22rpx" class="mr-8rpx"></up-icon>
            <text
              class="font-medium text-24rpx text-black text-opacity-60 leading-40rpx">距您{{merchants.distance.toFixed(1)}}公里</text>
          </view>
        </view>
        <view class="mr-38rpx" @click="toNav(merchants)">
          <up-icon name="map" size="40rpx"></up-icon>
          <text class="text-black text-opacity-60 text-20rpx leading-52rpx font-medium">导航</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from "vue"
  import carMerchantsAPI from "@/api/carMerchants";
  import { handleUrl } from "@/utils"
  import { onLoad } from "@dcloudio/uni-app";
  const merchants : any = ref({})
  const img = ref()
  let phone = ''
  const id = ref()
  let openTime : string
  let closeTime : string
  //接收传入id值
  // 使用onLoad生命周期函数接收传输值id或者是type
  onLoad((e : any) => {
    id.value = e.id;
  })
  const getFormData = async () => {
    let data
    if (Mylatitude.value) {
      data = await carMerchantsAPI.getFormData(id.value, { longitude: Mylongitude.value, latitude: Mylatitude.value })
    }
    else {
      data = await carMerchantsAPI.getFormData(id.value)
    }
    openTime = formatTimeFromArray(data.openTime)
    closeTime = formatTimeFromArray(data.closeTime)
    merchants.value = data
    img.value = handleUrl(data.storeLogoUrl)
    phone = data.contactPhone
  }
  //修改时间格式
  function formatTimeFromArray(timeArray : any) {
    if (!timeArray) {
      return "";
    }
    else {
      while (timeArray.length < 2) {
        timeArray.push(0);
      }
      let [hours, minutes] = timeArray.map(num => String(num).padStart(2, '0'));
      return `${hours}:${minutes}`;
    }
  }

  //拨打电话功能
  function call() {
    uni.makePhoneCall({
      phoneNumber: phone
    });
  }

  //返回上一页面
  function goBack() {
    uni.navigateBack({
      fail: () => {
        uni.reLaunch({
          url: "/pages/tab/home/index"
        })
      }
    });
  }

  // 获取当前经纬度
  const Mylatitude = ref()
  const Mylongitude = ref()
  function getLocation() {
    uni.getFuzzyLocation({
      type: "wgs84",
      success: (res) => {
        Mylatitude.value = res.latitude
        Mylongitude.value = res.longitude
      },
      fail: (arr) => {
        uni.showModal({
          title: "提示",
          content: "需要授权获取位置信息",
          success: (res) => {
            if (res.confirm) {
              uni.openSetting({
                success: (res) => {
                  console.log(res.authSetting)
                  if (res.authSetting['scope.userFuzzyLocation']) {
                    uni.getFuzzyLocation({
                      type: "wgs84",
                      success: (res) => {
                        Mylatitude.value = res.latitude
                        Mylongitude.value = res.longitude
                      },
                      fail: (arr) => {
                        console.log(arr)
                        if (arr.errMsg === "getFuzzyLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF") {
                          uni.showModal({
                            title: "未获取到位置信息",
                            content: "获取定位失败，请手动开启手机系统定位权限重新进入小程序或检查网络情况后重试",
                            showCancel: false,
                            confirmText: "我知道了"
                          })
                          return;
                        }
                      },
                    })
                  }
                },
              })
            }
          },
        })
      },
      complete: () => {
        getFormData()
        navigationAdd(1)
      }
    })
  }
  getLocation()
  // 传入经纬度 调用导航
  const toNav = (res : any) => {
    navigationAdd(2)
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

  const previewImage = (image : any) => {
    const urls = image.map((obj : { url : any; }) => obj.url);
    uni.previewImage({
      urls: urls,
    })
  }

  //记录有人查看或导航
  const navigationAdd = (type : number) => {
    carMerchantsAPI.navigationAdd(id.value, type)
  }
</script>

<style lang="scss" scoped>
  .back {
    border: 3rpx solid rgba(255, 255, 255, 0.3);
    border-radius: 100rpx;
    background: raba(0, 0, 0, 0.5);
    position: absolute;
    z-index: 100;
    top: 100rpx;
    left: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10rpx);

  }
</style>
