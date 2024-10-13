<template>
  <div class="form-field form-input" v-bind:class="classes">
    <div v-if="!hideLabel" class="form-input-label q-mb-sm">
      <base-label :title="label" editable :required="required" />
    </div>
    <base-dropzone
      :readonly="readonly"
      class="form-files q-mb-sm"
      label=""
      :accept="accept"
      v-model="inputValue"
      @update:model-value="(val) => $emit('update:model-value', val)"
    />
    <div class="form-input-description">{{ description }}</div>
  </div>
</template>

<script>
import { FormFieldMixin } from "./form-fields";
export default {
  mixins: [FormFieldMixin],
  computed: {
    accept() {
      return this.config.accept || undefined;
    },
  },
};
</script>

<style lang="sass">
.q-uploader.dropzone-uploader
  background: transparent !important
</style>
