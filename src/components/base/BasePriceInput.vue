<template>
  <q-number
    class="base-price-input"
    dense
    :readonly="readonly"
    :outlined="!borderless"
    :borderless="borderless"
    :model-value="modelValue"
    @update:model-value="onChange"
    :options="options"
    :placeholder="placeholder"
  />
</template>

<script>
import { mapState } from "pinia";
import { useAppStore } from "src/stores/app";

export default {
  props: {
    modelValue: [String, Number],
    placeholder: {
      required: false,
      type: [String],
      default: "0.00",
    },
    precision: {
      type: Number,
      default: 2,
    },
    minimumFractionDigits: {
      type: Number,
      default: 2,
    },
    max: Number,
    min: Number,
    borderless: Boolean,
    readonly: Boolean,
  },
  emits: ["update:model-value"],
  methods: {
    onChange(val) {
      console.func(
        "components/base/input/base-price:methods.onChange()",
        arguments
      );
      this.$emit("update:model-value", val);
    },
  },
  computed: {
    ...mapState(useAppStore, ["currency"]),
    scopedSlots() {
      return Object.keys(this.$slots);
    },
    options() {
      return {
        prefix: this.currency?.symbol || "$",
        decimal: this.currency?.decimal || ".",
        precision: this.precision,
        minimumFractionDigits: this.minimumFractionDigits,
        max: this.max,
        min: this.min,
        suffix: "",
      };
    },
  },
};
</script>
