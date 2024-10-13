<template>
  <div class="member-billing">
    <div class="q-gutter-md">
      <invoice-manager :user="user" ref="invoices" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useSubscriptionStore } from "stores/subscription";
import InvoiceManager from "components/payment-methods/InvoiceManager.vue";

export default {
  components: { InvoiceManager },
  props: {
    user: Object,
  },
  methods: {
    ...mapActions(useSubscriptionStore, ["setUser"]),
    async onLoad() {
      console.func("components/MemberBilling:methods.onLoad()", arguments);
      try {
        this.$refs.invoices.onLoad();
      } catch (error) {
        console.error("components/MemberBilling:methods.onLoad()", error);
      }
    },
  },
  async mounted() {
    await this.setUser(this.user);
  },
};
</script>
