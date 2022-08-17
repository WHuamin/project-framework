export default {
  namespaced: true,
  state: {
    token: '',
    userId: '',
    name: '',
    avatar: '',
    // roles: ['superAdministrator'],
    roles: 'superAdministrator',
    userInfo: {}
  },
  mutations: {},
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
