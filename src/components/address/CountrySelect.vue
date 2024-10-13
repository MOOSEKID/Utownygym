<template>
  <base-select
    class="country-select"
    :error-message="errorMessage"
    :error="error"
    :hide-bottom-space="!error"
    :model-value="modelValue || undefined"
    @update:model-value="onChange"
    @complete="onComplete"
    emit-value
    dense
    :outlined="!borderless"
    :borderless="borderless"
    use-input
    option-label="name"
    option-value="name"
    :placeholder="!modelValue ? 'Select or type...' : ''"
    name="country"
    input-debounc="500"
    :filter-method="get"
  />
</template>

<script>
import { get } from "services/countries";

export default {
  props: {
    errorMessage: String,
    error: Boolean,
    borderless: Boolean,
    modelValue: String,
    placeholder: {
      type: String,
      default: "placeholder.select",
    },
  },
  emits: ["complete", "update:model-value"],
  methods: {
    get,
    onChange(value) {
      console.func("components/CountrySelect:methods.onChange", arguments);
      if (value === this.modelValue) return false;
      this.$emit("update:model-value", value);
    },
    onComplete(value) {
      console.func("components/CountrySelect:methods.onComplete", arguments);
      this.$emit("complete", value);
    },
  },
};
</script>
