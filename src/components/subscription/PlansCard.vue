<template>
  <base-section :dense="dense" flat :title="title">
    <template v-if="!noInterval" #action>
      <q-toggle
        dense
        :model-value="interval"
        @update:model-value="$emit('update:interval', $event)"
        true-value="year"
        false-value="month"
        :label="$t('yearly')"
      />
    </template>
    <div
      v-for="(item, index) in localOptions"
      :key="index"
      :class="`col-xs-12 col-sm-${col}`"
    >
      <plan-card
        flat
        v-bind="item"
        :model-value="modelValue"
        @update:model-value="onChange"
        :disable="disable"
        :dense="dense"
      />
    </div>
    <template v-if="loading" #skeleton>
      <base-section-skeleton flat bordered />
    </template>
  </base-section>
</template>

<script>
import { mapState } from "pinia";
import { useSubscriptionStore } from "src/stores/subscription";
import BaseSectionSkeleton from "src/components/skeleton/BaseSectionSkeleton.vue";
import PlanCard from "./PlanCard.vue";

export default {
  components: { BaseSectionSkeleton, PlanCard },
  props: {
    modelValue: {},
    title: String,
    interval: String,
    noInterval: Boolean,
    col: {
      type: [String, Number],
      default: "6",
    },
    mode: String,
    disable: Boolean,
    loading: Boolean,
    dense: Boolean,
    options: Array,
  },
  emits: ["update:interval", "update:model-value", "update:mode"],
  methods: {
    onChange(val, mode = "create") {
      this.$emit("update:model-value", val);
      this.$emit("update:mode", mode);
    },
  },
  computed: {
    ...mapState(useSubscriptionStore, ["plans"]),
    localOptions() {
      return (this.options || this.plans).filter((item) => item.is_active);
    },
  },
};
</script>
