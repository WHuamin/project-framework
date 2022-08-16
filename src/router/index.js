import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/views/layout';

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/home/index.vue')
      }
    ]
  },
  {
    path: '/error/:id',
    name: 'error',
    component: () => import('../views/error')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
