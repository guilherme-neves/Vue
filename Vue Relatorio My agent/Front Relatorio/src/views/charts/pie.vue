<script>
import { Pie } from "vue-chartjs";
import { barchatsService } from "../../service/util/barChart";

export default {
  extends: Pie,

  mounted() {
    this.filldata();
  },
  methods: {
    filldata() {
      let promise = this.$http.get(
        "http://localhost:8000/callTrafficByQueuePerHourDailyDetails"
      );
      promise.then(resp => {
        this.renderChart({
          labels: ["Total", "Atendida", "Abandonado"],
          datasets: [
            {
              backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
              data: barchatsService(resp.body)
            }
          ]
        });
      });
    }
  }
};
</script>
