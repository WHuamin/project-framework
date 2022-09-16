// 系统模块
export default [
  {
    name: 'systemPermission', // 确保唯一
    page: 'system/permission', // 页面路径
    routeUrl: 'permission', // 页面路由
    title: '系统权限配置',
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
        name: 'addSystemPermission',
        page: 'system/permission/form',
        routeUrl: 'add',
        title: '新增页面权限',
        permission: ['superAdministrator', 'administrator']
      },
      {
        name: 'systemPermissionDetail',
        page: 'system/permission/detail',
        routeUrl: 'detail',
        title: '查看页面权限',
        permission: ['superAdministrator', 'administrator']
      }
    ]
  },
  {
    name: 'systemRole', // 确保唯一
    page: 'system/role', // 页面路径
    routeUrl: 'role', // 页面路由
    title: '系统角色配置',
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
        name: 'addSystemRole',
        page: 'system/role/form',
        routeUrl: 'add',
        title: '新增角色',
        permission: ['superAdministrator', 'administrator']
      },
      {
        name: 'systemRoleDetail',
        page: 'system/role/detail',
        routeUrl: 'detail',
        title: '查看角色',
        permission: ['superAdministrator', 'administrator']
      }
    ]
  },
  {
    name: 'systemUser', // 确保唯一
    page: 'system/user', // 页面路径
    routeUrl: 'user', // 页面路由
    title: '系统用户配置',
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
        name: 'addSystemUser',
        page: 'system/user/form',
        routeUrl: 'add',
        title: '新增用户',
        permission: ['superAdministrator', 'administrator']
      },
      {
        name: 'systemUserDetail',
        page: 'system/user/detail',
        routeUrl: 'detail',
        title: '查看用户',
        permission: ['superAdministrator', 'administrator']
      }
    ]
  }
];
