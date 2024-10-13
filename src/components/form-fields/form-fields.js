export const FormFieldMixin = {
  props: {
    modelValue: {
      default: undefined,
    },
    label: {
      type: String,
      default: undefined,
    },
    description: {
      type: String,
      default: undefined,
    },
    type: {
      required: true,
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
    config: {
      type: Object,
      default: undefined,
    },
    readonly: Boolean,
  },
  data() {
    return {
      inputValue: this.modelValue,
    };
  },
  computed: {
    placeholder() {
      return this.config.placeholder;
    },
    classes() {
      return this.config.classes;
    },
    hideLabel() {
      return this.config.hideLabel;
    },
    required() {
      return this.config.required;
    },
  },
};
