import router from '@/router';
import { getAuthMenus } from '@/constant/routes/index.js';
import { FixedPages } from '@/constant/routes/routerUtils.js';
export default {
  namespaced: true,

  // mapState辅助函数, 可以快速引入store中的值
  state: {
    openPages: [...FixedPages], // 系统已打开的页面
    authMenus: [],
    activePage: { ...FixedPages[0] },
    notInLayout: []
  },
  /**
   * mutations 修改 state 中的状态
   * 通过 commit('方法名') 就可以出发 mutations 中的指定方法
   */
  mutations: {
    // 更新用户权限菜单
    updateAuthMenus(state, payload) {
      state.authMenus = getAuthMenus(payload);
    },
    // 更新已打开的页面
    updateOpenPages(state, payload) {
      const { fullPath, meta = {}, name, path } = payload;
      if (!state.notInLayout.includes(name)) {
        const thePageIndex = state.openPages.findIndex(
          (item) => item.name === name
        );
        const pageObj = {
          fullPath,
          meta,
          name,
          path
        };
        if (thePageIndex > -1) {
          state[thePageIndex] = pageObj;
        } else {
          state.openPages.push(pageObj);
        }
      }
    },
    // 更新用户当前活动的页面
    updateActivePage(state, payload) {
      if (!state.notInLayout.includes(payload)) {
        const thePage = state.openPages.find((item) => item.name === payload);
        if (thePage) {
          state.activePage = { ...thePage };
        }
      }
    },
    // 删除用户已打开的页面
    removeOpenPage(state, payload) {
      const activePageName = state.activePage?.name;
      let thePageIndex = 0;
      const newOpenPages = state.openPages.filter((item, index) => {
        const isThePage = item.name === payload;
        if (isThePage) {
          thePageIndex = index;
        }
        return !isThePage;
      });
      state.openPages = newOpenPages;
      if (activePageName === payload) {
        const activePage = newOpenPages[thePageIndex - 1];
        state.activePage = activePage;
        router.replace({ name: activePage.name });
      }
    },
    resetSystemStore(state, payload) {
      state = {
        openPages: [...FixedPages],
        authMenus: [],
        activePage: { ...FixedPages[0] }
      };
    },
    // 更新不用在主框架tab中显示的页面名称
    updateNotInLayout(state, payload) {
      state.notInLayout = payload || [];
    }
  },
  actions: {}
};
