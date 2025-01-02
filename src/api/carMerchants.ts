import { get, post,put } from '@/utils/request';


const carMerchants_BASE_URL = "/api/v1/carMerchants";

const carMerchantsAPI = {
  /** 获取用户分页数据 */
  getPage(queryParams:any) {
    return get(`${carMerchants_BASE_URL}/page`,queryParams,);
  },

  /**
   * 用户表单数据
   *
   * @param id
   * @returns
   */
  getFormData(id : number) {
    return get(`${carMerchants_BASE_URL}/${id}/form`);
    },

  /**
   * 新增用户表
   */
  add(data : any) {
    return post(`${carMerchants_BASE_URL}`, data,);
  },

  /**
   * 修改用户表
   *
   * @param id
   * @param data
   */
  update(id : number, data:any) {
    return put(`${carMerchants_BASE_URL}/${id}`,data,);
  },

  // /**
  //  * 批量删除用户表，多个以英文逗号(,)分割
  //  *
  //  * @param ids 通知公告ID字符串，多个以英文逗号(,)分割
  //  */
  // deleteByIds(ids : string) {
  //   return request({
  //     url: `${carMerchants_BASE_URL}/${ids}`,
  //     method: "delete",
  //   });
  // }
};

export default carMerchantsAPI;
