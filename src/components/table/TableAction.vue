<template>
  <base-btn
    flat
    dense
    size="md"
    @click.stop
    :loading="loading"
    color="black"
    icon="far fa-ellipsis-h"
  >
    <q-menu dense anchor="bottom end" self="top end">
      <q-list class="q-pa-sm actions" dense style="min-width: 100px">
        <base-item
          v-for="(item, index) in actionItems"
          :key="index"
          v-show="hasPermission(item, row)"
          @click="onActionClicked(item, row)"
          :icon="getValue(item, row, 'icon')"
          :label="getValue(item, row, 'label')"
        />
      </q-list>
    </q-menu>
  </base-btn>
</template>
<script>
export default {
  props: {
    row: {},
    loading: Boolean,
    actionItems: Array,
    getValue: Function,
    hasPermission: Function,
    onActionClicked: Function,
  },
};
</script>
