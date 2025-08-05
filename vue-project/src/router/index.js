import { createRouter, createWebHistory } from 'vue-router'
import Holdings from '@/components/Holdings.vue'
import Home from '../components/Home.vue'
import Analyse from '@/components/Analyse.vue'
import Chat from '@/components/Chat.vue'
import Research from '@/components/Research.vue'


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
    },
    {
      path: "/analyse",
      name: "analyse",
      component: Analyse,
    },
    {
      path: "/chat",
      name: "chat",
      component: Chat
    },
    {
      path: "/research",
      name: "research",
      component: Research
    }
  ],
})

export default router
