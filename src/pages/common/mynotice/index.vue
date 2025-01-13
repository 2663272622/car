<template>
  <view class="oilcontainer bg-#fff box-border px-12rpx">
    <u-navbar title="首页通知" :autoBack="true" :placeholder='true'>
    </u-navbar>
    <template v-if='carInfo.id'>
      <up-form labelPosition="left" labelWidth='auto'>
        <up-form-item>
          <up-input border="surround" v-model="carInfo.messageText" placeholder="请输入通知" type="textarea" clearable></up-input>
        </up-form-item>
      </up-form>
      <u-button type="primary" class='my-16rpx' @click="handleNotice">保存通知</u-button>
    </template>
    <template v-else>
      <up-list v-if='carList.length > 0'>
        <up-list-item v-for="(item, index) in carList" :key="index">
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
      carInfo.value=[]
    })
  }
</script>

<style lang="scss" scoped>

</style>
