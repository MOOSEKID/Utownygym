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
        :no-data-label="$t('products.noData')"
        table-key="products"
        selection="multiple"
        v-model:selected="selected"
      >
        <template v-slot:body-cell-title="props">
          <q-item class="q-pa-none" dense>
            <q-item-section avatar>
              <base-thumbnail :size="40" :media="props.row.thumbnail" />
            </q-item-section>
            <q-item-section avatar>
              <base-btn
                @click.stop
                link
                :style="props.col.style"
                tag="a"
                :to="{
                  name: 'Product',
                  params: {
                    id: props.row.id,
                  },
                  query: {
                    action: 'edit',
                  },
                }"
                align="left"
              >
                <div class="ellipsis">
                  {{ props.value }}
                </div>
              </base-btn>
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:body-cell-status="props">
          <base-status :type="props.row.status" />
        </template>
      </base-table>
    </base-section>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useProductStore } from "src/stores/product";
import { ResourcesPageMixins, defaultPagination } from "src/services/mixins";

export default {
  mixins: [ResourcesPageMixins],
  data() {
    return {
      store: useProductStore(),
      pagination: {
        ...defaultPagination,
        sortBy: "TITLE_ASC",
      },
    };
  },
  methods: {
    ...mapActions(useProductStore, ["get"]),
    singleRoute(row) {
      return {
        name: "Product",
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
    ...mapState(useProductStore, [
      "rows",
      "actions",
      "module",
      "columns",
      "toolbar",
      "filters",
    ]),
    queryParams() {
      const { vendor, category, tag, collection } = this.pagination;
      return {
        ...this.pagination,
        vendor: vendor?.id,
        category: category?.id,
        tag: tag?.id,
        collection: collection?.id,
      };
    },
  },
  watch: {
    $route() {
      this.onRequest({
        pagination: this.pagination,
      });
    },
  },
};
</script>
