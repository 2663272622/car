<template>
  <view class="commonhead box-border h-100vh">
<!--    <view class="navbar flex items-end justify-between pb-40px" :style="{height:Hheight()+'px'}">
      <view class="ml-10rpx" @click="goBack()"><u-icon name="arrow-left"></u-icon></view>
      <view class="text-30rpx">我的挪车码</view>
      <view></view>
    </view> -->
  <u-navbar :autoBack='false' @leftClick='handleLeft' title="我的挪车码"  bg-color="#0000" safeAreaInsetTop :placeholder='true'>
    </u-navbar>

    <template v-if='carInfo.id'>
      <up-form labelPosition="left" labelWidth='auto' ref="formRef" , :rules="rules" :model="carInfo"  class="bg-white m-30rpx relative  z-10 rounded-20rpx">
        <up-form-item label="车牌号:" borderBottom prop="carNumber" class="ml-15rpx" leftIcon="car">
          <up-input border="none" @tap="plateShow = true" v-model="carInfo.carNumber" placeholder="请点此输入号码"
            :disabled="true"></up-input>
        </up-form-item>
        <up-form-item label="联系电话:" borderBottom prop="phoneNumber" class="ml-15rpx" leftIcon="phone">
          <up-input border="none" v-model="carInfo.phoneNumber"></up-input>
        </up-form-item>
        <!--             <up-form-item
                 label="挪车码:"
                 borderBottom
                 ref="item1"
             >
               <up-input :disabled="true"  v-model="carInfo.id" disabled border="none" ></up-input>
             </up-form-item> -->
      </up-form>
      <view class="absolute bottom-15rpx w-730rpx">
        <template v-if="!newCode">
          <u-button v-if="!carInfo.banFlag" type="warning" class='my-16rpx mx-15rpx' shape="circle" @click="handleBan">禁用挪车码</u-button>
          <u-button v-else type="primary" class='my-16rpx mx-15rpx' @click="handleBan" shape="circle">启用挪车码</u-button>
        </template>
        <u-button type="primary" class='my-16rpx mx-15rpx' @click="handleActive" color="#D1F5FE" shape="circle"><text class="text-#000000">提交并开启微信通知</text></u-button>
      </view>
      <template v-if="plateShow">
        <plate-input :plate="carInfo.carNumber" @export="setPlate" @close="plateShow = false" />
      </template>
    </template>
    <template v-else>
     <up-list v-if='carList.length > 0'  class="relative  z-10 w-690rpx mx-30rpx">
        <up-list-item v-for="(item, index) in carList" :key="index">
          <view @click='handleChange(item)' class="mt-30rpx shadow-xl bg-white shadow p-30rpx rounded-20rpx border flex u-flex-between items-center">
            <view v-if="item.carNumber.length===8" class="w-120rpx h-120rpx rounded-50% z-10 flex items-center justify-center" style="background-color:rgba(70,175,76,0.3);">
              <up-image src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/newenergy.png"  width="30" height="30" bg-color="transprant"></up-image>
            </view>
            <view v-else class="w-120rpx h-120rpx rounded-50% z-10 flex items-center justify-center" style="background-color:rgba(171,80,68,0.3);">
              <up-image src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/gasoline.png"  width="45" height="45" bg-color="transprant"></up-image>
            </view>
            <view class="mr-60rpx">
              <view class=" flex items-center justify-center mb-20rpx">
                <text class="text-38rpx font-bold mr-10rpx">{{item.carNumber}}</text>
                <up-tag v-if="item.banFlag" text="已禁用" shape="circle" type="warning" plain size="mini"></up-tag>
                <up-tag v-else text="已启用" type="success" shape="circle" plain size="mini"></up-tag>
              </view>
              <view>
                <text class="text-#C5CCD5 text-30rpx">{{item.phoneNumber}}</text>
              </view>
            </view>
            <view>
              <up-icon name="arrow-right"></up-icon>
            </view>
          </view>
        </up-list-item>
      </up-list>
      <view v-else class="absolute" style="top: calc(40% - 50px);left:calc(50% - 50px)">
        <up-image src="https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/nodata.png" width="100" height="100" bg-color="#F1F7F7"></up-image>
        <view class="text-center mt-5rpx">暂无挪车码</view>
      </view>
    </template>
  </view>
</template>

<script setup>
  import { Hheight } from '@/utils';
  import {
    ref
  } from 'vue';
  import {
    usePermission
  } from '@/hooks';
  import {
    barHeight
  } from '@/utils';
  import {
    getToken,
    isLogin
  } from '@/utils/auth';

  import carMoveCodesAPI from "@/api/carMoveCodes"
  import plateInput from '@/components/uni-plate-input/uni-plate-input.vue';
  import { useUserStore,useAppStore } from "@/store";
  const formRef = ref()
  const userStore = useUserStore();
  const loginStatus = ref(false);

  const plateShow = ref(false)
  const appStore = useAppStore()



  const setPlate = (plate) => {
    if (plate.length >= 7) {
      carInfo.value.carNumber = plate;
    }
    plateShow.value = false;
  }

  const carList = ref([])
  const carInfo = ref({})


  const newCode=ref(false)

  onLoad(async (query) => {

    loginStatus.value = await usePermission();
    loginStatus.value = isLogin();
    const ttt = await getToken();
    if (!loginStatus.value) return;


    if (query.code) { // 新增数据
      // 为新码
      newCode.value=true
      getCarInfo(query.code)
    } else { // 查询数据
      getCarList()
    }
  })

  const handleLeft = ()=>{
    if(newCode.value){
      uni.showModal({
        title:"提示",
        content:"是否取消注册挪车码？",
        success:(res)=>{
          if(res.confirm){

            appStore.setScanId('')
            uni.setStorage({
            	key: 'scan_id',
            	data: '',
            	success: function (res) {
                uni.navigateBack({
                  delta:1,
                });
            	}
            });
          }
        }
      })
    }else{
      uni.navigateBack({
        delta:1,
      });
    }
  }

  // 查询用户绑定的挪车吗
  const getCarList = () => {
    carMoveCodesAPI.get(userStore.openId).then(cdata => {
      carList.value = cdata.list
      console.log('cdata', carList.value)
    })
  }

  // 根据挪车码查询挪车码详情
  const getCarInfo = async (id) => {

    const isActive = await carMoveCodesAPI.activeState(id)

    if (!isActive) {
      carInfo.value.phoneNumber = userStore.phoneNumber
      carInfo.value.id = id
      return;
    }

    carMoveCodesAPI.getInfo(id).then(res => {
      carInfo.value = {
        ...res,
        carNumber: res.carNumber ? res.carNumber : "",
        id
      }
    })
  }

  const handleChange = (data) => {
    newCode.value=false
    carInfo.value = data
  }


  //修改禁用挪车码
  const handleBan = () => {
    formRef.value.validate().then((valid) => {
      if (valid) {
        carInfo.value.banFlag = !carInfo.value.banFlag
        let params = {
          ...carInfo.value,
          openId: userStore.openId,
          active: true,
        }
        carMoveCodesAPI.updatedata(carInfo.value.id, params).then(res => {
          if (carInfo.value.banFlag) {
            uni.$u.toast("禁用成功");
          } else {
            uni.$u.toast("启用成功");
          }
          carInfo.value = {};
          getCarList()
          if (!res) return;
        })
      }
    })
  }
  // 修改数据挪车吗
  const handleActive = () => {
    formRef.value.validate().then((valid) => {
      if (valid) {
        wx.requestSubscribeMessage({
          tmplIds: ["--nrmwvHNV4R7Mj_QEYqRlWcT5ebXo5tR_9ijkQ4Ntc"],
          success(res) {
            if (res['--nrmwvHNV4R7Mj_QEYqRlWcT5ebXo5tR_9ijkQ4Ntc'] == "accept") {
              uni.$u.toast("已开启微信通知");
            } else {
              uni.$u.toast("已关闭微信通知");
            }
          },
          async complete() {
            const isActive = await carMoveCodesAPI.activeState(carInfo.value.id)
            if (!isActive) {
              await carMoveCodesAPI.isActive(carInfo.value.id)
            }

            let params = {
              ...carInfo.value,
              openId: userStore.openId,
              active: true,
            }

            carMoveCodesAPI.updatedata(carInfo.value.id, params).then(res => {
              carInfo.value = {};
              getCarList()
              newCode.value = false;
              if (!res) return;
            })
          }
        })
      }
    })
  }

  //校验规则
  const rules = reactive({
    carNumber: [{
      required: true,
      message: "车牌号不能为空",
      trigger: "blur"
    }],
    phoneNumber: [{
        pattern: /^1[3456789]\d{9}$/,
        message: "手机号格式不正确",
        trigger: "blur"
      },
      {
        required: true,
        message: "联系电话不能为空",
        trigger: "blur"
      }
    ],
  });




//返回上一页
  const goBack=()=>{
    uni.navigateBack()
  }


  // 响应式数据
  const distance = ref(''); // 行驶距离
  const fuel = ref(''); // 油量
  const fuelConsumption = ref(null); // 油耗
  // 计算油耗的函数
  const calculateFuelConsumption = () => {};
</script>

<style lang='scss' scoped>
  /* .navbar{
  background-image: url('https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/7.png');
  background-repeat: no-repeat;
  background-size: 750rpx 522rpx;
} */
  .main-content {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    background-color: #ffffff;
    padding: 1upx 30upx;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    min-height: 100upx;
    justify-content: space-between;
  }

  .result {
    margin-top: 20px;
    font-size: 18px;
    color: #2d8cf0;
  }

  .u-input {
    background-color: #0000 !important;
  }
</style>
