import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPersist)
app.use(pinia)
app.use(router)
app.use(VueApexCharts)
app.component('ApexChart', VueApexCharts)

app.mount('#app')
