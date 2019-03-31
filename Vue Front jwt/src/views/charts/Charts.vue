<template>
     <div>  
       <p>teste</p>
       <b-card header="Bar Chart">
        <div class="chart-wrapper">
          <bar-example/>
        </div>
      </b-card>
       <b-card header="Line Chart">
        <div class="chart-wrapper">
          <line-example/>
        </div>
      </b-card>
       <b-card header="Doughnut Chart">
        <div class="chart-wrapper">
          <doughnut-example/>
        </div>
      </b-card>
     </div> 
</template>

<script>
import BarExample from "./BarExample";
import LineExample from "./LineExample";
import DoughnutExample from "./DoughnutExample";
export default {
  name: "charts",
  components: {
    BarExample,
    LineExample,
    DoughnutExample
  }
};
</script>

