<template>
  <div class="user-growth">
    <apexcharts
      height="215px"
      type="bar"
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
  name: "UserGrowth",
  components: {
    apexcharts: VueApexCharts,
  },
  setup() {
    const charts = useChartsStore();
    const chartOptions = ref({});

    const series = ref([]);

    const updateChart = (args) => {
      charts
        .userGrowth(args)
        .then((data) => {
          chartOptions.value = {
            chart: {
              id: "user-growth",
              type: "bar",
              height: "215px",
              toolbar: {
                show: false,
              },
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
              name: "Users",
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
