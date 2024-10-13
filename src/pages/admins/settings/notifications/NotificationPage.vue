<template>
  <q-page padding>
    <settings-page-header
      class="q-pb-md"
      title="Notifications"
      back-route="Notifications"
      :hint="$t('hint.notifications')"
    />
    <base-form
      v-if="loaded"
      @submit="onSubmit"
      @cancel="onCancel"
      @reset="onReset"
      :resetable="resetable"
    >
      <div class="q-gutter-md">
        <base-section title="General information">
          <div class="col-xs-12 col-sm-8">
            <div class="text-label">Subject</div>
            <q-input dense outlined v-model="formData.subject" type="text" />
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="text-label">Type</div>
            <q-select
              dense
              outlined
              map-options
              :readonly="!creating"
              :model-value="formData.type"
              @update:model-value="onChangeType"
              :options="types"
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <div class="text-label">Content</div>
            <base-editor
              :textarea="textarea"
              v-model="formData.content"
              min-height="10rem"
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <q-checkbox
              dense
              v-model="formData.is_default"
              :label="$t('label.defaultNotification')"
            />
          </div>
        </base-section>
      </div>
    </base-form>
    <skeleton-single-page v-else />
  </q-page>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { cloneDeep } from "lodash";
import SkeletonSinglePage from "components/skeleton/SkeletonSinglePage.vue";
import { useNotificationStore } from "stores/notification";
import { PageMixins } from "services/mixins";
import SettingsPageHeader from "src/components/SettingsPageHeader.vue";

const formData = {
  content: "",
  is_default: false,
};

export default {
  components: { SkeletonSinglePage, SettingsPageHeader },
  mixins: [PageMixins],
  data() {
    return {
      defaultData: cloneDeep(formData),
      formData: cloneDeep(formData),
    };
  },
  methods: {
    ...mapActions(useNotificationStore, ["show", "store", "update"]),
    onChangeType(props) {
      console.func(
        "pages/admins/settings/notifications/NotificationPage:methods.onChangeType()",
        arguments
      );
      if (props) {
        Object.assign(this.formData, {
          type: props?.value,
          label: props?.label,
        });
      }
    },
  },
  mounted() {
    if (this.id !== "add") {
      this.show(this.id)
        .then((response) => {
          this.formData = response;
          this.defaultData = cloneDeep(response);
          this.loaded = true;
        })
        .catch((error) => {
          this.$emit("error", error);
        });
    } else {
      this.loaded = true;
    }
  },
  computed: {
    ...mapState(useNotificationStore, ["types"]),
    textarea() {
      return this.formData.type.startsWith("push:");
    },
  },
};
</script>
