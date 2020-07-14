<template>
  <div class="admin-artigo">
    <Loading  v-if="loading" />
    <form v-else>
      <input id="artigo-id" type="hidden" v-model="artigo.id" />
      <b-row>
        <b-col md="6" sm="6">
          <b-form-group label="Nome:" label-for="artigo-name">
            <b-form-input
              id="artigo-name"
              type="text"
              v-model="artigo.name"
              required
              placeholder="Informe o Nome do Artigo"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="6">
          <b-form-group label="Descrição:" label-for="artigo-descricao">
            <b-form-input
              id="artigo-descricao"
              type="text"
              v-model="artigo.description"
              required
              placeholder="Informe a descrição"
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="4">
          <b-form-group label="imagem (URL):" label-for="artigo-imagemUrl">
            <b-form-input
              id="artigo-imagemUrl"
              type="text"
              v-model="artigo.imageUrl"
              required
              placeholder="Informe a URL da Imagem"
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="4">
          <b-form-group label="Categoria" label-for="artigo-categoriaId">
            <b-form-select
              id="artigo-categoriaId"
              :options="categorias"
              v-model="artigo.categoryId"
            />
          </b-form-group>
        </b-col>
        <b-col md="4" sm="4">
          <b-form-group label="Autor" label-for="artigo-userId">
            <b-form-select id="artigo-userId" :options="usuarios" v-model="artigo.userId" />
          </b-form-group>
        </b-col>
        <b-col md="12" sm="12">
          <b-form-group label="Code:" label-for="artigo-content">
            <VueEditor v-model="artigo.content" placeholder="Informe o Conteúdo do Artigo" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-button variant="primary" v-if="modo === 'save'" @click="salvar">Salvar</b-button>
      <b-button variant="danger" v-if="modo === 'remove'" @click="remove">Excluir</b-button>
      <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </form>
    <br />
    <b-table hover striped :items="artigos" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="info" @click="carregarArtigo(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="carregarArtigo(data.item, 'remove')" class="mr-2">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
    <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import Loading from "@/components/template/loading";
export default {
  name: "ArticleAdmin",
  components: { VueEditor, Loading },
  data() {
    return {
      modo: "save",
      loading: false,
      artigo: {},
      artigos: [],
      categorias: [],
      usuarios: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "id", label: "ID", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "description", label: "Descrição", sortable: true },
        { key: "actions", label: "Ação" }
      ]
    };
  },
  methods: {
    carregarArtigos() {
      const url = `${baseApiUrl}/articles?page=${this.page}`;
      axios.get(url).then(res => {
        this.artigos = res.data.data;
        this.limit = res.data.limit;
        this.count = res.data.count;
      });
    },
    carregarUsuarios() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then(res => {
        this.usuarios = res.data.map(user => {
          return { value: user.id, text: `${user.name} - ${user.email}` };
        });
      });
    },
    carregarCategorias() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then(res => {
        this.categorias = res.data.map(categoria => {
          return { value: categoria.id, text: categoria.path };
        });
      });
    },
    reset() {
      this.modo = "save";
      this.artigo = {}
      this.carregarArtigos();
    },
    salvar() {
      this.loading = true
      const method = this.artigo.id ? "put" : "post";
      const id = this.artigo.id ? `/${this.artigo.id}` : "";
      // eslint-disable-next-line
      axios[method](`${baseApiUrl}/articles${id}`, this.artigo)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
          this.loading = false
        })
        .catch(showError);
    },
    remove() {
      this.loading = true
      const id = this.artigo.id;
      axios
        .delete(`${baseApiUrl}/articles/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
          this.loading = false
        })
        .catch(err => {
          this.loading = false
         showError(err)
        });
    },
    carregarArtigo(artigo, modo = "save") {
      this.modo = modo;
      // this.artigo = { ...artigo };
      axios
        .get(`${baseApiUrl}/articles/${artigo.id}`)
        .then(res => this.artigo = res.data);
    }
  },
  watch: {
        page(){
           this.carregarArtigos()
        }
  },
  mounted() {
    this.carregarUsuarios();
    this.carregarCategorias();
    this.carregarArtigos();
  }
};
</script>