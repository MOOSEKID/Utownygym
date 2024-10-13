<template>
  <div class="checkin-logs">
    <apexcharts
      height="215px"
      type="area"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import { useChartsStore } from "src/stores/charts";
import { onMounted, ref } from "vue";
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "CheckinLogs",
  components: {
    apexcharts: VueApexCharts,
  },
  setup() {
    const charts = useChartsStore();
    const chartOptions = ref({});

    const series = ref([]);

    const updateChart = (args) => {
      charts
        .checkIn(args)
        .then((data) => {
          chartOptions.value = {
            chart: {
              id: "checkin-logs",
              type: "area",
              height: "215px",
              toolbar: {
                show: false,
              },
            },
            stroke: {
              curve: "smooth",
            },
            xaxis: {
              categories: Object.keys(data),
            },
            dataLabels: {
              enabled: false,
            },
            responsive: [
              {
                breakpoint: 1460,
                options: {
                  chart: {
                    height: "238px",
                  },
                },
              },
              {
                breakpoint: 780,
                options: {
                  chart: {
                    height: "250px",
                  },
                },
              },
            ],
          };

          series.value = [
            {
              name: "Check-ins",
              data: Object.values(data),
            },
          ];
        })
        .catch((err) => {
          console.error(err);
        });
    };

    onMounted(() => {
      updateChart();
    });

    return {
      chartOptions,
      series,
      updateChart,
    };
  },
};
</script>
