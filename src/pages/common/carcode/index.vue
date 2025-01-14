<template>
  <view class="oilcontainer bg-#fff box-border px-12rpx">
    <u-navbar title="我的挪车码" :autoBack="true" safeAreaInsetTop :placeholder='true'>
    </u-navbar>

    <template v-if='carInfo.id'>
      <up-form labelPosition="left" labelWidth='auto' ref="formRef" , :rules="rules" :model="carInfo">
        <up-form-item label="车牌号:" borderBottom prop="carNumber">
          <up-input border="none" @tap="plateShow = true" v-model="carInfo.carNumber" placeholder="请点此输入号码"
            :disabled="true"></up-input>
        </up-form-item>
        <up-form-item label="联系电话:" borderBottom prop="phoneNumber">
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
      <template v-if="!newCode">
        <u-button v-if="!carInfo.banFlag" type="warning" class='my-16rpx' @click="handleBan">禁用挪车码</u-button>
        <u-button v-else type="primary" class='my-16rpx' @click="handleBan">启用挪车码</u-button>
      </template>
      <u-button type="primary" class='my-16rpx' @click="handleActive">提交并开启微信通知</u-button>
      <template v-if="plateShow">
        <plate-input :plate="carInfo.carNumber" @export="setPlate" @close="plateShow = false" />
      </template>
    </template>
    <template v-else>
      <up-list v-if='carList.length > 0'>
        <up-list-item v-for="(item, index) in carList" :key="index">
          <up-cell @click='handleChange(item)'>
            <template #title>
              <text class="mr-20rpx">{{item.carNumber}}</text>
              <up-tag v-if="item.banFlag" text="已禁用" shape="circle" type="warning" plain size="mini"></up-tag>
              <up-tag v-else text="已启用" type="success" shape="circle" plain size="mini"></up-tag>
            </template>
            <template #value>
              <text class="ml-10rpx">查看</text>
            </template>
          </up-cell>
        </up-list-item>
      </up-list>
      <div v-else>
        暂无可用的挪车码
      </div>
    </template>
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue';
  import {
    usePermission
  } from '@/hooks';
  import {
    useUserStore
  } from '@/store';
  import {
    barHeight
  } from '@/utils';
  import {
    getToken,
    isLogin
  } from '@/utils/auth';

  import carMoveCodesAPI from "@/api/carMoveCodes"
  import plateInput from '@/components/uni-plate-input/uni-plate-input.vue';
  const formRef = ref()
  const userStore = useUserStore();
  const loginStatus = ref(false);

  const plateShow = ref(false)



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








  // 响应式数据
  const distance = ref(''); // 行驶距离
  const fuel = ref(''); // 油量
  const fuelConsumption = ref(null); // 油耗
  // 计算油耗的函数
  const calculateFuelConsumption = () => {};
</script>

<style lang='scss'>
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
