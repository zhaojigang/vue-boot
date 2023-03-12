import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: ()=>import('@/views/login/LoginView.vue')
    },
    {
      path: '/',
      name: 'layout',
      component: () => import('@/layout/index.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/home/HomeView.vue'),
        },
        {
          path: '/bookList',
          name: 'bookList',
          component: () => import('@/views/book/BookListView.vue'),
        },
      ],
    }
  ]
})

export default router
