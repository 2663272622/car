<template>
  <view class="oilcontainer bg-#fff box-border px-12rpx">
    <u-navbar title="我的挪车码" :autoBack="true" :placeholder='true'>
    </u-navbar>
    <template>
      <up-form labelPosition="left" ref="form1" labelWidth='auto'>
        <up-form-item label="店铺图片" borderBottom ref="item1">
          <up-input border="none" v-model="merchantsInfo.carNumber" placeholder="请点此输入号码"></up-input>
        </up-form-item>
        <up-form-item label="商店名称" borderBottom ref="item2">
          <up-input border="none" v-model="merchantsInfo.carNumber" placeholder="请点此输入商店名称"></up-input>
        </up-form-item>
        <up-form-item label="经营业务" ref="item3">
          <up-checkbox-group>
            <up-checkbox v-for="item in business" :key="item.id" :label="item.label" class="mr-10rpx"></up-checkbox>
          </up-checkbox-group>
        </up-form-item>
        <up-form-item label="联系电话" borderBottom ref="item4">
          <up-input border="none" v-model="merchantsInfo.carNumber" type="number" placeholder="请点此输入联系电话"></up-input>
        </up-form-item>
        <up-form-item label="开门时间" ref='item5'>
          <up-datetime-picker hasInput=true :show="show" mode="time" v-model="openTime"
            @click="show = true"></up-datetime-picker>
        </up-form-item>
        <up-form-item label="关门时间" ref='item6'>
          <up-datetime-picker hasInput=true :show="show" mode="time" v-model="closeTime"
            @click="show = true"></up-datetime-picker>
        </up-form-item>
        <up-form-item label="地址" borderBottom ref="item7">
          <up-input border="none" v-model="merchantsInfo.carNumber"  placeholder="请点此输入地址"></up-input>
        </up-form-item>
      </up-form>
    </template>
  </view>
</template>

<script setup>
  import BusinessAPI from "@/api/business"
  import {
    ref
  } from "vue"
  const merchantsInfo = ref({})

  const show = ref(false);
  const openTime = ref();
  const closeTime = ref()
  // 查询业务类型
  const params = {
    pageNum: 1,
    pageSize: 10,
    dictCode: 'businessScope'
  }
  const business = ref([])

  function getBusiness() {
    BusinessAPI.getPage(params)
      .then((data) => {
        business.value = data.list
      })
  }
  getBusiness()
</script>

<style>
</style>
