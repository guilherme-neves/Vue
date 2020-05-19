import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '@/components/home/Home'
import Login from '@/components/login/Login'
import Corrida from '@/components/home/Corrida'
import CorridaNova from '@/components/home/CorridaNova'
import Registrar from '@/components/home/Registrar'

Vue.use(VueRouter)

const routes = [{
        name: 'home',
        path: '/',
        component: Login
    }, {
        name: 'login',
        path: '/login',
        component: Login
    },{
        path: '/corrida',
        name: 'Corrida',
        component: Corrida
      }, 
      {
        path: '/corridanova',
        name: 'CorridaNova',
        component: CorridaNova
      }, 
      {
        path: '/registrar',
        name: 'Registrar',
        component: Registrar
      }

]

export default new VueRouter({
    mode: 'history',
    routes
})