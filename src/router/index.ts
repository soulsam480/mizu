import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'threads',
      component: () => import('@/views/Threads.vue'),
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: () => import('@/views/Index.vue'),
    // },
  ],
});

export default router;
