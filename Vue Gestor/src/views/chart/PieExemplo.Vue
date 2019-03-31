<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,

  mounted() {
    this.filldata();
  },
  methods: {
    filldata() {
      let promise = this.$http.get("http://192.168.25.56:9000/gestor/dados");
      promise.then(resp => {
        this.renderChart({
          labels: ["Entrada", "Saida", "Trans"],
          datasets: [
            {
              backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
              data: resp.data
            }
          ]
        });
      });
    }
  }
};
</script>
