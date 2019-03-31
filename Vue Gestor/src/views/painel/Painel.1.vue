<template>
      <div class="animated fadeIn">
        
    <p class="text-info">Painel </p>
    <b-card :header="caption">
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="lista" :fields="fields" :current-page="currentPage" :per-page="perPage">
      <template slot="status" slot-scope="data">
        <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
      </template>
    </b-table>
    <nav>
      <b-pagination :total-rows="getRowCount(lista)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
  </b-card>
  </div>
</template>

<script>
export default {


  data() {
    return {
      lista: [],
      fields: [
        { key: "id" },
        { key: "data_inicio" },
        { key: "ramal" },
        { key: "numero" },
        { key: "duracao" },
        { key: "tipo" },
        { key: "tronco" },
        { key: "ddr" }
      ],
      currentPage: 1,
      perPage: 20,
      totalRows: 0
    };
  },
  created() {
    let promise = this.$http.get("http://localhost:9000/gestor/lista");
    promise.then(resp => (this.lista = resp.data));
  },
  props: {
    caption: {
      type: String,
      default: "Table"
    },
    hover: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getBadge(status) {
      return status === "Active"
        ? "success"
        : status === "Inactive"
          ? "secondary"
          : status === "Pending"
            ? "warning"
            : status === "Banned" ? "danger" : "primary";
    },
    getRowCount(items) {
      return items.length;
    }
  }
};
</script>
