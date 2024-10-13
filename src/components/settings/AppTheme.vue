<template>
  <div class="app-themes q-pb-md">
    <div v-if="loaded" class="q-pt-md row q-col-gutter-md">
      <div class="col-xs-12 col-sm-3">
        <div class="text-label">Dark Mode</div>
        <base-select
          dense
          outlined
          :options="themeOptions"
          :model-value="darkValue"
          emit-value
          map-options
          @update:model-value="onChange($event, 'dark')"
        />
      </div>
      <div
        v-for="(item, index) in colors"
        :key="index"
        class="col-sm-3 col-xs-12"
      >
        <div class="text-label">{{ item.label }}</div>
        <base-color-input
          use-picker
          show-value
          :model-value="item.value"
          @update:model-value="onChange($event, item.key)"
        />
      </div>
      <div class="col-sm-12 col-xs-12 flex self-end">
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
    <base-section-skeleton v-else />
  </div>
</template>

<script>
import { getCssVar } from "quasar";
import BaseSectionSkeleton from "../skeleton/BaseSectionSkeleton.vue";

const colors = [
  { key: "primary", label: "Primary color" },
  { key: "secondary", label: "Secondary color" },
  { key: "accent", label: "Accent color" },
  { key: "positive", label: "Positive color" },
  { key: "negative", label: "Negative color" },
  { key: "info", label: "Info color" },
  { key: "warning", label: "Warning color" },
];

export default {
  components: { BaseSectionSkeleton },
  props: {
    options: Object,
    loaded: Boolean,
    changed: Boolean,
    loading: Boolean,
  },
  emits: ["update", "save"],
  data() {
    return {
      themeOptions: [
        { value: "auto", label: "System Default" },
        { value: true, label: "Dark" },
        { value: false, label: "Light" },
      ],
    };
  },
  methods: {
    onChange(val, key) {
      console.func(
        "components/settings/AppTheme:methods.onChange()",
        arguments
      );
      const options = this.options;
      options[key] = val;
      this.$emit("update", options);
      if (key === "dark") {
        this.$q.dark.set(val);
      }
    },
  },
  computed: {
    colors() {
      const value = (key) => this.options[key] || getCssVar(key);
      return colors.map((item) => ({ ...item, value: value(item.key) }));
    },
    darkValue() {
      if (this.options.dark === undefined) {
        return "auto";
      }
      return this.options.dark;
    },
  },
};
</script>
