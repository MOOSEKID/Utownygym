<template>
  <div class="form-field form-input" v-bind:class="classes">
    <div v-if="!hideLabel" class="form-input-label q-mb-sm">
      <base-label :title="label" editable :required="required" />
    </div>
    <base-select
      class="form-select q-mb-sm"
      dense
      square
      outlined
      :options="options"
      :readonly="readonly"
      v-model="inputValue"
      map-options
      emit-value
      @update:model-value="(val) => $emit('update:model-value', val)"
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

<style lang="sass">
.form-select.q-field--dense.q-field--readonly .q-field__control,
.form-select.q-field--dense.q-field--readonly .q-field__marginal,
.form-select.q-field--auto-height.q-field--dense.q-field--readonly .q-field__control,
.form-select.q-field--auto-height.q-field--dense.q-field--readonly .q-field__native
  height: 40px !important
  min-height: 40px !important
</style>
