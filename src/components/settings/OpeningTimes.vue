<template>
  <base-table
    class="opening-times"
    hide-top
    hide-pagination
    :rows-per-page-options="[0]"
    :columns="columns"
    :rows="options"
    :loaded="loaded"
  >
    <template v-slot:body-cell-open_at="props">
      <base-time-input
        v-model="props.row.open_at"
        @update:model-value="onUpdateValue($event, 'open_at', props)"
      />
    </template>
    <template v-slot:body-cell-close_at="props">
      <base-time-input
        v-model="props.row.close_at"
        @update:model-value="onUpdateValue($event, 'close_at', props)"
      />
    </template>
    <template #bottom>
      <div class="col actions">
        <div class="flex">
          <q-space />
          <base-btn
            @click="$emit('save')"
            :disable="!changed"
            :loading="loading"
            icon="fad fa-save"
            :label="$t('label.save')"
          />
        </div>
      </div>
    </template>
  </base-table>
</template>

<script>
import { SettingsMixins } from "services/mixins/settings";

export default {
  mixins: [SettingsMixins],
  computed: {
    columns() {
      return [
        {
          name: "name",
          align: "left",
          label: this.$t("label.day"),
          field: "name",
        },
        {
          name: "open_at",
          align: "left",
          label: this.$t("label.openAt"),
          field: "open_at",
        },
        {
          name: "close_at",
          align: "left",
          label: this.$t("label.closeAt"),
          field: "close_at",
        },
      ];
    },
  },
};
</script>
