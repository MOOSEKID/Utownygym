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
            <div class="q-mt-md paypal-payment">
              <!-- Paypal Elements Placeholder -->
              <div id="paypal-button-container"></div>
            </div>
          </base-section>
        </div>
      </div>
      <payment-skeleton v-if="!loaded" />
    </div>
  </q-page>
</template>

<script>
import { loadScript } from "@paypal/paypal-js";
import { PaymentMixins } from "src/services/mixins/payment";

let paypal;

export default {
  mixins: [PaymentMixins],
  data() {
    return {
      orderID: null,
    };
  },
  methods: {
    async load() {
      if (!this.CLIENT_ID) return;

      paypal = await loadScript({ "client-id": this.CLIENT_ID });

      this.token({
        provider: "paypal",
        query: this.$route.query,
      })
        .then((data) => {
          Object.assign(this, data);

          paypal
            .Buttons({
              createOrder: () => this.orderID,
              onApprove: this.onApprove,
            })
            .render("#paypal-button-container");

          this.loaded = true;
        })
        .catch((error) => {
          this.$core.error(error);
        });
    },
    onApprove(data, actions) {
      this.process({
        provider: "paypal",
        query: {
          ...this.$route.query,
          ...data,
        },
      });
    },
  },
  async mounted() {
    this.load();
  },
  computed: {
    CLIENT_ID() {
      return this.paymentProvider("paypal")?.CLIENT_ID;
    },
  },
  watch: {
    CLIENT_ID() {
      this.load();
    },
  },
};
</script>
