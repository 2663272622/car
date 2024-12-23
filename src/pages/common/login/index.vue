<template>
  <view class="login relative w-full h-100vh">
    <view class="login-form-wrap absolute top-25% w-full flex flex-col justify-center items-center">
      <up-image
          :show-loading="true"
          src="https://img-ischool.oss-cn-beijing.aliyuncs.com/base/logo.png"
          width="180rpx"
          height="180rpx"
         bgColor='#0000'
         radius='20rpx'
         class="mb-80rpx "
      ></up-image>
      <button
        open-type="getPhoneNumber"
        @getphonenumber="handlePhoneNumber"
        type="primary"
        class='w-full'
      >手机号快速登录</button>

      <view class="hint">
        登录代表同意
        <text class="link">
          用户协议、隐私政策，
        </text>
        并授权使用您的账号信息（如昵称、头像、收获地址）以便您统一管理
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { currentRoute, HOME_PATH, isTabBarPath, LOGIN_PATH, removeQueryString } from '@/router';
import { setToken } from '@/utils/auth';
import uCode from 'uview-plus/components/u-code/u-code.vue';
import {request} from '@/utils/request';
import { useUserStore } from '@/store';
// const crypto = require('crypto');
// import crypto from 'crypto'
// import { useUserStore } from '@/store';

// const userStore = useUserStore();
const tel = ref<string>('18502811111');
const code = ref<string>('1234');
const tips = ref<string>();
const uCodeRef = ref<InstanceType<typeof uCode> | null>(null);
let redirect = HOME_PATH;

const userStore = useUserStore()
// 退出登录
const logout = ()=>{
    request({
      url:"/api/v1/wx/auth/wxLogout",
      method:"POST"
    }).then((res)=>{
      console.log('退出',res)
    }).catch(e=>{
      console.log("失败",e)
    })
}


// 路由重定向
const handleRedirect = ()=>{
  //  return
  if(userStore.avatar){

    setTimeout(() => {
      let rurl = isTabBarPath(redirect)
      if(rurl){
        uni.switchTab({url:redirect})
      }else{
        uni.redirectTo({url:redirect})
      }
    });
  }else{
    uni.redirectTo({
      url: `/pages/common/userChange/userChange?redirect=${redirect}`,
    });
  }

}


const handlePhoneNumber = (e)=>{
  if (e.detail.errMsg === 'getPhoneNumber:ok') {
    const { encryptedData, iv } = e.detail;
    uni.login({
      provider: 'weixin',
      success: res => {
    console.log({ encryptedData, iv,code:res.code })
        request({
          url:"/api/v1/wx/auth/wxLogin",
          method:"POST",
          data:{
            code:res.code,
            encryptedData:encryptedData,
            phoneNumber:iv,
          }
        }).then(async(res)=>{
          let openid = res.openid
          if(openid ){
            setToken(`Bearer `+ res.token.accessToken);
            await userStore.setUserId(res.userId)
            handleRedirect()
          }
        }).catch(e=>{
          console.log("失败",e)
        })
        console.log(res.code)
      },
      fail: err => {
        console.log(err)
      }
    });

  }
}


onLoad((options: any) => {
  if (options.redirect && removeQueryString(options.redirect) !== LOGIN_PATH) {
    redirect = decodeURIComponent(options.redirect);
  }
});
</script>

<style lang="scss" scoped>
.login-form-wrap {
  @apply mt-80rpx mx-auto mb-0 px-24rpx box-border ;
// w-600rpx
  .title {
    @apply mb-100rpx text-60rpx text-left font-500;
  }

  input {
    @apply pb-6rpx mb-10rpx text-left;
  }

  .tips {
    @apply mt-8rpx mb-60rpx;

    color: $u-info;
  }

  .login-btn {
    @apply flex items-center justify-center py-12rpx px-0 text-30rpx bg-#fdf3d0 border-none;

    color: $u-tips-color;

    &::after {
      @apply border-none;
    }
  }

  .alternative {
    @apply flex justify-between mt-30rpx;

    color: $u-tips-color;
  }
}

.login-type-wrap {
  @apply flex justify-between pt-350rpx px-150rpx pb-150rpx;

  .item {
    @apply flex items-center flex-col text-28rpx;

    color: $u-content-color;
  }
}

.hint {
  @apply px-40rpx py-20rpx text-20rpx;

  color: $u-tips-color;

  .link {
    color: $u-warning;
  }
}
</style>
