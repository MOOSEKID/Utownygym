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
        :no-data-label="$t('classes.noData')"
        v-model:selected="selected"
        selection="multiple"
      >
        <template v-slot:body-cell-name="props">
          <base-btn
            @click.stop
            link
            size="12px"
            tag="a"
            :to="{
              name: 'Class',
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

        <template v-slot:body-cell-has_description="props">
          <q-toggle
            @update:model-value="changeHasDescription(props.row)"
            size="sm"
            dense
            :model-value="props.row.has_description"
            color="green"
          />
        </template>

        <template v-slot:body-cell-description="props">
          <div class="ellipsis-2-lines">{{ props.value }}</div>
        </template>
      </base-table>
    </base-section>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useClassListStore } from "stores/class-list";
import { ResourcesPageMixins, defaultPagination } from "src/services/mixins";

export default {
  mixins: [ResourcesPageMixins],
  data() {
    return {
      store: useClassListStore(),
      pagination: {
        ...defaultPagination,
        descending: false,
        sortBy: "name",
      },
    };
  },
  methods: {
    ...mapActions(useClassListStore, [
      "get",
      "changeActive",
      "changeHasDescription",
    ]),
    singleRoute(row) {
      return {
        name: "Class",
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
    ...mapState(useClassListStore, [
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
