<template>
  <base-input
    bottom-slots
    outlined
    dense
    :modelValue="modelValue"
    :type="isPwd ? 'password' : 'text'"
    @update:model-value="onChange"
    class="password"
  >
    <template v-slot:append>
      <q-icon
        :name="isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
      />
    </template>
    <template v-for="slot in scopedSlots" v-slot:[slot]="props">
      <slot :name="slot" v-bind="props" v-bind:props="props"></slot>
    </template>
  </base-input>
</template>

<script>
export default {
  props: {
    modelValue: String,
    type: String,
    label: String,
    bgColor: String,
    dense: {
      type: Boolean,
      default: true,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    borderless: Boolean,
    view: Boolean,
    readonly: Boolean,
  },
  data() {
    return {
      isPwd: true,
    };
  },
  methods: {
    onChange(value) {
      console.func(
        "components/base/BasePasswordInput:methods.onChange",
        arguments
      );
      this.$emit("update:model-value", value);
    },
  },
  computed: {
    scopedSlots() {
      return Object.keys(this.$slots);
    },
  },
};
</script>
