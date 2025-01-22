export * from './auth';
export * from './common';
export * from './modals';
export * from './request';
export * from './storage';
export * from './upload';
export * from './preview';
export * from './time'

import { LOGIN_PATH, currentRoute,isTabBarPath } from '@/router';

export const toLogin = ()=>{
  uni.showModal({
    title:"提示",
    content:"请先登录后再操作吧~",
    success:(res)=>{
      if(res.confirm){
        gotoLogin()
      }
    }
  })
}

export const hidTabbar = async()=>{
  await nextTick()
  if(!currentRoute()){
    return setTimeout(()=>{hidTabbar()},50)
  }
    // setTimeout(()=>{
      let rurl = isTabBarPath(currentRoute())
      if(rurl){
        try{
          uni.hideTabBar()
        }catch(e){
          conosle.oog("内藏失败",e)
        }
      }
    // },500)
}


export const gotoLogin = ()=>{
  uni.redirectTo({
    url: `${LOGIN_PATH}?redirect=${encodeURIComponent(currentRoute())}`,
  });
}

export const handleUrl = (encodedUrl:string,key:string) => {
  const decodedUrl = decodeURIComponent(encodedUrl);
  let data = '';
  let obj = {};
  // 步骤 2: 解析 URL 并获取参数
  try{
    function getQueryParams(url) {
      const params = {};
      // 通过正则表达式匹配所有查询参数
      const queryString = url.split('?')[1];
      if (queryString) {
        const pairs = queryString.split('&');
        pairs.forEach(pair => {
          const [key, value] = pair.split('=');
          params[decodeURIComponent(key)] = decodeURIComponent(value || '');
        });
      }
      return params;
    }
    obj = getQueryParams(decodedUrl)
  }catch(e){
    console.log("报错",e)
  }
  console.log( obj);
  return obj[key] || ''
}
