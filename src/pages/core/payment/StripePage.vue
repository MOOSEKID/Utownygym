<template>
  <q-page class="flex flex-center" padding>
    <div style="width: 350px">
      <div v-show="loaded" class="row q-col-gutter-md">
        <div class="col-xs-12 col-sm-12">
          <base-section no-row>
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
                <base-btn
                  v-if="$q.screen.xs"
                  @click="$refs.details.toggle()"
                  color="grey"
                  label="Details"
                  link
                />
                <div v-else class="text-grey-6 text-weight-regular">
                  {{ order?.label }}
                </div>
              </div>
            </q-toolbar>
            <q-dialog square ref="details" position="bottom">
              <q-list class="bg-white q-pa-md">
                <order-items
                  :line-items="order?.line_items"
                  :currency="order?.currency"
                />
              </q-list>
            </q-dialog>
            <q-list v-if="$q.screen.gt.xs" class="q-mt-md">
              <order-items
                :line-items="order?.line_items"
                :currency="order?.currency"
              />
            </q-list>
          </base-section>
        </div>
        <div class="col-xs-12 col-sm-12">
          <base-section no-row class="stripe-payment">
            <!-- Stripe Elements Placeholder -->
            <div id="link-authentication-element"></div>
            <div id="payment-element"></div>
            <div class="text-center">
              <base-btn
                @click="submit"
                id="submit"
                label="Pay Now"
                :disable="loading"
                style="min-width: 150px"
                padding="10px"
                class="q-mt-md"
              />
            </div>
          </base-section>
        </div>
      </div>
      <payment-skeleton v-if="!loaded" />
    </div>
  </q-page>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import { PaymentMixins } from "services/mixins/payment";

let stripe, elements, paymentElement, linkAuthenticationElement;

const options = {
  layout: {
    type: "accordion",
    defaultCollapsed: false,
    radios: false,
    spacedAccordionItems: true,
  },
  fields: {
    billingDetails: {
      email: "never",
      address: {
        country: "never",
      },
    },
  },
};

const appearance = {
  theme: "flat",
  variables: { colorPrimaryText: "#262626" },
};

export default {
  mixins: [PaymentMixins],
  data() {
    return {
      clientSecret: null,
    };
  },
  methods: {
    async load() {
      if (!this.API_KEY) return;

      this.loading = true;

      stripe = await loadStripe(this.API_KEY);

      this.token({
        provider: "stripe",
        query: this.$route.query,
      })
        .then((data) => {
          Object.assign(this, data);

          elements = stripe.elements({
            clientSecret: this.clientSecret,
            appearance,
          });

          paymentElement = elements.create("payment", {
            ...options,
            defaultValues: {
              billingDetails: this.billing_details,
            },
          });

          paymentElement.mount("#payment-element");

          linkAuthenticationElement = elements.create("linkAuthentication");

          linkAuthenticationElement.mount("#link-authentication-element");

          this.loading = false;
          this.loaded = true;
        })
        .catch((error) => {
          this.$core.error(error);
        });
    },
    async submit() {
      if (this.loading) return;

      this.loading = true;

      const paymentPromise = stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: this.successUrl,
          payment_method_data: {
            billing_details: this.billing_details,
          },
        },
        redirect: "if_required",
      });

      paymentPromise.then((response) => {
        const { error, paymentIntent } = response;

        if (error) {
          this.$core.error(error);
        } else {
          this.process({
            provider: "stripe",
            query: {
              ...this.$route.query,
              payment_intent: paymentIntent.id,
            },
          });
        }
      });
    },
  },
  async mounted() {
    await this.load();
  },
  computed: {
    API_KEY() {
      return this.paymentProvider("stripe")?.API_KEY;
    },
  },
  watch: {
    API_KEY() {
      this.load();
    },
  },
  unmounted() {
    paymentElement.unmount();
    linkAuthenticationElement.unmount();
    let stripeIframes = [
      document.querySelectorAll("[name^=__privateStripeMetricsController]"),
      document.querySelectorAll("[name^=__privateStripeController]"),
    ];
    stripeIframes.forEach((iframes) =>
      iframes.forEach((iframe) => {
        iframe.parentNode.removeChild(iframe);
      })
    );
  },
};
</script>
