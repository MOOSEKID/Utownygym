<template>
  <div class="retention-rate">
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
  name: "RetentionRate",
  components: {
    apexcharts: VueApexCharts,
  },
  setup() {
    const charts = useChartsStore();
    const chartOptions = ref({});

    const series = ref([]);

    const updateChart = (args) => {
      charts
        .retentionRate(args)
        .then((data) => {
          chartOptions.value = {
            chart: {
              id: "retention-rate",
              type: "area",
              height: "215px",
              toolbar: {
                show: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "smooth",
            },
            xaxis: {
              categories: Object.keys(data),
            },
            yaxis: {
              labels: {
                formatter: (value) => {
                  return Number(value).toFixed(2) + "%";
                },
              },
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
              name: "Retention Rate",
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
