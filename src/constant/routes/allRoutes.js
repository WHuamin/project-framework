import housing from './housing';
import contract from './contract';
import system from './system';
export default [
  {
    title: '大数据',
    name: 'visualData1',
    isMenu: true,
    page: 'visualData/gaode', // 页面路径
    routeUrl: '/visualData1',
    permission: ['superAdministrator', 'administrator'],
    icon: 'location'
  },
  {
    title: '可视化大数据',
    name: 'visualData',
    isMenu: true,
    page: 'visualData/index', // 页面路径
    routeUrl: '/visualData',
    permission: ['superAdministrator', 'administrator'],
    icon: 'location'
  },
  {
    title: '房源管理',
    name: 'housing',
    isMenu: true,
    routeUrl: 'housing',
    icon: 'location',
    parentRoute: 'layout',
    permission: ['superAdministrator', 'administrator'],
    children: housing
  },
  {
    title: '合同管理',
    name: 'contract',
    isMenu: true,
    routeUrl: 'contract',
    parentRoute: 'layout',
    permission: ['superAdministrator', 'administrator'],
    children: contract,
    icon: 'location'
  },
  {
    title: '租户管理',
    name: 'tenant',
    isMenu: true,
    routeUrl: 'tenant',
    parentRoute: 'layout',
    permission: ['superAdministrator', 'administrator'],
    icon: 'location'
  },
  {
    title: '财务管理',
    name: 'finance',
    isMenu: true,
    routeUrl: 'finance',
    parentRoute: 'layout',
    permission: ['superAdministrator', 'administrator'],
    icon: 'location'
  },
  {
    title: '报表管理',
    name: 'report',
    isMenu: true,
    routeUrl: 'report',
    parentRoute: 'layout',
    permission: ['superAdministrator', 'administrator'],
    icon: 'location'
  },
  {
    title: '系统管理',
    name: 'system',
    isMenu: true,
    routeUrl: 'system',
    parentRoute: 'layout',
    permission: ['superAdministrator', 'administrator'],
    icon: 'location',
    children: system
  }
];
