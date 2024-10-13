<template>
  <q-page padding>
    <base-section flat bordered no-row>
      <base-table
        :store="store"
        :module="module"
        :columns="getColumns"
        :rows="rows"
        :actions="actions"
        :toolbar="getToolbar"
        :filters="filters"
        :loading="loading"
        :pagination="pagination"
        @request="onRequest"
        @action-clicked="actionClicked"
        @toolbar-clicked="toolbarClicked"
        @row-clicked="rowClicked"
        :no-data-label="$t('guestPasses.noData')"
        no-permissions
      >
        <template v-slot:body-cell-name="props">
          <base-btn
            @click.stop
            link
            size="12px"
            tag="a"
            :to="{
              name: 'Guest Pass',
              params: {
                id: props.row.id,
                title: props.row.name,
              },
              query: {
                action: 'edit',
              },
            }"
          >
            {{ props.value }}
          </base-btn>
        </template>
      </base-table>
    </base-section>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useGuestPassStore } from "stores/guest-pass";
import { ResourcesPageMixins, defaultPagination } from "src/services/mixins";

export default {
  mixins: [ResourcesPageMixins],
  data() {
    return {
      store: useGuestPassStore(),
      pagination: {
        ...defaultPagination,
        sortBy: "id",
      },
    };
  },
  methods: {
    ...mapActions(useGuestPassStore, ["get"]),
    singleRoute(row) {
      return {
        name: "Guest Pass",
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
    ...mapState(useGuestPassStore, [
      "actions",
      "rows",
      "columns",
      "module",
      "toolbar",
      "filters",
    ]),
    getColumns() {
      return this.columns.filter((item) => item.guard.includes(this.guard));
    },
    getToolbar() {
      return this.toolbar.filter((item) => item.guard.includes(this.guard));
    },
  },
};
</script>
