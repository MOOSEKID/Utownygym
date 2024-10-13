<template>
  <div class="form-field form-label" v-bind:class="classes">
    <div v-if="label" class="text-subtitle2 form-input-label">
      {{ label }}
    </div>
    <div v-if="description" class="q-mt-sm form-input-description">
      {{ description }}
    </div>
  </div>
</template>

<script>
import { FormFieldMixin } from "./form-fields";
export default {
  mixins: [FormFieldMixin],
};
</script>
