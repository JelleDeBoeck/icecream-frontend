import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '../views/AdminView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  { path: '/login', name: 'Login', component: LoginView },
  { 
    path: '/admin', 
    name: 'Admin', 
    component: AdminView,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('adminLoggedIn') === 'true') {
        next();
      } else {
        next('/login');
      }
    }
  },
  { path: '/:pathMatch(.*)*', redirect: '/login' } // alles anders naar login
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
