import { get, post,put,request } from '@/utils/request';
//挪车码管理
const carMoveCodes_BASE_URL = "/api/v1/carMoveCodes";

const carMoveCodesAPI = {
  //获取挪车码信息
  getFormData(id: number) {
    return get(`${carMoveCodes_BASE_URL}/${id}/form`)
  },

  // 添加
  get(openId:string) {
    return request({
      url: `${carMoveCodes_BASE_URL}/page?pageNum=1&pageSize=10&openId=`+openId,
      method: "GET",
    });
  },
  // 查询想去
  getInfo(id :string) {
    return request({
      url: `${carMoveCodes_BASE_URL}/${id}/form`,
      method: "GET",
    });
  },
  // 激活
  active(id :string,data) {
    return request({
      url: `${carMoveCodes_BASE_URL}/${id}`,
      method: "PUT",
      data
    });
  },

  activeState(id :string) {
    return request({
      url: `${carMoveCodes_BASE_URL}/${id}/isActive`,
      method: "GET"
    });
  },
  // 更新
  update(id: number, data) {
    return put(`${carMoveCodes_BASE_URL}/${id}`,{data})
  },

  isActive(id: number) {
    return request({
      url: `${carMoveCodes_BASE_URL}/activate?id=${id}`,
      method: "POST",
      data:{id}
    });
  },
  // 激活
  updatedata(id :string,data) {
    return request({
      url: `${carMoveCodes_BASE_URL}/${id}`,
      method: "PUT",
      data
    });
  },


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
