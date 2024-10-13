<template>
  <q-page padding>
    <settings-page-header
      back-route="Settings"
      class="q-mb-md"
      title="Plans"
      hint="Effortlessly manage and customize your subscription plans in the Settings section for a tailored and seamless experience."
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
        :no-data-label="$t('plans.noData')"
        table-key="plans"
        selection="multiple"
        v-model:selected="selected"
        :grid-columns="['label,prices']"
      >
        <template v-slot:body-cell-label="props">
          <base-btn
            @click.stop
            link
            tag="a"
            :to="{
              name: 'Plan',
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
        <template v-slot:body-cell-is_active="props">
          <q-toggle
            @update:model-value="changeActive(props.row)"
            size="sm"
            dense
            :model-value="props.row.is_active"
            color="green"
          />
        </template>
      </base-table>
    </base-section>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { usePlanStore } from "stores/plan";
import { ResourcesPageMixins, defaultPagination } from "src/services/mixins";
import SettingsPageHeader from "src/components/SettingsPageHeader.vue";

export default {
  components: { SettingsPageHeader },
  mixins: [ResourcesPageMixins],
  data() {
    return {
      store: usePlanStore(),
      pagination: {
        ...defaultPagination,
        sortBy: "label",
      },
    };
  },
  methods: {
    ...mapActions(usePlanStore, ["get", "changeActive"]),
    singleRoute(row) {
      return {
        name: "Plan",
        params: {
          id: row.id,
        },
        query: {
          action: "edit",
          title: row.label,
        },
      };
    },
  },
  computed: {
    ...mapState(usePlanStore, [
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
