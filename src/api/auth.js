import request from '@/util/request';

// 获取验证码图片
export function getImageCode(params) {
  return request({ url: '/gyzf-auth/auth/image-code', method: 'get', params });
}

// pc登录
export function doLogin(data) {
  return {
    url: '/gyzf-auth/auth/pc-login',
    method: 'post',
    data
  };
}
