<template>
  <div class="form-field form-input" v-bind:class="classes">
    <div v-if="!hideLabel" class="form-input-label q-mb-sm">
      <base-label :title="label" editable :required="required" />
    </div>
    <div class="row q-col-gutter-md">
      <div class="col-sm-6 col-xs-12">
        <base-input
          class="form-input q-mb-sm"
          @update:model-value="$emit('update:model-value', inputValue)"
          name="first_name"
          placeholder="First name"
          v-model="inputValue.first_name"
          :readonly="readonly"
          :required="required"
        />
      </div>
      <div class="col-sm-6 col-xs-12">
        <base-input
          class="form-input q-mb-sm"
          @update:model-value="$emit('update:model-value', inputValue)"
          name="surname"
          placeholder="Surname"
          v-model="inputValue.surname"
          :readonly="readonly"
          :required="required"
        />
      </div>
    </div>
    <div class="form-input-description">{{ description }}</div>
  </div>
</template>

<script>
import { FormFieldMixin } from "./form-fields";
export default {
  mixins: [FormFieldMixin],
  props: {
    value: {
      required: false,
      type: Object,
      default: () => ({
        first_name: "",
        surname: "",
      }),
    },
  },
};
</script>
