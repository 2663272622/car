<template>
  <view class="oilcontainer bg-#fff box-border px-12rpx">
		    <u-navbar
		        title="油耗计算器"
		        :autoBack="true"
            :placeholder='true'
		    >
		    </u-navbar>


          <up-form
              labelPosition="left"
              ref="form1"
              labelWidth='auto'
          >
            <up-form-item
                label="行驶距离(km):"
                borderBottom
                ref="item1"
            >
              <up-input
                  v-model="distance"
                  border="none"
              ></up-input>
            </up-form-item>
            <up-form-item
                label="加油量(L):"
                borderBottom
                ref="item1"
            >
              <up-input
                  v-model="fuel"
                  border="none"
              ></up-input>
            </up-form-item>
            <up-form-item
                label="今日油价:"
                borderBottom
                ref="item1"
            >
              <up-input
                  v-model="youjia"
                  border="none"
              ></up-input>
            </up-form-item>
          </up-form>

          <!-- 计算按钮 -->
          <u-button type="primary" class='my-16rpx' @click="calculateFuelConsumption">计算油耗</u-button>

          <!-- 计算结果 -->
          <view v-if="fuelConsumption !== null" class="result">
            <text>油耗：{{ fuelConsumption }} L/100km</text>
            <view v-if='youjiakm && youjiakm > 0'>每公里：{{youjiakm}} 元</view>

          </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
    // 响应式数据
    const distance = ref('');   // 行驶距离
    const fuel = ref('');       // 油量
    const fuelConsumption = ref(null); // 油耗
    const youjia = ref("")
    const youjiakm = ref("")

    // 计算油耗的函数
    const calculateFuelConsumption = () => {
      // 验证输入的合法性
      if (!distance.value || !fuel.value || distance.value <= 0 || fuel.value <= 0) {
        uni.showToast({
          title: '请输入有效的距离和油量',
          icon: 'none',
        });
        return;
      }

      // 计算油耗
      fuelConsumption.value = ((parseFloat(fuel.value) / parseFloat(distance.value)) * 100).toFixed(2);
      youjiakm.value = (parseFloat(fuelConsumption.value) * parseFloat(youjia.value) / 100).toFixed(3);
      youjiakm.value =  youjiakm.value === "NaN" ? '' : youjiakm.value
    };


</script>

<style scoped>

.result {
  margin-top: 20px;
  font-size: 18px;
  color: #2d8cf0;
}
</style>
