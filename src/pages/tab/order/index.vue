<template>
  <scroll-view scroll-y="true" @scroll="handlescroll" class="h-100vh" @scrolltolower="ToBottom" lower-threshold="100"
    scroll-with-animation="true">
<!--    <view v-show='contact' class="absolute left-30rpx z-20 w-690rpx opacity-0" :style="{top:bHeight}">

    </view> -->
    <view class="page-wrap">
      <view :style="{ paddingTop: bHeight }">
        <view class="mx-30rpx relative z-10 rounded-20rpx">
          <up-swiper :list="swiperImg" indicator indicatorMode="line" imgMode="scaleToFill"
            circular height="388rpx" @change="changeSwiper">

                <template #default="{ item, index }">
                    <div class="w-full h-full relative">
                        <image
                          class="u-swiper__wrapper__item__wrapper__image w-full h-full"
                          :src="item"
                           @tap="handleSwiper(index)"
                          :style="{
                            height: `388rpx`,
                          }"

                        ></image>
                        <!-- B为跳转客服 -->
                        <button v-if='pageData[index].label == "b"' open-type="contact" class="absolute opacity-0 top-0 left-0 right-0 bottom-0">联系客服</button>
                    </div>
                  <template>

                  </template>
                </template>
            </up-swiper>
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
                  bg-color="#0000" shape="square" radius="10rpx"/>
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
          <template v-if="noData">
            <view class="pb-130rpx bg-white" v-if='merchants.length == 0'>
              <up-loadmore class="!mt-0 pt-120rpx" :status="noData?'nomore':'loading'" nomore-text="附近暂无商家信息~" />
            </view>
            <view class="pb-130rpx" v-else>
              <up-loadmore :status="noData?'nomore':'loading'" nomore-text="已经到底啦~" />
            </view>
          </template>
        </view>
      </view>
      <Tabbar pathName='order'></Tabbar>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
  import { ref, reactive } from "vue";
  import { barHeight, isLogin } from '@/utils';
  import carMerchantsAPI from "@/api/carMerchants";
  import NoticeAPI from "@/api/notice"
  import BusinessAPI from "@/api/business"
  import { handlePic,hidTabbar } from "@/utils";
  import storage from "@/utils/storage";
  import { onReachBottom, onPullDownRefresh, onUnload } from "@dcloudio/uni-app";
  import list from "@/uni_modules/uview-plus/components/u-list/list";
  import { currentRoute, HOME_PATH, isTabBarPath, LOGIN_PATH, removeQueryString } from '@/router';
import { getwLocation } from "@/utils/location";
import { usePermission } from "@/hooks";

  onShow(() => {
    // uni.hideTabBar()
    hidTabbar()
  })

 onShareAppMessage({
    title: '放心挪',
    path: '/pages/tab/order/index',
    promise:new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: '放心挪~'
        })
      }, 2000)
    })
  })

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
    return new Promise((resolve,reject)=>{
      getwLocation((res) => {
        Mylatitude.value = res.latitude
        Mylongitude.value = res.longitude
        resolve('')
      },()=>{
        reject()
      })
    })
  }

  getLocation().then(()=>{
    getMerchants()
  })

  //获取高度
  const bHeight = computed(() => {
    return barHeight();
  });
  //页面跳转具体商家
 async function navigator(id : number) {

    uni.navigateTo({
      url: `/pages/common/merchants/index?id=${id}`
    })
  }

  //获取顶部轮播图
  const queryParams = {
    pageNum: 1,
    pageSize: 10,
    dictCode: 'carousel',
  }
  let pageData : any = ref([])
  const swiperImg : any = ref([])
  // 查询轮播图
  function handleQuery() {
    BusinessAPI.getPage(queryParams)
      .then((data) => {
        pageData.value = data.list
        if (pageData.value) {

          pageData.value.map((item : any) => {
            return swiperImg.value.push(item.image ? handlePic(item.image,false)[0].url : "")
          })
          console.log("asdasdas",pageData.value)
        }
      })
  }
  handleQuery()

const contact=ref(false)
const changeSwiper=(index:any)=>{
  if(index.current===1){
    contact.value=true
  }else{
    contact.value=false
  }
}


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
  const selectDistance =async () => {
    merchants_params.value.pageNum = 1
    await getLocation()
    if (Mylatitude.value) {
      merchants_params.value.isDistance = !merchants_params.value.isDistance
      if (selectedValue.value === -1) {
        merchants.value=[]
        getMerchants()
      } else {
        merchants.value=[]
        getMerchants(selectedValue.value)
      }
    }
  }

  //  轮播图点击
  const handleSwiper = (i) => {
    let sdata = pageData.value[i];
    switch (sdata.label) {
      case "a": // 跳转页面
        // 本次需要跳转的页面
        let toPath = sdata.value;
        let rurl = isTabBarPath(toPath)
        if(rurl){
          uni.switchTab({url:toPath})
        }else{
          uni.navigateTo({url:toPath})
        }
      break;
      case "b":
        // console.log('1234')
        // ref2.value.$el.click()
      break;
    }
  }
  //建立一个布尔值，判断是否进行下拉刷新
  const noData = ref(false)
  //查询商家
  const merchants_params = ref({
    pageNum: 1,
    pageSize: 10,
    active: true,
    isDistance: false,
  })
  const merchants : any = ref([])
  const merchantTotal = ref(0)
  const merchantLoading = ref(false)
  const image = ref()// 疑似无用
  // const loadNum = ref(0)
  const getMerchants = async (businessScope ?: number) => {
    // let num = loadNum.value;
    merchantLoading.value = true
    // 加载第一页时候清空原数据
    if(merchants_params.value.pageNum === 1){
      noData.value = false;
      merchantTotal.value = 0
      merchants.value = []
    }

    // 处理查询参数
    let params = { ...merchants_params.value }
    if (Mylatitude.value) {  params = { ...params, latitude: Mylatitude.value, longitude: Mylongitude.value } }
    if (businessScope) { params = { ...params, businessScope } }

    let data = await carMerchantsAPI.getPage(params)
    // debugger
    // if(num < loadNum.value){
    //   console.log("重复加载不处理")
    //   return;
    // }
    //改变图片的url地址
    data.list.forEach((item : any) => {
      if (item.storeLogoUrl) {
        if (item.storeLogoUrl.includes('http:')) {
            item.storeLogoUrl = item.storeLogoUrl.split(',')[0]
        }else {
            item.storeLogoUrl = item.storeLogoUrl ? handlePic(item.storeLogoUrl)[0].url : ''
        }
      }
      //改变分数的保留位数
      if (item.score) { item.score = Math.floor(item.score * 10) / 10  }
    })

    merchantTotal.value = data.total
    merchants.value.push(...data.list)

    merchantLoading.value = false
    // 数据加载完成
    if (merchants.value.length >= data.total) noData.value = true;
    // if (merchants_params.value.pageSize > data.list.length) noData.value = true;


    console.log(data,merchants_params.value)
    // loadNum.value = num;
  }

  //触底加载
  const ToBottom = () => {
    console.log("触底了~~~~~~~~~~~~~~~~")
    if (noData.value || merchantLoading.value)return;
    ++merchants_params.value.pageNum;
    getMerchants();
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
