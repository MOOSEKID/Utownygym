<template>
  <q-card
    @click.stop="$emit('update:selected', { ...$props })"
    :class="{ 'payment-method-card cursor-pointer': true, selected: isCurrent }"
    bordered
    flat
  >
    <q-card-section>
      <q-item dense class="q-pa-none">
        <q-item-section class="card-brand" top avatar>
          <q-icon size="md" :name="_icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">
            {{ name }}
          </q-item-label>
          <q-item-label caption lines="2">
            {{ hint }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  emits: ["updated", "removed", "update:selected"],
  props: {
    id: [Number, String],
    pId: [Number, String],
    selected: {
      type: Object,
      default: () => ({}),
    },
    name: String,
    icon: String,
    logo: String,
    provider: String,
    brand: String,
    hint: String,
  },
  computed: {
    isCurrent() {
      return this.selected?.id === this.id;
    },
    _icon() {
      const urlPattern = /^(https?:\/\/[^\s]+)$/;
      if (this.logo && urlPattern.test(this.logo)) {
        return `img:${this.logo}`;
      } else {
        return this.logo ? this.logo : `fab fa-cc-${this.brand || "visa"}`;
      }
    },
  },
};
</script>

<style lang="scss">
.payment-method-card.selected {
  border-color: $primary;
  background-color: rgba($primary, 0.2);
}
</style>
