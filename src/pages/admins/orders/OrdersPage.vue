<template>
  <q-page padding>
    <base-section flat bordered no-row>
      <base-table
        ref="orders"
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
        v-model:selected="selected"
        selection="multiple"
      >
        <template v-slot:body-cell-id="props">
          <base-btn
            @click.stop
            link
            tag="a"
            :to="{
              name: 'Order',
              params: {
                id: props.row.id,
              },
              query: {
                action: 'view',
              },
            }"
          >
            {{ props.value }}
          </base-btn>
        </template>
        <template v-slot:body-cell-status="props">
          <base-status v-for="item in props.value" :key="item" :type="item" />
        </template>
      </base-table>
    </base-section>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useOrderStore } from "src/stores/order";
import { ResourcesPageMixins, defaultPagination } from "src/services/mixins";

export default {
  mixins: [ResourcesPageMixins],
  data() {
    return {
      store: useOrderStore(),
      pagination: {
        ...defaultPagination,
        sortBy: "CREATED_AT_DESC",
      },
    };
  },
  methods: {
    ...mapActions(useOrderStore, ["get"]),
    singleRoute(row) {
      return {
        name: "Order",
        params: {
          id: row.id,
        },
        query: {
          action: "edit",
          title: "#" + row.id,
        },
      };
    },
  },
  computed: {
    ...mapState(useOrderStore, [
      "actions",
      "rows",
      "columns",
      "module",
      "toolbar",
      "filters",
    ]),
    queryParams() {
      return { ...this.pagination, customer: this.$route.query?.customer };
    },
  },
};
</script>
