<template>
  <div class="user-categoria">
    <Loading v-if="loading" />
    <form v-else>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Categoria" label-for="categoria-name">
            <b-form-input
              id="categoria-name"
              type="text"
              v-model="categoria.name"
              required
              placeholder="Informe o Nome da Categoria"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Categoria Pai" label-for="categoria-parentId">
            <b-form-select
              id="category-parentId"
              :options="categorias"
              v-model="categoria.parentId"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-button variant="primary" v-if="modo === 'save'" @click="salvar">Salvar</b-button>
      <b-button variant="danger" v-if="modo === 'remove'" @click="remove">Excluir</b-button>
      <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </form>
    <br />
    <b-table hover striped :items="categorias" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="info" @click="loadCategoria(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadCategoria(data.item, 'remove')" class="mr-2">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import Loading from "@/components/template/loading";

export default {
  name: "CategpryAdmin",
  components: { Loading },
  data() {
    return {
      modo: "save",
      categoria: {},
      categorias: [],
      loading: false,
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "path", label: "Caminho", sortable: true },
        { key: "actions", label: "Ação" }
      ]
    };
  },
  methods: {
    carregarLista() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then(res => {
        this.categorias = res.data.map(categoria => {
          return { ...categoria, value: categoria.id, text: categoria.path };
        });
      });
    },
    salvar() {
      this.loading = true
      const method = this.categoria.id ? "put" : "post";
      const id = this.categoria.id ? `/${this.categoria.id}` : "";
      axios[method](`${baseApiUrl}/categories${id}`, this.categoria)
        .then(() => {
          this.reset();
          this.$toasted.global.defaultSuccess();
          this.loading = false
        })
        .catch(err => {
          this.loading =false
          showError(err)
        } );
    },
    remove() {
      this.loading = true
      const id = this.categoria.id;
      axios
        .delete(`${baseApiUrl}/categories/${id}`)
        .then(() => {
          this.reset();
          this.$toasted.global.defaultSuccess();
          this.loading = false
        })
        .catch(err => {
         this.loading = false
         showError(err)
        } );
    },
    loadCategoria(categoria, modo = "save") {
      this.modo = modo;
      this.categoria = { ...categoria };
    },
    reset() {
      this.modo = "save";
      this.categoria = {};
      this.carregarLista();
    }
  },
  mounted() {
    this.carregarLista();
  }
};
</script>