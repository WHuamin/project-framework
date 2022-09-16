export const permissionColumns = [
  {
    prop: 'residentialName',
    label: '页面名称',
    width: 180
  },
  {
    prop: 'residentialName', // 在src/views/目录下
    label: '页面路径',
    width: 180
  },
  {
    prop: 'residentialName',
    label: '页面路由',
    width: 180
  },
  {
    prop: 'residentialName', // 确保唯一性，路由的跳转、页面的操作访问权限都需要
    label: '路由名称',
    width: 180
  },
  {
    prop: 'residentialName', // 建立起项目的动态路由
    label: '路由所属上一级',
    width: 180
  },
  {
    prop: 'allPermissions',
    label: '所有权限',
    width: 180
  }
];

export const roleColumns = [
  {
    prop: 'residentialName',
    label: '角色名称',
    width: 180
  },
  {
    prop: 'residentialName', // 在src/views/目录下
    label: '拥有的权限',
    width: 180
  }
];
