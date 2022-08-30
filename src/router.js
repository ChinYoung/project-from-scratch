import { createWebHashHistory, createRouter } from 'vue-router'

const loginComponent = () => import('./components/Login.vue')
const homeComponent = () => import('./components/Home.vue')

const routes = [
  { path: '/', component: loginComponent },
  { path: '/login', component: loginComponent },
  { path: '/home', component: homeComponent },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// router.beforeEach((to, from, next) => {
//   if (to.path !== '/login' && !window.sessionStorage.getItem('token')) {
//     next({ path: '/login' })
//   }
//   next()
// })

export default router
