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
                   
                </b-card>
            </b-col>
        </b-row>
        <b-col xs='12' lg='12' > 
           <line-chats v-if="loaded" :items="lista" :label="listaLabel" />
       </b-col>
    </div>
</template>

<script>
import LineChats from "../charts/line";
import {
  linechatsServiceCount,
  linechatsServiceLabel
} from "../../service/util/lineChart";

export default {
  components: { LineChats },
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      lista: [],
      listaLabel: [],
      dataInicio: "",
      dataFim: "",
      caption: "",
      fila: "",
      loaded: false
    };
  },
  created() {
    this.resource = this.$resource("callTrafficByQueuePerHour");
  },
  methods: {
    pesquisar() {
      this.loaded = false;
      var _campos = {
        dataInicio: this.dataInicio,
        dataFim: this.dataFim,
        fila: this.fila
      };
      this.resource
        .save(_campos)
        .then(res => res.json())
        .then(res => {
          this.lista = linechatsServiceCount(res);
          this.listaLabel = linechatsServiceLabel(res);
          this.loaded = true;
        });
    }
  }
};
</script>

<style>
</style>
