
<script>
import { Line } from "vue-chartjs";
import { barchatsService } from "../../service/util/barChart";
export default {
  extends: Line,
  props: {
    items: {
      type: Array,
      default: []
    },
    label: {
      type: Array,
      default: []
    }
  },
  mounted() {
    this.lineChart();
  },
  methods: {
    lineChart() {
      this.renderChart(
        {
          labels: this.label,
          datasets: [
            {
              label: "Relatorios",
              backgroundColor: ["#41B883"],
              data: this.items
            }
          ]
        },
        { responsive: true, 
        maintainAspectRatio: false,
          tooltips: {
          intersect: true,
          mode: 'index',
          position: 'nearest'
        }}
      );
    }
  }
};
</script>

<style>
</style>
