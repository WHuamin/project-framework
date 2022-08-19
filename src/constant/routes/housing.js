// 房源模块
export default [
  {
    name: 'housingProject', // 确保唯一
    page: 'project/housing', // 页面路径
    routeUrl: 'project', // 页面路由
    title: '项目列表',
    permission: ['superAdministrator', 'administrator'], // 页面访问权限
    meta: {
      keepAlive: true // 是否缓存
    },
    isMenu: true, // 是否是菜单选项
    menu: {
      icon: 'location'
    }, // 菜单配置
    children: [
      {
        name: 'addHousingProject',
        page: 'project/form',
        routeUrl: 'add',
        title: '新增房源项目',
        permission: ['superAdministrator', 'administrator']
      },
      {
        name: 'housingProjectDetail',
        page: '/project/detail',
        routeUrl: 'detail',
        title: '查看房源项目',
        permission: ['superAdministrator', 'administrator']
      }
    ]
  },
  {
    name: 'village',
    page: 'village/index',
    routeUrl: 'village',
    title: '小区列表',
    permission: ['superAdministrator', 'administrator'],
    isMenu: true, // 是否是菜单选项
    menu: {
      icon: 'location'
    }, // 菜单配置
    children: [
      {
        name: 'addVillage',
        page: 'village/form',
        routeUrl: 'add',
        title: '新增小区',
        permission: ['superAdministrator', 'administrator']
      },
      {
        name: 'villageDetail',
        page: 'village/detail',
        routeUrl: 'detail',
        title: '查看小区',
        permission: ['superAdministrator', 'administrator']
      }
    ]
  }
];
