<template>
  <q-item clickable :class="classes">
    <slot>
      <q-item-section v-if="icon || iconSpace" style="min-width: auto" avatar>
        <q-icon :color="iconColor" size="15px" :name="icon" />
      </q-item-section>
      <q-item-section>
        {{ label }}
      </q-item-section>
      <q-item-section v-if="notification || $slots.side" side>
        <slot name="side">
          <q-badge
            rounded
            color="warning"
            text-color="black"
            class="text-bold"
            :label="notification"
          />
        </slot>
      </q-item-section>
    </slot>
  </q-item>
</template>

<script>
export default {
  props: {
    label: [Number, String],
    icon: String,
    type: String,
    iconColor: String,
    notification: [String, Number],
    link: Boolean,
    squared: Boolean,
    noHover: Boolean,
    iconSpace: Boolean,
    bordered: Boolean,
  },
  computed: {
    classes() {
      return {
        "base-item": true,
        link: this.link,
        "no-hover": this.noHover,
        "rounded-borders": !this.squared,
        bordered: this.bordered,
      };
    },
  },
};
</script>
