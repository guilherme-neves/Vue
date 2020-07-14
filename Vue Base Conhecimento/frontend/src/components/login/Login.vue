<template>
  <div class="login-content">
    <Loading v-if="loading" />
    <div v-else class="login-modal">
      <img src="@/assets/logo2.png" width="200" alt="Logo" />
      <hr />
      <!-- <div class="login-titulo">Login</div> -->

      <input v-model="user.email" type="text" placeholder="E-mail" />
      <input v-model="user.password" type="password" placeholder="Senha" />
      <button @click="signin">Entrar</button>
    </div>
  </div>
</template>


<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";
import Loading from "@/components/template/loading";

export default {
  name: "Login",
  components: { Loading },
  data() {
    return {
      showSignup: false,
      user: {},
      loading: false
    };
  },
  methods: {
    signin() {
      this.loading = true;
      axios
        .post(`${baseApiUrl}/signin`, this.user)
        .then(res => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.loading = false;
          this.$router.push({ path: "/" });
        })
        .catch(err => {
           this.loading =  false
           showError(err)
        });
    }
  }
};
</script>

<style>
.login-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-modal {
  background-color: #fff;
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-titulo {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.login-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
  outline: none;
}

.login-modal button {
  align-self: flex-end;
  background-color: #2460ae;
  color: #fff;
  padding: 5px 15px;
}

.login-modal a {
  margin-top: 35px;
}

.login-modal hr {
  border: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}
</style>