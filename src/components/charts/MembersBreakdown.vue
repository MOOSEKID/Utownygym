<template>
  <div class="members-breakdown">
    <apexcharts
      height="228px"
      type="donut"
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
  name: "MembersBreakdown",
  components: {
    apexcharts: VueApexCharts,
  },
  setup() {
    const formatNumber = (val) => {
      return core.formatNumber(val, {
        precision: 0,
        minimumFractionDigits: 0,
        reverseFill: true,
        prefix: "",
      });
    };

    const charts = useChartsStore();
    const chartOptions = ref({});
    const series = ref([]);

    const updateChart = (args) => {
      charts
        .membersBreakdown(args)
        .then((data) => {
          chartOptions.value = {
            chart: {
              id: "members-breakdown",
              type: "donut",
              height: "228px",
            },
            labels: Object.keys(data),
            theme: {
              palette: "palette3", // upto palette10
            },
            legend: {
              position: "right",
              markers: {
                width: 15,
                height: 15,
              },
              formatter: (seriesName, opts) => {
                const total = formatNumber(
                  opts.w.globals.series[opts.seriesIndex]
                );
                return `<div class="q-item q-item-type row no-wrap q-item--dense q-pa-none" role="listitem" data-asw-orgfontsize="14" style="font-size: 14px;"><div class="q-item__section column q-item__section--main justify-center"><div class="q-item__label">${seriesName}</div><div class="q-item__label text-subtitle2">${total}</div></div></div>`;
              },
            },
            responsive: [
              {
                breakpoint: 1460,
                options: {
                  chart: {
                    height: "285px",
                  },
                  legend: {
                    show: true,
                    position: "bottom",
                    offsetY: 0,
                    offsetX: 0,
                  },
                },
              },
              {
                breakpoint: 780,
                options: {
                  chart: {
                    height: "380px",
                  },
                },
              },
            ],
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    name: {
                      fontSize: "14px",
                      offsetY: 20,
                      formatter: (val) => {
                        return val.toLowerCase();
                      },
                      color: "#000000",
                    },
                    value: {
                      color: "#000000",
                      fontSize: "18px",
                      offsetY: -20,
                      formatter: (val) => {
                        return formatNumber(val);
                      },
                      fontWeight: 600,
                    },
                    total: {
                      show: true,
                      fontSize: "14px",
                      label: "Total Members",
                      formatter: (w) => {
                        return formatNumber(
                          w.globals.seriesTotals.reduce((a, b) => {
                            return a + b;
                          }, 0)
                        );
                      },
                      color: "#000000",
                    },
                  },
                },
              },
            },
          };

          series.value = Object.values(data);
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

<style lang="scss">
.apexcharts-legend-series {
  display: flex;
  align-items: center;
  .apexcharts-legend-marker {
    border-radius: 3px !important;
  }
  .apexcharts-legend-text {
    padding-left: 25px;
  }
}
</style>
