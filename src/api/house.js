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
    return handleResultFormat(res, 'id', 'residentialName');
  });
}

// 全部项目
export function getAllProjects(params = {}) {
  return request({
    url: '/gyzf-house/projectt/getProjectList',
    method: 'get',
    params
  }).then((res) => {
    if (!(res instanceof Array)) return [];
    res.shift();
    return res.map((item) => ({
      value: item.id,
      label: item.projectName
    }));
  });
}

// 获取行政区划编码数据
export function getAllReginsCodes(params = { markCode: 1 }) {
  return request({
    url: '/gyzf-system/reginsCode/getReginsCode',
    method: 'get',
    params
  }).then((res) => {
    if (!(res instanceof Array)) return [];
    return handleReginsCodeData(res);
  });
}
function handleReginsCodeData(list) {
  if (!list || !list.length) return [];
  return list.map((item) => ({
    code: item.code,
    children: handleReginsCodeData(item.codeList),
    id: item.id,
    name: item.name,
    parentCode: item.parentCode
  }));
}

// 全部物业
export function getAllProperties(params = {}) {
  return request({
    url: '/gyzf-system/property/property-list',
    method: 'get',
    params
  }).then((res) => {
    return handleResultFormat(res, 'id', 'name');
  });
}
/**
 * 返回数据格式化
 * @param {Array} res 源数据
 * @param {String} valueKey
 * @param {String} labelKey
 * @returns {Array}
 */
function handleResultFormat(res, valueKey, labelKey) {
  if (!(res instanceof Array)) return [];
  return res.map((item) => ({
    value: item[valueKey],
    label: item[labelKey]
    // metadata: { ...item }
  }));
}
