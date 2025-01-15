<template>
  <view class="commonhead box-border h-100vh">
<!--    <view class="navbar flex items-end justify-between pb-40px" :style="{height:Hheight()+'px'}">
      <view class="ml-10rpx" @click="goBack()"><u-icon name="arrow-left"></u-icon></view>
      <view class="text-30rpx">首页通知</view>
      <view></view>
    </view> -->
<!--   <view class="navbar">
      </view> -->
      <u-navbar title="首页通知" :autoBack="true" :placeholder='true' bg-color="#0000"> </u-navbar>
    <template v-if='carInfo.id'>
      <up-form labelPosition="left" labelWidth='auto' class="m-30rpx relative  z-10">
        <up-form-item>
          <u--textarea border="surround" v-model="carInfo.messageText" placeholder="请输入通知" height="130"
            clearable count class="rounded-20rpx"></u--textarea>
        </up-form-item>
      </up-form>
      <view class="absolute bottom-0 shadow h-150rpx w-100vw bg-white">
      <view class="pb-15rpx mx-15rpx">
      <u-button class='my-16rpx' @click="handleNotice"  color="#D1F5FE" shape="circle"><text class="text-#000000">保存通知</text></u-button>
      </view>
      </view>
    </template>
    <template v-else>
      <up-list v-if='carList.length > 0' class=" relative z-10">
        <up-list-item v-for="(item, index) in carList" :key="index" class="shadow mx-15rpx rounded-20rpx bg-white">
          <up-cell :title="`${item.carNumber}`" value="查看" @click='handleChange(item)'>
          </up-cell>
        </up-list-item>
      </up-list>
      <div v-else>
        暂无绑定的车
      </div>
    </template>
  </view>
</template>

<script setup>
  import { Hheight } from '@/utils';
  import {
    ref
  } from "vue"
  import {
    usePermission
  } from '@/hooks';
  import {
    getToken,
    isLogin
  } from '@/utils/auth';
  import carMoveCodesAPI from "@/api/carMoveCodes";
  import {
    useUserStore
  } from '@/store';
  const userStore = useUserStore();
  const NoticeInfo = ref()
  const loginStatus = ref(false);
  const carList = ref([])
  const carInfo = ref({})
  onLoad(async (query) => {
    loginStatus.value = await usePermission();
    loginStatus.value = isLogin();
    const ttt = await getToken();
    if (!loginStatus.value) return;
    getCarList()
  })
  // 查询用户绑定的挪车吗
  const getCarList = () => {
    carMoveCodesAPI.get(userStore.openId).then(cdata => {
      carList.value = cdata.list
      console.log('cdata', carList.value)
    })
  }

  const handleChange = (data) => {
    console.log(data)
    carInfo.value = data
  }
  const handleNotice = () => {
    carMoveCodesAPI.update(carInfo.value.id, carInfo.value).then(() => {
      uni.showModal({
        title: '保存成功',
        showCancel: false
      })
      carInfo.value = []
    })
  }
  const goBack=()=>{
    uni.navigateBack()
  }
</script>

<style lang="scss" scoped>

</style>
