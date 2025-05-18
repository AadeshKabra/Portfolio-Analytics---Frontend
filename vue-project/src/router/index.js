import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/Home.vue'
import Holdings from '@/components/Holdings.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/holdings',
      name: 'holdings',
      component: Holdings,
    },
  ],
})

export default router
