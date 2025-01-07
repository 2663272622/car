<template>
  <view class="oilcontainer bg-#fff box-border px-12rpx">
    <u-navbar title="我的挪车码" :autoBack="true" :placeholder='true'>
    </u-navbar>
    <template>
      <up-form labelPosition="left" ref="form1" labelWidth='auto'><up-form-item>
          <up-input border="none" v-model="NoticeInfo" placeholder="请输入通知" clearable></up-input>
        </up-form-item>
      </up-form>
    </template>
  </view>
</template>

<script setup>
  import {
    ref
  } from "vue"
  const NoticeInfo = ref()
</script>

<style lang="scss" scoped>

</style>
