<template>

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
                                        <option v-for="option in listaFila" :key="option.queue_id" 
                                        v-bind:value="option.queue_id">
                                            {{option.queue_name}}    
                                        </option> 
                                     </b-form-select>
                                    <b-button variant="primary" @click="pesquisar">
                                        <i class="fa fa-search"></i>
                                    </b-button>
                                     <b-button @click="exportPdf">pdf</b-button>
                                </b-input-group>
                            </b-form-group>
                        </b-input-group>
                    </b-form-group>
                    <c-table :caption="caption" :fields="fields" :items="lista" :edit=false :delete=false striped />
                </b-card>
            </b-col>
        </b-row>
    
</template>

<script>
import cTable from "./../../componentes/tables/table";
import AgenteFields from "../../service/agente/AgenteChamadoTotalFields";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default {
  components: { cTable },
  data() {
    return {
      lista: [],
      dataInicio: "",
      dataFim: "",
      fila: "",
      fields: AgenteFields.fields,
      caption: "",
      listaFila: []
    };
  },
  created() {
    this.resource = this.$resource("agentCallQueueSpecific");
    this.resource2 = this.$resource("agenteFilas");
    this.resource2
      .query()
      .then(res => res.json())
      .then(res => (this.listaFila = res));
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
        .then(res => {
          this.lista = res;
        });
    },
    exportPdf() {
      var doc = new jsPDF("p", "pt");
      let columns = [
        { title: "Name", dataKey: "User_name" },
        { title: "Login", dataKey: "User_login" },
        { title: "Total", dataKey: "NumberOfCalls" },
        { title: "Duração", dataKey: "Total_talk_time" }
      ];
      doc.autoTable(columns, this.lista);
      doc.text("Fila " + this.fila, 20, 20);
      doc.save("relatorio.pdf");
    }
  }
};
</script>

<style>
</style>
