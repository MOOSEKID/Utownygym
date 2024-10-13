<template>
  <q-page padding>
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
        @row-clicked="rowClicked"
        no-data-label="No pages avaialble"
        table-key="pages"
        selection="multiple"
        v-model:selected="selected"
        :grid-columns="['title', 'url']"
      >
        <template v-slot:body-cell-title="props">
          <base-btn
            @click.stop
            link
            :style="props.col.style"
            tag="a"
            :to="{
              name: 'Page',
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
        </template>
        <template v-slot:body-cell-template="props">
          <q-badge v-if="props.value" :label="props.value" />
        </template>
        <template v-slot:body-cell-url="props">
          <base-btn
            @click.stop
            link
            icon="fas fa-earth-americas"
            :href="props.value"
            tag="a"
            target="_blank"
          />
        </template>
        <template v-slot:body-cell-is_active="props">
          <q-toggle
            dense
            size="xs"
            color="green"
            :model-value="props.row.is_active"
            @update:model-value="changeActive(props.row)"
          />
        </template>
      </base-table>
    </base-section>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { usePageStore } from "stores/page";
import { ResourcesPageMixins, defaultPagination } from "src/services/mixins";

export default {
  mixins: [ResourcesPageMixins],
  data() {
    return {
      store: usePageStore(),
      pagination: {
        ...defaultPagination,
        sortBy: "title",
      },
    };
  },
  methods: {
    ...mapActions(usePageStore, ["get", "changeActive"]),
    singleRoute(row) {
      return {
        name: "Page",
        params: {
          id: row.id,
        },
        query: {
          action: "edit",
          title: row.title,
        },
      };
    },
  },
  computed: {
    ...mapState(usePageStore, [
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
