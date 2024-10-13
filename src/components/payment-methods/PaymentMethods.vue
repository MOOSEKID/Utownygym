<template>
  <base-section
    flat
    bordered
    :title="title"
    dense
    class="payment-methods"
    no-row
  >
    <div class="row q-col-gutter-sm">
      <div
        v-for="item in paymentMethods"
        :key="item.id"
        class="col-xs-12 col-sm-4"
      >
        <payment-method-card
          v-bind="item"
          :selected="modelValue"
          @update:selected="$emit('update:model-value', item)"
        />
      </div>
      <div class="col-xs-12 col-sm-4" v-if="noPaymentMethods">
        <payment-method-placeholder animation="none" />
      </div>
    </div>
    <slot></slot>
  </base-section>
</template>

<script>
import { mapState } from "pinia";
import PaymentMethodCard from "./PaymentMethodCard.vue";
import PaymentMethodPlaceholder from "../skeleton/PaymentMethodPlaceholder.vue";
import { useAppStore } from "src/stores/app";

export default {
  components: {
    PaymentMethodCard,
    PaymentMethodPlaceholder,
  },
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: "Payment Methods",
    },
  },
  emits: ["update:model-value"],
  computed: {
    ...mapState(useAppStore, ["paymentMethods", "noPaymentMethods"]),
  },
};
</script>
