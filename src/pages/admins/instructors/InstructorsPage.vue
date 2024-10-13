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
        :no-data-label="$t('instructors.noData')"
        table-key="instructors"
      >
        <template v-slot:body-cell-name="props">
          <q-item class="q-pa-none" dense>
            <q-item-section avatar>
              <base-avatar
                rounded
                class="cursor-pointer"
                :user="props.row"
                size="40px"
              />
            </q-item-section>
            <q-item-section avatar>
              <base-btn
                @click.stop
                link
                size="12px"
                tag="a"
                :to="{
                  name: 'Instructor',
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
            </q-item-section>
          </q-item>
        </template>
      </base-table>
    </base-section>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useInstructorStore } from "stores/instructor";
import { ResourcesPageMixins, defaultPagination } from "src/services/mixins";

export default {
  mixins: [ResourcesPageMixins],
  data() {
    return {
      store: useInstructorStore(),
      pagination: {
        ...defaultPagination,
        descending: false,
        sortBy: "name",
        status: "Active",
      },
    };
  },
  methods: {
    ...mapActions(useInstructorStore, ["get"]),
    singleRoute(row) {
      return {
        name: "Instructor",
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
    ...mapState(useInstructorStore, [
      "actions",
      "rows",
      "columns",
      "module",
      "toolbar",
      "filters",
    ]),
    queryParams() {
      const { classlist } = this.pagination;
      return { ...this.pagination, class: classlist ? classlist.id : null };
    },
  },
};
</script>
