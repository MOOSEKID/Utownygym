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
        :no-data-label="$t('members.noData')"
        :visible-columns="visibleColumns"
        table-key="members"
        selection="multiple"
        v-model:selected="selected"
        hide-label
        :grid-columns="['avatar', 'id,name,email,status']"
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
          <i
            :class="`q-mr-sm q-icon fas fa-circle rag-${
              props.row.rag || 'white'
            }`"
            style="font-size: 8px"
            aria-hidden="true"
            role="presentation"
          ></i>
          <base-btn
            @click.stop
            link
            size="12px"
            tag="a"
            :to="{
              name: 'Member',
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
        <template v-slot:body-cell-subscription="props">
          <base-status v-if="props.value" :type="props.value" />
        </template>
        <template v-slot:body-cell-status="props">
          <base-status :type="props.value" />
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
      </base-table>
    </base-section>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useMemberStore } from "stores/member";
import { ResourcesPageMixins, defaultPagination } from "src/services/mixins";

export default {
  mixins: [ResourcesPageMixins],
  data() {
    return {
      store: useMemberStore(),
      pagination: {
        ...defaultPagination,
        sortBy: "id",
        includes: ["lastLogin"],
        override: ["includes"],
      },
    };
  },
  methods: {
    ...mapActions(useMemberStore, ["get", "changeActive"]),
    singleRoute(row) {
      return {
        name: "Member",
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
    ...mapState(useMemberStore, [
      "actions",
      "rows",
      "columns",
      "module",
      "toolbar",
      "filters",
    ]),
    visibleColumns() {
      return this.columns
        .filter(
          (item) =>
            (item.status && item.status.includes(this.pagination.status)) ||
            !item.status
        )
        .map((item) => item.name);
    },
  },
};
</script>
