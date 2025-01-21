<script setup lang="ts">
import { mpUpdate } from '@/utils/index';
import { hidTabbar } from '@/utils';

onLaunch(() => {
  console.log('App Launch');
  // #ifdef MP-WEIXIN
  mpUpdate();
  // #endif
});
onShow(() => {
  // uni.hideTabBar()
  hidTabbar()
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});

// uni.loadFontFace({
//   family: 'YSZYBBT',
//   global:true,
//   source: 'url("https://img-ischool.oss-cn-beijing.aliyuncs.com/base/YSZYBBT.ttf")'
// })

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
.u-upload__button .u-icon{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
}
.u-upload__deletable__icon{
      top: -15px !important;
      right: -25px !important;
}
</style>
