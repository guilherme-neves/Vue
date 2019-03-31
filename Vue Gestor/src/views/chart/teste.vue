<template>
   <div class="animated fadeIn">
    <b-row>
      <b-col sm="6">
        <b-card>
          <div slot="header">
            <strong>Credit Card</strong> <small>Form</small>
          </div>
           {{validacao}}
          <b-row>
            <b-col sm="4">
              <b-form-group >
                <label for="validacao">Month</label>
                <b-form-select id="validacao" v-model="validacao"
                  :plain="true"
                  :options="[{text: '1',value:true},{text: '2',value:false}]">
                </b-form-select>
              </b-form-group>
            </b-col>
           
            <b-col sm="4">
              <b-form-group>
                <label for="year1">Year</label>
                <b-form-select id="year1"
                  :plain="true"
                  :options="[2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025]" :disabled="!validacao" >
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group>
                <label for="cvv">CVV/CVC</label>
                <b-form-input type="text" id="cvv" placeholder="123" :disabled="validacao" ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
   </div>   
</template>

<script>
export default {

    data(){
        return{
            validacao: true
        }
    }

}
</script>

<style>

</style>
