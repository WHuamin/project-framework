import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate'; // 解决页面刷新会丢失数据这一现象
import getters from './getters.js';
import user from './modules/user';
import system from './modules/system';

const store = new Vuex.Store({
  strict: true,
  modules: {
    system,
    user
  },
  getters,
  plugins: [
    // 配置 createPersistedState
    // createPersistedState({
    //   // 存储方式：localStorage、sessionStorage、cookies
    //   storage: window.cookies, // 存储到cookie
    //   // storage:window.sessionStorage 存储到sessionStorage
    //   // 如果不写默认存储到localStorage
    //   // 存储的 key 的key值
    //   key: 'assets_store',
    //   render(state) {
    //     console.log(state);
    //     // 要存储的数据：本项目采用es6扩展运算符的方式存储了state中所有的数据
    //     return { ...state };
    //     // 需要存储其中的某些数据的话需要单独取出来
    //     // return {
    //     // 只储存state中的assessmentData
    //     // assessmentData: val.assessmentData
    //   }
    // })
  ]
});

export default store;
