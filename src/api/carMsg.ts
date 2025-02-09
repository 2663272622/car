import { get, post,put,request } from '@/utils/request';
//挪车码管理
const carMsg_BASE_URL = "/api/v1/wx/message";

const carMsgAPI = {
  //发送短信
  sendMsgApi(phone:string,id:string,data:{}) {
    return request({
      url: `${carMsg_BASE_URL}/sendMoveMessage?phoneNumber=${phone}&CarMoveCodeId=${id}`,
      method: "POST",
      data,
    });
    // return get(`${carMsg_BASE_URL}/sendMoveMessage`)
  },
  //发送微信通知
  sendWxMsgApi(id:string,data:{}) {
    return request({
      url: `${carMsg_BASE_URL}/sendMoveWxMessage?CarMoveCodeId=${id}`,
      method: "POST",
      data,
    });
    // return get(`${carMsg_BASE_URL}/sendMoveMessage`)
  },



  // // 添加
  // add(data) {
  //   return request({
  //     url: `${carMsg_BASE_URL}`,
  //     method: "post",
  //     data: data,
  //   });
  // },

  // 更新
  // update(id: number, data) {
  //   return request({
  //     url: `${carMsg_BASE_URL}/${id}`,
  //     method: "put",
  //     data: data,
  //   });
  // },
  //下载
  // download(ids: string){
  //   return request({
  //     url: `${carMsg_BASE_URL}/download`,
  //     method:'get',
  //     responseType: 'blob',
  //     params:{
  //       ids:ids
  //     }
  //   })
  // }

};

export default carMsgAPI;
