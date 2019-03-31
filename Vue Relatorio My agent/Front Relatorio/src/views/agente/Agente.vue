<template>
     <div class="animated fadeIn">
    <b-row>
      <b-col xs="12" lg="12">
        <b-card>
          <div slot="header">
            Relatorio Agente
          </div>
          <b-tabs>
            <b-tab title="Login Agente" active>
               <agente-login/>
            </b-tab>
            <b-tab title="Chamada Perdida Agente" >
               <agente-chamada-perdida />
            </b-tab>
            <b-tab title="Tempo de Pausa">
                <agente-tempo-pausa />
            </b-tab>
            <b-tab title="Tempo de Trabalho">
                <agente-tempo-trabalho />
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row> 
     </div> 
</template>

<script>
import AgenteLogin from "./AgenteLogin";
import AgenteChamadaPerdida from "./AgenteChamadaPerdida";
import AgenteTempoPausa from './AgenteTempoPausa'
import AgenteTempoTrabalho from './AgenteTempoTrabalho'

export default {
  components: { AgenteLogin, AgenteChamadaPerdida,AgenteTempoPausa,AgenteTempoTrabalho }
};
</script>

<style>
</style>
