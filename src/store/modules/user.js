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
    }
  },
  actions: {
    //  登录
    doLogin({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const roles = 'superAdministrator';
        commit('system/updateAuthMenus', roles, { root: true });
        resolve();
      });
    }
  }
};
