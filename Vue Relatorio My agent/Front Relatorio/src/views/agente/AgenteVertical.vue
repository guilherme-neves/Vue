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
                <agente-login  :items="listaAgente" />
            </b-tab>
            <b-tab>
              <template slot="title">
                <i class="icon-basket-loaded"></i> {{tabs[1]}}
              </template>
               <agente-chamada-perdida  :items="listaAgente" />
            </b-tab>
            <b-tab>
              <template slot="title">
                <i class="icon-pie-chart"></i> {{tabs[2]}}
              </template>
                <agente-tempo-pausa  :items="listaAgente" />
            </b-tab>
             <b-tab>
              <template slot="title">
                <i class="icon-pie-chart"></i> {{tabs[3]}}
              </template>
                <agente-tempo-trabalho  :items="listaAgente" />
            </b-tab>
             <b-tab>
              <template slot="title">
                <i class="icon-pie-chart"></i> {{tabs[4]}}
              </template>
                <agente-chamada-total :items="listaAgente" />
            </b-tab>
             <b-tab>
              <template slot="title">
                <i class="icon-pie-chart"></i> {{tabs[5]}}
              </template>
                <agente-gos :items="listaAgente" />
            </b-tab>
            <b-tab>
              <template slot="title">
                <i class="icon-pie-chart"></i> {{tabs[6]}}
              </template>
                <agente-chamada-fila/>
            </b-tab>
             <b-tab>
              <template slot="title">
                <i class="icon-pie-chart"></i> {{tabs[7]}}
              </template>
                <agente-chamada-all  :items="listaAgente" />
            </b-tab>
            <b-tab>
              <template slot="title">
                <i class="icon-pie-chart"></i> {{tabs[8]}}
              </template>
                <agente-chamada-detalhada  :items="listaAgente" />
            </b-tab>
          </b-tabs>
          </b-card>
        </b-card>
      </b-col>
     </b-row> 
    </div>
</template>

<script>
import AgenteLogin from "./AgenteLogin";
import AgenteChamadaPerdida from "./AgenteChamadaPerdida";
import AgenteTempoPausa from "./AgenteTempoPausa";
import AgenteTempoTrabalho from "./AgenteTempoTrabalho";
import AgenteChamadaTotal from "./AgenteChamadaTotal";
import AgenteGos from "./AgenteGos";
import AgenteChamadaFila from "./AgenteChamadaFila";
import AgenteChamadaAll from "./AgenteChamadaAll";
import AgenteChamadaDetalhada from "./AgenteChamadaDetalhada";

export default {
  components: {
    AgenteLogin,
    AgenteChamadaPerdida,
    AgenteTempoPausa,
    AgenteTempoTrabalho,
    AgenteChamadaTotal,
    AgenteGos,
    AgenteChamadaFila,
    AgenteChamadaAll,
    AgenteChamadaDetalhada
  },
  data() {
    return {
      tabIndex: [0, 0],
      tabs: [
        "Login",
        "Chamada Perdida",
        "Tempo Pausa",
        "Tempo Trabalho",
        "Chamada Atendida",
        "Agente Gos",
        "Chamada Por Fila",
        "Chamada Total Agente",
        "Chamada Privada Agente"
      ],
      listaAgente: []
    };
  },
  created() {
    this.resource = this.$resource("agenteAll");
    this.resource
      .query()
      .then(res => res.json())
      .then(res => (this.listaAgente = res));
  }
};
</script>

<style>
</style>
