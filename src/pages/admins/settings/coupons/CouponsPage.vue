<template>
  <q-page padding>
    <settings-page-header
      class="q-mb-md"
      title="Coupons"
      back-route="Settings"
      hint="Effortlessly manage your coupons in the Settings section for a tailored and seamless experience."
    />
    <base-section flat bordered no-row>
      <base-table
        hide-label
        :store="store"
        :module="module"
        :columns="columns"
        :rows="rows"
        :actions="actions"
        :toolbar="toolbar"
        :filters="filters"
        :loading="loading"
        :pagination="pagination"
        @request="onRequest"
        @action-clicked="actionClicked"
        @toolbar-clicked="toolbarClicked"
        @row-clicked="rowClicked"
        :no-data-label="$t('coupons.noData')"
        table-key="coupons"
        selection="multiple"
        v-model:selected="selected"
        :grid-columns="['name,promotion_code,off,expires_at']"
      >
        <template v-slot:body-cell-name="props">
          <base-btn
            @click.stop
            link
            size="12px"
            tag="a"
            :to="{
              name: 'Coupon',
              params: {
                id: props.row.id,
              },
              query: {
                action: 'edit',
              },
            }"
          >
            {{ props.value }}
          </base-btn>
        </template>
        <template v-slot:body-cell-active="props">
          <q-toggle
            @update:model-value="changeActive(props.row)"
            size="sm"
            dense
            :model-value="props.row.active"
            color="green"
          />
        </template>
      </base-table>
    </base-section>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useCouponStore } from "stores/coupon";
import { ResourcesPageMixins, defaultPagination } from "src/services/mixins";
import SettingsPageHeader from "src/components/SettingsPageHeader.vue";

export default {
  components: { SettingsPageHeader },
  mixins: [ResourcesPageMixins],
  data() {
    return {
      store: useCouponStore(),
      pagination: {
        ...defaultPagination,
        sortBy: "name",
      },
    };
  },
  methods: {
    ...mapActions(useCouponStore, ["get", "changeActive"]),
    singleRoute(row) {
      return {
        name: "Coupon",
        params: {
          id: row.id,
        },
        query: {
          action: "edit",
          title: row.name,
        },
      };
    },
  },
  computed: {
    ...mapState(useCouponStore, [
      "actions",
      "rows",
      "columns",
      "module",
      "toolbar",
      "filters",
    ]),
  },
};
</script>
