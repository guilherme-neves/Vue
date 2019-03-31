<template>
 <div class="animated fadeIn">
    <b-row>
         <b-col xs="12" lg="12">
        <b-card>
          <div slot="header">
            Tabs vertical
          </div>
          <b-card no-body>
          <b-tabs card pills vertical nav-wrapper-class="w-40" v-model="tabIndex[1]">
            <b-tab active>
              <template slot="title">
                <i class="icon-calculator"></i> {{tabs[0]}}
              </template>
                <abandono  :items="listaAgente" />
            </b-tab>
             <b-tab active>
              <template slot="title">
                <i class="icon-calculator"></i> {{tabs[1]}}
              </template>
                <abandono-detalhado :items="listaAgente" />
            </b-tab>
              <b-tab active>
              <template slot="title">
                <i class="icon-calculator"></i> {{tabs[2]}}
              </template>
                <abandono-estatistico :items="listaAgente" />
            </b-tab>
             <b-tab active>
              <template slot="title">
                <i class="icon-calculator"></i> {{tabs[3]}}
              </template>
                <abandono-porhora-fila :items="listaAgente" />
            </b-tab>
             <b-tab active>
              <template slot="title">
                <i class="icon-calculator"></i> {{tabs[4]}}
              </template>
                <abandono-por-fila-detalhado :items="listaAgente" />
            </b-tab>
          </b-tabs>
          </b-card>
        </b-card>
      </b-col>
     </b-row> 
    </div>
</template>

<script>
import Abandono from "./Abandonos";
import AbandonoDetalhado from "./AbandonoDetalhado";
import AbandonoEstatistico from "./AbandonoEstatistica";
import AbandonoPorhoraFila from './AbandonoPorhoraFila';
import AbandonoPorFilaDetalhado from './AbandonoDetalhadoPorFila';

export default {
  components: {
    Abandono,
    AbandonoDetalhado,
    AbandonoEstatistico,
    AbandonoPorhoraFila,
    AbandonoPorFilaDetalhado
  },
  data() {
    return {
      tabIndex: [0, 0],
      tabs: ["Abandono Por Hora", "Abandono Detalhado", "Abandono Estatistico", "Abandono Por Fila/Hora","Abandono Detalhado Por Fila"],
      listaAgente: []
    };
  },
  created() {}
};
</script>

<style>
</style>
