<template>
  <div class="attendance-utilization">
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
  name: "AttendanceUtilization",
  components: {
    apexcharts: VueApexCharts,
  },
  setup() {
    const charts = useChartsStore();
    const chartOptions = ref({});

    const series = ref([]);

    const updateChart = (args) => {
      charts
        .attendanceUtilization(args)
        .then((data) => {
          chartOptions.value = {
            chart: {
              id: "attendance-utilization",
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
              categories: Object.keys(data.attendanceRate),
            },
            yaxis: {
              labels: {
                formatter: (value) => {
                  return value + "%";
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
              name: "Attendance Rate",
              data: Object.values(data.attendanceRate),
            },
            {
              name: "Utilization Rate",
              data: Object.values(data.utilizationRate),
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
