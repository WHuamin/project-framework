import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store/index.js';
import { getAuthRoutes } from '@/constant/routes/index';
import { NoLoginPages } from '@/constant/routes/routerUtils';
import staticRoutes from '@/constant/routes/staticRoutes';

let isF = false; // 这个是用于判断动态路由是否已经被获取

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: staticRoutes
});

router.beforeEach(async (to, from, next) => {
  if (!store.getters.token) {
    isF = false;
    if (to.name === 'login') {
      next();
    } else {
      next({ name: 'login' });
    }
  } else {
    // const { meta, ...theQuery } = to.query;
    // if (meta) {
    //   const changeRouteMeta = JSON.parse(meta);
    //   console.log(changeRouteMeta);
    //   to.meta = {
    //     ...to.meta,
    //     ...changeRouteMeta
    //   };
    //   to.query = theQuery;
    // }

    if (isF) {
      updatePages(to);
      if (to.name === 'login') {
        next({ path: '/' });
      } else {
        next();
      }
    } else {
      const { list = [], notInLayout = [] } = await getAuthRoutes(
        'superAdministrator'
      );
      // 将新生成的路由替换原路由
      list.forEach((item) => {
        /**
         * 添加动态路由 addRoute
         * 1.有children时， children对象的path 开头不能加 /
         * 2. 有children时，父级一定要加上component
         */
        if (item.parentRoute) {
          router.addRoute(item.parentRoute, item);
        } else {
          router.addRoute(item);
        }
      });

      // 获取当前默认路由
      const currenRoutes = router.options.routes;
      // 将404添加进去
      // 现在才添加的原因是：作为一级路由，当刷新，动态路由还未加载，路由就已经做了匹配，找不到就跳到了404
      if (currenRoutes[currenRoutes.length - 1].path !== '/:catchAll(.*)') {
        currenRoutes.push({
          path: '/:pathMatch(.*)',
          redirect: '/error/404'
        });
      }

      // 更改控制生成路由次数的值
      isF = true;

      store.commit('system/updateNotInLayout', notInLayout);
      updatePages(to);
      // 跳转
      // 确保addRoute()时动态添加的路由已经被完全加载上去，不然刷新页面可能会导致空白
      next({ ...to, replace: true });
      // 当然在这一步也可以是去判断一下to.matched是否含有数据，如果没有再触发一次beforeEach
      // if(to.matched.length == 0){
      //     router.push(to.path)
      // }else {next()}
    }
  }
});
router.afterEach((to) => {
  if (!isNoLoginPages(to.name)) {
    store.commit('system/updateActivePage', to.name);
  }
});

function isNoLoginPages(pageName) {
  if (!pageName) {
    return true;
  } else {
    return NoLoginPages.includes(pageName);
  }
}
function updatePages(to) {
  if (!isNoLoginPages(to.name)) {
    store.commit('system/updateOpenPages', { ...to });
  }
}
export default router;
