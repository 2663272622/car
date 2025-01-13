<template>
  <view class="custom-tabbar">
    <view class="tab-contaion">
      {{tabbatShow.length}}
      <view class="tab-c-item" :class="props.pathName == item.pagePath ? 'tab-c-item-select' : ''" v-for="(item,index) of tabbatShow"  :key='index' @click="changeTab(item)" >
        <image style="width: 42rpx; height: 38rpx;" :src="props.pathName != item.pagePath ? item.iconPath : item.selectedIconPath" mode=""></image>
        <text :class="props.pathName == item.pagePath ? 'checkTab' : ''">{{item.text}}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useClipboard, usePermission } from '@/hooks';

  const props = defineProps({
    pathName: {
      type: String,
      default: 'home',
      required: false,
    },
  });
  const emit = defineEmits(['change']);


  const tabbarDatas = ref([
    {
      iconPath: "https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/27.png?x-oss-process=image/resize,m_fill,h_100,w_100",
      selectedIconPath: "https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/24.png?x-oss-process=image/resize,m_fill,h_100,w_100",
      pagePath: "home",
      path:"/pages/tab/home/index",
      text: "首页",
      hidden:false
    },
    {
      iconPath: "https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/25.png?x-oss-process=image/resize,m_fill,h_100,w_100",
      selectedIconPath: "https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/29.png?x-oss-process=image/resize,m_fill,h_100,w_100",
      pagePath: "order",
      path:"/pages/tab/order/index",
      text: "附近"
    },
    {
      iconPath: "https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/26.png?x-oss-process=image/resize,m_fill,h_100,w_100",
      selectedIconPath: "https://img-ischool.oss-cn-beijing.aliyuncs.com/car/base/28.png?x-oss-process=image/resize,m_fill,h_100,w_100",
      pagePath: "user",
      path:"/pages/tab/user/index",
      text: "我的"
    },
  ])

  const tabbatShow = computed(()=>{
    const dad =  tabbarDatas.value.filter(i=>!i.hidden)
    console.log("计算属性",dad)
    return dad
  })

  const changeTab = async(item)=>{

    uni.getStorage({
      key:"scan_id",
      success(res){
        tabbarDatas.value[0].hidden = res.data == ''
      },
      fail(eee) {
          tabbarDatas.value[0].hidden = false
      },
      async complete() {

        console.log("tabbarDatas.value[0].hidden",tabbarDatas.value[0].hidden)
            let to = typeof item == 'number' ? tabbarDatas.value[item] : item

            if(to.pagePath != props.pathName){
              console.log("页面切换",to.path,tabbatShow)

              const isLogin = await usePermission();
              // if(isLogin)
              // if
              uni.switchTab({
                url:to.path
              });
            }
      }
    })

  }


defineExpose({
  changeTab
})
</script>

<style lang="scss" scoped>
  .custom-tabbar{
    height:160rpx;
    width: 100%;
    bottom:0rpx;
    left: 0;
    background: #FFFFFF;
    box-sizing: border-box;
    position: fixed;
    .tab-contaion{
      width: 100%;
      height:112rpx;
      display: flex;
      padding: 16rpx;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .tab-c-item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 229rpx;
        height: 80rpx;
        text{
          font-family: PingFang SC, PingFang SC;
          font-weight: 400;
          font-size: 20rpx;
          color: rgba(0,0,0,0.9);
          line-height: 32rpx;
          text-align: center;
          font-style: normal;
          text-transform: none;
          margin-top: 1.94rpx;
        }
        text.checkTab{
          color:#0052D9;
        }
      }
      .tab-c-item-select{
        background: #F2F3FF;
        border-radius: 48rpx 48rpx 48rpx 48rpx;
      }
    }
  }

</style>
