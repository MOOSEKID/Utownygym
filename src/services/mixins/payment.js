import { mapState, mapActions } from "pinia";
import { useAppStore } from "src/stores/app";
import { usePaymentStore } from "src/stores/payment";
import OrderItems from "src/components/order/OrderItems.vue";
import PaymentSkeleton from "src/components/skeleton/PaymentSkeleton.vue";

export const PaymentMixins = {
  components: { OrderItems, PaymentSkeleton },
  data() {
    return {
      loading: true,
      loaded: false,
      title: "Payment",
      order: null,
      orderID: null,
      successUrl: null,
    };
  },
  methods: {
    ...mapActions(usePaymentStore, ["token", "process"]),
    onBack() {
      this.$redirect(this.redirect);
    },
  },
  computed: {
    ...mapState(useAppStore, ["paymentProvider", "config"]),
    redirect() {
      return this.$route.query.redirect || { name: "Dashboard" };
    },
    label() {
      return this.$t("payAmount", { amount: this.order?.amount });
    },
    billing_details() {
      return this.order?.billing_details;
    },
  },
};
