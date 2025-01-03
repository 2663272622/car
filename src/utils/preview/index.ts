/**
 * 用于格式化预览URL
 * @param {string} path
 * @param {Boolean} isPre 是否为预览图
 * @returns {Boolean}
 */
const IMG_BASE_URL = import.meta.env.VITE_APP_IMG_BASE_URL
const PREURL = `?x-oss-process=image/resize,m_fill,h_100,w_100`
export function handleUrl(str: string,isPre=true){
  let url:any = []
  if(str){
    url = str.split(',').filter(i=>i).map(i=>({url:IMG_BASE_URL + i + (isPre ? PREURL : ''),name:''}))
  }
  return url
}
