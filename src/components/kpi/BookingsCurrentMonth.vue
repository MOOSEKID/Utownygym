<template>
  <kpi-widget title="Manual Bookings" v-bind="widget" :loaded="loaded" />
</template>

<script>
import { mapActions } from "pinia";
import { useKPIStore } from "src/stores/kpi";
import KpiWidget from "./KpiWidget.vue";

export default {
  components: { KpiWidget },
  data() {
    return {
      widget: {},
      loaded: false,
    };
  },
  methods: {
    ...mapActions(useKPIStore, ["bookings"]),
  },
  mounted() {
    this.bookings().then((data) => {
      Object.assign(this.widget, data);
      this.loaded = true;
    });
  },
};
</script>
