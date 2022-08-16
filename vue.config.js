const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

module.exports = defineConfig({
  transpileDependencies: true,

  // 设置打包文件相对路径
  publicPath: './',

  // 输出文件目录
  outputDir: 'dist',

  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',

  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,

  chainWebpack: (config) => {
    // 修复热更新失效
    config.resolve.symlinks(true);

    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@images', resolve('src/assets/images'))
      .set('@components', resolve('src/components'));

    // 压缩代码
    // config.optimization.minimize(true);

    // 分割代码
    // config.optimization.splitChunks({
    //   chunks: 'all'
    // });
  },

  // 调整 webpack 配置 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
  configureWebpack: (config) => {
    if (IS_PROD) {
      // 为生产环境修改配置...
      config.mode = 'production';
      // 利用splitChunks将每个依赖包单独打包，在生产环境下配置
      // 开启gzip压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: /\.ts$|\.html$|\.json$|\.css/,
          threshold: 10240,
          minRatio: 0.8
        })
      );
      // 开启分离js
      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                return `${packageName.replace('@', '')}`;
              }
            }
          }
        },
        minimizer: [
          new UglifyPlugin({
            uglifyOptions: {
              compress: {
                warnings: false,
                drop_console: true, // console
                drop_debugger: false,
                pure_funcs: ['console.log'] // 移除console
              }
            }
          })
        ]
      };
      // 取消webpack警告的性能提示
      config.performance = {
        hints: 'warning',
        // 入口起点的最大体积
        maxEntrypointSize: 50000000,
        // 生成文件的最大体积
        maxAssetSize: 30000000,
        // 只给出 ts 文件的性能提示
        assetFilter: function (assetFilename) {
          return assetFilename.endsWith('.ts');
        }
      };
    } else {
      // 为开发环境修改配置...
      config.mode = 'development';

      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                return `${packageName.replace('@', '')}`;
              }
            }
          }
        }
      };
    }
  },
  css: {
    // 启用 CSS modules
    // requireModuleExtension: false,
    // 是否使用css分离插件
    extract: IS_PROD,
    // 开启 CSS source maps，一般不建议开启
    // sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      scss: {
        additionalData:
          '@import "~@/assets/css/variables.scss";@import "~@/assets/css/global.scss";'
      }
    }
  },
  devServer: {
    // overlay: {
    //   // 让浏览器 overlay 同时显示警告和错误
    //   warnings: true,
    //   errors: true
    // },
    // host: 'localhost',
    port: 8090, // 端口号
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    hot: 'only', // 热更新
    // proxy: 'http://localhost:8080'  // 配置跨域处理,只有一个代理
    proxy: {
      // 配置多个跨域
      '/api': {
        target: 'http://172.11.11.11:7071',
        changeOrigin: true,
        // ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/api2': {
        target: 'http://172.12.12.12:2018',
        changeOrigin: true,
        // ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          '^/api2': '/'
        }
      }
    }
    // ,
    // before: (app) => {
    //   console.log(app);
    // }
  },
  // 第三方插件配置 https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader
  pluginOptions: {}
});
