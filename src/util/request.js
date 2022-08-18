/** **   request.js   ****/
import axios from 'axios';
import store from '@/store';
import router from '@/router';
import NProgress from 'nprogress'; // 引入进度条
import 'nprogress/nprogress.css'; // 引入进度条样式
// import { projectUrl } from '@/config/ssoUrl';
// import { ElMessage , MessageBox } from 'element-plus';
import { ElMessage } from 'element-plus';
// import { getToken, getUsername, removeToken } from '@/utils/auth';
import { ERROR_AXIOS_MESSAGE } from '@/constant/error';
const qs = require('qs');
// import Qs from 'qs'

// 禁止使用进度环
NProgress.configure({
  showSpinner: false
});

/**
 * 判断重复请求
 * 当请求方式，请求 URL和请求携带参数都一样时，就可以认为是相同的请求。
 * 因此在每次发起请求时，可以根据当前请求的请求方式、请求 URL地址和请求携带参数来生成一个唯一的 key；
 * 同时为每个请求创建一个专属的 CancelToken，然后将 key 和 Cancel 函数以键值对的形式保存到 Map对象中，使用 Map对象的好处是可以快速判断是否有重复的请求，
 */

// 1. generateReqKey，用于根据当前请求的信息生成请求的 Key
function generateReqKey(config) {
  const { method, url, params, data } = config;
  return [method, url, qs.stringify(params), qs.stringify(data)].join('&');
}

// 2. addPendingRequest，用于把当前请求信息添加到 pendingRequest对象中
const pendingRequest = new Map();
function addPendingRequest(config) {
  const requestKey = generateReqKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel);
      }
    });
}

// 3. removePendingRequest，检查是否存在重复请求，若存在则需要取消已发出的请求
function removePendingRequest(config) {
  const requestKey = generateReqKey(config);
  if (pendingRequest.has(requestKey)) {
    const cancelToken = pendingRequest.get(requestKey);
    cancelToken(requestKey);
    pendingRequest.delete(requestKey);
  }
}

// const errorMsg = (message) => {
//   ElMessage .closeAll();
//   return ElMessage ({
//     message: message,
//     type: 'error',
//     duration: 3000
//   });
// };

// 配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
const contentType = 'application/json;charset=UTF-8';

// 1. 创建新的axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_URL, // 公共接口
  timeout: 30 * 1000, // 超时时间单位是ms
  headers: {
    'Content-Type': contentType
  }
});

// 2.请求拦截器
service.interceptors.request.use(
  (config) => {
    // 发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加

    // 开启进度条
    NProgress.start();

    // 检查是否存在重复请求
    removePendingRequest(config);

    // 将当前请求信息添加到 pendingRequest对象中
    addPendingRequest(config);

    const token = store.state.user.token;
    if (token) {
      config.headers['hydosky-auth'] = 'Bearer ' + token; // 添加自定义请求头
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3.响应拦截器
service.interceptors.response.use(
  (response) => {
    // const { data, config } = response;
    // console.log(data, config);

    // 响应成功，关闭进度条
    NProgress.done();

    // 从 pendingRequest对象中移除请求
    removePendingRequest(response.config);
    if (response.data.code === 200) {
      return response.data.data;
    } else {
      ElMessage.error(response.data.msg);
      return Promise.reject(response.data);
    }
  },
  (error) => {
    console.log(error);
    // 从 pendingRequest对象中移除请求
    removePendingRequest(error.config || {});

    if (service.isCancel(error)) {
      console.log(error.message);
    } else {
      // 自行处理异常请求
    }

    if (error && error.response) {
      // 1.公共错误处理
      // 2.根据响应码具体处理
      const errorStatus = error.response.status;
      error.message =
        ERROR_AXIOS_MESSAGE[error.response.status] ||
        `连接错误${error.response.status}`;
      switch (errorStatus) {
        case 401:
          router.replace({ name: 'login' });
          break;
        case 404:
        case 403:
        case 500:
          router.replace(`/error/${errorStatus}`);
          break;
      }
    } else {
      // 超时处理
      if (JSON.stringify(error).includes('timeout')) {
        error.message = '服务器响应超时，请刷新当前页';
      } else {
        error.message = '连接服务器失败';
      }
    }
    ElMessage.error(error.message);
    return Promise.reject(new Error(error));
  }
);

// 4.导出文件
export default service;
