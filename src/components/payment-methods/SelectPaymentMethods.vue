<template>
  <div v-if="card" class="row q-col-gutter-sm">
    <div v-for="item in options" :key="item.id" class="col-xs-12 col-sm-6">
      <payment-method-card
        v-bind="item"
        :selected="modelValue"
        @update:selected="$emit('update:model-value', item)"
      />
    </div>
  </div>
  <base-select
    v-else
    dense
    outlined
    :options="options"
    option-label="name"
    :model-value="modelValue"
    @update:model-value="$emit('update:model-value', $event)"
    :placeholder="$t('placeholder.select')"
  />
</template>

<script>
import { mapState } from "pinia";
import { useAppStore } from "src/stores/app";
import PaymentMethodCard from "./PaymentMethodCard.vue";

export default {
  components: { PaymentMethodCard },
  props: {
    modelValue: {},
    allowManual: Boolean,
    card: Boolean,
  },
  emits: ["update:model-value"],
  computed: {
    ...mapState(useAppStore, ["paymentMethods"]),
    options() {
      if (this.allowManual) {
        return this.paymentMethods;
      }
      return this.paymentMethods.filter((item) => item.provider !== "manual");
    },
  },
};
</script>
