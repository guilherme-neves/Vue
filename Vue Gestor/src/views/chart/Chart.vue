<template>
    <div class="animated fadeIn">
    <b-card-group columns class="card-columns cols-2">
      <b-card header="Bar Chart">
        <div class="chart-wrapper">
          <bar-chart/>
        </div>
      </b-card>   
     <b-card header="Pie Chart">
        <div class="chart-wrapper">
          <pie-exemplo  />
        </div>
      </b-card>
    </b-card-group>
    </div>  
</template>

<script>
import PieExemplo from "./PieExemplo";
import BarChart from "./BarChart";

export default {
  name: "charts",
  components: {
    PieExemplo,
    BarChart
  }
};
</script>

