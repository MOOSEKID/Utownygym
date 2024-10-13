<template>
  <div class="plan-usages">
    <q-item
      dense
      v-for="(item, index) in features"
      :key="index"
      class="feature text-grey-10 q-pa-none"
    >
      <q-item-section>
        <q-item-label>
          {{ item.label }}
          <q-icon size="12px" name="fal fa-info-circle">
            <base-tooltip>{{ item.description }}</base-tooltip>
          </q-icon>
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label v-if="item.type === 'integer'">
          <span :class="getClass(item)">
            {{ item.used }}
          </span>
          <span v-if="item.value < 0">/Unlimited</span>
          <span v-else>/{{ item.value }}</span>
        </q-item-label>
        <q-item-label v-else>
          <q-icon
            :color="item.value ? 'positive' : 'negative'"
            :name="item.value ? 'fas fa-check' : 'fas fa-times'"
          />
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  props: {
    features: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const getClass = ({ value, used }) => ({
      "text-bold": true,
      "text-negative": value > 0 && value === used,
    });

    return { getClass };
  },
};
</script>
