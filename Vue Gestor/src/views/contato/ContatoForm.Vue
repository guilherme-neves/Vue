<template>
     <div class="animated fadeIn">
        <b-row> 
          <b-col sm="12">
        <b-card>
          <div slot="header">
            <strong>Company</strong> <small>Form</small>
          </div>
          <b-form-group>
            <label for="nome">Contato</label>
            <b-form-input type="text" id="nome" v-model="contato.nome" placeholder="Enter your name"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label for="empresa">Empresa</label>
            <b-form-input type="text" id="empresa" v-model="contato.empresa"  placeholder="Enter your empresa"></b-form-input>
          </b-form-group>
           <b-row>
            <b-col sm="4">
              <b-form-group>
                <label for="telefone">Telefone</label>
                <b-form-input type="text" id="telefone" v-model="contato.telefone" placeholder="Enter your telephone"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label for="celular">Celular</label>
                <b-form-input type="text" id="celular" v-model="contato.celular" placeholder="Enter your celphone"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    
    </b-row>
      <hr/>
     
       <div class='float-left'>
			<router-link :to='{ name: "Contato" }'>
				<b-button class='btn btn-openid text' type='button' variant='secondary' ><span>Voltar</span></b-button>
			</router-link>
		</div>

       <div class='float-right'>
            <b-button type='button' variant='primary' @click="gravar">Salvar</b-button>
        </div>
    </div>
</template>

<script>
import Contato from "../../model/contato/contato";
export default {
  data() {
    return {
      contato: new Contato()
    }
  },
  methods :{
      gravar(){
           this.$http
        .post("http://localhost:9000/api/contato", this.contato)
        .then(() => (this.contato = new Contato, err => console.log(err)));
      }
  }, created() {
     // console.log(this.$route)
    this.contato = this.$route.params;
  }
};
</script>

<style>
</style>
