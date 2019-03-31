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
                            <b-form-group label="Agente">
                                <b-input-group>
                                    <b-button variant="primary" @click="pesquisar">
                                        <i class="fa fa-search"></i>
                                    </b-button>
                                    <download-excel
                                           :data="lista"
                                           :fields="fieldsExcel"
                                             class="btn btn-default"
                                            name="filename.xls">
                                                <i class="fa fa-download"></i>
                                     </download-excel>
                                     <b-button @click="exportPdf">pdf</b-button>
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
import chamadoTrafficFields from "../../service/chamado/chamadoTrafficPorAgenteTotal";
import JsonExcel from "vue-json-excel";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default {
  components: {
    cTable,
    downloadExcel: JsonExcel
  },
  data() {
    return {
      lista: [],
      dataInicio: "",
      dataFim: "",
      fieldsExcel: chamadoTrafficFields.json_fields,
      fields: chamadoTrafficFields.fields,
      caption: ""
    };
  },
  created() {
    this.resource = this.$resource("callTrafficAllAgentsPerHours");
  },
  methods: {
    pesquisar() {
      var _campos = {
        dataInicio: this.dataInicio,
        dataFim: this.dataFim
      };
      this.resource
        .save(_campos)
        .then(res => res.json())
        .then(res => this.lista = res);
    },
    exportPdf() {
      var doc = new jsPDF("p", "pt");
      let columns = [
        { title: "Nome", dataKey: "user_firstname" },
        { title: "Login", dataKey: "user_login" },
        { title: "Total", dataKey: "All Calls" },
        { title: "Fila", dataKey: "CC calls" },
        { title: "Fora Fila", dataKey: "NOT CC calls" },
        { title: "Saida", dataKey: "Outgoing Calls" },
        { title: "Entrada", dataKey: "Incoming Calls" },
        { title: "Duração", dataKey: "TimeInSeconds" }
      ];
      console.log(this.lista);
      doc.autoTable(columns, this.lista);
      doc.text("Relatorio", 20, 20);
      doc.save("relatorio.pdf");
    }
  }
};
</script>

<style>
</style>
