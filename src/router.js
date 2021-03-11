import { createRouter, createWebHistory } from 'vue-router';
import Bingo from './pages/bingo/Bingo.vue'
import Mikeisms from './pages/mikeisms/Mikeisms'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/bingo' },
        { path: '/bingo', component: Bingo },
        { path: '/mikeisms', component: Mikeisms },
        { path: '/:notFound(.*)', redirect: '/bingo' }
    ]
})

export default router
