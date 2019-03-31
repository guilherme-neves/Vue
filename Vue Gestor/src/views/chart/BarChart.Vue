<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  mounted() {
      this.barChart();
  },
  methods: {
    barChart() {
      let promise = this.$http.get("http://192.168.25.56:9000/gestor/dados");
      promise.then(resp => {
        
        this.renderChart({
          labels: ["Entrada", "Saída", "Trans"],
          datasets: [
            {
              backgroundColor: ["#41B883","#f87979","#00D8FF"],
              data: resp.data
            }
          ]
        });
      });
    }
  }
};
</script>
