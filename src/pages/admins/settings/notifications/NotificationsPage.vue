<template>
  <q-page padding>
    <settings-page-header
      class="q-mb-md"
      title="Notifications"
      back-route="Settings"
      :hint="$t('hint.notifications')"
    />
    <base-section flat bordered no-row>
      <base-table
        hide-label
        ref="notifications"
        :store="store"
        :module="module"
        :columns="columns"
        :rows="rows"
        :actions="actions"
        :filters="filters"
        :loading="loading"
        :pagination="pagination"
        @request="onRequest"
        @row-clicked="rowClicked"
        :grid-columns="['label,type', 'default']"
        no-permissions
      >
        <template v-slot:body-cell-label="props">
          <base-btn
            @click.stop
            link
            size="12px"
            tag="a"
            :to="{
              name: 'Notification',
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
          <q-item-label caption lines="1">
            <small>{{ props.row.subject }}</small>
          </q-item-label>
        </template>
        <template v-slot:body-cell-default="props">
          <q-icon
            v-if="props.row.is_default"
            name="fas fa-star"
            color="warning"
          />
          <span v-else></span>
        </template>
      </base-table>
    </base-section>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useNotificationStore } from "stores/notification";
import { ResourcesPageMixins, defaultPagination } from "src/services/mixins";
import SettingsPageHeader from "src/components/SettingsPageHeader.vue";

export default {
  components: { SettingsPageHeader },
  mixins: [ResourcesPageMixins],
  data() {
    return {
      store: useNotificationStore(),
      pagination: {
        ...defaultPagination,
        sortBy: "type",
      },
    };
  },
  methods: {
    ...mapActions(useNotificationStore, ["get"]),
    singleRoute(row) {
      return {
        name: "Notification",
        params: {
          id: row.id,
        },
        query: {
          action: "edit",
          title: row.label,
        },
      };
    },
  },
  computed: {
    ...mapState(useNotificationStore, [
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
