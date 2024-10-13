<template>
  <q-page class="flex flex-center" padding>
    <div style="width: 350px">
      <base-section v-show="loaded" no-row>
        <q-toolbar class="q-pa-none">
          <q-btn
            flat
            round
            dense
            icon="far fa-arrow-left"
            size="sm"
            class="q-mr-sm"
            @click="onBack"
          />
          <img v-if="config?.logo" width="100" :src="config?.logo" />
          <img v-else width="100" src="~assets/logo.png" />
          <!-- <base-status type="Test Mode" /> -->
          <q-space />
          <div class="details">
            <div class="text-subtitle2">{{ order?.amount }}</div>
            <div class="text-grey-6 text-weight-regular">
              {{ order?.label }}
            </div>
          </div>
        </q-toolbar>
        <q-list class="q-mt-md">
          <order-items
            :line-items="order?.line_items"
            :currency="order?.currency"
          />
        </q-list>
        <base-btn
          @click="initiatePayment"
          color="primary"
          label="Pay Now"
          size="md"
          class="full-width q-mt-md"
        />
      </base-section>
      <payment-skeleton single-col v-if="!loaded" />
    </div>
  </q-page>
</template>

<script>
import { PaymentMixins } from "src/services/mixins/payment";

export default {
  mixins: [PaymentMixins],
  data() {
    return {
      orderID: null,
    };
  },
  methods: {
    async load() {
      try {
        // Load the Razorpay script dynamically
        await this.loadRazorpay();

        // Get the Razorpay order details from your backend
        const data = await this.token({
          provider: "razorpay",
          query: this.$route.query,
        });

        Object.assign(this, data);
        this.loaded = true;
      } catch (error) {
        this.$core.error(error);
      }
    },
    loadRazorpay() {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    },
    initiatePayment() {
      const options = {
        key: this.API_KEY,
        amount: this.order.raw_amount * 100, // Amount in paise
        currency: this.order.currency,
        order_id: this.orderID,
        handler: async (response) => {
          this.process({
            provider: "razorpay",
            query: {
              ...this.$route.query,
              ...response,
            },
          });
        },
        prefill: this.billing_details,
      };

      const razorpay = new Razorpay(options);
      razorpay.open();
    },
  },
  async mounted() {
    this.load();
  },
  computed: {
    API_KEY() {
      return this.paymentProvider("razorpay")?.API_KEY;
    },
  },
};
</script>
