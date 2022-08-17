// 请求接口错误信息配置
export const ERROR_AXIOS_MESSAGE = {
  400: '错误请求',
  401: '未授权，请重新登录',
  403: '抱歉，你无权访问该页', // '拒绝访问'
  404: '请求错误,未找到该资源',
  405: '请求方法未允许',
  408: '请求超时',
  500: '抱歉，服务器出错了', // '服务器端出错',
  501: '网络未实现',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时',
  505: 'http版本不支持该请求'
};

// 错误页面配置
export function getErrorPageInfo(code) {
  return {
    title: code,
    content: ERROR_AXIOS_MESSAGE[code],
    bgImg: `url(${require('@images/svg/' + code + '.svg')})`
  };
}
// export const ERROR_PAGE_CONFIG = {
//   403: {
//     title: '403',
//     content: '抱歉，你无权访问该页',
//     bgImg: `url(${require('@images/svg/403.svg')})`
//   },
//   404: {
//     title: '404',
//     content: '抱歉，你访问的页面不存在',
//     bgImg: `url(${require('@images/svg/404.svg')})`
//   },
//   500: {
//     title: '500',
//     content: '抱歉，服务器出错了',
//     bgImg: `url(${require('@images/svg/500.svg')})`
//   }
// };
