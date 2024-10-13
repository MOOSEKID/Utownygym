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
        no-data-label="No blogs avaialble"
        table-key="blogs"
        selection="multiple"
        v-model:selected="selected"
        :grid-columns="['thumbnail', 'title,tags', 'url']"
      >
        <template v-slot:body-cell-thumbnail="props">
          <base-thumbnail :size="40" :media="props.row.thumbnail" />
        </template>
        <template v-slot:body-cell-title="props">
          <base-btn
            @click.stop
            link
            :style="props.col.style"
            tag="a"
            :to="{
              name: 'Blog',
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
        <template v-slot:body-cell-url="props">
          <base-btn
            @click.stop
            link
            icon="fas fa-earth-americas"
            :href="props.value"
            tag="a"
            target="__blank"
          />
        </template>
        <template v-slot:body-cell-tags="props">
          <base-tags max="2" v-model="props.value" dense square />
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
import { useBlogStore } from "stores/blog";
import { ResourcesPageMixins, defaultPagination } from "src/services/mixins";

export default {
  mixins: [ResourcesPageMixins],
  data() {
    return {
      store: useBlogStore(),
      pagination: {
        ...defaultPagination,
        sortBy: "title",
      },
    };
  },
  methods: {
    ...mapActions(useBlogStore, ["get", "changeActive"]),
    singleRoute(row) {
      return {
        name: "Blog",
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
    ...mapState(useBlogStore, [
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
