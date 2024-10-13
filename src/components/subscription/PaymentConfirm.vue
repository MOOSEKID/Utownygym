<template>
  <base-dialog
    title="Payment Confirmation"
    ref="dialog"
    content-style="width: 550px; max-width: 95vw"
    body-class="scroll"
    class="payment-dialog"
    @hide="onDialogHide"
    @ok="onDone"
    use-separator
    :loading="loading"
    done-label="Pay"
    :disable="!paymentMethod"
  >
    <template v-slot:body>
      <div class="q-px-sm">
        <div class="q-gutter-y-md">
          <div class="payments text-subtitle2">
            Your {{ dueAmount }} payment
          </div>
          <p v-html="message" class="mb-6"></p>
          <div class="payment-methods">
            <base-label>{{ $t("paymentMethod") }}</base-label>
            <select-payment-methods
              :disable="loading"
              v-model="paymentMethod"
              card
            />
          </div>
        </div>
      </div>
    </template>
  </base-dialog>
</template>

<script>
import SelectPaymentMethods from "../payment-methods/SelectPaymentMethods.vue";

export default {
  components: { SelectPaymentMethods },
  name: "PaymentConfirm",
  props: {
    dueAmount: [Number, String],
    invoice: Object,
    message: String,
    redirect: String,
  },
  emits: ["ok", "hide"],
  data() {
    return {
      paymentMethod: undefined,
      loading: false,
      loaded: false,
    };
  },
  methods: {
    async show() {
      console.func(
        "components/subscription/PaymentConfirm:methods.show()",
        arguments
      );
      this.$refs.dialog.show();
    },
    hide() {
      console.func(
        "components/subscription/PaymentConfirm:methods.close()",
        arguments
      );
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      console.func(
        "components/subscription/PaymentConfirm:methods.onDialogHide()",
        arguments
      );
      this.paymentMethod = undefined;
      this.loaded = false;
      this.$emit("hide");
    },
    onDone() {
      console.func(
        "components/subscription/PaymentConfirm:methods.onDone()",
        arguments
      );
      this.$redirect({
        path: `/user/payment/${this.paymentMethod?.provider}`,
        query: {
          key: this.orderKey,
          redirect: this.redirect || this.$route.fullPath,
        },
      });
      this.hide();
    },
  },
  computed: {
    orderKey() {
      return this.invoice?.order_key || this.invoice?.key;
    },
  },
};
</script>
