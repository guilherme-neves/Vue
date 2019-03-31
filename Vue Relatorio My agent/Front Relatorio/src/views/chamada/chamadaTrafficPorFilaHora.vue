<template>
    <div>
        <b-row>
            <b-col sm="12" md="12">
                <b-card header="Pesquisar">
                    <b-form-group>
                        <b-input-group>
                            <b-form-group label="Data Inicio">
                                <b-form-input type="date" placeholder="Data Inicio" v-model="dataInicio" />
                            </b-form-group>
                            <b-form-group label="Data Final">
                                <b-form-input type="date" v-model="dataFim" />
                            </b-form-group>
                             <b-form-group label="Fila">
                                <b-input-group>
                                     <b-form-select id="Fila"
                                        :plain="true"
                                         v-model="fila"  >
                                        <option v-for="option in items" :key="option.queue_id" 
                                        v-bind:value="option.queue_id">
                                            {{option.queue_name}}    
                                        </option> 
                                     </b-form-select>
                                    <b-button variant="primary" @click="pesquisar">
                                        <i class="fa fa-search"></i>
                                    </b-button>
                                </b-input-group>
                            </b-form-group>
                        </b-input-group>
                    </b-form-group>
                    <c-table :caption="caption" :fields="fields" :items="lista" :edit=false :delete=false striped />
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import cTable from "./../../componentes/tables/table";
import chamadoTrafficFields from "../../service/chamado/chamadoTrafficPorFilaHora";

export default {
  components: { cTable },
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      lista: [],
      dataInicio: "",
      dataFim: "",
      fields: chamadoTrafficFields.fields,
      caption: "",
      fila: ""
    };
  },
  created() {
    this.resource = this.$resource("callTrafficByQueuePerHour");
  },
  methods: {
    pesquisar() {
      var _campos = {
        dataInicio: this.dataInicio,
        dataFim: this.dataFim,
        fila: this.fila
      };
      this.resource
        .save(_campos)
        .then(res => res.json())
        .then(res => this.lista = res);
    }
  }
};
</script>

<style>
</style>
