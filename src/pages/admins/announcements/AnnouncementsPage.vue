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
        :no-data-label="$t('announcements.noData')"
        table-key="announcements"
        v-model:selected="selected"
        selection="multiple"
      >
        <template v-slot:body-cell-date="props">
          <base-btn
            @click.stop
            link
            size="12px"
            tag="a"
            :to="{
              name: 'Announcement',
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
      </base-table>
    </base-section>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useAnnouncementStore } from "stores/announcement";
import { ResourcesPageMixins, defaultPagination } from "src/services/mixins";

export default {
  mixins: [ResourcesPageMixins],
  data() {
    return {
      store: useAnnouncementStore(),
      pagination: {
        ...defaultPagination,
        sortBy: "date",
      },
    };
  },
  methods: {
    ...mapActions(useAnnouncementStore, ["get"]),
    singleRoute(row) {
      return {
        name: "Announcement",
        params: {
          id: row.id,
        },
        query: {
          action: "edit",
        },
      };
    },
  },
  computed: {
    ...mapState(useAnnouncementStore, [
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
