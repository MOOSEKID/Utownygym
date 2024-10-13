<template>
  <base-dialog
    title="Mark as paid"
    ref="dialog"
    content-style="width: 550px; max-width: 95vw"
    body-class="scroll"
    class="payment-dialog"
    @hide="onDialogHide"
    @ok="onDone"
    use-separator
    :loading="loading"
    done-label="Mark as paid"
    :disable="!paymentMethod"
  >
    <template v-slot:body>
      <div class="row q-col-gutter-md">
        <div class="col-sm-12 col-xs-12">
          <p>
            Mark this due amount as paid if you received
            <strong>{{ dueAmount }}</strong> outside. This payment won't be
            captured and you won't be able to refund it using app.
          </p>
        </div>
        <div class="col-sm-12 col-xs-12">
          <base-label>{{ $t("paymentMethod") }}</base-label>
          <select-payment-methods
            card
            :disable="loading"
            allow-manual
            v-model="paymentMethod"
          />
        </div>
      </div>
    </template>
  </base-dialog>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useSubscriptionStore } from "stores/subscription";
import SelectPaymentMethods from "../payment-methods/SelectPaymentMethods.vue";
import { useMemberStore } from "src/stores/member";

export default {
  components: { SelectPaymentMethods },
  name: "ManualPayment",
  emits: ["ok", "hide"],
  data() {
    return {
      paymentMethod: undefined,
      loading: false,
      loaded: false,
    };
  },
  methods: {
    ...mapActions(useMemberStore, ["markAsPaid"]),
    async show() {
      console.func(
        "components/subscription/ManualPayment:methods.show()",
        arguments
      );
      this.$refs.dialog.show();
    },
    hide() {
      console.func(
        "components/subscription/ManualPayment:methods.close()",
        arguments
      );
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      console.func(
        "components/subscription/ManualPayment:methods.onDialogHide()",
        arguments
      );
      this.paymentMethod = undefined;
      this.loaded = false;
      this.$emit("hide");
    },
    onDone() {
      console.func(
        "components/subscription/ManualPayment:methods.onDone()",
        arguments
      );
      this.markAsPaid({
        id: this.user?.id,
        payment_method: this.paymentMethod?.id,
      }).then(() => {
        this.$emit("ok");
        this.hide();
      });
    },
  },
  computed: {
    ...mapState(useSubscriptionStore, ["invoice", "dueAmount", "user"]),
  },
};
</script>
