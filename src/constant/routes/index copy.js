/**
 * 根据用户角色返回对应的角色菜单
 * @param {String} userRole 超级管理员 super administrator  管理员 administrator 审核员 auditor 操作员 operator
 * @returns {Object} 页面路由 权限菜单
 */
import router from '@/router/index';
import { housing } from './allRoutes';

export default function (userRole) {
  const authRoutes = getAuthRoutes(userRole);
  const authMenus = getAuthMenus(userRole);
  return {
    authRoutes,
    authMenus
  };
}

// 获取权限对应可访问的页面路由
export function getAuthRoutes(userRole) {
  // 重新加载一次 VueRouter
  router.reloadRouter();

  _handleAuthRouteList(userRole, housing);

  // 动态添加一个 404 页面
  // router.addRoute({
  //   path: '*',
  //   component: _loadView('error')
  // });
}

function _handleAuthRouteList(userRole, list = [], prefix = '') {
  if (!list.length) return false;
  const authRoutes = [];
  for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i];
    if (!item.permission.includes(userRole)) continue;
    const theRoute = {
      path: `${prefix}/${item.routeUrl}`
    };

    if (item?.children?.length) {
      theRoute.component = _loadView('routerView');
      theRoute.meta = {
        name: item.title
      };

      // 动态添加为 index 的子路由
      router.addRoute(item.name, {
        paht: '',
        name: item.name,
        meta: item.meta,
        component: _loadView(item.page)
      });

      _handleAuthRouteList(userRole, item.children, theRoute.path);
    } else {
      theRoute.name = item.name;
      theRoute.meta = {
        ...item.meta,
        name: item.title
      };
      theRoute.component = _loadView(item.page);
    }
    authRoutes.push(theRoute);
    console.log(theRoute);
    // 动态添加为 index 的子路由
    router.addRoute(item.name, theRoute);
  }
  return authRoutes;
}

// 获取权限菜单
export function getAuthMenus(userRole) {
  const authMenus = [
    {
      title: '房源管理',
      name: 'housing',
      routeUrl: '/housing',
      icon: 'location',
      children: _handleMenuList(userRole, housing)
    }
  ];
  return authMenus;
}

// 处理权限菜单
function _handleMenuList(userRole, list = []) {
  const authMenus = [];
  list.forEach((item) => {
    if (item.isMenu && item.permission.includes(userRole)) {
      const theMenu = {
        ...(item.menu || {}),
        title: item.title,
        name: item.name,
        routeUrl: item.routeUrl
      };
      if (item?.children?.length) {
        theMenu.children = _handleMenuList(userRole, item.children);
      }
      authMenus.push(theMenu);
    }
  });
  return authMenus;
}

function _loadView(view) {
  if (view === 'routerView') {
    return (resolve) => require(['@/views/layout/routerView.vue'], resolve);
  } else {
    return (resolve) => require([`@/views/${view}`], resolve);
  }
}
