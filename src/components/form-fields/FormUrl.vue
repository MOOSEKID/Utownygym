<template>
  <div class="form-field form-input" v-bind:class="classes">
    <div v-if="!hideLabel" class="form-input-label q-mb-sm">
      <base-label :title="label" editable :required="required" />
    </div>
    <base-input
      class="form-url q-mb-sm"
      @update:model-value="(val) => $emit('update:model-value', val)"
      v-model="inputValue"
      :readonly="readonly"
      :placeholder="placeholder"
      :required="required"
      type="url"
    />
    <div class="form-input-description">{{ description }}</div>
  </div>
</template>

<script>
import { FormFieldMixin } from "./form-fields";
export default {
  mixins: [FormFieldMixin],
};
</script>
