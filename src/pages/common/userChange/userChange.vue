<template>
	<view  class="user-change">
    <up-navbar title="个人中心" :placeholder='true' :leftIcon='lefeicon' :autoBack="true" ></up-navbar>
    <view class="w-full px-24rpx py-180rpx box-border">
      <up-form
          labelPosition="left"
          ref="form1"
          :model='formData'
      >
        <button class="w-180rpx h-180rpx px-0" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
          <up-image
              :show-loading="true"
              :src="formData.avatar ? formData.avatar : avatarUrl "
              width="180rpx"
              height="180rpx"
               bgColor='#0000'
               radius='20rpx'
          ></up-image>
        </button>
        <up-form-item
            label="昵称"
            prop="userInfo.name"
            borderBottom
            ref="item1"
        >
          <up-input
              type="nickname" class="my-48rpx"
              v-model="formData.userName"
              placeholder="点击获取昵称"
              :maxlength='10'
          ></up-input>
        </up-form-item>
      </up-form>

      <button
        type="primary"
        class='w-full'
        @click='handleSave'
      >确认</button>
    </view>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { computed } from 'vue';
import { currentRoute, HOME_PATH, isTabBarPath, LOGIN_PATH, removeQueryString } from '@/router';
import { useUpload } from "@/utils"
import { useUserStore } from '@/store';

const formData = ref({
  avatar:"",
  userName:""
})
const userStore = useUserStore()
const lefeicon = ref('')
// let redirect = HOME_PATH;
let redirect = '';
onLoad((res)=>{
  redirect = res.redirect
  // if(userStore){
    formData.value = {
        avatar:userStore.avatar,
        userName:userStore.userName,
    }
    if(userStore.avatar){
      lefeicon.value = 'arrow-left'
    }

  // }
})


const avatarUrl = ref('https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0')
const nickName = ref("")


const onChooseAvatar =async(e) =>{

  useUpload(e.detail.avatarUrl,'uni/avatar/').then(res=>{
    console.log("上传结果",res)
    formData.value.avatar = res as string
  })

}

const handleSave = async()=>{
    if(!formData.value.avatar){
      uni.$u.toast("请先上传头像~");
      return;
    }
    if(formData.value.userName== ''){
      uni.$u.toast("请先填写昵称~");
      return;
    }
    // if(formData.value.userName.length > 10){
    //   uni.$u.toast("昵称最多填写10个字~");
    //   return;
    // }
    await userStore.changeUser({
       identityType:1,
      ...formData.value
    })
    console.log(formData.value)
    let rurl = isTabBarPath(redirect)
    console.log("修改完成操作重定向",rurl,redirect)
    if(rurl){
      uni.switchTab({url:redirect})
    }else{
      uni.redirectTo({url:redirect})
    }
}
</script>

<style lang="scss" >
.user-change{

}
</style>
