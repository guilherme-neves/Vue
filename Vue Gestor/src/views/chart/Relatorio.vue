<template>
   <div>
   <b-row>
      <b-col md="4"> 
      <b-form-group>
              <b-input-group>
                <!-- Attach Left button -->
                <b-input-group-prepend>
                  <b-button variant="primary"  @click="pesquisar" >
                    <i class="fa fa-search"></i> Search
                  </b-button>
                </b-input-group-prepend>
                <b-form-input type="text" placeholder="Username" v-model="buscar" size="sm"  ></b-form-input>
              </b-input-group>
      </b-form-group>  
      </b-col>    
      <b-col md="2"> 
          <b-form-group>
                <b-form-select id="selectOption" v-model="selectOption"
                    :plain="true"
                    :options="['Ramal','Telefone']"
                    value="selectOption"
                    >
                  </b-form-select>
          </b-form-group>
      </b-col> 
   </b-row>   
    <br/>
    <div class="animated fadeIn">
         <minha-table :fields="fields" :items="lista" caption="<i class='fa fa-users'></i> Resultados"
             :striped="true"  :hover="true" :bordered="false" />
     </div>

   </div>
    
</template>

<script>
import cTable from "./../../components/shared/table/Table.vue";
export default {
  components: { "minha-table": cTable },
  data() {
    return {
      buscar: "",
      selectOption: "Ramal",
      lista: [],
      fields: [
        { key: "id" },
        { key: "data_inicio", label: "Data" },
        { key: "ramal" },
        { key: "numero" },
        { key: "duracao" },
        { key: "tipo" },
        { key: "tronco" },
        { key: "ddr", label: "DDR" }
      ]
    };
  },
  methods: {
    pesquisar() {
      let promise = this.$http.get(
        `http://192.168.25.56:9000/gestor/ramal/${this.buscar}/${this.selectOption}`
      );
      promise.then(resp => {
        this.lista = resp.data;
      });
    }
  }
};
</script>

