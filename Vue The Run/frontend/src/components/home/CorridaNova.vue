<template>
  <div class="new-corrida">
    <div class="content">
      <section>
        <img src="@/assets/Logonew.svg" alt="Be The Hero" />
        <h1>Cadastro</h1>
        <p>Faça seu cadastro da corrida</p>
        <router-link to="/corrida">
          <i class="fa fa-arrow-left" /> Voltar
        </router-link>
      </section>
      <div class="formulario">
        <b-form-input class="ajuste" placeholder="Local" v-model="corridanew.local" />
        <b-form-textarea class="ajuste" placeholder="Descrição" v-model="corridanew.descricao" />
        <div class="input-group">
          <b-form-input class="ajuste" placeholder="dd/mm/yyyy" v-model="corridanew.data" />
          <b-form-input class="ajuste" placeholder="tempo" v-model="corridanew.tempo" />
        </div>
        <button class="button ajuste" @click="salvarCorrida">Salvar</button>
      </div>
    </div>
  </div>
</template>



<script>
import axios from "axios";
import { baseApiUrl } from "@/global";
export default {
  data() {
    return {
      corridanew: {},
      pessoa: {}
    };
  },
  created() {
    this.pessoa.name = localStorage.getItem("pessoaName");
    this.pessoa.id = localStorage.getItem("pessoaId");
  },

  methods: {
    async salvarCorrida() {
      // eslint-disable-next-line no-console
      const id = this.pessoa.id;
      //cabeçalho do post
      let config = {
        headers: {
          Authorization: id
        }
      };

      const url = `${baseApiUrl}/corridas`;

      await axios
        .post(url, this.corridanew, config)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          // eslint-disable-next-line no-console
          this.$router.push({ path: "/corrida" });
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err.response.data);
          // showError(err);
        });
    }
  }
};
</script>


<style>
.new-corrida {
  width: 100%;
  max-width: 1120px;
  display: flex;
  align-items: center;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
}

.new-corrida .content {
  width: 100%;
  padding: 96px;
  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.new-corrida .content section {
  width: 100%;
  max-width: 380px;
}

.new-corrida .content section h1 {
  margin: 64px 0 32px;
  font-size: 32px;
}

.new-corrida .content section p {
  font-size: 18px;
  color: #737380;
  line-height: 32px;
}

.new-corrida .content .formulario {
  width: 100%;
  max-width: 450px;
}

.new-corrida .content .formulario .ajuste  {
  margin-top: 8px;
}

.input-group {
  display: flex;
}
</style>