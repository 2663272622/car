import { getToken } from '@/utils/auth';
/**
 * 上传图片
 * @param { string } filePath 图片的本地临时路径
 * @returns 上传后的图片路径
*/
export const useUpload = async( filePath:string,path?:string  )=>{
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const Authorization = await getToken()
  return new Promise((resolve,reject)=>{
    uni.uploadFile({
      url:BASE_URL+`api/v1/wx/auth/uploadAvatar?path=`+path,
      filePath,
      name: 'multipartFile',
      formData: {
        user: 'testtest',
      },
      header:{
        Authorization,
        "ngrok-skip-browser-warning":"true"
      },
      success: (res) => {
        if(res.data){
          let resdata = JSON.parse(res.data)
          resolve(resdata.data || '')
        }else{
          reject('')
        }

      },
      fail: (err) => {
       reject(err)
      },
    })
  })
}
