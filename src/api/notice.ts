import { get, post,put } from '@/utils/request';


const NOTICE_BASE_URL = "/api/v1/notices";

const NoticeAPI = {
  /** 获取通知公告分页数据 */
  getPage(queryParams:any) {
    return get(`${NOTICE_BASE_URL}/page`,queryParams);
  },

  /**
   * 获取通知公告表单数据
   *
   * @param id NoticeID
   * @returns Notice表单数据
   */
  getFormData(id: number) {
    return get(`${NOTICE_BASE_URL}/${id}/form`);
  },

  // /**
  //  * 更新通知公告
  //  *
  //  * @param id NoticeID
  //  * @param data Notice表单数据
  //  */
  // update(id: number, data: NoticeForm) {
  //   return request({
  //     url: `${NOTICE_BASE_URL}/${id}`,
  //     method: "put",
  //     data: data,
  //   });
  // },

  // /**
  //  * 查看通知
  //  *
  //  * @param id
  //  */
  // getDetail(id: string) {
  //   return request<any, NoticeDetailVO>({
  //     url: `${NOTICE_BASE_URL}/${id}/detail`,
  //     method: "get",
  //   });
  // },

  // /* 全部已读 */
  // readAll() {
  //   return request({
  //     url: `${NOTICE_BASE_URL}/read-all`,
  //     method: "put",
  //   });
  // },

  // /** 获取我的通知分页列表 */
  // getMyNoticePage(queryParams?: NoticePageQuery) {
  //   return request<any, PageResult<NoticePageVO[]>>({
  //     url: `${NOTICE_BASE_URL}/my-page`,
  //     method: "get",
  //     params: queryParams,
  //   });
  // },
};

export default NoticeAPI;
