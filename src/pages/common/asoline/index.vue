<template>
	<view>

		    <u-navbar
		        title="实时油价"
		        :autoBack="true"
            :placeholder='true'
		    >
		    </u-navbar>
        <view class="h-full">
            <u-cate-tab class="h-full" :tabList="tabList" tabKeyName="title" itemKeyName="title">
              <template #pageItem="{pageItem}">
                  <view class='asoline-cell-item'>
                    <view class='asoline-cell-t'>
                      {{ pageItem.title }}
                    </view>
                    <view class='asoline-cell-c'>
                      {{ pageItem.price }}
                    </view>
                  </view>
              </template>
          </u-cate-tab>
        </view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/store';
import {request} from '@/utils/request';

// 响应式数据
const tabList = ref([])

const userStore = useUserStore()
// 获取油价
const getData = ()=>{
    request({
      url:"/api/v1/carOilprices/getLatest",
      method:"GET"
    }).then((res)=>{
      let rdara= JSON.parse(res)
      tabList.value = rdara.map(item=>{
        return {
          title: item.city,
          children: [
            {title: '#92', cover: 'https://s3.bmp.ovh/imgs/2024/12/16/35bc6d28ab1c8bc7.png', price: item['92h']},
            {title: '#95', cover: 'https://s3.bmp.ovh/imgs/2024/12/16/35bc6d28ab1c8bc7.png', price: item['95h']},
            {title: '#98', cover: 'https://s3.bmp.ovh/imgs/2024/12/16/35bc6d28ab1c8bc7.png', price: item['98h']},
            {title: '#0', cover: 'https://s3.bmp.ovh/imgs/2024/12/16/35bc6d28ab1c8bc7.png', price: item['0h']},
          ]
        }
      })

      console.log('退出',res)
    }).catch(e=>{
      console.log("失败",e)
    })
}
getData()
</script>


<style lang='scss'>
.asoline-cell-item{
      margin-right: 5rpx;
      border: 1px solid #cccccc54;
      width: 100rpx;
      margin-top: 10rpx;
      border-radius: 5rpx;
    padding: 3px 0;
    .asoline-cell-t{
      text-align:center;
      font-size: 18px;
      font-weight: bold;
      color: #797373;
    }
    .asoline-cell-c{
      font-size:12px;
      margin-top:3px;
      text-align:center
    }
}
</style>
