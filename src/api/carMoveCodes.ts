import { get, post,put } from '@/utils/request';
//挪车码管理
const carMoveCodes_BASE_URL = "/api/v1/carMoveCodes";

const carMoveCodesAPI = {
  //获取挪车码信息
  getFormData(id: number) {
    return get(`${carMoveCodes_BASE_URL}/${id}/form`)
    },

  // // 添加
  // add(data) {
  //   return request({
  //     url: `${carMoveCodes_BASE_URL}`,
  //     method: "post",
  //     data: data,
  //   });
  // },

  // 更新
  // update(id: number, data) {
  //   return request({
  //     url: `${carMoveCodes_BASE_URL}/${id}`,
  //     method: "put",
  //     data: data,
  //   });
  // },
  //下载
  // download(ids: string){
  //   return request({
  //     url: `${carMoveCodes_BASE_URL}/download`,
  //     method:'get',
  //     responseType: 'blob',
  //     params:{
  //       ids:ids
  //     }
  //   })
  // }

};

export default carMoveCodesAPI;
