import request from '@util//request';

// 获取-分页（fetch）- 小区
export function fetchVillages(params) {
  return request({
    url: '/gyzf-house/residentialcommunityt/page',
    method: 'get',
    params
  });
}

// 全部小区
export function getAllVillages(params) {
  return request({
    url: '/gyzf-house/residentialcommunityt/selectByCondition',
    method: 'get',
    params
  }).then((res) => {
    if (!(res instanceof Array)) return [];
    return res.map((item) => ({
      value: item.id,
      label: item.residentialName
    }));
  });
}
