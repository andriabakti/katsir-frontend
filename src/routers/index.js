import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import Landing from '../views/Landing/Landing.vue'
import Login from '../views/Auth/Login/Login.vue'
import Register from '../views/Auth/Register/Register.vue'
import Home from '../views/Main/Home/Home.vue'
// import History from '../views/Main/History/History.vue'
import store from '../store/index'

Vue.use(Router)
Vue.use(Meta)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    meta: { requiresVisitor: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresVisitor: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresVisitor: true }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  // {
  //   path: '/history',
  //   name: 'History',
  //   component: History,
  //   meta: { requiresAuth: true }
  // }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    if (store.getters.isLogin) {
      next({
        path: '/home'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
