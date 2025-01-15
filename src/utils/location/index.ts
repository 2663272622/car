
// 获取位置
export async function getwLocation(success,fail) {
    await getSetting()
    uni.getLocation({
      type: "wgs84",
      success,
      fail: (arr) => {

        console.log(arr)
        if(fail){
          fail()
        }
        if (arr.errMsg === "getLocation:fail:auth denied" || arr.errMsg === "getLocation:fail auth deny") {
          uni.showToast({
            title: "获取定位授权失败",
            icon: "none"
          })
        }
        if (arr.errMsg === "getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF") {
          uni.showModal({
            title: "未获取到位置信息",
            content: "获取定位失败，请手动开启手机系统定位权限重新进入小程序或检查网络情况后重试",
            showCancel: false,
            confirmText: "我知道了"
          })
          return;
        }
      },
    })
}


export const getSetting = ()=>{
  return new Promise((resolve,reject)=>{
      wx.getSetting({
        success: res => {
          if (typeof(res.authSetting['scope.userLocation']) != 'undefined' && !res.authSetting['scope.userLocation']) {
            // 用户拒绝了授权
            wx.showModal({
              title: '提示',
              content: '请先授权获取您的定位权限',
              success: res => {
                if (res.confirm) {
                  // 跳转设置页面
                  wx.openSetting({
                    success: res => {
                      if (res.authSetting['scope.userLocation']) {
                        // 授权成功，重新定位
                        wx.getLocation({
                          success: res => {}
                        });
                      } else {
                        // 没有允许定位权限
                        wx.showToast({
                          title: '您拒绝了定位权限，将无法使用XX功能',
                          icon: 'none'
                        });
                      }
                    }
                  });
                }
              }
            });
          }else{
            resolve('')
          }
        }
      });
  })

}
