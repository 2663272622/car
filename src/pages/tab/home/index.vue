<template>
  <view class="home	custom-head">
    <view class="home-contaion w-full" :style="{paddingTop:bHeight}">
      <!-- 通知公告 -->
      <view class='home-inform' :style="{'width':`calc(100% - ${menuButtonInfo.width}px - 48rpx)`}">
        <view class="home-inf-c">
            <up-image
                :show-loading="true"
                src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/1.png"
                width="46rpx"
                height="48rpx"
               class="mx-12rpx z-1 !min-w-46rpx !min-h-48rpx"
               bgColor="#0000"
            ></up-image>
            <view class="home-inf-text">
              <view class="home-inf-tc">
                {{noticeText}}
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
        <up-textarea v-model="value2" placeholder="请输入内容" autoHeight  maxlength='150' count ></up-textarea>

        <view class='home-car-hbtn mt-26rpx'>
          <view
            v-for="(item,index) of btnData"
            :key='index'
            class='home-car-hc mb-60rpx'
            :style="{
              background:item.bg
            }"
          >
              <up-image
                  :show-loading="true"
                  :src="item.icon"
                  width="56rpx"
                  height="56rpx"
                 bgColor="#0000"
                 class="ml-206rpx mr-12rpx"
              ></up-image>
              <view class="home-hbtn-text">
                {{ item.name }}
              </view>
          </view>
        </view>

      </view>

    </view>

    <Tabbar pathName='home'></Tabbar>

  </view>
</template>

<script setup lang="ts">
import { barHeight } from "@/utils"
import { useClipboard, usePermission } from '@/hooks';
import { isLogin,getToken } from '@/utils/auth';
import { LOGIN_PATH } from "@/router";
import { currentRoute } from '@/router';
import { useUserStore } from "@/store";
import NoticeAPI from "@/api/notice"
uni.hideTabBar()

const userStore = useUserStore()
const loginStatus = ref(false)
const menuButtonInfo = ref(uni.getMenuButtonBoundingClientRect())

const carInfo = ref("京A11111")

const carInfoArr = computed(()=>{
  return carInfo.value.split("")
})

const value2 = ref("您可以通过匿名电话通知车主进行挪车给您带来的不便，敬请谅解。您的主叫号码不会暴露给车主。")

const btnData = ref([
  {
    name:"匿名电话通知",
    icon:"https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/4.png",
    bg:"#FFDCC6FF",
  },
  {
    name:"微信通知",
    icon:"https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/5.png",
    bg:"#C8FB6FFF",
  },
  {
    name:"短信通知车主",
    icon:"https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/6.png",
    bg:"#AEB7FFFF",
  },
])

onShow(async () => {
  loginStatus.value = await usePermission();
  console.log("asdasd",loginStatus.value)
  loginStatus.value = isLogin()
  console.log(loginStatus.value ? '已1231登录' : '进入home没有登陆');
  const ttt = await getToken()
  console.log("打印token",ttt)
});


const bHeight = computed(()=>{
  return barHeight()
})


const noticeText = ref("这是公告内容这是公告内容这是这是公告内容这是公告")
// 跳转去登录
// const handleLogin = ()=>{
//     uni.redirectTo({
//       url: `${LOGIN_PATH}?redirect=${encodeURIComponent(currentRoute())}`,
//     });
// }

const queryParams=ref({
  pageNum: 1,
  pageSize: 10,
})
const pageData=ref([])
// 查询通知公告
function handleQuery() {
  NoticeAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list
      console.log(pageData.value )
    })
  }
onMounted(()=>{
  handleQuery()
})

</script>


<style lang="scss" >
  .home{
      background-image: url('https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/2.png');
      background-repeat: no-repeat;
      background-size:100% 518rpx;
      .home-inform{
        @apply bg-#FFFFFFCC ml-24rpx rounded-10rpx pr-14rpx box-border;
        overflow: hidden;
        width: calc(100% - var(--BoundingClientRect));
        .home-inf-c{
          @apply flex px-12rpx items-center w-full py-8rpx;
          .home-inf-text{
            @apply w-full;
            overflow: hidden;
            .home-inf-tc{
              @apply whitespace-nowrap auto-scroll w-full;
              transform: translateX(50%);
              font-weight: 500;
              font-size: 24rpx;
              color: rgba(0,0,0,0.6);
              line-height: 24rpx;
              text-align: left;
              font-style: normal;
              text-transform: none;
            }
          }
        }
      }
      .home-carinfo{
          @apply ml-30rpx;
        .home-carhint{
          @apply mb-16rpx mt-124rpx;
          font-family: ZiZhiQuXiMaiTi, ZiZhiQuXiMaiTi;
          font-weight: 400;
          font-size: 26rpx;
          color: rgba(0,0,0,0.9);
          line-height: 26rpx;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }
        .home-carPlate{
          @apply flex;
          .home-carP-item{
            @apply w-50rpx h-50rpx bg-#FFFFFF rounded-10rpx flex mr-8rpx items-center justify-center	;
            box-shadow: 0rpx 8rpx 4rpx 0rpx rgba(0,0,0,0.05);
            font-weight: 600;
            font-size: 26rpx;
            color: rgba(0,0,0,0.9);
            line-height: 26rpx;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }
        }
      }
      .home-car-handle{
        @apply w-full box-border px-32rpx py-12rpx  mt-86rpx;
        // background-image: url('https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/7.png');
        // background-repeat: no-repeat;
        // background-size:100% 518rpx;
        background: linear-gradient( 180deg, rgba(255,255,255,0.5) 0%, #FFFFFF 14%, #FFFFFF 100%);
        border-radius: 40rpx 40rpx 40rpx 40rpx;
        border: 2rpx solid #FFFFFF;
        .home-car-htitle{
          font-family: ZiZhiQuXiMaiTi, ZiZhiQuXiMaiTi;
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
        .home-car-hbtn{
          .home-car-hc{
            @apply w-full rounded-100rpx py-26rpx flex items-center ;
            .home-hbtn-text{
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
    .home-inf-tc{
      animation: scrollLeft 10s linear infinite;
    }

</style>

