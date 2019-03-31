<template>
 <div> 
    <b-row>
            <b-col sm="12" md="12" lg="12">
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


       <b-col xs='12' lg='8' > 
         <bar v-if="loaded" :items="lista"  />
       </b-col>   

 </div>  
</template>

<script>
import bar from "../charts/bar";
import { barchatsService } from "../../service/util/barChart";

export default {
  components: {
    bar
  },
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      lista: [],
      loaded: false,
      dataInicio: "",
      dataFim: "",
      fila: ""
    };
  },
  created() {
    this.resource = this.$resource("callTrafficByQueuePerHourDailyDetails");
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
          this.lista = barchatsService(res);
          this.loaded = true;
        });
    }
  }
};
</script>

<style>
</style>
