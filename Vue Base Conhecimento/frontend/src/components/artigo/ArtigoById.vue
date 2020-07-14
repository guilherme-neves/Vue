<template>
  <div class="article-by-id">
    <PageTitle icon="fa fa-file-o" :main="artigo.name" :sub="artigo.description" />
    <div class="artigo-content" v-html="artigo.content"></div>
  </div>
</template>

<script>
import { baseApiUrl } from "@/global";
import axios from "axios";
import PageTitle from "../template/PagerTitle";
export default {
  name: "ArticleById",
  components: { PageTitle },
  data() {
    return {
      artigo: {}
    };
  },
  mounted() {
    const url = `${baseApiUrl}/articles/${this.$route.params.id}`;
    axios.get(url).then(res => (this.artigo = res.data));
  }
};
</script>

<style>
.artigo-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 25px;
}

.artigo-content pre {
  padding: 20px;
  border-radius: 8px;
  font-size: 1.2rem;
}

.artigo-content :last-child {
  margin-bottom: 0px;
}

.artigo-content img {
  max-width: 100%;
}
</style>
