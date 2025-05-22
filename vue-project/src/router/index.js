import { createRouter, createWebHistory } from 'vue-router'
import Holdings from '@/components/Holdings.vue'
import Home from '../components/Home.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/holdings',
      name: 'holdings',
      component: Holdings,
    },
    {
      path: '/success',
      name: 'success',
      component: Holdings,
    }
  ],
})

export default router
