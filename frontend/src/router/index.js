import { createRouter, createWebHistory } from 'vue-router'
import HomepageView from '../views/HomepageView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomepageView,
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SigninView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue'),
    },
  ],
})
router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('access_token')
  const isLogin = accessToken && accessToken !== 'undefined'
  const requiredLogin = !(to.path === '/signin' || to.path === '/signup')
  if (!isLogin) {
    if (requiredLogin) {
      return next('/signin')
    }
    return next()
  } else {
    if (requiredLogin) {
      return next()
    }
    return next('/')
  }
})
export default router
