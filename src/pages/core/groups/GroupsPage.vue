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
        :no-data-label="$t('groups.noData')"
        table-key="groups"
        selection="multiple"
        v-model:selected="selected"
        hide-label
      >
        <template v-slot:body-cell-name="props">
          <base-btn
            @click.stop
            link
            tag="a"
            :to="{
              name: 'Group',
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

        <template v-slot:body-cell-description="props">
          <div class="ellipsis-2-lines">{{ props.value }}</div>
        </template>
      </base-table>
    </base-section>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useGroupStore } from "stores/group";
import { ResourcesPageMixins, defaultPagination } from "src/services/mixins";

export default {
  mixins: [ResourcesPageMixins],
  data() {
    return {
      store: useGroupStore(),
      pagination: {
        ...defaultPagination,
        sortBy: "name",
      },
    };
  },
  methods: {
    ...mapActions(useGroupStore, ["get"]),
    singleRoute(row) {
      return {
        name: "Group",
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
    ...mapState(useGroupStore, [
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
