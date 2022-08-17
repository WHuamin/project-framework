import Layout from '@/views/layout';
export default [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    meta: { name: '首页' },
    children: [
      {
        path: '',
        name: 'home',
        meta: { name: '首页' },
        component: () => import('@/views/home/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: { name: '登录' },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/error/:id',
    name: 'error',
    component: () => import('@/views/error')
  }
];
