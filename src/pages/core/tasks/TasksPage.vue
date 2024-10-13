<template>
  <q-page padding>
    <base-section flat bordered no-row>
      <base-table
        hide-label
        :store="store"
        :module="module"
        :actions="actions"
        :columns="columns"
        :rows="rows"
        :toolbar="toolbar"
        :filters="filters"
        :loading="loading"
        :pagination="pagination"
        @request="onRequest"
        @toolbar-clicked="toolbarClicked"
        @row-clicked="rowClicked"
        :no-data-label="$t('tasks.noData')"
        table-key="tasks"
        selection="multiple"
        v-model:selected="selected"
        :grid-columns="['status,id,user,last_reply,users']"
      >
        <template v-slot:body-cell-id="props">
          <base-btn
            @click.stop
            link
            size="12px"
            tag="a"
            align="left"
            :to="{
              name: 'Task',
              params: {
                id: props.row.id,
              },
              query: {
                action: 'edit',
                title: props.row.subject,
              },
            }"
            :style="props.col.style"
          >
            <div class="ellipsis">{{ props.value }}</div>
          </base-btn>
          <base-btn
            v-show="props.row.message"
            class="q-ml-xs"
            size="md"
            link
            color="black"
            icon="fal fa-align-left"
            @click.stop
          >
            <q-popup-proxy>
              <q-banner style="width: 350px">
                <base-label>{{ $t("label.message") }}</base-label>
                <span v-html="props.row.message"></span>
              </q-banner>
            </q-popup-proxy>
          </base-btn>
        </template>
        <template v-slot:body-cell-status="props">
          <base-status :type="props.value" />
        </template>

        <template v-slot:body-cell-users="props">
          <base-avatars :items="props.row.users" :max="2" size="30px" />
        </template>
        <template v-slot:body-cell-is_archived="props">
          <q-checkbox
            @update:model-value="changeArchived(props.row)"
            size="sm"
            dense
            :model-value="props.row.is_archived"
            color="green"
          />
        </template>
        <template v-slot:body-cell-last_reply="props">
          <span>{{ props.value }}</span>
          <base-btn
            v-show="props.row.last_reply"
            class="q-ml-sm"
            size="md"
            link
            color="black"
            icon="fal fa-align-left"
            @click.stop
          >
            <q-popup-proxy>
              <q-banner style="width: 350px">
                <base-label>{{ $t("lastMessage") }}</base-label>
                <span v-html="$core.nl2br(props.row.last_reply.message)"></span>
              </q-banner>
            </q-popup-proxy>
          </base-btn>
        </template>
      </base-table>
    </base-section>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useTaskStore } from "stores/task";
import { ResourcesPageMixins, defaultPagination } from "src/services/mixins";

export default {
  mixins: [ResourcesPageMixins],
  data() {
    return {
      store: useTaskStore(),
      pagination: {
        ...defaultPagination,
        sortBy: "last_reply",
        status: this.$route.meta.status,
      },
    };
  },
  methods: {
    ...mapActions(useTaskStore, ["get", "changeArchived"]),
    singleRoute(row) {
      return {
        name: "Task",
        params: {
          id: row.id,
        },
        query: {
          action: "edit",
          title: row.subject,
        },
      };
    },
  },
  computed: {
    ...mapState(useTaskStore, [
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
