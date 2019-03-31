
<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  mounted() {
    this.barChart()
  },
  methods: {
    barChart() {
       this.renderChart({
        labels: ["Total", "Atendida", "Abandonada"],
        datasets: [
          {
            label: "Relatorios",
            backgroundColor: ["#41B883", "#f87979", "#00D8FF"],
            data: this.items
          }
        ]
      },{responsive: true, maintainAspectRatio: false});
    }
  }
};
</script>

<style>
</style>
