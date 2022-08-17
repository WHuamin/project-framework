# Vuex 状态管理器

## 应用场景
1.多个视图依赖于同一状态
2.来自不同视图的行为需要改变同一个状态

## 组成
State：数据仓库（数据状态来源）
Getter：用来获取数据的
Mutation：用来修改数据的（同步数据）
Action：用来提交Mutation（异步操作）

modules：模块化

### 跨模块处理数据

commit('moduleB/mutiationFn',{}, {root: true})
dispatch('moduleB/actionFn',{}, {root: true}
第一个参数是模块/方法名，第二个参数是传入值，第三个参数则是设置是否是从根开始查找该方法。
模块都设置了命名空间 namespaced 为 true
如果没有设置root: true, 则会从调用方法的模块moduleA上，调用 moduleA/moduleB/actionFn
