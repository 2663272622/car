<template>
  <view class="commonhead box-border h-100vh">
    <u-navbar title="油耗计算器" :autoBack="true" :placeholder='true' safeAreaInsetTop bg-color="#0000">
    </u-navbar>


    <up-form labelPosition="left" ref="form1" labelWidth='auto' class="bg-white m-30rpx relative  z-10 rounded-20rpx">
      <up-form-item label="行驶距离(km):" borderBottom ref="item1" leftIcon="hourglass" class="ml-30rpx">
        <up-input type="digit" v-model="distance" border="none" placeholder="请输入行驶的总公里数(例600)"></up-input>
      </up-form-item>
      <up-form-item label="加油量(L):" borderBottom ref="item1" leftIcon="car" class="ml-30rpx">
        <up-input type="digit"  v-model="fuel" border="none" placeholder="请输入本次油箱加满公升数"></up-input>
      </up-form-item>
      <up-form-item label="今日油价:" borderBottom ref="item1" leftIcon="rmb-circle" class="ml-30rpx">
        <up-input type="digit"  v-model="youjia" border="none" placeholder="请输入当日油价(元/公升)"></up-input>
      </up-form-item>

    </up-form>

    <!-- 计算按钮 -->
    <view class="absolute bottom-15rpx w-730rpx">
      <u-button type="warning" class='my-16rpx mx-15rpx' shape="circle" @click="handleReset">重置</u-button>
<!--      <u-button type="primary" class='my-16rpx mx-15rpx' @click="calculateFuelConsumption" color="#D1F5FE"
        shape="circle"><text class="text-#000000">计算油耗</text></u-button> -->
    </view>
    <!-- 计算结果 -->
    <!--   <view v-if="fuelConsumption !== null" class="result">
     <text>油耗：{{ fuelConsumption }} L/100km</text>
      <view v-if='youjiakm && youjiakm > 0'>每公里：{{youjiakm}} 元</view>
    </view> -->
    <view class="flex u-flex-between text-white text-40rpx mx-28rpx font-300">
      <view class="bg-#2d8cf0 w-330rpx m-15rpx rounded-20rpx">
        <view class="mx-25rpx mt-15rpx">油耗:</view>
        <view class="flex-wrap flex items-end pl-50rpx py-25rpx">
          <text class="font-bold text-50rpx">{{fuelConsumption}}&nbsp;</text>
          <text class="pl-10px">L/100km</text>
        </view>
      </view>
      <view class="bg-#2d8cf0 w-330rpx m-15rpx rounded-20rpx">
        <view class="mx-25rpx mt-15rpx">每公里:</view>
        <view class="flex-wrap flex items-end pl-50rpx py-25rpx">
          <text class="font-bold text-50rpx">{{youjiakm}}&nbsp;</text>
          <text class="pl-10rpx">元</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  import {
    ref,
    watchEffect
  } from 'vue';


   onShareAppMessage({
      title: '油耗计算器',
      path: '/pages/common/oilwear/index',
      promise:new Promise(resolve => {
        setTimeout(() => {
          resolve({
            title: '油耗计算器'
          })
        }, 2000)
      })
    })

  // 响应式数据
  const distance = ref(''); // 行驶距离
  const fuel = ref(''); // 油量
  // const fuelConsumption = ref(null); // 油耗
  const fuelConsumption = ref(0); // 油耗
  const youjia = ref("")
  // const youjiakm = ref("")
  const youjiakm = ref(0)

  // // 计算油耗的函数
  // const calculateFuelConsumption = () => {
  //   // 验证输入的合法性
  //   if (!distance.value || !fuel.value || distance.value <= 0 || fuel.value <= 0) {
  //     uni.showToast({
  //       title: '请输入有效的距离和油量',
  //       icon: 'none',
  //     });
  //     return;
  //   }

  //   // 计算油耗
  //   fuelConsumption.value = ((parseFloat(fuel.value) / parseFloat(distance.value)) * 100).toFixed(2);
  //   youjiakm.value = (parseFloat(fuelConsumption.value) * parseFloat(youjia.value) / 100).toFixed(3);
  //   youjiakm.value = youjiakm.value === "NaN" ? '' : youjiakm.value
  // };
  //使用watch监听数据的变化及时更新
  watchEffect(() => {
    fuelConsumption.value = ((parseFloat(fuel.value) / parseFloat(distance.value)) * 100).toFixed(2);
    fuelConsumption.value = fuelConsumption.value === "NaN" ? 0 : fuelConsumption.value
    youjiakm.value = (parseFloat(fuelConsumption.value) * parseFloat(youjia.value) / 100).toFixed(3);
    youjiakm.value = youjiakm.value === "NaN" ? 0 : youjiakm.value
  })

  const handleReset = () => {
      distance.value = ''
      youjia.value = ''
      fuel.value = ''
      youjiakm.value = 0
      fuelConsumption.value = 0
  }
</script>

<style scoped>
  /*  .result {
    margin-top: 20px;
    margin-left: 30px;
    font-size: 18px;
    color: #2d8cf0;
  } */
</style>
