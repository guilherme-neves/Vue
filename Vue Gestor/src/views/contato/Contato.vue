<template>
    <div>
         <router-link :to='{name: "ContatoForm", params:{id:0}}'>
         <b-button type="button" variant="success" >
             Novo
         </b-button>  
         </router-link> 
         <c-table :fields="fields"  :items="items" :edit=true  striped :urlEdit='{ name: "ContatoForm" }' />
    </div>
</template>

<script>
import cTable from "../../components/shared/table/Table.vue";
export default {
    components: { cTable },
    data(){
        return{
            items: [],
             fields: [
        { key: "id_contato", label: "id" },
        { key: "nome", label: "Descrição" },
        {key: "empresa"},
        {key:"telefone"},
        {key:"celular"}
      ]
        }
    },
  created() {
    let promise = this.$http.get("http://192.168.25.56:9000/api/contato");
    promise.then(resp => (this.items = resp.data));
  }
 
}
</script>

<style>

</style>
