import avatar from "@/uni_modules/uview-plus/components/u-avatar/avatar";
import { func } from "@/uni_modules/uview-plus/libs/function/test";

// 小程序更新检测
export function mpUpdate() {
  const updateManager = uni.getUpdateManager();
  updateManager.onCheckForUpdate((res) => {
    // 请求完新版本信息的回调
    console.log(res.hasUpdate);
  });
  updateManager.onUpdateReady(() => {
    uni.showModal({
      title: '更新提示',
      content: '检测到新版本，是否下载新版本并重启小程序？',
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      },
    });
  });
  updateManager.onUpdateFailed(() => {
    // 新的版本下载失败
    uni.showModal({
      title: '已经有新版本了哟~',
      content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
      showCancel: false,
    });
  });
}

// 状态栏高度(函数)
export function barHeight() {
  const systemInfo = uni.getSystemInfoSync();
  let h = systemInfo.statusBarHeight + 'px'
  return h;
}

//获取胶囊按钮距离
export const getTitleBarHeight=()=>{
		let{top}=uni.getMenuButtonBoundingClientRect()
    let h = top + 'px'
		return h
}

export function Hheight(){
  const {statusBarHeight} = uni.getSystemInfoSync();
  let{top,height}=uni.getMenuButtonBoundingClientRect()
  let h = statusBarHeight + height
  return h
}
