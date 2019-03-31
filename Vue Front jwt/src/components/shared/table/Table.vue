<template>
  <div>
    <b-card :header="caption">
        <b-table 
          :hover="hover" 
          :striped="striped" 
          :bordered="bordered" 
          :small="small" 
          :fixed="fixed" 
          responsive="sm" 
          :items="items" 
          :fields="fields" 
          :current-page="currentPage" 
          :per-page="perPage">


            <template slot="editar" slot-scope="item">
              <b-btn size="sm" variant="default" :class="classButtonEdit" @click="onEdit(item.item)">Editar</b-btn>
            </template>

            <template slot="acao" slot-scope="item">
              <b-btn size="sm" variant="primary" :class="classButtonRemove" @click="onRemove(item.item)">Remover</b-btn>
            </template>

        </b-table>
        <nav>
          <b-pagination 
            :total-rows="getRowCount(items)" 
            :per-page="perPage" 
            v-model="currentPage" 
            prev-text="Anterior" 
            next-text="Próximo" 
            hide-goto-end-buttons/>
        </nav>
      </b-card>
       <c-modal-confirm text='Confirma a remoção?' :modalShow='modalShow' @onClickButtonModal='onClickButtonModal' />
  </div>   
</template>
<script>
import cModalConfirm from "../ModalConfirm";
export default {
  name: "c-table",
  components: { cModalConfirm },
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
    },
    fields: {
      type: Array,
      default: []
    },
    items: {
      type: Array,
      default: []
    },
    edit: {
      type: Boolean,
      default: false
    },
    delete: {
      type: Boolean,
      default: false
    },
    urlEdit: {
      type: Object
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
    },
    onEdit(item) {
      this.$router.push({ name: this.urlEdit.name, params: item });
    },
    onRemove(item) {
      this.itemSelected = item;
      this.modalShow = !this.modalShow;
    },

    onClickButtonModal(confirm) {
      if (confirm === "S") {
        this.$emit("onRemove", this.itemSelected);
      }
      this.modalShow = false;
    }
  },
  data() {
    return {
      currentPage: 1,
      perPage: 20,
      totalRows: 0,
      classButtonEdit: "",
      modalShow: false
    };
  },
  created() {
    this.classButtonEdit = this.edit ? "" : "d-none";
    this.classButtonRemove = this.delete ? "" : "d-none";

    if (this.edit) {
      this.fields.push({ key: "editar" });
    }
    if (this.delete || this.inactive) {
      this.fields.push({ key: "acao" });
    }
  }
};
</script>
