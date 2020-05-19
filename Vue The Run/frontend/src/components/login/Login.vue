<template>
  <div class="logon-container">
    <section class="form">
      <img src="@/assets/Logonew.svg" alt="be The Hero" />

      <h1>Faça seu logon</h1>
      <b-form-input class="texto" placeholder="Sua ID" v-model="login.id" />
      <button class="button ajuste" @click="loginValidacao">Entrar</button>
      <router-link to="/registrar">
        <i class="fa fa-home" /> Nao Tem cadastro
      </router-link>
    </section>
    <img class="fundo" src="@/assets/fundonew.jpg" alt="Heroes" />
  </div>
</template>

<script>

import axios from "axios";
import { baseApiUrl} from "@/global";

export default {
  data() {
    return {
      login: {}
    };
  },
  methods: {
    async loginValidacao() {
      const url = `${baseApiUrl}/login`;
      await axios
        .post(url, this.login)
        .then(resp => {
          // eslint-disable-next-line no-console
             console.log(resp)
              localStorage.setItem('pessoaId',this.login.id)
              localStorage.setItem('pessoaName', resp.data.name)
          this.$router.push({ path: "/corrida" });
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err.response.data);
          alert(err.response.data.msg)
        //  showError(err);
        });
    }
  }
};
</script>


<style>
.logon-container {
  width: 100%;
  max-width: 1150px;
  height: 90vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logon-container section.form {
  width: 100%;
  max-width: 350px;
  margin-right: 30px;
}

.logon-container section.form form {
  margin-top: 100px;
}

.logon-container section.form form h1 {
  font-size: 32px;
  margin-bottom: 32px;
}

.texto{
  border:  1px solid #dcdce6;
    padding:  0 24px;
} 

.ajuste  {
  margin-top: 8px;
}

.fundo{
   width: 650px;
}
</style>
