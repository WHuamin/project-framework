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

```
vue 脚手架构建项目
```

## 代码规范配置说明

### 1. .editorconfig

```
.editorconfig // 字符集配置，缩进等配置
  不同的开发人员，不同的编辑器，有不同的编码风格，而EditorConfig就是用来协同团队开发人员之间的代码的风格及样式规范化的一个工具，而.editorconfig正是它的默认配置文件。

  在vsCode编辑器安装插件：EditorConfig for VS Code
```

### 2. .eslintrc.js

```
1. 在 package.json 文件中的 script 中添加 lint 命令
   {
   "scripts": {
   // eslint . 为指定 lint 当前项目中的文件
   // --ext 为指定 lint 哪些后缀的文件
   // --fix 开启自动修复
   "lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --fix"
   }
   }
2. npm run lint

3. 文件保存自动将‘单引号’改为“双引号”，自动给末尾添加逗号，自动给每一项 结尾添加逗号，导致eslint报警告，只需要一步解决：尤其‘末尾禁止添加逗号’
在项目根目录新建.prettierrc 文件，添加对象：
{
  "semi": false, // 去掉结尾的分号
  "singleQuote": true, // 单引号替代双引号
  "trailingComma": "none"// 末尾禁止添加逗号
}

在 package.json 中的 script 中添加以下命令,运行该命令，会将我们项目中的文件都格式化一遍.
  {
    "scripts": {
      "format": "prettier --write ./**/*.{html,vue,ts,js,json,md}",
    }
  }
```


### 3. husky
```
husky 是一个用来管理 git hook 的工具，git hook 即在我们使用 git 提交代码的过程中会触发的钩子。

1. npm add husky -D
2. 在 package.json 中的 script 中添加一条脚本命令
   {
   "scripts": {
   "prepare": "husky install"
   },
   } 
3.执行 npm run prepare,根目录下产生.husky 目录
   使用 husky 命令添加 pre-commit 钩子，运行
   npx husky add .husky/pre-commit "npm run lint && npm run format"（没反应，因为系统是 window，不支持）

   因此，添加一个文件 pre-commit 在.husky 文件夹下, 执行下面命令
   npx husky add .husky/pre-commit
   打开 pre-commit 文件
   npm run lint && npm run format
```

## GIT 配置说明

### 分支 dev-vue3-js

```
本分支主要负责 vue3 + js 搭建的项目基础框架的开发
```

### 分支 dev-vue3-ts

```
本分支主要负责 vue3 + ts 搭建的项目基础框架的开发
```
