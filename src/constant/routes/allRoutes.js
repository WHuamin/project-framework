import housing from './housing';
export default [
  {
    title: '可视化大数据',
    name: 'visualData',
    // page: 'bigData', // 页面路径
    routeUrl: '/visualData',
    permission: ['superAdministrator', 'administrator'],
    icon: 'location'
  },
  {
    title: '房源管理',
    name: 'housing',
    routeUrl: '/housing',
    icon: 'location',
    permission: ['superAdministrator', 'administrator'],
    children: housing
  },
  {
    title: '合同管理',
    name: 'contract',
    routeUrl: '/contract',
    permission: ['superAdministrator', 'administrator'],
    icon: 'location'
  },
  {
    title: '租户管理',
    name: 'tenant',
    routeUrl: '/tenant',
    permission: ['superAdministrator', 'administrator'],
    icon: 'location'
  },
  {
    title: '财务管理',
    name: 'finance',
    routeUrl: '/finance',
    permission: ['superAdministrator', 'administrator'],
    icon: 'location'
  },
  {
    title: '报表管理',
    name: 'report',
    routeUrl: '/report',
    permission: ['superAdministrator', 'administrator'],
    icon: 'location'
  },
  {
    title: '系统管理',
    name: 'system',
    routeUrl: '/system',
    permission: ['superAdministrator', 'administrator'],
    icon: 'location'
  }
];
