import { get, post, put } from '@/utils/request';


const carMerchants_BASE_URL = "/api/v1/carMerchants";

const carMerchantsAPI = {
  /** 获取商家分页数据 */
  getPage(data? : any) {
    return get(`${carMerchants_BASE_URL}/wxPage`, { data });
  },

  /**
   * 商家表单数据
   *
   * @param id
   * @returns
   */
  getFormData(id : number, data? : any) {
    return get(`${carMerchants_BASE_URL}/${id}/wxForm`, { data });
  },

  //获取个人店铺
  get(openId : string) {
    return get(`${carMerchants_BASE_URL}/openIdPage?pageNum=1&pageSize=100&openId=` + openId);
  },


  /**
   * 修改用户表
   *
   * @param id
   * @param data
   */
  update(id : number, data:any) {
    return put(`${carMerchants_BASE_URL}/${id}`,{data},);
  },

    /**
     * 新增商家表
     */
    add(data: any) {
      return post(`${carMerchants_BASE_URL}`,{data});
    },

    //浏览或导航到商家数据
    navigationData(id:number){
      return get(`${carMerchants_BASE_URL}/${id}/count`);
    },
    //浏览或导航商家数据自增
    navigationAdd(id:number,type:number){
      return post(`${carMerchants_BASE_URL}/${id}/increase?type=${type}`);
    },
};

export default carMerchantsAPI;
