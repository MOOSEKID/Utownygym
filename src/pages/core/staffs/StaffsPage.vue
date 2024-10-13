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
        :no-data-label="$t('staff.noData')"
        table-key="staffs"
        selection="multiple"
        v-model:selected="selected"
        hide-label
        :grid-columns="['avatar', 'name,email,groups']"
      >
        <template v-slot:body-cell-avatar="props">
          <base-avatar
            rounded
            class="cursor-pointer"
            :user="props.row"
            size="40px"
          />
        </template>
        <template v-slot:body-cell-name="props">
          <base-btn
            @click.stop
            link
            tag="a"
            :to="{
              name: 'Staff',
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
        <template v-slot:body-cell-is_supper_admin="props">
          <q-toggle
            @update:model-value="changeAdmin(props.row)"
            size="sm"
            dense
            :model-value="props.row.is_supper_admin"
            color="green"
          />
        </template>
        <template v-slot:body-cell-groups="props">
          <q-chip
            size="12px"
            v-for="item in props.row.groups"
            :key="item.id"
            :label="item.name"
          />
        </template>
      </base-table>
    </base-section>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useStaffStore } from "stores/staff";
import { ResourcesPageMixins, defaultPagination } from "src/services/mixins";

export default {
  mixins: [ResourcesPageMixins],
  data() {
    return {
      store: useStaffStore(),
      pagination: {
        ...defaultPagination,
        sortBy: "name",
      },
    };
  },
  methods: {
    ...mapActions(useStaffStore, ["get", "changeActive", "changeAdmin"]),
    singleRoute(row) {
      return {
        name: "Staff",
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
    ...mapState(useStaffStore, [
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
