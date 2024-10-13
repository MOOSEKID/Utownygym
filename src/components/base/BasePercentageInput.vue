<template>
  <q-number
    class="base-percentage-input"
    dense
    outlined
    :model-value="modelValue"
    @update:model-value="onChange"
    :options="{
      decimal: '.',
      separator: ',',
      prefix: '',
      suffix: '%',
      precision: 0,
      minimumFractionDigits: 0,
      reverseFill: false,
      masked: false,
      nullValue: '',
      min: 0,
      max: 100,
    }"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  props: {
    modelValue: {
      required: true,
    },
    placeholder: {
      required: false,
      type: [String],
      default: "0",
    },
  },
  emits: ["update:model-value"],
  methods: {
    onChange(val) {
      console.func(
        "components/base/input/base-percentage:methods.onChange()",
        arguments
      );
      this.$emit("update:model-value", val);
    },
  },
};
</script>
