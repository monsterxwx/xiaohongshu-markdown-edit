import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/home'
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
