<template>
  <view class="oilcontainer bg-#fff box-border px-12rpx">
		    <u-navbar
		        title="我的挪车码"
		        :autoBack="true"
            :placeholder='true'
		    >
		    </u-navbar>

        <template v-if='carInfo.id'>
          <up-form
               labelPosition="left"
               ref="form1"
               labelWidth='auto'
           >
             <up-form-item
                 label="车牌号"
                 borderBottom
                 ref="item1"
             >
               <up-input
                 border="none"
                 @tap="plateShow = true"
                 v-model="carInfo.carNumber"
                placeholder="请点此输入号码"
                :disabled="true"
               ></up-input>
             </up-form-item>
             <up-form-item
                 label="联系电话:"
                 borderBottom
                 ref="item1"
             >
               <up-input
                   border="none"
                   v-model="carInfo.phoneNumber"
               ></up-input>
             </up-form-item>
             <up-form-item
                 label="挪车码:"
                 borderBottom
                 ref="item1"
             >
               <up-input v-model="carInfo.id" border="none" ></up-input>
             </up-form-item>
         </up-form>
           <u-button type="primary" class='my-16rpx' @click="handleActive">提交</u-button>
           <template v-if="plateShow">
              <plate-input :plate="carInfo.carNumber" @export="setPlate" @close="plateShow = false" />
           </template>
        </template>

        <template v-else>
          <up-list  v-if='carList.length > 0'>
            <up-list-item
              v-for="(item, index) in carList"
              :key="index"
            >
              <up-cell
                :title="`${item.carNumber}`"
                 value="查看"
              >
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
import { ref } from 'vue';
import { usePermission } from '@/hooks';
import { useUserStore } from '@/store';
import { barHeight } from '@/utils';
import { getToken, isLogin } from '@/utils/auth';

import carMoveCodesAPI from "@/api/carMoveCodes"
import plateInput from '@/components/uni-plate-input/uni-plate-input.vue';

const userStore = useUserStore();
const loginStatus = ref(false);

const plateShow = ref(false)

const setPlate = (plate) => {

  console.log("回调~",plate)
  if (plate.length >= 7) {
    carInfo.value.carNumber = plate;
  }
  plateShow.value= false;
}

const carList = ref([])
const carInfo = ref({})



onLoad(async(query)=>{

  loginStatus.value = await usePermission();
  loginStatus.value = isLogin();
  const ttt = await getToken();
  if(!loginStatus.value)return;


  if(query.code){// 新增数据
    carInfo.value.id = query.code
    getCarInfo()
  }else{// 查询数据
    getCarList()
  }
})


// 查询用户绑定的挪车吗
const getCarList = ()=>{
  carMoveCodesAPI.get(userStore.openId).then(cdata=>{
    carList.value = cdata.list
    console.log('cdata',carList.value)
  })
}

// 根据挪车码查询挪车码详情
const getCarInfo = ()=>{
  carMoveCodesAPI.getInfo(carInfo.value.id).then(res=>{
    if(res.active){
      console.log(`挪车码${carInfo.value.id}已经激活~`)
      return ;
    }

    carInfo.value = {
      ...res,
      carNumber:res.carNumber ? res.carNumber :"",
    }

    console.log('resresresres',res)
  })
}



// 激活挪车吗
const handleActive = ()=>{
  let params = {
    ...carInfo.value,
    openId:userStore.openId,
    active:true,
  }
  carMoveCodesAPI.active(carInfo.value.idparams).then(res=>{
    if(res.active){
      console.log(`挪车码${carInfo.value.id}已经激活~`)
      return ;
    }

    console.log('resresresres',res)
  })
}


const handleSaveCar = ()=>{

}












    // 响应式数据
    const distance = ref('');   // 行驶距离
    const fuel = ref('');       // 油量
    const fuelConsumption = ref(null); // 油耗
    // 计算油耗的函数
    const calculateFuelConsumption = () => {
    };
</script>

<style scoped>

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
</style>
