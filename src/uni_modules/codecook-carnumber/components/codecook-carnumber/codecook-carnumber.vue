<template>
  <view class="car-number">
    <view class="new-energy">新能源</view>
    <view class="wrap" @tap="focusHandler">
      <view 
        :class="[
          'cell', 
          { last: index === length - 1}, 
          { 'no-border': index === length - 1 || index === length - 2 }, 
          { active: index === current },
        ]" 
        v-for="(val, index) in fill" 
        :key="index"
        @tap.stop="focusHandler(index)"
      >
        <view class="val">{{val}}</view>
        <view class="border"></view>
      </view>
    </view>
    
    <codecook-keyboard 
      v-if="visibleKeyboard"
      :type="kType"
      @input="keyInputHandler"
      @delete="keyDeleteHandler"
      @close="visibleKeyboard = false"
    ></codecook-keyboard>
  </view>
</template>

<script setup>
  import { computed, ref, watch, watchEffect } from 'vue';
  
  const props = defineProps({
    length: {
      type: Number,
      default: 8
    }
  });
  
  const fill = ref(new Array(props.length).fill(''));
  const current = ref(0);
  const kType = computed(() => {
    return current.value === 0 ? 'province' : 'area'
  });
  
  const carNumberModel = defineModel({ type: String });
  const visibleKeyboard = ref(false);
  
  function keyInputHandler(key) {
    fill.value[current.value] = key;
    emitInput();
    if (current.value >= props.length - 1) {
      return;
    }
    current.value += 1;
  }
  
  function keyDeleteHandler() {
    fill.value[current.value] = '';
    emitInput();
    if (current.value <= 0) {      
      return;
    }
    current.value -= 1;
  }
  
  function focusHandler(index = 0) {
    visibleKeyboard.value = true;
    current.value = index;
  }
  
  function emitInput() {
    carNumberModel.value = fill.value.join('');
  }
  
  watchEffect(() => {
    fill.value = carNumberModel.value.padEnd(props.length).split('');
  })
</script>

<style lang="scss" scoped>
  .car-number {
    position: relative;
    width: 100%;
  
    .wrap {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      border: 1rpx solid #E6E6E6;
      box-sizing: border-box;
      border-radius: 8rpx;
      box-shadow: 0rpx 6rpx 6rpx 0rpx rgba(128, 128, 128, 0.1);
      padding: 15rpx 0;
    }
  
    .new-energy {
      font-size: 24rpx;
      color: #333232;
      margin-bottom: 13rpx;
      display: flex;
      flex-direction: row-reverse;
      padding-right: 5rpx;
    }
  
    .cell {
      box-sizing: border-box;
      padding: 14rpx 0;
      flex: 1;
      color: #666666;
      font-size: 34rpx;
      border-right: 1rpx solid #CCCCCC;
      text-align: center;
      border-bottom: 1rpx solid transparent;
      box-sizing: border-box;
      padding: 0 10rpx;
      display: flex;
      flex-direction: column;
      position: relative; 
      height: 70rpx;
  
      .val {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
  
      .border {
        flex-shrink: 0;
        flex-grow: 0;
        height: 2rpx;
        background: transparent;
        width: 100%;
      }
  
      &.active {
        .border {
          background: #FE8525;
        }
      }
      &.no-border {
        border-right: none;
      }
  
      &.last:after {
        content: '';
        width: 100%;
        border: 2px solid #00FF00;
        border-radius: 8rpx;
        margin: -18rpx 0;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        box-sizing: border-box;
      }
    }
  }
</style>
