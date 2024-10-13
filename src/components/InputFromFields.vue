<template>
  <div class="input-from-fields row q-col-gutter-md">
    <div
      :class="[
        `col-sm-${field.config.width || 6} col-xs-12`,
        field.config.classes,
      ]"
      v-for="field in modelValue"
      :key="field.id"
    >
      <div class="field">
        <component
          :is="`form-${field.type}`"
          v-model="field.config.value"
          v-bind="field"
          :readonly="readonly"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { FromFields } from "services/mixins";

export default {
  mixins: [FromFields],
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    readonly: Boolean,
  },
  emits: ["update:model-value"],
};
</script>
