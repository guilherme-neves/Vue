<template>
   <div>
     

        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header">Pesquisar</div>
                    <div class="card-body">
                        <b-form-group>
                            <b-input-group>
                                <b-form-group label="Data Inicio">
                                    <b-form-input type="date" placeholder="Data Inicio" v-model="dataInicio" />
                                </b-form-group>
                                <b-form-group label="Data Final">
                                    <b-form-input type="date" v-model="dataFim" />
                                </b-form-group>
                                <b-form-group label="Agente">
                                    <b-input-group>
                                        <b-form-input type="text" placeholder="Agente" v-model="agente" />
                                        <b-button variant="primary" @click="pesquisar">
                                            <i class="fa fa-search"></i>
                                        </b-button>
                                    </b-input-group>
                                </b-form-group>
                            </b-input-group>
                        </b-form-group>
                        <c-table :fields="fields" :items="lista" :edit=false :delete=false striped />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cTable from "./../../componentes/tables/table";
import AgenteFields from "../../service/agente/AgenteLoginFields";

export default {
  components: { cTable },
  data() {
    return {
      lista: [],
      dataInicio: "",
      dataFim: "",
      agente: "",
      fields: AgenteFields.fields
    };
  },
  created() {},
  methods: {
    pesquisar() {
      var _campos = {
        dataInicio: this.dataInicio,
        dataFim: this.dataFim,
        agente: this.agente
      };
      let promise = this.$http.post(
        `http://localhost:8000/agentLogin`,
        _campos
      );
      promise.then(resp => {
        this.lista = resp.data;
      });
    }
  }
};
</script>

<style>
</style>
