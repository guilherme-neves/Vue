import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ArtigoByCategoria from '@/components/artigo/ArtigoByCategoria'
import ArtigoById from '@/components/artigo/ArtigoById'
import Login from '@/components/login/Login'

Vue.use(VueRouter)

const routes = [{
        name: 'home',
        path: '/',
        component: Home
    }, {
        name: 'adminPages',
        path: '/admin',
        component: AdminPages
    }, {
        name: 'artigosByCategoria',
        path: '/categorias/:id/artigos',
        component: ArtigoByCategoria
    }, {
        name: 'artigoById',
        path: '/artigos/:id',
        component: ArtigoById
    }, {
        name: 'login',
        path: '/login',
        component: Login
    }

]

export default new VueRouter({
    mode: 'history',
    routes
})