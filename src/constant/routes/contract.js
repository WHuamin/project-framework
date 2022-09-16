// 合同模块
export default [
  {
    name: 'allContracts', // 确保唯一
    page: 'contract/index', // 页面路径
    routeUrl: 'contract', // 页面路由
    title: '所有合同',
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
        name: 'addContract',
        page: 'contract/form',
        routeUrl: 'add',
        title: '新增合同',
        permission: ['superAdministrator', 'administrator']
      }
    ]
  },
  {
    name: 'housingContract',
    page: 'contract/housing',
    routeUrl: 'housing',
    title: '房源合同',
    meta: {
      keepAlive: true // 是否缓存
    },
    isMenu: true, // 是否是菜单选项
    permission: ['superAdministrator', 'administrator']
  },
  {
    name: 'boothContract',
    page: 'contract/housing',
    routeUrl: 'housing',
    title: '摊位合同',
    meta: {
      keepAlive: true // 是否缓存
    },
    isMenu: true, // 是否是菜单选项
    permission: ['superAdministrator', 'administrator']
  },
  {
    name: 'shopContract',
    page: 'contract/housing',
    routeUrl: 'shop',
    title: '商铺合同',
    meta: {
      keepAlive: true // 是否缓存
    },
    isMenu: true, // 是否是菜单选项
    permission: ['superAdministrator', 'administrator']
  },
  {
    name: 'plantContract',
    page: 'contract/housing',
    routeUrl: 'plant',
    title: '厂房合同',
    meta: {
      keepAlive: true // 是否缓存
    },
    isMenu: true, // 是否是菜单选项
    permission: ['superAdministrator', 'administrator']
  },
  {
    name: 'contractTemplate',
    page: 'contract/template',
    routeUrl: 'template',
    title: '合同模板',
    isMenu: true, // 是否是菜单选项
    permission: ['superAdministrator', 'administrator']
  },
  {
    name: 'roomChangeReview',
    page: 'contract/template',
    routeUrl: 'template',
    title: '合同换房审核',
    isMenu: true, // 是否是菜单选项
    permission: ['superAdministrator', 'administrator']
  },
  {
    name: 'renewalReview',
    page: 'contract/template',
    routeUrl: 'template',
    title: '续签审核',
    isMenu: true, // 是否是菜单选项
    permission: ['superAdministrator', 'administrator']
  }
];
