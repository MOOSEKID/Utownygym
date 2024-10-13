<template>
  <div
    class="relative-position base-avatars"
    :style="{
      height: size,
      width: width + 'px',
    }"
  >
    <base-avatar
      v-for="(item, index) in visibleItems"
      name="users"
      :key="index"
      class="cursor-pointer"
      :user="item"
      tooltip
      :size="size"
      :overlapping="index"
    />
    <base-avatar
      v-if="hiddenItems > 0"
      name="users"
      class="cursor-pointer show-more"
      :user="hiddenItems + '+'"
      :size="size"
      :overlapping="max"
    />
  </div>
</template>

<script>
import { cloneDeep } from "lodash";

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    size: {
      type: String,
      default: "40px",
    },
    max: {
      type: Number,
      default: 3,
    },
  },
  computed: {
    cSize() {
      return parseInt(this.size, 10);
    },
    totalItems() {
      return this.items.length;
    },
    hiddenItems() {
      return this.totalItems - this.max;
    },
    visibleItems() {
      const items = cloneDeep(this.items);
      if (this.totalItems < this.max) {
        return items;
      }
      return items.splice(0, this.max);
    },
    width() {
      const size = this.cSize * 0.75;
      if (this.totalItems <= this.max) {
        return this.visibleItems.length * size;
      }
      return (this.visibleItems.length + 1) * size;
    },
  },
};
</script>
