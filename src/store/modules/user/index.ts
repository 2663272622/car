import { UserApi } from '@/api';
import { clearToken } from '@/utils/auth';

import { defineStore } from 'pinia';

const useUserStore = defineStore('user', {
  state: () => ({
    userId: '',
    userName: '未登录',
    avatar: '',
    token: '',
    integral: 0, // 积分
    identityType: 1, // 身份类型
    phoneNumber:''
  }),
  getters: {
    userInfo(state) {
      return { ...state };
    },
  },
  actions: {
    // 设置用户的信息
    async setUserId(id: string) {
      this.$patch({
        userId: id,
      });
      await this.info();
    },
    // 设置用户的信息
    setInfo(partial) {
      this.$patch(partial);
    },
    // 重置用户信息
    resetInfo() {
      this.$reset();
    },
    // 获取用户信息
    async info() {
      const result = await UserApi.getUserInfo(this.userId);
      this.setInfo(result);
    },
    async changeUser(data) {
      const result = await UserApi.setUserInfo(this.userId, data);
      console.log('修改情况', result, data);
      this.setUserId(this.userId);
    },
    // // 异步登录并存储token
    // login(loginForm: LoginReq) {
    //   return new Promise((resolve, reject) => {
    //     UserApi.login(loginForm).then((res) => {
    //       const token = res.token;
    //       if (token) {
    //         setToken(token);
    //       }
    //       resolve(res);
    //     }).catch((error) => {
    //       reject(error);
    //     });
    //   });
    // },
    // Logout
    async logout() {
      await UserApi.logout();
      this.resetInfo();
      clearToken();
    },
    // 小程序授权登录
    // authLogin(provider: providerType = 'weixin') {
    //   return new Promise((resolve, reject) => {
    //     uni.login({
    //       provider,
    //       success: async (result: UniApp.LoginRes) => {
    //         if (result.code) {
    //           const res = await UserApi.loginByCode({ code: result.code });
    //           resolve(res);
    //         }
    //         else {
    //           reject(new Error(result.errMsg));
    //         }
    //       },
    //       fail: (err: any) => {
    //         console.error(`login error: ${err}`);
    //         reject(err);
    //       },
    //     });
    //   });
    // },
  },
  persist: true,
});

export default useUserStore;
