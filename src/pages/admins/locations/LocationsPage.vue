<template>
  <q-page padding>
    <base-section flat bordered no-row>
      <base-table
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
        :no-data-label="$t('locations.noData')"
        table-key="locations"
      >
        <template v-slot:body-cell-label="props">
          <base-btn
            @click.stop
            link
            size="12px"
            tag="a"
            :to="{
              name: 'Location',
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
import { useLocationStore } from "stores/location";
import { ResourcesPageMixins, defaultPagination } from "src/services/mixins";

export default {
  mixins: [ResourcesPageMixins],
  data() {
    return {
      store: useLocationStore(),
      pagination: {
        ...defaultPagination,
        descending: false,
        sortBy: "label",
      },
    };
  },
  methods: {
    ...mapActions(useLocationStore, ["get", "changeActive"]),
    singleRoute(row) {
      return {
        name: "Location",
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
    ...mapState(useLocationStore, [
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
