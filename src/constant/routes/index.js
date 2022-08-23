/**
 * 根据用户角色返回对应的角色菜单
 * @param {String} userRole 超级管理员 super administrator  管理员 administrator 审核员 auditor 操作员 operator
 * @returns {Object} 页面路由 权限菜单
 */
import allRoutes from './allRoutes';
let notInLayout = []; // 不在主要框架中的页面名称

// 处理权限菜单
function _handleMenuList(userRole, list = [], menuLevel = 0) {
  const authMenus = [];
  list.forEach((item) => {
    if (item.isMenu && item.permission.includes(userRole)) {
      const theMenu = {
        ...(item.menu || {}),
        title: item.title,
        name: item.name,
        routeUrl: item.routeUrl,
        menuLevel
      };
      if (item?.children?.length) {
        theMenu.children = _handleMenuList(
          userRole,
          item.children,
          ++menuLevel
        );
      }
      authMenus.push(theMenu);
    }
  });
  return authMenus;
}

function _handleAuthRouteList(userRole, list = [], parentRoute = '') {
  const authRoutes = [];
  for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i];
    if (!item.permission.includes(userRole)) continue;
    const parentRouteName = parentRoute || item.parentRoute || '';
    const theRoute = {
      path: item.routeUrl,
      parentRoute: parentRouteName
    };
    if (!parentRouteName) {
      notInLayout.push(item.name);
    }

    if (item?.children?.length) {
      theRoute.component = _loadView('layout/routerView');
      theRoute.meta = {
        name: item.title
      };
      theRoute.children = [
        {
          path: '',
          name: item.name,
          meta: item.meta,
          component: _loadView(item.page)
        },
        ..._handleAuthRouteList(userRole, item.children, item.name)
      ];
    } else {
      theRoute.name = item.name;
      theRoute.meta = {
        ...item.meta,
        name: item.title
      };
      theRoute.component = _loadView(item.page);
    }
    authRoutes.push(theRoute);
  }
  return authRoutes;
}

function _loadView(view) {
  // return (resolve) => require([`@/views/${view}.vue`], resolve);
  return () => import(`@/views/${view}.vue`);
}

// 获取权限对应可访问的页面路由
export function getAuthRoutes(userRole) {
  notInLayout = [];
  return {
    list: _handleAuthRouteList(userRole, allRoutes),
    notInLayout
  };
}

// 获取权限菜单
export function getAuthMenus(userRole) {
  let menuLevel = 0;
  const authMenus = _handleMenuList(userRole, allRoutes, ++menuLevel);
  return authMenus;
}

export default function (userRole) {
  const authRoutes = getAuthRoutes(userRole).list;
  const authMenus = getAuthMenus(userRole);
  return {
    authRoutes,
    authMenus
  };
}
