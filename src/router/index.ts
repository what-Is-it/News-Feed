import {createRouter, createWebHistory} from 'vue-router'
import NewsPage from '../pages/NewsPage.vue'

const routes = [
    {
        path: '/',
        name: 'NewsPage',
        component: NewsPage,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
