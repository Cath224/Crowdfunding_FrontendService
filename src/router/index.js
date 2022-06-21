import { createRouter, createWebHistory } from 'vue-router'
import { TokenFactory } from '@/plugins/token'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/LoginPageView.vue')
  },
  {
    path: '/projects/:id',
    name: 'project',
    props: true,
    component: () => import('../views/ProjectPageView.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchPageView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/AccountPageView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
  if (to.name === from.name) {
    return true
  }
  if (to.name === 'auth') {
    return true
  }
  if (TokenFactory.get()) {
    return true
  }
  return { name: 'auth' }
})

export default router
