<template>
  <div class="coupon-card">
    <div v-if="!coupon" class="q-my-md coupon-section">
      <base-btn
        v-if="!promo"
        @click="promo = true"
        link
        label="Have a coupon code?"
      />
      <base-label v-else>Promo code</base-label>
      <base-input
        v-show="promo"
        placeholder="Enter promo code"
        v-model="promotion_code"
        type="text"
        :error-message="errorMessage"
        :error="hasError"
        :disable="checking"
      >
        <template #after>
          <base-btn
            :loading="checking"
            @click="onCheckPromoCode"
            color="grey"
            :label="$t('label.apply')"
          />
        </template>
      </base-input>
    </div>
    <div v-else class="q-my-md coupon-section">
      <span>Coupon:</span>
      <span class="text-bold q-px-xs">{{ coupon?.promotion_code }}</span>
      <span>(-{{ formatedDiscount }})</span>
      <base-btn
        @click="onRemoveCoupon"
        link
        color="negative"
        class="q-ml-xs"
        :label="$t('label.x')"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useSubscriptionStore } from "stores/subscription";

export default {
  props: {
    modelValue: String,
    processing: Boolean,
    amount: Number,
    plan: {},
  },
  data() {
    return {
      visible: true,
      promo: false,
      promotion_code: null,
      errorMessage: null,
      hasError: false,
      checking: false,
      coupon: null,
    };
  },
  emits: ["update:processing", "update:amount", "update:model-value"],
  methods: {
    ...mapActions(useSubscriptionStore, ["checkPromoCode"]),
    onRemoveCoupon() {
      console.func(
        "components/ManageSubscription:methods.onRemoveCoupon()",
        arguments
      );
      this.coupon = null;
      this.promotion_code = null;
      this.promo = false;
      this.errorMessage = null;
      this.hasError = false;
      this.$emit("update:model-value", null);
      this.$emit("update:amount", this.amountToPay);
    },
    async onCheckPromoCode() {
      console.func(
        "components/ManageSubscription:methods.onCheckPromoCode()",
        arguments
      );
      this.hasError = false;
      this.checking = true;
      this.$emit("update:processing", true);
      await this.checkPromoCode({
        promotion_code: this.promotion_code,
        plan_id: this.plan?.id,
      })
        .then((coupon) => {
          this.checking = false;
          this.$emit("update:processing", false);
          this.coupon = coupon;
        })
        .catch(({ message }) => {
          this.errorMessage = message;
          this.hasError = true;
          this.checking = false;
          this.$emit("update:processing", false);
        });

      this.$emit("update:model-value", this.promotion_code);
      this.$emit("update:amount", this.amountToPay);
    },
  },
  computed: {
    discount() {
      if (this.coupon) {
        const amount = this.plan?.price;
        const { fixed, amount_off, percent_off } = this.coupon;
        if (fixed) {
          return amount_off > amount ? amount : amount_off;
        } else {
          return (amount * percent_off) / 100;
        }
      }
      return 0;
    },
    amountToPay() {
      const amount = this.plan?.amount;
      return amount - this.discount;
    },
    formatedDiscount() {
      const { currency } = this.coupon || {};
      if (currency) {
        return this.$core.money(this.discount, { currency });
      }
      return this.$core.money(this.discount);
    },
  },
  watch: {
    plan: {
      deep: true,
      handler() {
        this.onRemoveCoupon();
      },
    },
  },
  mounted() {
    this.onRemoveCoupon();
  },
};
</script>
