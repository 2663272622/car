import { get, post,put } from '@/utils/request';


const carMerchants_BASE_URL = "/api/v1/carMerchants";

const carMerchantsAPI = {
  /** 获取用户分页数据(给定位权限) */
  getPage(data:any) {
    return get(`${carMerchants_BASE_URL}/wxPage`,{data});
  },

  /** 获取用户分页数据(不给定位权限) */
  getNoPage(data:any) {
    return get(`${carMerchants_BASE_URL}/page`,{data});
  },

  /**
   * 用户表单数据(不给定位)
   *
   * @param id
   * @returns
   */
  getNoFormData(id : number) {
    return get(`${carMerchants_BASE_URL}/${id}/form`);
    },

  /**
   * 用户表单数据(不给定位)
   *
   * @param id
   * @returns
   */
  getFormData(id : number,data:any) {
    return get(`${carMerchants_BASE_URL}/${id}/wxForm`,{data});
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
