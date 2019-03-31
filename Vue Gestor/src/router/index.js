import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'
import Painel from '@/views/painel/Painel'
import RamalList from '@/views/ramal/RamalList'
import RamalForm from '@/views/ramal/RamalForm'
import TroncoForm from '@/views/tronco/TroncoForm'
import TroncoList from '@/views/tronco/TroncoList'
import Chart from '@/views/chart/Chart'
import Relatorio from '@/views/chart/Relatorio'
import Contato from '@/views/contato/Contato'
import ContatoForm from '@/views/contato/ContatoForm'
import Teste from '@/views/chart/teste'



Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
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
        }, {
          path: 'Lista',
          redirect: '/lista/painel',
          name: 'Lista',
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
          path: 'Cadastro',
          redirect: '/cadastro/ramal',
          name: 'Cadastro',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'tronco',
              name: 'TroncoList',
              component: TroncoList
            },
            {
              path: 'tronco/:id',
              name: 'TroncoForm',
              component: TroncoForm
            }, {
              path: 'ramal',
              name: 'RamalList',
              titulo: 'Lista',
              component: RamalList
            }, {
              path: 'ramal/:id',
              name: 'RamalForm',
              titulo: 'Formulario',
              component: RamalForm
            },
            {
              path: 'contato',
              name: 'Contato',
              titulo:'Contato',
              component: Contato
            },{
              path: 'contato/:id',
              name: 'ContatoForm',
              titulo:'Formulario',
              component: ContatoForm
            }

          ]


        },
        {
          path: 'Relatorio',
          redirect: '/relatorio/chart',
          name: 'Relatorio',
          component: {
            render(c) { return c('router-view') }
          }, children: [
            {
              path: 'chart',
              name: 'Chart',
              component: Chart
            },
            {
              path: 'relatorios',
              name: 'relatorios',
              component: Relatorio
            },
            {
              path: 'teste',
              name: 'teste',
              component: Teste
            }
          ]
        }
      ]
    }
  ]
})
