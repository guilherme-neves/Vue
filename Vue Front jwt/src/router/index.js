import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'
import Basic from '@/containers/Basic';

// Views
import Dashboard from '@/views/Dashboard'
import Painel from '@/views/painel/Painel'
import Login from '@/views/Login'
import Chart from '@/views/charts/Charts'
import ClienteLista from '@/views/cliente/Cliente'
import ClienteForm from '@/views/cliente/ClienteForm'
import ProdutoLista from '@/views/produto/Produto'
import ProdutoForm from '@/views/produto/ProdutoForm'
import TransportadoraLista from '@/views/transportadora/Transportadora'
import TransportadoraForm from '@/views/transportadora/TransportadoraForm'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/login',
      name: 'First',
      component: Basic,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        }

      ]
    },
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },{
          path: '/',
          redirect: '/painel',
          name: 'Painell',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'painel',
              name: 'Painel',
              component: Painel
            }
    
          ]
        }, {
          path: '/',
          redirect: '/Chart',
          name: 'Chart',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'chart',
              name: 'chart',
              component: Chart
            }
    
          ]
        },{
          //Cadastro basicos
          path: 'Cadastro',
          redirect: '/cadastro/clientes',
          name: 'Cadastro',
          component: {
            render(c) { return c('router-view') }
          },
           children: [
              {
                path: 'clientes',
                name: 'clientes',
                component: ClienteLista
              },{
                path: 'clientes/:id',
                name: 'clienteForm',
                component: ClienteForm
              },
              {
                path: 'produtos',
                name: 'produtos',
                component: ProdutoLista
              },{
                path: 'produtos/:id',
                name: 'produtoForm',
                component: ProdutoForm
              },{
                path: 'transportadoras',
                name: 'transportadoras',
                component: TransportadoraLista
              },{
                path: 'transportadoras/:id',
                name: 'transportadoraForm',
                component: TransportadoraForm
              }
           ]  

        } 
        //Fim Cadastro
      ]
    }
  ]
})
