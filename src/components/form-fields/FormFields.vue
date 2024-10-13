<template>
  <base-btn
    color="primary"
    class="form-btn"
    icon="control_point"
    :label="$t('addField')"
  >
    <q-menu auto-close>
      <q-list class="q-pa-sm" style="min-width: 200px">
        <base-item
          v-for="(item, index) in fields"
          :key="index"
          @click="onAdd(item)"
          clickable
          :icon="item.icon"
          :label="item.label"
          dense
        />
      </q-list>
    </q-menu>
  </base-btn>
</template>

<script>
import { mapState } from "pinia";
import { useQuestionnaireStore } from "src/stores/questionnaire";

export default {
  props: {
    onAdd: Function,
  },
  computed: {
    ...mapState(useQuestionnaireStore, ["fields"]),
  },
};
</script>
