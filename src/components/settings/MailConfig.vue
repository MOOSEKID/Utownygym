<template>
  <div class="mail-config q-pb-md">
    <div v-if="loaded" class="q-pt-md row q-col-gutter-md">
      <div class="col-sm-3 col-xs-12">
        <div class="text-label">Email Send Method</div>
        <base-select
          @update:model-value="onChange($event, 'default')"
          readonly
          :model-value="options.default"
          map-options
          emit-value
          dense
          outlined
          :options="[{ label: 'SMTP', value: 'smtp' }]"
        />
      </div>
      <div class="col-sm-3 col-xs-12">
        <div class="text-label">Host</div>
        <base-input
          @update:model-value="onChange($event, 'mailers.smtp.host')"
          placeholder="e.g. smtp.googlemail.com"
          :model-value="options['mailers.smtp.host']"
        />
      </div>
      <div class="col-sm-3 col-xs-12">
        <div class="text-label">Port</div>
        <base-input
          @update:model-value="onChange($event, 'mailers.smtp.port')"
          placeholder="578"
          :model-value="options['mailers.smtp.port']"
        />
      </div>
      <div class="col-sm-3 col-xs-12">
        <div class="text-label">Encryption</div>
        <base-select
          @update:model-value="onChange($event, 'mailers.smtp.encryption')"
          :model-value="options['mailers.smtp.encryption']"
          map-options
          emit-value
          :options="[
            { label: 'SSL', value: 'ssl' },
            { label: 'TLS', value: 'tls' },
            { label: 'None', value: null },
          ]"
          dense
          outlined
        />
      </div>
      <div class="col-sm-3 col-xs-12">
        <div class="text-label">Username</div>
        <base-input
          @update:model-value="onChange($event, 'mailers.smtp.username')"
          :model-value="options['mailers.smtp.username']"
          placeholder="Normally your email address"
        />
      </div>
      <div class="col-sm-3 col-xs-12">
        <div class="text-label">Password</div>
        <base-input
          @update:model-value="onChange($event, 'mailers.smtp.password')"
          :model-value="options['mailers.smtp.password']"
          type="password"
          placeholder="Normally your email password"
        />
      </div>
      <div class="col-sm-12 col-xs-12 flex self-end">
        <q-space />
        <base-btn
          color="grey"
          @click="onTestMail"
          :label="$t('label.testMail')"
        />
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
import TestMailDialog from "./TestMailDialog.vue";

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
    onTestMail() {
      console.func(
        "components/settings/MailConfig:methods.onTestMail()",
        arguments
      );
      this.$q.dialog({
        component: TestMailDialog,
        componentProps: {
          mailConfig: this.options,
        },
      });
    },
  },
};
</script>
