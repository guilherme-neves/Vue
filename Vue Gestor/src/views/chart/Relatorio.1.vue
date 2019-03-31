<template>
   <div>
    <form> 
       <label for="titulo">Buscar</label>
       <input id="titulo" v-model="buscar" />
        <div class='float-right'>
            <b-button type='button' variant='primary' @click="pesquisar">Buscar</b-button>
        </div>
    </form>
   </div>
    
</template>

<script>
export default {
  data() {
    return {
      buscar: ""
    };
  },
  methods: {
    pesquisar() {
      console.log(this.buscar);
    }
  }
};
</script>

