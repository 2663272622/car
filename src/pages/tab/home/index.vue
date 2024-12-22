<template>
  <view class="home	custom-head">
    <view class="home-contaion w-full " :style="{paddingTop:bHeight}">
      <!-- 坐标信息 -->
      <view class="home-location w-full h-96rpx flex items-center">
        <up-image
          :show-loading="true"
          src="https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/15.png"
          width="32rpx"
          height="36rpx"
           shape="circle"
           bgColor='#0000'
           class="mr-5rpx"
        ></up-image>
        <view class="c-#000000E6 text-32rpx">
          山东大学
        </view>
      </view>
      <!-- 轮播图 -->
      <up-swiper
        :list="swiperList"
        @click="ClickSwiper"
        imgMode='widthFix'
        height='374rpx'
        bgColor='#0000'
        class="w-full"
      ></up-swiper>
      <!-- 登录信息 -->
      <view class="home-user w-full relative">
        <view class="home-user-login">
            <up-image
              :show-loading="true"
              :src="!loginStatus ? 'https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/8.png' : userStore.avatar"
              width="116rpx"
              height="116rpx"
             shape="circle"
             bgColor='#0000'
            ></up-image>
            <view class="home-user-load">
              <view v-if='!loginStatus' class="flex c-#00000099 text-24rpx" @click="handleLogin">
                您还未登录，点击
                <view class="c-#0DD031FF">
                  立即登录
                </view>
              </view>
              <view v-else  class="text-left text-24rpx">
                <view class="text-32rpx c-#000000E6 font-bold">{{userStore.userName}}</view>
                <view class="text-20rpx c-#00000099">再有10单可以获得20分</view>
              </view>
            </view>
        </view>
        <view class="home-user-integral absolute top--10rpx right-0">
          <up-image
            :show-loading="true"
            src="https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/7.png"
            width="138rpx"
            height="138rpx"
           bgColor='#0000'
          ></up-image>
          <view class="text-24rpx flex items-center">
            积分
            <view class='text-40rpx c-#0DD031FF mx-5px'>{{ userStore.integral }}</view>
          </view>
        </view>
      </view>

      <!-- 正在进行的订单 -->
      <view class="home-orders bg-#ffffff w-full rd-20rpx">
        <view class="flex items-center justify-between	">
          <view class="text-32rpx c#000000E6 font-bold relative mb-10rpx">
            正在进行的订单
            <view class="absolute right--5rpx top-0 translate-x-100% top--20rpx rounded-4rpx bg-#DEFB7BFF c-#000000FF text-20rpx px-10rpx py-2rpx">
              *7
            </view>
          </view>
          <view class="c-#0000004D text-24rpx">
            查看更多
          </view>
        </view>
        <view class="flex items-center">
          <view class="min-w-30rpx min-h-30rpx mr-10rpx w-30rpx h-30rpx rounded-50% bg-#DFFB80FF"></view>

          <up-text
            size='text-28rpx'
            lineHeight='text-28rpx c- leading-42rpx'
            color='#00000099'
            :lines="2"
            text="帮我去五号楼去一个快递再去拿俩包子然后来宿舍打麻将帮我去五号楼去一个快递再去拿俩包子然后来宿舍打麻将"
          ></up-text>
        </view>
        <view class="flex mt-5rpx  items-center justify-between	">
          <view class="c-#FF2020FF text-20rpx flex items-center">
            ￥
            <view class="text-32rpx font-medium">
              20
            </view>
          </view>

          <view class="bg-#DEFB7BFF w-max text-28rpx c-#000000E6 px-34rpx py-4rpx rd-10rpx">
            电话
          </view>
        </view>
      </view>

      <!-- 帮我取、云打印 -->
      <view class="hone-serve flex justify-between">
        <view class="flex justify-between w-50%  mr-17rpx h-246rpx bg-#DFFB82FF  rd-20rpx">
          <view  >
              <up-image
                :show-loading="true"
                src="https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/4.png"
                width="106rpx"
                height="98rpx"
               bgColor='#0000'
               class=" translate-x-30rpx translate-y--22rpx"
              ></up-image>
              <view class="home-bq c-#000000E6 text-48rpx pl-28rpx mb-18rpx">
                帮我取
              </view>
              <view class=" pl-28rpx text-28rpx c-#00000099">
                足不出户...
              </view>
          </view>
          <up-image
            :show-loading="true"
            src="https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/3.png"
            width="162rpx"
            height="190rpx"
            bgColor='#0000'
             class="translate-y--22rpx"
          ></up-image>
        </view>
        <view class="flex justify-between w-50%  mr-17rpx h-246rpx bg-#A0FCEFFF  rd-20rpx">
          <view  >
              <up-image
                :show-loading="true"
                src="https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/2.png"
                width="106rpx"
                height="98rpx"
               bgColor='#0000'
               class=" translate-x-30rpx translate-y--22rpx"
              ></up-image>
              <view class="home-bq c-#000000E6 text-48rpx pl-28rpx mb-18rpx">
                云打印
              </view>
              <view class=" pl-28rpx text-28rpx c-#00000099">
                一键打印...
              </view>
          </view>
          <up-image
            :show-loading="true"
            src="https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/1.png"
            width="162rpx"
            height="190rpx"
            bgColor='#0000'
             class="translate-y--22rpx"
          ></up-image>
        </view>
      </view>

      <!-- 服务项目 -->
      <view class="home-project flex justify-between mb-250rpx">
          <view
            v-for="(item,index) of homeProjects"
            :key='index'
            class="home-projectIttem rounded-20rpx w-full"
            :style="{background:item.bg}"
          >
            <up-image
              :show-loading="true"
              :src="item.url"
              width="106rpx"
              height="98rpx"
             bgColor='#0000'
             class=" translate-x-30rpx translate-y--22rpx"
            ></up-image>
            <view class="text-center  translate-y--15rpx c-#000000E6 text-28rpx	leading-52rpx">
              {{ item.name }}
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
uni.hideTabBar()

const userStore = useUserStore()
const loginStatus = ref(false)

onShow(async () => {
  loginStatus.value = await usePermission();
  console.log("asdasd",loginStatus.value)
  loginStatus.value = isLogin()
  console.log(loginStatus.value ? '已1231登录' : '进入home没有登陆');
  const ttt = await getToken()
  console.log("打印token",ttt)
});

const homeProjects = ref([
  {
    name:"拿外卖",
    url:"https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/12.png",
    bg:`linear-gradient( 180deg, #9CF2DE 0%, #DDFBF3 100%)`
  },
  {
    name:"拿快递",
    url:"https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/11.png",
    bg:`linear-gradient( 180deg, #9CF2DE 0%, #DDFBF3 100%)`
  },
  {
    name:"帮我忙",
    url:"https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/10.png",
    bg:`linear-gradient( 180deg, #9CF2DE 0%, #DDFBF3 100%)`
  },
  {
    name:"每日签到",
    url:"https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/9.png",
    bg:`linear-gradient( 180deg, #9CF2DE 0%, #DDFBF3 100%)`
  },
])

// const systemInfo = uni.getSystemInfoSync();
// const barHeight = ref(systemInfo.statusBarHeight + 'px')
// console.log("头部安全距离",barHeight.value)

const bHeight = computed(()=>{
  return barHeight()
})

const swiperList = ref([
  `https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/6.png`
])
const ClickSwiper = (res:any)=>{
  console.log("点击轮播",res)
}

// 跳转去登录
const handleLogin = ()=>{
    uni.redirectTo({
      url: `${LOGIN_PATH}?redirect=${encodeURIComponent(currentRoute())}`,
    });
}


</script>


<style lang="scss" >
  .home{
      font-family: PingFang SC, PingFang SC;
      background-image: url('https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/5.png');
      background-repeat: no-repeat;
      background-size:100% 518rpx;
      .home-contaion{
        min-height: 518rpx;
        padding-left:20rpx;
        padding-right:20rpx;
        box-sizing: border-box;
        background-size: cover;
        .home-location{
          height: 76rpx;
          width: 100%;
        }
        .u-swiper{
          background: #0000 !important;
        }
        .home-user{
          background-image: url('https://img-ischool.oss-cn-beijing.aliyuncs.com/uni/home/14.png');
          background-repeat: no-repeat;
          background-size:100% 100%;
          height: 250rpx;
          transform: translateY(calc( -56rpx * 1 ));
          padding: 30rpx;
          box-sizing: border-box;
          position: relative;
          .home-user-login{
            display: flex;
            .home-user-load{
              margin-left: 16rpx;
              display: flex;
              align-items: center;
              font-family: PingFang SC, PingFang SC;
              font-weight: 500;
              line-height: 52rpx;
              text-align: center;
              font-style: normal;
              text-transform: none;
              .home-u-islod{
                span{
                  color:#0DD031
                }
              }
            }
          }
          .home-user-integral{

          }
        }
        .home-orders{
          transform: translateY(calc( -56rpx * 2 ));
          padding: 30rpx;
          box-sizing: border-box;
        }
        .hone-serve{
          transform: translateY(calc( -56rpx * 1 ));
          .home-bq{
            font-weight: 400;
            font-size: 48rpx;
            color: rgba(0,0,0,0.9);
            line-height: 52rpx;
            text-align: left;
            font-style: normal;
            text-transform: none;
            // font-family: YS HelloFont BangBangTi, YS HelloFont BangBangTi;
            font-family:YSZYBBT;
          }
        }


        .home-project{
          .home-projectIttem{
            margin-right: 30rpx;
          }
          .home-projectIttem:last-child{
            margin-right: 0;
          }
        }
      }
  }

</style>

