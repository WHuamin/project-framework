## 在URL中props的传参
```
第一种写法：props值为对象，该对象中所有的key-value的组合，最终都会通过props传给Wea组件
  props: {id:123456}

第二种写法：props值为布尔值 true，则把路由收到的所有params参数通过props传过去
  {
    path: '/login',
    name: 'login',
    meta: { name: '登录' },
    props: true,
    component: () => import('@/views/login/index.vue')
  },
  页面用props接收参数

第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传过去
  {
    path: '/wea/:id',
    name: 'Wea',
    component: Wea,
    props:function(route){
      console.log(route);
      return {
        id:route.params.id,    //params 指的是 / 中的参数
        liangzai:route.query.liangzai   // query 指的是 ? 后的参数
      }
    },
  }, 
或写成
    props(route){
      return {
        id:route.params.id, 
        liangzai:route.query.liangzai
      }
    },
```