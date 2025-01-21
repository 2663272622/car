<template>
  <view class="home	custom-head">
    <view class="home-contaion w-full" :style="{paddingTop:getTitleBarHeight()}">
      <!-- 通知公告 -->
      <view class='home-inform' :style="{'width':`calc(100% - ${menuButtonInfo.width}px - 48rpx)`}">
        <view class="home-inf-c">
          <up-image :show-loading="true" src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/1.png"
            width="46rpx" height="48rpx" class="mx-12rpx z-1 !min-w-46rpx !min-h-48rpx" bgColor="#0000"></up-image>
          <view class="home-inf-text">
            <view class="home-inf-tc">
              {{notice}}
            </view>
          </view>
        </view>
      </view>
      <view class="home-carinfo">
        <view class="home-carhint">
          临时停车 请多关照
        </view>
        <view class="home-carPlate">
          <view class="home-carP-item" v-for="(item,index) of carInfoArr" :key='index'>
            {{item}}
          </view>
        </view>
      </view>

      <view class='home-car-handle'>
        <view class='home-car-htitle  mb-26rpx'>
          通知车主
        </view>
        <up-textarea v-model="scanInfo.messageText" placeholder="请输入内容" autoHeight maxlength='150'
          disabled></up-textarea>

        <view class='home-car-hbtn mt-26rpx' v-if='scanInfo.id != ""'>
          <view v-for="(item,index) of btnData" :key='index'
            class='home-car-hc mb-60rpx flex items-center justify-center' :style="{
              background:item.bg
            }" @click="callNotice(index)">
            <up-image :show-loading="true" :src="item.icon" width="56rpx" height="56rpx" bgColor="#0000"
              class="mr-12rpx"></up-image>
            <view class="home-hbtn-text">
              {{ item.name }}
            </view>
          </view>
        </view>

      </view>

    </view>

    <Tabbar pathName='home' ref='tabbarRef'></Tabbar>

  </view>
</template>

<script setup lang="ts">
  import { barHeight, handleUrl,getTitleBarHeight,toLogin } from "@/utils"
  import { useClipboard, usePermission } from '@/hooks';
  import { isLogin, getToken } from '@/utils/auth';
  import { getwLocation } from '@/utils/location';
  import { LOGIN_PATH } from "@/router";
  import { currentRoute } from '@/router';
  import { useUserStore,useAppStore } from "@/store";
  import NoticeAPI from "@/api/notice"
  import carMoveCodesAPI from "@/api/carMoveCodes"
  import carMsgAPI from "@/api/carMsg"
  import { onLoad, onShow } from "@dcloudio/uni-app";
  import value from "@/uni_modules/uview-plus/components/u-text/value";


  const userStore = useUserStore()
  const appStore = useAppStore()
  const loginStatus = ref(false)
  const menuButtonInfo = ref(uni.getMenuButtonBoundingClientRect())

  const btnData = ref([
    {
      name: "电话通知",
      icon: "https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/4.png",
      bg: "#FFDCC6FF",
    },
    {
      name: "微信通知",
      icon: "https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/5.png",
      bg: "#C8FB6FFF",
    },
    {
      name: "短信通知",
      icon: "https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/6.png",
      bg: "#AEB7FFFF",
    },
  ])

   onShareAppMessage({
      title: '放心挪',
      path: '/pages/tab/home/index',
      promise:new Promise(resolve => {
        setTimeout(() => {
          resolve({
            title: '放心挪~'
          })
        }, 2000)
      })
    })

  const bHeight = computed(() => {
    return barHeight()
  })

  const showNum = ref(0)
  onShow(()=>{
    if(showNum.value > 0){
      scanInfo.value.id = appStore.scanId
      handleInitHome()
    }
    uni.hideTabBar()
  })

  onLoad(async (options:any) => {


    console.log("获取到的参数",options.scene)

    let url = ''
    if(options.scene){
      url = decodeURIComponent(options.scene).split('=')[1]
      scanInfo.value.id = url
    }else if(options.q){
      url = options.q
      scanInfo.value.id = handleUrl(url || '', 'move')
    }
    scanInfo.value.id = scanInfo.value.id ? scanInfo.value.id : appStore.scanId
    appStore.setScanId(scanInfo.value.id || '')

    console.log("扫码携带来的ID",scanInfo.value.id)

    // 判断登录 未登录情况下跳转去登录
    loginStatus.value = await usePermission();
    loginStatus.value = isLogin();


    wx.requestSubscribeMessage({
      tmplIds: ["--nrmwvHNV4R7Mj_QEYqRlWcT5ebXo5tR_9ijkQ4Ntc"],
      success(...res) {
        // uni.$u.toast("已开启微信通知");
      },
      fail(e) {
        // console.log(e)
        // uni.$u.toast("已拒绝挪车消息推送~");
      }
    })

    ++showNum.value;
     // url = `https://onlinewifi.car.ischool.shop?move=2438`
    handleInitHome()


  })


const handleInitHome = ()=>{
  // 判断ID
  if(scanInfo.value.id){
    console.log("将携带来的ID保存",scanInfo.value.id)
    getCarMoveCodes()
  }else{
    console.log("1未携带ID 本地也没有缓存 跳转到附近 并隐藏首页")
    hidHome()
  }
}

const handleIni2tHomeold = ()=>{

  // 判断ID
  if(scanInfo.value.id){
    console.log("将携带来的ID保存",scanInfo.value.id)
    uni.setStorage({
    	key: 'scan_id',
    	data: scanInfo.value.id,
    	success: function (res) {
        console.log("将携带来的ID保存",res)
        appStore.setScanId(scanInfo.value.id)
        getCarMoveCodes()
    	}
    });
  }else{
    uni.getStorage({
      key:"scan_id",
      success(res){
        if(res.data != ''){
          console.log("未携带ID 本地有缓存的ID",res)
          appStore.setScanId(res.data)
          scanInfo.value.id = res.data
          getCarMoveCodes()
        }else{
          console.log("1未携带ID 本地也没有缓存 跳转到附近 并隐藏首页")
          hidHome()
        }
      },
      fail(eee) {
        hidHome()
        console.log("2未携带ID 本地也没有缓存 跳转到附近 并隐藏首页")
      }
    })

  }
}

  const tabbarRef = ref()
  const hidHome = ()=>{
    appStore.setScanId('')
    tabbarRef?.value?.changeTab(1)
    console.log("隐藏首页 并跳转附近")
  }

  const queryParams = {
    pageNum: 1,
    pageSize: 10,
    type: 22,
    publishStatus: 1
  }
  let pageData : any = []
  const notice = ref()
  // 查询通知公告
  function handleQuery() {
    NoticeAPI.getPage(queryParams)
      .then((data) => {
        pageData = data.list
        notice.value = pageData[0].content
        console.log(notice.value)
      })
  }

  //获取车主的车牌号信息(目前车牌写死)
  const carInfo:any = ref('')
  const scanInfo : any = ref({})
  // function getCarMo veCodes() {
  //   carMoveCodesAPI.getFormData(3201)
  //     .then((data) => {
  //       carInfo.value = data.carNumber
  //       scanInfo.value = data
  //     })
  // }
  // getCarMo veCodes()

  async function getCarMoveCodes() {
    if (!scanInfo.value.id) return console.log("不是通过扫码进入");

    try{
      const isActive = await carMoveCodesAPI.activeState(scanInfo.value.id)
      if(isActive.banFlag){

        uni.$u.toast("这是一个失效的挪车码~");
        setTimeout(()=>{
          hidHome()
        },1500)
        return;
      }
      if (!isActive.isActive) {
        console.log("未注册的挪车吗信息", scanInfo.value.id)
        uni.navigateTo({ url: `/pages/common/carcode/index?code=${scanInfo.value.id}&new=1` })
        return;
      }
    }catch(e){
        setTimeout(()=>{
          hidHome()
        },1500)
      return
    }
    carMoveCodesAPI.getFormData(scanInfo.value.id)
      .then((data) => {
        handleQuery()
        carInfo.value = data.carNumber
        scanInfo.value = data
      })
  }
  //通过计算属性将数据展示
  const carInfoArr = computed(() => {
    return carInfo.value ? carInfo.value.split("") : ''
  })


  //定义当前点击时间
  const clickTime = ref(0)
  //发送信息功能
  async function callNotice(index : number) {
    if(!loginStatus.value){
      toLogin()
      return;
    }
    const currentTime = new Date().getTime()
    switch (index) {
      case 0:
        uni.makePhoneCall({
          phoneNumber: scanInfo.value?.phoneNumber
        });
        break;
      case 1:
        if ((currentTime - clickTime.value) > 300000 || clickTime.value === 0) {
          await getLocation()
          if (Mylatitude.value) {
            uni.showLoading({
                title: '正在发送挪车消息~'
            });
            carMsgAPI.sendWxMsgApi(
              scanInfo.value.id, { latitude: Number(Mylatitude.value), longitude: Number(Mylongitude.value) }
            ).then(res => {
              uni.$u.toast("发送成功，请耐心等待车主前来挪车");
              clickTime.value = new Date().getTime()
              // uni.hideLoading();
            })
          }
        }
        else {
          uni.$u.toast("车主正在赶来，稍等一会哦~");
        }
        break;
      case 2:
        if ((currentTime - clickTime.value) > 300000 || clickTime.value === 0) {
          await getLocation()
          if (Mylatitude.value) {
            uni.showLoading({
                title: '正在发送挪车消息~'
            });
            carMsgAPI.sendMsgApi(
              scanInfo.value.phoneNumber,
              scanInfo.value.id,
              { latitude: Number(Mylatitude.value), longitude: Number(Mylongitude.value) }
            ).then(res => {
              uni.$u.toast("发送成功,请耐心等待车主前来挪车");
              clickTime.value = new Date().getTime()
              // uni.hideLoading();
            })
          }
        } else {
          uni.$u.toast("车主正在赶来，稍等一会哦~");
        }
        break;


    }
  }

  //获取定位
  // 获取当前经纬度
  let Mylatitude = ref()
  let Mylongitude = ref()
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

</script>


<style lang="scss">
  .home {
    background-image: url('https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/2.png');
    background-repeat: no-repeat;
    background-size: 100% 518rpx;

    .home-inform {
      @apply bg-#FFFFFFCC ml-24rpx rounded-10rpx pr-14rpx box-border;
      overflow: hidden;
      width: calc(100% - var(--BoundingClientRect));

      .home-inf-c {
        @apply flex px-12rpx items-center w-full py-8rpx;

        .home-inf-text {
          @apply w-full;
          overflow: hidden;

          .home-inf-tc {
            @apply whitespace-nowrap auto-scroll w-full;
            transform: translateX(50%);
            font-weight: 500;
            font-size: 24rpx;
            color: rgba(0, 0, 0, 0.6);
            line-height: 24rpx;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }
        }
      }
    }

    .home-carinfo {
      @apply ml-30rpx;

      .home-carhint {
        @apply mb-16rpx mt-124rpx;
        font-family: ZiZhiQuXiMaiTi;
        font-weight: 400;
        font-size: 26rpx;
        color: rgba(0, 0, 0, 0.9);
        line-height: 26rpx;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      .home-carPlate {
        @apply flex;

        .home-carP-item {
          @apply w-50rpx h-50rpx bg-#FFFFFF rounded-10rpx flex mr-8rpx items-center justify-center;
          box-shadow: 0rpx 8rpx 4rpx 0rpx rgba(0, 0, 0, 0.05);
          font-weight: 600;
          font-size: 26rpx;
          color: rgba(0, 0, 0, 0.9);
          line-height: 26rpx;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }
      }
    }

    .home-car-handle {
      @apply w-full box-border px-32rpx py-12rpx mt-86rpx;
      // background-image: url('https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/7.png');
      // background-repeat: no-repeat;
      // background-size:100% 518rpx;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, #FFFFFF 14%, #FFFFFF 100%);
      border-radius: 40rpx 40rpx 40rpx 40rpx;
      border: 2rpx solid #FFFFFF;

      .home-car-htitle {
        font-family: ZiZhiQuXiMaiTi;
        font-weight: 400;
        font-size: 40rpx;
        color: #000000;
        line-height: 60rpx;
        text-align: left;
        font-style: normal;
        text-transform: none;
        background-image: url('https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/3.png');
        background-repeat: no-repeat;
        background-position: 23px 15px;
        background-size: 145.41rpx 36.28rpx;
      }

      .home-car-hbtn {
        .home-car-hc {
          @apply w-full rounded-100rpx py-26rpx flex items-center;

          .home-hbtn-text {
            font-weight: 600;
            font-size: 26rpx;
            color: #000000;
            line-height: 39rpx;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }
        }
      }
    }
  }

  @keyframes scrollLeft {
    0% {
      transform: translateX(100%);
    }

    100% {
      transform: translateX(-100%);
    }
  }

  /* 应用滚动动画 */
  .home-inf-tc {
    animation: scrollLeft 10s linear infinite;
  }
</style>
