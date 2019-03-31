<template>
 <div> 
  
   <download-excel
    :data="lista"
    :fields="json_fields"
    name="filename.xls">
    <i class="fa fa-download"></i>
   </download-excel>
   <b-button @click="exportPdf">Export pdf</b-button>
  
 </div>  
</template>

<script>
import pie from "../charts/pie";
import JsonExcel from "vue-json-excel";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default {
  components: {
    pie,
    downloadExcel: JsonExcel
  },
  data() {
    return {
      json_fields: {
        Nome: "user_firstname",
        Sobre: "user_surname",
        extensão: "user_extension",
        login: "user_login",
        department_name: "Departamento",
        "Total falado": "Total Talk Time",
        Total: "NumberOfCalls"
      },
      json_data: [
        {
          name: "Tony Peña",
          city: "New York",
          country: "United States",
          birthdate: "1978-03-15",
          phone: {
            mobile: "1-541-754-3010",
            landline: "(541) 754-3010"
          }
        },
        {
          name: "Thessaloniki",
          city: "Athens",
          country: "Greece",
          birthdate: "1987-11-23",
          phone: {
            mobile: "+1 855 275 5071",
            landline: "(2741) 2621-244"
          }
        }
      ],
      lista: []
    };
  },
  created() {
    let promise = this.$http.get("http://localhost:8000/agentPrivateCall");
    promise.then(resp => {
      this.lista = resp.body;
    });
  },
  methods: {
    exportPdf() {
      var doc = new jsPDF("p", "pt");
      let columns = [
        { title: "Nome", dataKey: "user_firstname" },
        { title: "SobreNome", dataKey: "user_surname" },
        { title: "Extensão", dataKey: "user_extension" },
        { title: "Login", dataKey: "user_login" },
        { title: "Total Talk", dataKey: "Total Talk Time" },
        { title: "Total", dataKey: "NumberOfCalls" }
      ];
      let rows = [
        { id: 1, name: "Shaw", country: "Tanzania" },
        { id: 2, name: "Nelson", country: "Kazakhstan" },
        { id: 3, name: "Garcia", country: "Madagascar" }
      ];

      doc.autoTable(columns, this.lista);
      doc.text("Relatorio", 20, 20);
      doc.save("relatorio.pdf");
    }
  }
};
</script>

<style>
</style>
