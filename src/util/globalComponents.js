// 注册全局组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

/**
 * require.context() 是webpack提供的一个自动导入的API
 * 参数1：加载的文件目录
 * 参数2：是否加载子目录
 * 参数3：正则，匹配文件
 */
const importComponent = require.context(
  // 其组件目录的相对路径
  '../components',
  // 是否查询其子目录
  true,
  // 匹配basic-开头的.vue文件
  /index\.vue$/
);

export default {
  install(app) {
    // 注册 ElementPlus icon
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
    // 遍历获取到的文件名，依次进行全局注册
    importComponent.keys().forEach((key) => {
      // 导入组件
      const component = importComponent(key).default;
      // 注册组件
      app.component(component.name, component);
    });
  }
};
