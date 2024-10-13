<template>
  <div class="form-field form-input" v-bind:class="classes">
    <div v-if="!hideLabel" class="form-input-label q-mb-sm">
      <base-label :title="label" editable :required="required" />
    </div>
    <div class="row q-col-gutter-md">
      <div class="col-sm-6 col-xs-12">
        <base-input
          class="form-address"
          @update:model-value="$emit('update:model-value', inputValue)"
          name="line_1"
          placeholder="Address line one"
          v-model="inputValue.line_1"
          :readonly="readonly"
          :required="required"
        />
      </div>
      <div class="col-sm-6 col-xs-12">
        <base-input
          class="form-address"
          @update:model-value="$emit('update:model-value', inputValue)"
          name="line_2"
          placeholder="Address line two"
          v-model="inputValue.line_2"
          :readonly="readonly"
          :required="required"
        />
      </div>
      <div class="col-sm-3 col-xs-12">
        <base-input
          class="form-address"
          @update:model-value="$emit('update:model-value', inputValue)"
          name="city"
          placeholder="City"
          v-model="inputValue.city"
          :readonly="readonly"
          :required="required"
        />
      </div>
      <div class="col-sm-3 col-xs-12">
        <base-input
          class="form-address"
          @update:model-value="$emit('update:model-value', inputValue)"
          name="state"
          placeholder="State"
          v-model="inputValue.state"
          :readonly="readonly"
          :required="required"
        />
      </div>
      <div class="col-sm-3 col-xs-12">
        <base-input
          class="form-address"
          @update:model-value="$emit('update:model-value', inputValue)"
          name="postcode"
          placeholder="Postcode"
          v-model="inputValue.postcode"
          :readonly="readonly"
          :required="required"
        />
      </div>
      <div class="col-sm-3 col-xs-12">
        <base-input
          class="form-address"
          @update:model-value="$emit('update:model-value', inputValue)"
          name="country"
          placeholder="Country"
          v-model="inputValue.country"
          :readonly="readonly"
          :required="required"
        />
      </div>
    </div>
    <div class="form-input-description q-mt-sm">{{ description }}</div>
  </div>
</template>

<script>
import { FormFieldMixin } from "./form-fields";
export default {
  mixins: [FormFieldMixin],
};
</script>
