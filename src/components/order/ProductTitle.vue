<template>
  <div>
    <template v-if="is_custom">
      {{ title }}
    </template>
    <template v-else>
      <base-btn v-if="!is_product_deleted" link size="12px" tag="a" :to="link">
        {{ title }}
      </base-btn>
      <template v-else>
        <span>
          {{ title }}
          <q-icon
            class="q-ml-xs"
            name="fad fa-info-circle"
            size="13px"
            color="negative"
            v-if="is_product_deleted"
          >
            <base-tooltip>This product has been deleted.</base-tooltip>
          </q-icon>
        </span>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    product_id: [String, Number],
    variant_id: [String, Number],
    is_product_deleted: {
      type: Boolean,
      default: false,
    },
    is_variant_deleted: {
      type: Boolean,
      default: false,
    },
    is_custom: {
      type: Boolean,
      default: false,
    },
    attributes: Object,
  },
  computed: {
    link() {
      const query = { action: "edit" };
      if (this.is_variant_deleted) {
        return {
          name: "Product",
          params: { id: this.product_id },
          query,
        };
      }
      return {
        name: "Products Variant",
        params: {
          product_id: this.product_id,
          variant_id: this.variant_id,
        },
        query,
      };
    },
  },
};
</script>
