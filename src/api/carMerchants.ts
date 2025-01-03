import { get, post,put } from '@/utils/request';


const carMerchants_BASE_URL = "/api/v1/carMerchants";

const carMerchantsAPI = {
  /** 获取用户分页数据 */
  getPage(data:any) {
    return get(`${carMerchants_BASE_URL}/page`,{data});
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


  // /**
  //  * 修改用户表
  //  *
  //  * @param id
  //  * @param data
  //  */
  // update(id : number, data:any) {
  //   return put(`${carMerchants_BASE_URL}/${id}`,data,);
  // },
};

export default carMerchantsAPI;
