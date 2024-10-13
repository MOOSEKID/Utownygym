export const SettingsMixins = {
  props: {
    options: Array,
    loaded: Boolean,
    changed: Boolean,
    loading: Boolean,
  },
  emits: ["save", "update"],
  methods: {
    onChange(value, { rowIndex }) {
      console.func("services/mixins/settings:methods.onChange()", arguments);
      const options = this.options;
      options[rowIndex] = value;
      this.$emit("update", options);
    },
    onRemove({ rowIndex }) {
      console.func("services/mixins/settings:methods.onRemove()", arguments);
      const options = this.options;
      options.splice(rowIndex, 1);
      this.$emit("update", options);
    },
    onUpdateValue(val, key, { rowIndex }) {
      console.func(
        "services/mixins/settings:methods.onUpdateValue()",
        arguments
      );
      const options = this.options;
      options[rowIndex][key] = val;
      this.$emit("update", options);
    },
  },
};
