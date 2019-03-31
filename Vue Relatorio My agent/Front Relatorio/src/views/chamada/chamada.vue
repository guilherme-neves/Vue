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
           
           <b-col xs='6' lg='6' > 
            <b-tab active>
              <template slot="title">
                <i class="icon-calculator"></i> {{tabs[1]}}
              </template>
                <chamadas />
            </b-tab>
           </b-col>
          
            <b-tab active>
              <template slot="title">
                <i class="icon-calculator"></i> {{tabs[1]}}
              </template>
                <chamadas2 :items="listaFila" />
            </b-tab>

              <b-tab active>
              <template slot="title">
                <i class="icon-calculator"></i> {{tabs[2]}}
              </template>
                <chamada-traffic-por-agente :items="listaAgente" />
            </b-tab>

               <b-tab active>
              <template slot="title">
                <i class="icon-calculator"></i> {{tabs[3]}}
              </template>
                <chamada-traffci-por-agente-total  />
            </b-tab>
              <b-tab active>
              <template slot="title">
                <i class="icon-calculator"></i> {{tabs[3]}}
              </template>
                <chamada-traffic-fila  />
            </b-tab>
              <b-tab active>
              <template slot="title">
                <i class="icon-calculator"></i> {{tabs[4]}}
              </template>
                <chamada-trafego-fila-hora :items="listaFila"  />
            </b-tab>
             <b-tab active>
              <template slot="title">
                <i class="icon-calculator"></i> {{tabs[4]}}
              </template>
                <chamada-trafego-fila-hora-line :items="listaFila"  />
            </b-tab>
            <b-tab active>
              <template slot="title">
                <i class="icon-calculator"></i> {{tabs[5]}}
              </template>
                <chamada-trafego-por-agente-detalhado :items="listaAgente"  />
            </b-tab>

           </b-tabs>
          </b-card>
        </b-card>
      </b-col>
     </b-row> 
    </div>
</template>

<script>
import Chamadas from "./chamadas";
import Chamadas2 from "./chamadas2";
import ChamadaTrafficPorAgente from "./chamadaTrafficPorAgente";
import ChamadaTraffciPorAgenteTotal from "./chamadaTrafficPorAgenteTotal";
import ChamadaTrafficFila from "./chamadaTrafficFila";
import ChamadaTrafegoFilaHora from "./chamadaTrafficPorFilaHora";
import ChamadaTrafegoFilaHoraLine from "./chamadaTrafficPorFilaHora2";
import ChamadaTrafegoPorAgenteDetalhado from "./chamaTrafegoPorAgenteDetalhado";

export default {
  components: {
    Chamadas,
    Chamadas2,
    ChamadaTrafficPorAgente,
    ChamadaTraffciPorAgenteTotal,
    ChamadaTrafficFila,
    ChamadaTrafegoFilaHora,
    ChamadaTrafegoFilaHoraLine,
    ChamadaTrafegoPorAgenteDetalhado
  },
  data() {
    return {
      tabIndex: [0, 0],
      tabs: [
        "Chamadas",
        "Chamadas 2",
        "Trafego por agente",
        "Trafego Agentes",
        "Trafego Fila Hora",
        "Trafego Fila Hora 2",
        "Trafego por agente Detalhado"
      ],
      listaAgente: [],
      listaFila: []
    };
  },
  created() {
      this.resource2 = this.$resource('agenteFilas')
      this.resource2
        .query()
        .then(res => res.json())
        .then(res => this.listaFila =  res ) 

      this.resource = this.$resource('agenteAll')
      this.resource
        .query()
        .then(res => res.json())
        .then(res => this.listaAgente =  res )

  }
};
</script>

<style>
</style>
