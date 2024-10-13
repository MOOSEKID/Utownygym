<template>
  <div class="app-alert q-pb-md">
    <div v-if="loaded" class="q-pt-md row q-col-gutter-md">
      <div class="col-sm-12 col-xs-12">
        <div class="text-subtitle2">Whatsapp Notification</div>
        <div class="hint">
          First, you need to sign up for a Twilio account (if you don’t have one
          already) at https://www.twilio.com/try-twilio. After creating an
          account, you’ll get your Account SID and Auth Token, which are
          essential for API authentication.
        </div>
      </div>
      <div class="col-sm-12 col-xs-12">
        <q-checkbox
          dense
          :model-value="options['whatsapp']"
          @update:model-value="onChange($event, 'whatsapp')"
          label="Enable Whatsapp Notification"
        />
        <div class="q-pt-md row q-col-gutter-md">
          <div class="col-sm-3 col-xs-12">
            <div class="text-label">Twillo Sid</div>
            <base-input
              @update:model-value="onChange($event, 'sid')"
              type="password"
              placeholder="ACdc70a0c14c4cc5657ce8ba4888d28a33"
              :model-value="options['sid']"
            />
          </div>
          <div class="col-sm-3 col-xs-12">
            <div class="text-label">Twillo Token</div>
            <base-input
              @update:model-value="onChange($event, 'token')"
              type="password"
              placeholder="d73f83fc57bedce0f49917d6adf4de4c"
              :model-value="options['token']"
            />
          </div>
          <div class="col-sm-3 col-xs-12">
            <div class="text-label">Sender</div>
            <base-input
              @update:model-value="onChange($event, 'from')"
              placeholder="+14155238886"
              :model-value="options['from']"
            />
          </div>
        </div>
        <q-separator class="q-mt-md" />
      </div>
      <div class="col-sm-12 col-xs-12">
        <div class="text-subtitle2">Push Notification</div>
        <div class="hint">
          An active Firebase project. If you haven’t already created one, head
          over to the Firebase Console (https://console.firebase.google.com/)
          and create a new project.
        </div>
      </div>
      <div class="col-sm-12 col-xs-12">
        <q-checkbox
          dense
          :model-value="options['push']"
          @update:model-value="onChange($event, 'push')"
          label="Enable Push Notification"
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
