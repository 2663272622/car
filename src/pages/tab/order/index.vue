<template>
  <scroll-view scroll-y="true" @scroll="handlescroll" class="h-100vh">
    <view class="page-wrap">
      <view :style="{ paddingTop: bHeight }">
        <view class="mx-30rpx relative z-10 rounded-20rpx">
          <up-swiper :list="swiperImg" indicator indicatorMode="line" circular height="388rpx"></up-swiper>
        </view>
        <view class="bg-white pt-50rpx grid grid-cols-5 grid-rows-2 ">
          <view v-for="item in business" :key="item.id">
            <view class="flex items-center flex-col mx-auto" @click="selectBusiness(item)">
              <up-image :show-loading="true" :src="item.image" width="64rpx" height="50rpx" bg-color="#0000" />
              <text class="font-medium text-24rpx leading-40rpx text-black text-opacity-90 mt-8rpx"
                :class="{selectLabel: selectedValue === item.value}">{{item.label}}</text>
            </view>
          </view>
        </view>
        <view class="bottom mt-30rpx">
          <up-sticky offsetTop="0" bgColor="white" customNavHeight="0">
            <view v-if="stickyState" class="bg-white" :style="{height:bHeight}" id="stickyDom"></view>
            <view class="recommend-title pt-30rpx ml-30rpx text-40rpx text-black font-normal leading-60rpx ">推荐商家</view>
            <view class="flex whitespace-nowrap overflow-x-auto mt-24rpx">
              <view v-for="item in business" :key="item.id">
                <view
                  class="text-24rpx text-black text-opacity-60 font-medium bg-white rd-8rpx ml-20rpx px-28rpx py-8rpx"
                  :class="{select: selectedValue === item.value}" @click="selectBusiness(item)">
                  {{item.label}}
                </view>
              </view>
            </view>
          </up-sticky>
          <!-- <up-list :scrollable="false"> -->
          <view v-for="(item,index) in merchants" :index="index">
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
                    <up-rate v-model="item.score" readonly allowHalf="true" active-color="#F25730"
                      gutter="2rpx"></up-rate>
                    <text class="font-semibold text-26rpx text-#F25730 leading-40rpx ml-6rpx">{{item.score}}</text>
                  </view>
                  <view class=" font-normal text-24rpx leading-52rpx">
                    <view v-if="getTime(item.openTime,item.closeTime)" class="text-#1764FF">营业中</view>
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
          <!-- </up-list> -->
        </view>
        <view class="pb-160rpx">
          <up-loadmore :status="noData?'nomore':'loading'" />
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
  import { handleUrl, getTime } from "@/utils";
  import storage from "@/utils/storage";
  import { onReachBottom, onPullDownRefresh, onUnload } from "@dcloudio/uni-app";
  import list from "@/uni_modules/uview-plus/components/u-list/list";

  // 在onReady或者onMounted生命周期中获取元素信息
  const stickyState = ref(false)
  const handlescroll = (e) => {
    console.log(e.target)
    if (e.target.scrollTop >= 380) {
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
      },
      fail: (arr) => {
        console.log(arr)
        if (arr.errMsg === "getFuzzyLocation:fail:auth denied" || arr.errMsg === "getFuzzyLocation:fail auth deny") {
          uni.showToast({
            title: "获取定位授权失败",
            icon: "none"
          })
          return;
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
      },
      complete: () => {
        getMerchants()
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
        swiperImg.value = handleUrl(pageData[0].content)
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
          return item.image = item.image ? handleUrl(item.image)[0].url : ""
        })
        business.value.map((item : any) => ({ ...item, isSelect: false }))
      })
  }
  getBusiness()

  //商家业务的分页查询
  const selectedValue = ref(-1);
  const selectBusiness = (item : any) => {
    merchants.value = []
    merchants_params.pageNum = 1
    if (selectedValue.value === item.value) {
      selectedValue.value = -1;
      getMerchants()
    } else {
      selectedValue.value = item.value;
      getMerchants(item.value)
    }

  };
  // onReachBottom(() => {
  //   if (noData.value) return;
  //   merchants_params.pageNum++;
  //   getMerchants();
  // })

  // const scrolltolower = () => {
  //   if (noData.value) return;
  //   merchants_params.pageNum++;
  //   getMerchants();
  // };


  //建立一个布尔值，判断是否进行下拉刷新
  const noData = ref(false)
  //查询商家
  let merchants_params = {
    pageNum: 1,
    pageSize: 6,
    active: true,
  }
  const merchants : any = ref([])
  const image = ref()
  const getMerchants = async (value ?: number) => {
    noData.value = false;
    // merchants.value=[]
    let data
      if (value) {
        if(Mylatitude){
                  data = await carMerchantsAPI.getPage({ ...merchants_params, businessScope: value, latitude: Mylatitude.value, longitude: Mylongitude.value })
        }
        else{
          data = await carMerchantsAPI.getPage({ ...merchants_params, businessScope: value })
        }

      } else {
        if(Mylatitude){
           data = await carMerchantsAPI.getPage({ ...merchants_params, latitude: Mylatitude.value, longitude: Mylongitude.value })
        }else{
                     data = await carMerchantsAPI.getPage({ ...merchants_params })
        }

      }
    data.list.map((item : any) => {
      return item.storeLogoUrl = item.storeLogoUrl ? handleUrl(item.storeLogoUrl)[0].url : ''
    })
    merchants.value = [...merchants.value, ...data.list];
    if (merchants_params.pageSize > data.list.length) noData.value = true;

  }


  //触底加载
  onReachBottom(() => {
    if (noData.value) return;
    merchants_params.pageNum++;
    getMerchants();
  })
</script>
<style scoped lang="scss">
  .page-wrap {
    background-color: #F1F1F1;
    background-image: url('https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/7.png');
    background-repeat: no-repeat;
    background-size: 750rpx 482rpx;

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
        background-color: #E0E5E3;
      }
    }
  }
</style>
