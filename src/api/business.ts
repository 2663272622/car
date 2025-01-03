import { get, post,put } from '@/utils/request';


const BUSINESS_BASE_URL = "/api/v1/dict-data";

const BusinessAPI = {
  /** 获取商家业务数据 */
  getPage(queryPrams:any) {
    return get(`${BUSINESS_BASE_URL}/page`,{data:queryPrams});
  }
};

export default BusinessAPI;
