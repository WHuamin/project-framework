import { doLogin } from '@api/auth';
export default {
  namespaced: true,
  state: {
    token: '',
    avatar: '',
    // roles: ['superAdministrator'],
    roles: 'superAdministrator',
    userInfo: {}
  },
  mutations: {
    // 更新token
    updateToken(state, payload) {
      state.token = payload;
    },
    updateUserInfo(state, payload) {
      state.userInfo = payload;
    },
    resetUserStore(state, payload) {
      state = {
        token: '',
        avatar: '',
        // roles: ['superAdministrator'],
        roles: 'superAdministrator',
        userInfo: {}
      };
    }
  },
  actions: {
    //  登录
    async doLogin({ commit }, payload) {
      await doLogin(payload)
        .then((res) => {
          console.log(res);
          const { accessToken, menu, user } = res;
          const userRole = 'superAdministrator';
          commit('updateToken', accessToken);
          commit('updateUserInfo', user);
          commit('system/updateAuthMenus', userRole, { root: true });
          return Promise.resolve();
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    doLogout({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit('updateToken', '');
        commit('updateUserInfo', {});
        /**
         * commit dispatch
         * 调用，总共三个参数，每个都必须写，
         * 第一个就是mutation/action名，
         * 第二个是需要传递的参数，
         * 第三个代表的是非本模块内的mutations/action
         */
        commit('system/resetSystemStore', {}, { root: true });
        resolve();
      });
    }
  }
};
