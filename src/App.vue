<script setup lang="ts">
import { mpUpdate } from '@/utils/index';

onLaunch(() => {
  console.log('App Launch');
  // #ifdef MP-WEIXIN
  mpUpdate();
  // #endif
});
onShow(() => {
  uni.hideTabBar()
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});

uni.loadFontFace({
  family: 'YSZYBBT',
  global:true,
  source: 'url("https://img-ischool.oss-cn-beijing.aliyuncs.com/base/YSZYBBT.ttf")'
})

uni.loadFontFace({
  family: 'ZiZhiQuXiMaiTi',
  global:true,
  source: 'url("https://img-ischool.oss-cn-beijing.aliyuncs.com/base/ZiZhiQuXiMaiTi-2.ttf")'
})
</script>

<style lang="scss">
/* 每个页面公共css */
@import 'uview-plus/index.scss';
@import '@/static/styles/common.scss';
</style>
