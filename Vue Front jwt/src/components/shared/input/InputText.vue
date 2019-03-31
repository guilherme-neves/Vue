<template>
    <b-col :lg=lg :md=md :sm=sm  >
       <b-form-group> 
            <label>{{label}}</label>
            <label>{{inputVal}}</label>
             <input 
                v-model = "inputVal"
                :disabled= disabled
                :type= type
                :placeholder = placeholder
               
                :id= 'fieldname'
                :name= 'fieldname'
                :maxLength= maxLength
                /> 
        </b-form-group> 
    </b-col>    
</template>

<script>
export default {
   name: 'inputText',
   props:{
       label:{
           type: String
       },
       disabled:{

       },
       placeholder:{
           type:String,
           default: ''
       },
       lg:{
           type:String,
           default:'12'
       },
       md:{
           type:String,
           default:'12'
       },
       sm:{
           type:String,
           default: '12'
       },
       fieldname:{
           type:String,
           default:''
       },
       type:{
           type:String,
           default:''
       },
       value:{
       },
       maxLength:{
           type:String,
           default: '50'
       }
   },
   data(){
       return{
            inputVal: this.value 
       }
   },

   methods: {
       onChange(value){
           this.$emit('onChange', {fieldname:this.fieldname, value:value})
       }
   }


}
</script>

<style>
</style>
