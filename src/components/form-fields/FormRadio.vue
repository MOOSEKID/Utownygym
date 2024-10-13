<template>
  <div class="form-field form-input" v-bind:class="classes">
    <div v-if="!hideLabel" class="form-input-label q-mb-sm">
      <base-label :title="label" editable :required="required" />
    </div>
    <q-option-group
      class="form-radio q-mb-sm"
      @update:model-value="(val) => $emit('update:model-value', val)"
      v-model="inputValue"
      :options="options"
      :disable="readonly"
      color="primary"
      type="radio"
      dense
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
.form-radio
  .q-radio--dense
    margin-bottom: 8px
</style>
