<template>
  <div class="base-tags">
    <q-chip
      :square="square"
      :dense="dense"
      :ripple="false"
      class="tag"
      icon="fas fa-tag"
      v-for="(item, index) in visiable"
      :key="index"
      :removable="removable"
      @remove="$emit('remove', index)"
    >
      {{ item.label }}
    </q-chip>
    <q-chip :ripple="false" v-if="hidden > 0" :square="square" :dense="dense">
      {{ hidden }} +
    </q-chip>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";

export default {
  props: {
    modelValue: Array,
    removable: Boolean,
    square: Boolean,
    dense: Boolean,
    max: [Number, String],
  },
  emits: ["remove"],
  computed: {
    visiable() {
      const max = parseInt(this.max);
      const items = cloneDeep(this.modelValue);
      if (max && !this.removable) {
        return items.slice(0, max);
      }
      return items;
    },
    hidden() {
      return this.modelValue.length - parseInt(this.max);
    },
  },
};
</script>
