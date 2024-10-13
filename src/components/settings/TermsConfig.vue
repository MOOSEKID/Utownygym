<template>
  <div class="mail-config q-pb-md">
    <div v-if="loaded" class="q-pt-md row q-col-gutter-md">
      <div class="col-sm-12 col-xs-12">
        <div class="text-label">{{ $t("termsAndConditions") }}</div>
        <base-editor
          max-height="20rem"
          min-height="20rem"
          @update:model-value="onChange($event, 'tos')"
          :model-value="options['tos']"
        />
      </div>
      <div class="col-sm-12 col-xs-12">
        <div class="text-label">{{ $t("privacyPolicy") }}</div>
        <base-editor
          max-height="20rem"
          min-height="20rem"
          @update:model-value="onChange($event, 'privacy')"
          :model-value="options['privacy']"
        />
      </div>
      <div class="col-sm-12 col-xs-12 flex self-end">
        <q-space />
        <base-btn
          class="q-ml-md"
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
import BaseSectionSkeleton from "../skeleton/BaseSectionSkeleton.vue";

export default {
  components: { BaseSectionSkeleton },
  props: {
    options: Object,
    loaded: Boolean,
    changed: Boolean,
    loading: Boolean,
  },
  emits: ["update", "save"],
  methods: {
    onChange(val, key) {
      console.func(
        "components/settings/MailConfig:methods.onChange()",
        arguments
      );
      const options = this.options;
      options[key] = val;
      this.$emit("update", options);
    },
  },
};
</script>
