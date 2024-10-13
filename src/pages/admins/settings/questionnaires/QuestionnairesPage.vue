<template>
  <q-page padding>
    <settings-page-header
      class="q-mb-md"
      title="Questionnaires"
      back-route="Settings"
      :hint="
        $t(
          'effortlesslyManageYourQuestionnairesInTheSettingsSectionForATailoredAndSeamlessExperience'
        )
      "
    />
    <base-section flat bordered no-row>
      <base-table
        hide-label
        ref="questionnaires"
        :store="store"
        :module="module"
        :columns="columns"
        :rows="rows"
        :actions="actions"
        :filters="filters"
        :toolbar="toolbar"
        :loading="loading"
        :pagination="pagination"
        @request="onRequest"
        @row-clicked="rowClicked"
        :grid-columns="['name,created_at', 'default']"
        no-permissions
      >
        <template v-slot:body-cell-name="props">
          <base-btn
            @click.stop
            link
            size="12px"
            tag="a"
            :to="{
              name: 'Questionnaire',
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
        <template v-slot:body-cell-default="props">
          <q-icon v-if="props.row.default" name="fas fa-star" color="warning" />
          <span v-else></span>
        </template>
        <template v-slot:body-cell-active="props">
          <q-toggle
            @update:model-value="props.col.action(props.row)"
            size="sm"
            dense
            :model-value="props.row.active"
            color="green"
          />
        </template>
      </base-table>
    </base-section>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useQuestionnaireStore } from "stores/questionnaire";
import { ResourcesPageMixins, defaultPagination } from "src/services/mixins";
import SettingsPageHeader from "src/components/SettingsPageHeader.vue";

export default {
  components: { SettingsPageHeader },
  mixins: [ResourcesPageMixins],
  data() {
    return {
      store: useQuestionnaireStore(),
      pagination: {
        ...defaultPagination,
        sortBy: "name",
      },
    };
  },
  methods: {
    ...mapActions(useQuestionnaireStore, ["get"]),
    singleRoute(row) {
      return {
        name: "Questionnaire",
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
    ...mapState(useQuestionnaireStore, [
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
