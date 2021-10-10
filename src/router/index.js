import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
const routes = [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
        meta: {
          private: true,
        },
      }
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/Login.vue'),
    meta: {
      private: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/Register.vue'),
    meta: {
      private: false,
    },
  },
  { 
    path: '/:pathMatch(.*)*',
    name: 'NotFound', 
    redirect: {name: 'Login'},
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
