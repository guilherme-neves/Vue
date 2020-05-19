<template>
  <div class="corrida-container">
    <header>
      <img src="@/assets/Logonew.svg" alt="be The Hero" />
      <span>Bem Vindo, {{this.pessoa.name}}</span>
      <div class="botao">
        <button class="button" @click="carregarNovaCorrida">Nova Corrida</button>
        <button type="submit" color="#E02041" @click="logout">
          <i class="fa fa-power-off" />
        </button>
      </div>
    </header>
    <h1>Corridas cadastradas</h1>
    <ul>
      <li v-for="p in pessoas" :key="p.id">
        <strong>Local:</strong>
        <p>{{p.local}}</p>
        <strong>Data:</strong>
        <p>{{p.data}}</p>
        <strong>Descrição</strong>
        <p>{{p.descricao}}</p>
        <strong>Tempo:</strong>
        <p>{{p.tempo}}</p>

        <button type="button" @click="deletar(p)">
          <i class="fa fa-user-times" />
        </button>
      </li>
    </ul>
  </div>
</template>



<script>
import axios from "axios";
import { baseApiUrl } from "@/global";
export default {
  data() {
    return {
      pessoa: {},
      pessoas: []
      //pessoa_id: "Guilherme"
    };
  },
  created() {
    this.caregarLista();
  },
  methods: {
    carregarNovaCorrida() {
      this.$router.push({ path: "/corridanova" });
    },
    async caregarLista() {
      this.pessoa.name = localStorage.getItem("pessoaName");
      this.pessoa.id = localStorage.getItem("pessoaId");

      //cabeçalho do post
      let config = {
        headers: {
          Authorization: this.pessoa.id
        }
      };

      const url = `${baseApiUrl}/corridas`;

      await axios
        .get(url, config)
        .then(res => {
          this.pessoas = res.data;
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err.response.data);
        });
    },
    logout() {
      localStorage.clear();
      this.$router.push({ path: "/Login" });
    },
    async deletar(e) {
      let config = {
        headers: {
          Authorization: this.pessoa.id
        }
      };
      // eslint-disable-next-line no-console
      console.log(e);

      const url = `${baseApiUrl}/corridas/${e.id}`;

      await axios
        .delete(url, config)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.caregarLista();
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


<style >
.corrida-container {
  width: 100%;
  max-width: 1180px;
  padding: 0 30px;
  margin: 32px auto;
 
}

.corrida-container header {
  display: flex;
  align-items: center;
}

.corrida-container header span {
  font-size: 20px;
  margin-left: 24px;
}

.corrida-container header img {
  height: 64px;
}

.corrida-container header .botao {
  width: 260px;
  margin-left: auto;
  margin-top: 0;
}

.corrida-container header button {
  height: 60px;
  width: 120px;
  border-radius: 4px;
  border: 1px solid #dcdce6;
  margin-left: 16px;
  transition: border-color 0.2s;
}

.corrida-container header button:nth-last-child(1) {
  width: 60px;
}

.corrida-container header button:hover {
  border-color: #999;
}

.corrida-container h1 {
  margin-top: 80px;
  margin-bottom: 24px;
}

.corrida-container ul {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;
  list-style: none;
  
}

.corrida-container ul li {
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  position: relative;
   box-shadow: 0 0 100px rgba(0, 0, 0, 0.3);
}

.corrida-container ul li button {
  position: absolute;
  right: 24px;
  top: 24px;
  border: 0;
}

.corrida-container ul li button:hover {
  opacity: 0.8;
}

.corrida-container ul li strong {
  display: block;
  margin-bottom: 16px;
  color: #41414d;
}

.corrida-container ul li p + strong {
  margin-top: 32px;
}

.corrida-container ul li p {
  color: #737380;
  line-height: 21px;
  font-size: 16px;
}
</style>