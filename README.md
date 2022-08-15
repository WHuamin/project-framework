# assets-platform

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 配置说明
```
vue 脚手架构建项目
```
```
1. .editorconfig // 字符集配置，缩进等配置
  不同的开发人员，不同的编辑器，有不同的编码风格，而EditorConfig就是用来协同团队开发人员之间的代码的风格及样式规范化的一个工具，而.editorconfig正是它的默认配置文件。

  在vsCode编辑器安装插件：EditorConfig for VS Code
2. .eslintrc.js

3.文件保存自动将‘单引号’改为“双引号”，自动给末尾添加逗号，自动给每一项 结尾添加逗号，导致eslint报警告，只需要一步解决：尤其‘末尾禁止添加逗号’
在项目根目录新建.prettierrc 文件，添加对象：
{
  "semi": false, // 去掉结尾的分号
  "singleQuote": true, // 单引号替代双引号
  "trailingComma": "none"// 末尾禁止添加逗号
}
```