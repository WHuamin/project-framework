import request from '@util//request';

// 获取验证码图片
export function getImageCode(params) {
  return request({ url: '/gyzf-auth/auth/image-code', method: 'get', params });
}

// pc登录
export function doLogin(data) {
  return request({
    url: '/gyzf-auth/auth/pc-login',
    method: 'post',
    data
  });
}

// 全部公司
export function getAllDepartment(params) {
  return request({
    url: '/gyzf-auth/sysdepartment/all-department',
    method: 'get',
    params
  }).then((res) => {
    if (!(res instanceof Array)) return [];
    return res.map((item) => ({
      value: item.id,
      label: item.name
    }));
  });
}
