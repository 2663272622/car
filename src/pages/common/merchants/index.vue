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
        <up-rate v-model="score" readonly :allowHalf='true' active-color="#F25730" gutter="2rpx"></up-rate>
        <text class="font-semibold text-26rpx text-#F25730 leading-40rpx ml-6rpx">{{score}}</text>
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
            <view class="text-black text-opacity-90">&nbsp;&nbsp;{{openTime}}-{{closeTime}}</view>
            <up-icon name="arrow-right" size="26rpx" color="black" class="ml-28rpx"></up-icon>
          </view>
          <view class="flex u-flex-wrap ml-10rpx">
            <view v-for="(item,index) in tag" :key="index" class=" mt-16rpx ml-16rpx whitespace-nowrap">
              <!-- <up-tag type="info" plain :text="item" plainFill></up-tag> -->
              <view
                class="bg-#F0F0F0 text-24rpx text-black text-opacity-60 px-28rpx py-8rpx rounded-8rpx font-medium leading-40rpx">
                {{item}}
              </view>
            </view>
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
  import BusinessAPI from "@/api/business";
  import { handlePic } from "@/utils"
  import { onLoad } from "@dcloudio/uni-app";
  import { getwLocation } from "@/utils/location";
  const merchants : any = ref({})
  const img = ref()
  let phone = ''
  const id = ref()
  let openTime : string
  let closeTime : string
  const score=ref(0)
  const tag = ref()
  //接收传入id值
  // 使用onLoad生命周期函数接收传输值id或者是type
  onLoad((e : any) => {
    id.value = e.id;

    getLocation(e.latitude || null,e.longitude || null)
  })

  // 查询业务类型
  const params = {
    pageNum: 1,
    pageSize: 10,
    dictCode: 'businessScope'
  }
  const business : any = ref([])
  function getBusiness() {
    BusinessAPI.getPage(params)
      .then((data) => {
        business.value = data.list
        if (merchants.value.businessScope) {
          tag.value = merchants.value.businessScope.reduce((acc : string | any[], element : number) => {
            let matchingObjects = business.value.filter((item : { value : number; }) => item.value === element);
            let properties = matchingObjects.map((item : { label : any; }) => item.label);
            return acc.concat(properties);
          }, []);
        }
      })
  }
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
    if (data.businessScope) {
      data.businessScope = data.businessScope.split(',')
    }
    // if (data.score) {
    //   return data.score = Math.floor(data.score * 10) / 10;
    // }
    merchants.value = data
    if (data.storeLogoUrl.includes('http:')) {
      img.value = data.storeLogoUrl.split(',').filter((i : any) => i).map((i : string) => ({ url: i, name: '' }))
    }
    else {
      img.value = handlePic(data.storeLogoUrl,false)
    }
    score.value=Math.floor(data.score * 10) / 10;
    console.log(img.value)
    phone = data.contactPhone

     uni.hideLoading()

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
  function getLocation(latitude,longitude) {

      uni.showLoading({
      	title: '加载中...'
      });
    return new Promise((resolve,reject)=>{
      if(latitude && longitude){
        Mylatitude.value = latitude
        Mylongitude.value = longitude
        console.log("使用传参来的",latitude,longitude)
        loadData()
        return resolve('')
      }
      getwLocation((res) => {
        Mylatitude.value = res.latitude
        Mylongitude.value = res.longitude
        loadData()
        resolve('')
      },()=>{
        reject()
        loadData()
      })
    })
  }

  const loadData = ()=>{
    nextTick(() => {
      getFormData()
      navigationAdd(1)
    })
    getBusiness()
  }
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
