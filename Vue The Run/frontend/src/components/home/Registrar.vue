<template>
  <div class="register-container">
    <div class="content">
      <section>
        <img src="@/assets/Logonew.svg" alt="Be The Hero" />
        <h1>Cadastro</h1>
        <p>Faça seu cadastro, entre na plataforma</p>

        <router-link to="/login">
          <i class="fa fa-arrow-left" /> 
          
          Voltar
        </router-link>
      </section>
      <div class="formulario">
        <b-form-input placeholder="Nome " v-model="registro.name" />
        <b-form-input placeholder="E-mail " v-model="registro.email" />
        <b-form-input placeholder="Whtas " v-model="registro.whatsapp" />
        <div class="input-group">
          <b-form-input placeholder="Cidade " v-model="registro.city" />
          <b-form-input placeholder="UF" class="uf" v-model="registro.uf" />
        </div>
        <button class="button ajuste" @click="SalvarNovaPessoa">Salvar</button>
      </div> 
    </div>
  </div>
</template>


<script>
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { baseApiUrl, showError } from "@/global";
export default {
  data() {
    return {
      registro: {}
    };
  },

  methods: {
    async SalvarNovaPessoa() {
      // eslint-disable-next-line no-console
      const url = `${baseApiUrl}/pessoas`;

      await axios
        .post(url, this.registro)
        .then(res => {
           this.$toasted.global.defaultSuccess();
           alert("ID do Usuario: " + res.data)
          this.$router.push({ path: "/login" });
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
         // showError(err);
        });
    }
  }
};
</script>

<style>
.register-container {
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.register-container .content {
  width: 100%;
  padding: 96px;
  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.register-container .content section {
  width: 100%;
  max-width: 380px;
}

.register-container .content section h1 {
  margin: 64px 0 32px;
  font-size: 32px;
}

.register-container .content section p {
  font-size: 18px;
  color: #737380;
  line-height: 32px;
}

.register-container .content .formulario {
  width: 100%;
  max-width: 450px;
}

.register-container .content .formulario input {
  margin-top: 8px;
}

.register-container .content .formulario .input-group {
  display: flex;
}

.register-container .content .formulario .input-group input + input {
  margin-left: 8px;
}

.ajuste  {
  margin-top: 8px;
}

.uf {
  width: 80px;
}
</style>