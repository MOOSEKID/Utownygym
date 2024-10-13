<template>
  <div class="settings-page-header">
    <base-page-header :title="title" :hint="hint" :tabs="tabs" use-route />
    <q-toolbar class="q-mt-md" style="min-height: auto" v-if="backRoute">
      <base-btn
        icon="fas fa-arrow-left"
        link
        :label="$t('label.goToSettings')"
        :to="{ name: backRoute }"
      />
      <q-space />
      <slot name="action"></slot>
    </q-toolbar>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    hint: String,
    backRoute: String,
  },
  data() {
    return {
      settings: [
        { route: "Taxes", label: "Taxes", permission: "settings:taxes" },
        {
          route: "Payment Methods",
          label: "Payments",
          permission: "settings:payment-methods",
        },
        {
          route: "Shop Locations",
          label: "Locations",
          permission: "settings:shop-locations",
        },
        {
          route: "Notifications",
          label: "Notifications",
          permission: "settings:notifications",
        },
        { route: "Plans", label: "Plans", permission: "settings:plans" },
        { route: "Coupons", label: "Coupons", permission: "settings:coupons" },
        {
          route: "Questionnaires",
          label: "Questionnaires",
          permission: "settings:questionnaires",
        },
      ],
    };
  },
  computed: {
    tabs() {
      return this.settings.filter((item) => this.$app.can(item.permission));
    },
  },
};
</script>
