<template>
  <q-item v-for="(item, index) in lineItems" :key="index" class="q-px-none">
    <q-item-section avatar>
      <base-thumbnail :size="40" :media="item.thumbnail">
        <q-badge
          rounded
          floating
          color="orange-3"
          text-color="black"
          :label="item.quantity"
        />
      </base-thumbnail>
    </q-item-section>
    <q-item-section>
      <q-item-label lines="1">{{ item.title }}</q-item-label>
      <q-item-label caption v-if="item.variant_title">
        {{ item.variant_title }}
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-item-label>
        {{
          $core.money(item.total, {
            currency: currency,
          })
        }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: {
    currency: String,
    lineItems: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
