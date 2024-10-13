<template>
  <q-page padding>
    <div class="row q-col-gutter-lg">
      <div class="col-xs-12 col-sm-12">
        <base-page-header
          :title="$t('subscription')"
          :hint="$t('hint.subscription')"
          no-tabs
        />
      </div>
      <div class="col-xs-12 col-sm-6">
        <plans-card
          :title="title"
          :disable="processing"
          :loading="isLoadingSubscription"
          v-model:mode="mode"
          no-interval
          v-model="plan"
        />
      </div>
      <div class="col-xs-12 col-sm-6">
        <div class="q-gutter-y-lg">
          <payment-methods
            v-model="paymentMethod"
            pay-mode
            :title="$t('paymentMethods')"
            :user="user"
          />
          <manage-subscription
            v-if="processPayment"
            :plan="plan"
            :mode="mode"
            :payment-method="paymentMethod"
            @processing="onProcessing"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAppStore } from "stores/app";
import { useSubscriptionStore } from "stores/subscription";
import ManageSubscription from "components/subscription/ManageSubscription.vue";
import PaymentMethods from "components/payment-methods/PaymentMethods.vue";
import PlansCard from "src/components/subscription/PlansCard.vue";

export default {
  components: {
    PaymentMethods,
    ManageSubscription,
    PlansCard,
  },
  data() {
    return {
      mode: "create",
      plan: null,
      paymentMethod: null,
      processing: false,
    };
  },
  methods: {
    ...mapActions(useSubscriptionStore, ["setUser"]),
    onProcessing(val) {
      console.func("pages/SubscriptionPage:methods.onProcessing()", arguments);
      this.processing = val;
    },
  },
  computed: {
    ...mapState(useAppStore, ["user"]),
    ...mapState(useSubscriptionStore, [
      "plans",
      "upcomingInvoice",
      "currentPlan",
      "defaultPaymentMethod",
      "defaultPlan",
      "subscribed",
      "isLoadingSubscription",
    ]),
    title() {
      return this.subscribed ? this.$t("changePlan") : this.$t("selectPlan");
    },
    processPayment() {
      if (!this.subscribed && this.plan) {
        return true;
      }
      return this.currentPlan?.id != this.plan?.id;
    },
  },
  async mounted() {
    await this.setUser(this.user);
    this.plan = this.currentPlan?.id ? this.currentPlan : this.defaultPlan;
  },
  watch: {
    defaultPaymentMethod(value) {
      if (value?.id) {
        this.paymentMethod = { ...value };
      }
    },
    currentPlan(value) {
      this.plan = value;
    },
    defaultPlan(value) {
      if (!this.plan) {
        this.plan = value;
      }
    },
  },
};
</script>
