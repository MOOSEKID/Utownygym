<template>
  <div class="revenue-trends">
    <apexcharts
      height="215px"
      type="area"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import core from "src/services/core";
import { useChartsStore } from "src/stores/charts";
import { onMounted, ref } from "vue";
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "RevenueTrends",
  components: {
    apexcharts: VueApexCharts,
  },
  setup() {
    const charts = useChartsStore();
    const chartOptions = ref({});
    const series = ref([]);

    const formatNumber = (val) => {
      return core.formatNumber(val, {
        precision: 2,
        minimumFractionDigits: 2,
        reverseFill: true,
      });
    };

    const updateChart = (args) => {
      charts
        .sourceRevenueTrends(args)
        .then((data) => {
          chartOptions.value = {
            chart: {
              id: "revenue-trends",
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
              categories: data.categories,
            },
            yaxis: {
              labels: {
                formatter: (value) => {
                  return formatNumber(value);
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

          series.value = data.series;
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
