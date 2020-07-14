<template>
  <div class="artigo-by-categoria">
    <PageTitle icon="fa fa-folder-o" :main="categoria.name" sub="Categoria" />
     <ul>
         <li v-for="artigo in artigos" :key="artigo.id">
              <ArtigoItem :artigo="artigo" />
         </li>
     </ul>
  </div>
</template>

<script>
import ArtigoItem from './ArtigoItem'
import { baseApiUrl } from "@/global";
import axios from "axios";
import PageTitle from "../template/PagerTitle";
export default {
  name: "ArtigoCategoria",
  components: { PageTitle, ArtigoItem },
  data() {
    return {
      categoria: {},
      artigos: [],
      page: 1,
      loadMore: true
    };
  },
  methods: {
    getCategoria() {
      const url = `${baseApiUrl}/categories/${this.categoria.id}`;
      axios(url).then(res => {
             this.categoria = res.data
           });
    },
    getArtigos(){
        const url = `${baseApiUrl}/categories/${this.categoria.id}/articles?page=${this.page}`
        axios(url).then(res => {
            this.artigos = this.artigos.concat(res.data)
            this.page++

            if(res.data.length === 0) this.loadMore = false
        })
    }
  },
  watch:{
    $route(to){
          this.categoria.id = to.params.id
          this.artigos= []
          this.page = 1
          this.loadMore = true

          this.getCategoria()
          this.getArtigos()
    }
           
  },
  mounted() {
    this.categoria.id = this.$route.params.id;
    this.getCategoria();
    this.getArtigos();
  }
};
</script>

<style>
   
.artigo-by-categoria ul{
   list-style-type: none;
   padding: 0px; 
}

.artigo-by-categoria .load-more{
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>