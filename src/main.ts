import { createApp } from 'vue'
import './assets/style.scss'
import router from './router/index'
import {createPinia} from 'pinia'
import App from './App.vue'
import Paginate from 'vuejs-paginate-next'


createApp(App).use(router).use(createPinia()).use(Paginate).mount('#app')
