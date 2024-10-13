<template>
  <q-page padding>
    <div class="row q-col-gutter-lg">
      <div class="col-xs-12 col-sm-12 order-none">
        <base-page-header
          no-tabs
          :title="$t('billing')"
          :hint="$t('hint.billing')"
        />
      </div>
      <div class="col-xs-12 col-sm-8 order-last">
        <div class="row q-col-gutter-lg">
          <div class="col-xs-12">
            <invoice-manager :user="user" />
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-4">
        <current-plan-card :user="user" due-pay />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useAppStore } from "stores/app";
import { useSubscriptionStore } from "stores/subscription";
import CurrentPlanCard from "components/subscription/CurrentPlanCard.vue";
import InvoiceManager from "components/payment-methods/InvoiceManager.vue";

export default {
  components: { CurrentPlanCard, InvoiceManager },
  data() {
    return {
      loaded: false,
    };
  },
  methods: {
    ...mapActions(useSubscriptionStore, ["loadSubscription"]),
  },
  computed: {
    ...mapState(useAppStore, ["user"]),
  },
  async mounted() {
    await this.loadSubscription();
  },
};
</script>
