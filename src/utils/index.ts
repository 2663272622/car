export * from './auth';
export * from './common';
export * from './modals';
export * from './request';
export * from './storage';
export * from './upload';
export * from './preview';
export * from './time'



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
