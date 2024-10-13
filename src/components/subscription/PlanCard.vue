<template>
  <q-card
    :class="{
      'plan-card cursor-pointer': true,
      'current bg-secondary': current && (!disable || !dense),
      selected: selected,
    }"
    @click="onChange"
  >
    <q-card-section>
      <q-item class="q-pa-none">
        <q-item-section>
          <q-item-label :class="{ flex: !dense }">
            <div class="name text-subtitle2">
              {{ label }}
            </div>
            <q-space />
            <div class="text-grey price">
              <span class="text-subtitle2">
                {{ price_formated }}
              </span>
              <span>{{ intervalLabel }}</span>
            </div>
          </q-item-label>
          <q-item-label v-if="!dense">
            <div class="features">
              <ul>
                <li v-for="(feature, index) in features" :key="index">
                  <span v-html="feature"></span>
                </li>
              </ul>
            </div>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState } from "pinia";
import { useSubscriptionStore } from "stores/subscription";

export default {
  props: {
    id: [Number, String],
    modelValue: {},
    label: String,
    features: {
      type: Array,
      default: () => [],
    },
    interval: String,
    interval_count: [String, Number],
    price_formated: String,
    price: [String, Number],
    disable: Boolean,
    dense: Boolean,
  },
  emits: ["update:model-value"],
  methods: {
    onChange() {
      if (this.disable || this.current) return false;

      const mode = this.currentPlan?.id ? "change" : "create";
      const val = { ...this.$props, feature_lines: this.features };

      this.$emit("update:model-value", val, mode);
    },
  },
  computed: {
    ...mapState(useSubscriptionStore, ["currentPlan"]),
    current() {
      return this.id === this.currentPlan?.id;
    },
    selected() {
      return this.modelValue?.id === this.id;
    },
    intervalLabel() {
      return this.$core.priceToInterval(this.$props, false, true);
    },
  },
  watch: {
    interval() {
      if (this.selected) {
        this.onChange();
      }
    },
  },
};
</script>

<style lang="scss">
.plan-card.selected {
  border-color: $primary;
  background-color: rgba($primary, 0.2);
}
</style>
