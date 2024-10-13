<template>
  <base-section class="text-center kpi-widget" bordered flat no-row>
    <div class="flex flex-center">
      <div class="text-h6">{{ title }}</div>
    </div>
    <div class="results q-my-md text-center">
      <div class="text-h3 current-month">{{ current }}</div>
      <div :class="`percentage-change text-${color}`">
        ({{ percentage }}%) <q-icon :name="icon" :color="color" />
      </div>
    </div>
    <div class="text-caption">{{ description }}</div>
  </base-section>
</template>

<script>
export default {
  props: {
    title: String,
    current: Number,
    previous: Number,
    percentage: Number,
    negative: Boolean,
    description: String,
    loaded: Boolean,
  },
  computed: {
    icon() {
      return this.negative
        ? "fas fa-arrow-trend-down"
        : "fas fa-arrow-trend-up";
    },
    color() {
      return this.negative ? "negative" : "positive";
    },
  },
};
</script>

<style lang="scss">
.kpi-widget {
  height: 100%;
}
</style>
