<template>
  <base-section
    flat
    bordered
    :title="$t('paymentSummary')"
    dense
    no-row
    class="subscription-manage"
  >
    <div class="plan-details">
      <template v-if="create">
        <span
          v-html="
            $t('plan.create', {
              plan: plan?.label,
              amount: plan?.price_formated,
              interval: interval,
            })
          "
        ></span>
      </template>
      <template v-else-if="change">
        <span
          class="text-body"
          v-html="
            $t('plan.change', {
              currentPlan: currentPlan?.label,
              plan: plan?.label,
              amount: plan?.price_formated,
              interval: interval,
            })
          "
        ></span>
      </template>
    </div>
    <coupon-card
      :plan="plan"
      v-model="promotion_code"
      v-model:amount="amount"
      v-model:processing="processing"
      @update:processing="$emit('processing', $event)"
    />
    <div class="payment-btn">
      <base-btn
        :loading="processing"
        :disabled="isDisable"
        :color="color"
        :label="label"
        @click="onConfirm"
        style="min-width: 150px"
        padding="10px"
      />
      <div class="q-mt-xs text-small">
        <template v-if="change">*{{ $t("hint.priceChange") }}</template>
      </div>
    </div>
  </base-section>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAppStore } from "stores/app";
import { useSubscriptionStore } from "stores/subscription";
import CouponCard from "./CouponCard.vue";

const validateMode = (v) => ["create", "change"].includes(v);

export default {
  components: { CouponCard },
  props: {
    plan: {},
    mode: {
      type: String,
      validator: validateMode,
    },
    paymentMethod: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      visible: true,
      processing: false,
      promotion_code: null,
      amount: 0,
    };
  },
  emits: ["processing"],
  methods: {
    ...mapActions(useSubscriptionStore, ["loadSubscription", "subscribe"]),
    ...mapActions(useAppStore, ["currentUser"]),
    onConfirm() {
      console.func(
        "components/ManageSubscription:methods.onConfirm()",
        arguments
      );
      this.processing = true;
      this.subscribe({
        plan: this.plan?.id,
        promotion_code: this.promotion_code,
        payment_method: this.paymentMethod?.id,
      })
        .then(async (response) => {
          this.processing = true;
          const { message, payment } = response;
          if (payment) {
            this.$redirect(payment);
          } else {
            this.$core.success(message, {
              title: this.$t("dialog.title.success"),
            });
            await this.loadSubscription();
            this.$router.push({ name: "Billing" });
            this.processing = false;
          }
        })
        .catch((error) => {
          this.processing = false;
          this.$core.error(error, { title: this.$t("dialog.title.error") });
        });
    },
  },
  computed: {
    ...mapState(useSubscriptionStore, ["currentPlan"]),
    interval() {
      return this.$core.priceToInterval(this.plan);
    },
    create() {
      return this.mode === "create";
    },
    change() {
      return this.mode === "change";
    },
    label() {
      return this.$t("proceedPayment");
    },
    color() {
      return "positive";
    },
    isDisable() {
      return !this.paymentMethod?.id || this.processing;
    },
  },
};
</script>
