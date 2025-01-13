<template>
  <scroll-view scroll-y="true" @scroll="handlescroll" class="h-100vh" @scrolltolower="ToBottom" lower-threshold="100"
    scroll-with-animation="true">
    <view class="page-wrap">
      <view :style="{ paddingTop: bHeight }">
        <view class="mx-30rpx relative z-10 rounded-20rpx">
          <up-swiper :list="swiperImg" indicator indicatorMode="line" imgMode="scaleToFill" circular
            height="388rpx"></up-swiper>
        </view>
        <view class="pt-50rpx grid grid-cols-5 grid-rows-2 ">
          <view v-for="item in business" :key="item.id">
            <view class="flex items-center flex-col mx-auto" @click="selectBusiness(item)">
              <up-image :show-loading="true" :src="item.image" width="64rpx" height="50rpx" bg-color="#0000" />
              <text class="font-medium text-24rpx leading-40rpx text-black text-opacity-90 mb-38rpx"
                :class="{selectLabel: selectedValue === item.value}">{{item.label}}</text>
            </view>
          </view>
        </view>
        <view class="h-30rpx bg-#F1F1F1"></view>
        <view class="bottom">
          <up-sticky offsetTop="0" bgColor="white" customNavHeight="0">
            <view v-if="stickyState" class="bg-white" :style="{height:bHeight}" id="stickyDom"></view>
            <view class="recommend-title pt-30rpx ml-30rpx text-40rpx text-black font-normal leading-60rpx ">推荐商家</view>
            <view class="flex whitespace-nowrap overflow-x-auto mt-24rpx">
              <view class="text-24rpx text-black text-opacity-60 font-medium bg-white rd-8rpx ml-20rpx px-28rpx py-8rpx"
                :class="{select: selectedValue === -1}" @click="selectBusiness(defaultData)">默认</view>
              <view class="text-24rpx text-black text-opacity-60 font-medium bg-white rd-8rpx ml-20rpx px-28rpx py-8rpx"
                :class="{select:merchants_params.isDistance}" @click="selectDistance">附近</view>
              <view v-for="item in business" :key="item.id">
                <view
                  class="text-24rpx text-black text-opacity-60 font-medium bg-white rd-8rpx ml-20rpx px-28rpx py-8rpx"
                  :class="{select: selectedValue === item.value}" @click="selectBusiness(item)">
                  {{item.label}}
                </view>
              </view>
            </view>
          </up-sticky>
          <view v-for="(item,index) in merchants" :key="index">
            <view class="bg-white rd-20rpx mx-30rpx mt-30rpx flex whitespace-nowrap overflow-hidden"
              @click="navigator(item.id)">
              <view class="my-30rpx ml-20rpx mr-12rpx">
                <up-image :show-loading="true" :src="item.storeLogoUrl" width="160rpx" height="160rpx"
                  bg-color="#0000" />
              </view>
              <view class="mt-30rpx pr-20rpx w-478rpx">
                <view class="text-28rpx font-semibold text-black text-opacity-90 leading-40rpx overflow-hidden">
                  {{item.merchantName}}
                </view>
                <view class="flex justify-between mt-6rpx">
                  <view class="flex items-center">
                    <up-rate v-model="item.score" readonly :allowHalf='true' active-color="#F25730"
                      gutter="2rpx"></up-rate>
                    <text class="font-semibold text-26rpx text-#F25730 leading-40rpx ml-6rpx">{{item.score}}</text>
                  </view>
                  <view class=" font-normal text-24rpx leading-52rpx">
                    <view v-if="item.ext2==='营业中'" class="text-#1764FF">营业中</view>
                    <view v-else>休息中</view>
                  </view>
                </view>
                <view class="flex mt-16rpx justify-between text-black text-opacity-60 items-center">
                  <view class="text-24rpx font-normal leading-40rpx overflow-hidden mr-12rpx">
                    {{item.storeAddress}}
                  </view>
                  <view v-if="item.distance" class="flex">
                    <up-icon name="map"></up-icon>
                    <text class="leading-52rpx">{{item.distance}}km</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view class="pb-160rpx" v-if="!merchants_params.isDistance">
            <up-loadmore :status="noData?'nomore':'loading'" nomore-text="已经到底啦~" />
          </view>
          <view class="pb-160rpx bg-white" v-else>
            <up-loadmore class="!mt-0 pt-10rpx" :status="noData?'nomore':'loading'" nomore-text="附近暂无商家信息~" />
          </view>
        </view>
      </view>
      <Tabbar pathName='order'></Tabbar>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
  import { ref, reactive } from "vue";
  import { barHeight } from '@/utils';
  import carMerchantsAPI from "@/api/carMerchants";
  import NoticeAPI from "@/api/notice"
  import BusinessAPI from "@/api/business"
  import { handlePic } from "@/utils";
  import storage from "@/utils/storage";
  import { onReachBottom, onPullDownRefresh, onUnload } from "@dcloudio/uni-app";
  import list from "@/uni_modules/uview-plus/components/u-list/list";

  // 在onReady或者onMounted生命周期中获取元素信息
  const stickyState = ref(false)
  const handlescroll = (e) => {
    if (e.target.scrollTop >= 345) {
      stickyState.value = true
    }
    else {
      stickyState.value = false
    }
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
        nextTick(() => {
          getMerchants()
        })
      },
      fail: (arr) => {
        if (arr.errMsg === "getFuzzyLocation:fail:auth denied" || arr.errMsg === "getFuzzyLocation:fail auth deny") {
          uni.showToast({
            title: "获取定位授权失败",
            icon: "none"
          })
          nextTick(() => {
            getMerchants()
          })
        }
        if (arr.errMsg === "getFuzzyLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF") {
          uni.showModal({
            title: "未获取到位置信息",
            content: "获取定位失败，请手动开启手机系统定位权限重新进入小程序或检查网络情况后重试",
            showCancel: false,
            confirmText: "我知道了"
          })
          return;
        }
        setTimeout(locationErr, 2000)
      }
    })
  }
  getLocation()

  //获取高度
  const bHeight = computed(() => {
    return barHeight();
  });
  //页面跳转具体商家
  function navigator(id : number) {
    uni.navigateTo({
      url: `/pages/common/merchants/index?id=${id}`
    })
  }

  //获取顶部轮播图
  const queryParams = {
    pageNum: 1,
    pageSize: 6,
    type: 23,
    publishStatus: 1,
  }
  let pageData : any = []
  const swiperImg = ref()
  // 查询轮播图
  function handleQuery() {
    NoticeAPI.getPage(queryParams)
      .then((data) => {
        pageData = data.list
        swiperImg.value = handlePic(pageData[0].content, false)
      })
  }
  handleQuery()

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
        business.value.map((item : any) => {
          return item.image = item.image ? handlePic(item.image)[0].url : ""
        })
        business.value.map((item : any) => ({ ...item, isSelect: false }))
      })
  }
  getBusiness()

  //设计一个数据为附近初始数据
  const defaultData = {
    value: -1
  }
  //商家业务的分页查询
  // const scroll=ref(0)
  const selectedValue = ref(-1);
  const selectBusiness = (item : any) => {
    merchants.value = []
    merchants_params.value.pageNum = 1
    selectedValue.value = item.value;
    if (selectedValue.value === -1) {
      getMerchants()
    } else {
      getMerchants(item.value)
    }
  };
  //选择附近-可复选
  const selectDistance = () => {
    merchants.value = []
    merchants_params.value.pageNum = 1
    getLocation()
    if (Mylatitude.value) {
      merchants_params.value.isDistance = !merchants_params.value.isDistance
      if (selectedValue.value === -1) {
        getMerchants()
      } else {
        getMerchants()
      }
    }
  }


  //建立一个布尔值，判断是否进行下拉刷新
  const noData = ref(false)
  //查询商家
  const merchants_params = ref({
    pageNum: 1,
    pageSize: 6,
    active: true,
    isDistance: false,
  })
  const merchants : any = ref([])
  const image = ref()
  const getMerchants = async (value ?: number) => {
    noData.value = false;
    let data
    if (value) {
      if (Mylatitude.value) {
        data = await carMerchantsAPI.getPage({ ...merchants_params.value, businessScope: value, latitude: Mylatitude.value, longitude: Mylongitude.value })
      }
      else {
        data = await carMerchantsAPI.getPage({ ...merchants_params.value, businessScope: value })
      }
    } else {
      if (Mylatitude.value) {
        data = await carMerchantsAPI.getPage({ ...merchants_params.value, latitude: Mylatitude.value, longitude: Mylongitude.value })
      } else {
        data = await carMerchantsAPI.getPage({ ...merchants_params.value })
      }
    }
    data.list.map((item : any) => {
      if (item.storeLogoUrl) {
        if (item.storeLogoUrl.includes('http:')) {
          return item.storeLogoUrl = item.storeLogoUrl.split(',')[0]
        }
        else {
          return item.storeLogoUrl = item.storeLogoUrl ? handlePic(item.storeLogoUrl)[0].url : ''
        }
      }
    })
    merchants.value = [...merchants.value, ...data.list];
    if (merchants_params.value.pageSize > data.list.length) noData.value = true;

  }


  //触底加载
  const ToBottom = () => {
    if (noData.value) return;
    merchants_params.value.pageNum++;
    getMerchants();
  }


  const locationErr = () => {
    uni.showModal({
      title: "提示",
      content: "需要授权获取位置信息",
      success: (res) => {
        if (res.confirm) {
          uni.openSetting({
            success: (res) => {
              if (res.authSetting['scope.userFuzzyLocation']) {
                uni.getFuzzyLocation({
                  type: "wgs84",
                  success: (res) => {
                    Mylatitude.value = res.latitude
                    Mylongitude.value = res.longitude
                    getMerchants()
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
                  }
                })
              }
            },
          })
        }
      },
    })
  }
</script>
<style scoped lang="scss">
  .page-wrap {
    height: 100vh;
    background-color: white;
    background-image: url('https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/7.png');
    background-repeat: no-repeat;
    background-size: 750rpx 546rpx;

    .selectLabel {
      font-weight: bold;
    }

    .bottom {
      background: linear-gradient(180deg, #FFFFFF 0%, #F1F1F1 35%);

      .recommend-title {
        font-family: ZiZhiQuXiMaiTi;
        background-image: url('https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/3.png');
        background-repeat: no-repeat;
        background-position: 23px 15px;
        background-size: 145.41rpx 36.28rpx;
      }

      .select {
        background-color: #D1F5FE;
      }
    }
  }
</style>
