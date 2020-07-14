<template>
  <div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
    <Header title="The Brain" :hideToggle="!user" :hideUserDropdown="!user" />
    <Menu v-if="user" />
    <Loading v-if="validarToken" />
    <Content v-else />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/template/header";
import Menu from "@/components/template/menu";
import Content from "@/components/template/content";
import Footer from "@/components/template/footer";
import Loading from "@/components/template/loading";
import { mapState } from "vuex";
import { baseApiUrl, userKey } from "@/global";
import axios from "axios";

export default {
  name: "App",
  components: { Header, Menu, Content, Footer, Loading },
  computed: mapState(["isMenuVisible", "user"]),
  data() {
    return {
      validarToken: true
    };
  },
  methods: {
    async validacaoToken() {
      this.validarToken = true;
      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);
      this.$store.commit("setUser", null);

      if (!userData) {
        this.validarToken = false;
        this.$router.push({ name: "login" });
        return;
      }
     
   
      const res = await axios.post(`${baseApiUrl}/validateToken`, userData);
      if (res.data) {
        this.$store.commit("setUser", userData);
      } else {
        localStorage.removeItem(userKey);
        this.$router.push({ name: "login" });
      }

      this.validarToken = false;
    }
  }, created() {
      this.validacaoToken();
    }
};
</script>

<style>
* {
  font-family: "Lato", sans-serif;
}
body {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    "header header"
    "menu content"
    "menu footer";
}

#app.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}
</style>