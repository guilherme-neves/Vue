import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

//Agente
const Agente = () => import('@/views/agente/Agente')
const AgenteVertical = () => import('@/views/agente/AgenteVertical')

//Abandono
const Abandono = () => import('@/views/abandono/abandono')

//Chamada
const Chamadas = () => import('@/views/chamada/chamada')


Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'users',
          meta: { label: 'Users' },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Users,
            },
            {
              path: ':id',
              meta: { label: 'User Details' },
              name: 'User',
              component: User,
            },
          ]
        },
        {
          path: 'Agente',
          redirect: '/Agente/Agentes',
          name: 'Agente',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'Agentes',
              name: 'Agentes',
              component: Agente
            },
            {
              path: 'Agentes1',
              name: 'Agentes1',
              component: AgenteVertical
            }
          ]
        }, {
          path: 'Abandono',
          redirect: '/Abandono/Abandonos',
          name: 'Abandono',
          component: {
            render(c) { return c('router-view') }
          }, children: [
            {
              path: 'Abandonos',
              name: 'Abandonos',
              component: Abandono
            }
          ]
        }, {
          path: 'chamada',
          redirect: '/Chamada/Chamadas',
          component: {
            render(c) { return c('router-view') }
          }, children: [{
            path: 'Chamadas',
            name: 'Chamadas',
            component: Chamadas
          }

          ]
        }
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        }
      ]
    }
  ]
})
