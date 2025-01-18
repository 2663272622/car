// 引入配置
import type { HttpRequestConfig, HttpResponse } from 'uview-plus/libs/luch-request/index';
import type { IResponse } from './types';
import Request from 'uview-plus/libs/luch-request/index';
import { requestInterceptors, responseInterceptors } from './interceptors';
import { useAppStore } from '@/store';

const http = new Request();

// 引入拦截器配置
export function setupRequest() {
  http.setConfig((defaultConfig: HttpRequestConfig) => {
    /* defaultConfig 为默认全局配置 */
    defaultConfig.baseURL = import.meta.env.VITE_API_BASE_URL;
    // #ifdef H5
      if (import.meta.env.VITE_APP_PROXY === 'true') {
        defaultConfig.baseURL = import.meta.env.VITE_API_PREFIX;
      }
    // #endif
    return defaultConfig;
  });
  requestInterceptors(http);
  responseInterceptors(http);
}

export function request<T = any>(config: HttpRequestConfig): Promise<T> {
  return new Promise((resolve, reject) => {
    http.request(config).then((res: HttpResponse<IResponse<T>>) => {
      const { data } = res.data;
      resolve(data as T);
    }).catch((err: any) => {
      console.error('[ err ] >', err);
      reject(err);
    });
  });
}

let repetition = {}
export function get<T = any>(url: string, config?: HttpRequestConfig): Promise<T> {
  return request({ ...config, url, method: 'GET' ,
      getTask: (task, options) => {
        if([
          "/api/v1/carMerchants/wxPage"
        ].includes(options.url)){
          if(repetition[options.url]){
            repetition[options.url].abort()
          }
          repetition[options.url] = task
        }
      },
    });
}

export function post<T = any>(url: string, config?: HttpRequestConfig): Promise<T> {
  return request({ ...config, url, method: 'POST' });
}
export function put<T = any>(url: string, config?: HttpRequestConfig): Promise<T> {
  return request({ ...config, url, method: 'PUT' });
}

export function upload<T = any>(url: string, config?: HttpRequestConfig): Promise<T> {
  return request({ ...config, url, method: 'UPLOAD' });
}

export function download<T = any>(url: string, config?: HttpRequestConfig): Promise<T> {
  return request({ ...config, url, method: 'DOWNLOAD' });
}

export default setupRequest;
