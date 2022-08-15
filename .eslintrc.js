/**
 *
 * 规则说明见 https://cn.eslint.org/docs/rules/
 * 规则值
 * "off" 或 0 - 关闭规则
 * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
 * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
 *
 * 配置：取消组件名称校验；强制使用单引号；强制不使用分号结尾
 */
module.exports = {
  // 用来告诉eslint找当前配置文件不能往父级查找
  root: true,

  // 预定义的全局变量，这里是浏览器环境
  env: {
    node: true,
    es6: true,
    commonjs: true,
    browser: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser' // 解析器，默认使用 Espree
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: ['warn', 'single'], // 引号类型 `` '' ''  强制使用单引号
    semi: ['error', 'always'], // 语句强制分号结尾
    'semi-spacing': ['off', { before: false, after: true }], // 分号前后空格
    'arrow-parens': 'off', // 箭头函数用小括号括起来
    'generator-star-spacing': 'off', // 生成器函数*的前后空格
    'space-before-function-paren': ['off', 'always'], // 函数定义时括号前面要不要有空格
    'eol-last': 'off', // 文件以单一的换行符结束
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: false
      }
    ], // 首选const
    'guard-for-in': 'off' // for in循环要用if语句过滤
    // 'vue/multi-word-component-names': 0, // 取消组件名称校验
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
};
