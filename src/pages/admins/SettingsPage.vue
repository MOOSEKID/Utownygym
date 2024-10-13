<template>
  <q-page padding>
    <settings-page-header
      :title="$t('appSettings')"
      :hint="$t('appSettingsDesc')"
    />
    <div class="q-gutter-y-md q-pt-md">
      <base-section flat bordered no-row title="App details">
        <div class="config">
          <div class="row q-col-gutter-md">
            <div class="col-xs-12 col-sm-3">
              <base-label>{{ $t("label.companyName") }}</base-label>
              <base-input
                placeholder="NitroFIT28"
                :hint="$t('hint.appearsOnYourWebsite')"
                v-model="config.name"
              />
            </div>
            <div class="col-xs-12 col-sm-3">
              <base-label>{{ $t("label.email") }}</base-label>
              <base-input
                placeholder="info@company.com"
                :hint="$t('hint.theEmailYourAppUsesToSendEmailsToYourMembers')"
                v-model="config.email"
              />
            </div>
            <div class="col-xs-12 col-sm-3">
              <base-label>{{ $t("label.phone") }}</base-label>
              <base-input placeholder="+1123456789" v-model="config.phone" />
            </div>
            <div class="col-xs-12 col-sm-3">
              <base-label>{{ $t("label.country") }}</base-label>
              <country-select v-model="config.country" />
            </div>
            <div class="col-xs-12 col-sm-3">
              <base-label>{{ $t("label.timezone") }}</base-label>
              <base-select
                :options="timezones"
                emit-value
                map-options
                outlined
                dense
                use-filter
                :filter-method="onFilterTimezone"
                v-model="config.timezone"
              />
            </div>
            <div class="col-xs-12 col-sm-3">
              <base-label>{{ $t("lang") }}</base-label>
              <base-select
                :options="[
                  { label: 'English', value: 'en-US' },
                  { label: 'French', value: 'fr' },
                  { label: 'Hindi (India)', value: 'hi_IN' },
                  { label: 'Romanian (Romania)', value: 'ro_RO' },
                  { label: 'Japanese', value: 'ja' },
                  { label: 'Korean', value: 'ko' },
                  { label: 'Russian (Russia)', value: 'ru_RU' },
                  { label: 'Spanish', value: 'es' },
                  { label: 'Chinese', value: 'zh' },
                  { label: 'Arabic', value: 'ar' },
                  { label: 'Portuguese', value: 'pt' },
                  { label: 'Italian (Italy)', value: 'it_IT' },
                ]"
                map-options
                emit-value
                @update:model-value="$i18n.locale = $event"
                outlined
                dense
                v-model="config.lang"
              />
            </div>
            <div class="col-xs-12 col-sm-3">
              <base-label>{{ $t("label.currency") }}</base-label>
              <base-select
                :options="currencies"
                :option-label="optionLabel"
                option-value="code"
                outlined
                dense
                map-options
                emit-value
                v-model="config.currency"
              />
            </div>
            <div class="col-xs-12 col-sm-12">
              <base-checkbox
                v-model="config.shop"
                label="Selling product online?"
              />
            </div>
            <div class="col-xs-12 col-sm-12">
              <base-label>{{ $t("label.logo") }}</base-label>
              <div class="logo-selector">
                <file-selector
                  mini
                  ref="logo"
                  accept="image/*"
                  icon="fad fa-image"
                  :dialog-label="$t('uploadMedia')"
                  :hint="$t('hint.images', { type: 'logo' })"
                  @update:model-value="config.logo = $event?.url"
                  name="logo"
                  load-from-server
                  v-show="!config.logo"
                />
                <div
                  @click="$refs.logo.onFileBrowse()"
                  v-if="config.logo"
                  class="logo-container"
                >
                  <q-img :src="config.logo" />
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 self-end flex">
              <q-space />
              <div class="q-gutter-sm">
                <base-btn
                  color="primary"
                  icon="fad fa-save"
                  :loading="loading"
                  :label="$t('save')"
                  @click="onUpdateConfig"
                />
              </div>
            </div>
          </div>
        </div>
      </base-section>
      <base-section
        flat
        bordered
        no-row
        title="Application Configs"
        description="Here you can configure your opening times, billing information and frontend."
      >
        <div class="q-gutter-y-xs">
          <q-expansion-item
            class="base-settings-item"
            header-class="bg-grey-4 text-subtitle2 text-black"
            expand-icon-class="text-black"
            v-for="(item, index) in settings"
            :key="index"
            :icon="item.icon"
            :label="item.label"
            @before-show="onLoad(item)"
            :default-opened="index === 0"
            group="settings"
          >
            <template v-slot:header="{ expanded }">
              <q-item-section class="header-label">
                <q-item-label class="flex items-center">
                  <q-icon size="19px" :name="item.icon" class="q-mr-sm" />
                  {{ item.label }}
                </q-item-label>
              </q-item-section>
              <q-item-section
                :class="{ expanded: expanded, actions: true }"
                side
              >
                <q-item-label>
                  <q-btn
                    color="primary"
                    @click.stop="onAdd(item)"
                    icon="fad fa-circle-plus"
                    dense
                    round
                    flat
                    v-show="item.add && expanded"
                  />
                </q-item-label>
              </q-item-section>
            </template>
            <component
              v-bind="item"
              v-if="currentSetting === item.key"
              v-model:options="options[item.key]"
              :is="item.component"
              :loaded="loaded[item.key]"
              :changed="changed[item.key]"
              :loading="item.saving"
              @update="onUpdate($event, item)"
              @save="onSave(item)"
            />
          </q-expansion-item>
        </div>
      </base-section>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAppStore } from "stores/app";
import { cloneDeep, isEmpty } from "lodash";
import { SettingsMixins } from "services/mixins";
import { timezones, onFilterTimezone } from "src/services/timezones";
import { currencies, optionLabel } from "src/services/currencies";
import CountrySelect from "src/components/address/CountrySelect.vue";
import FileSelector from "src/components/FileSelector.vue";
import SettingsPageHeader from "src/components/SettingsPageHeader.vue";

export default {
  mixins: [SettingsMixins],
  components: { CountrySelect, FileSelector, SettingsPageHeader },
  data() {
    return {
      options: {},
      defaultData: {},
      saving: {},
      changed: {},
      loaded: {},
      timezones,
      currencies,
      loading: false,
      currentSetting: null,
    };
  },
  methods: {
    onFilterTimezone,
    ...mapActions(useAppStore, ["getSettings", "updateSettings", "setIsDirt"]),
    onLoad(args) {
      const { key, defaultValue } = args;
      this.currentSetting = key;

      if (key in this.loaded) return false;

      this.loaded[key] = false;
      this.getSettings(key)
        .then((options) => {
          if (isEmpty(options)) {
            options = defaultValue;
          }
          this.options[key] = options;
          this.defaultData[key] = cloneDeep(options);
          this.loaded[key] = true;
        })
        .catch((error) => {
          this.$core.error(error, { title: this.$t("dialog.title.error") });
          this.loaded[key] = true;
        });
    },
    onUpdate(args, item) {
      console.func("pages/admins/SettingsPage:methods.onUpdate()", arguments);
      const { key } = item;
      this.options[key] = cloneDeep(args);
      this.changed[key] = this.hasChanged(key);
      this.checkChangedAny();
    },
    onAdd(item) {
      console.func("pages/admins/SettingsPage:methods.onAdd()", arguments);
      const { key, option } = item;
      this.changed[key] = true;
      this.checkChangedAny();
      const options = this.options[key];
      options.push({
        ...option,
        id: Date.now(),
      });
    },
    onSave(args) {
      console.func("pages/admins/SettingsPage:methods.onSave()", arguments);
      const { key } = args;
      const options = this.options[key];
      this.saving[key] = true;
      this.updateSettings({
        key,
        options: options,
      })
        .then(({ message }) => {
          this.$q.notify(message);
          this.loaded[key] = false;
          this.$nextTick(() => {
            this.saving[key] = false;
            this.changed[key] = false;
            this.loaded[key] = true;
            this.checkChangedAny();
          });
        })
        .catch((error) => {
          this.saving[key] = false;
          this.$core.error(error, { title: this.$t("dialog.title.error") });
        });
    },
    onUpdateConfig() {
      console.func(
        "pages/admins/SettingsPage:methods.onUpdateConfig()",
        arguments
      );
      this.loading = true;
      this.updateSettings({
        key: "config",
        options: this.config,
      })
        .then(({ message }) => {
          this.$q.notify(message);
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.$core.error(error, { title: this.$t("dialog.title.error") });
        });
    },
    hasChanged(key) {
      const str = (val) => JSON.stringify(val);
      return str(this.options[key]) !== str(this.defaultData[key]);
    },
    checkChangedAny() {
      const changed = () => {
        for (const key in this.changed) {
          if (this.changed[key] === true) {
            return true;
          }
        }
        return false;
      };
      this.setIsDirt(changed());
    },
    optionLabel,
  },
  mounted() {
    const options = {};

    this.settings.forEach(({ key, defaultValue }) => {
      options[key] = defaultValue;
    });

    this.defaultData = cloneDeep(options);
    this.options = cloneDeep(options);

    this.onLoad(this.settings[0]);
  },
  computed: {
    ...mapState(useAppStore, ["config"]),
    settings() {
      return [
        {
          label: this.$t("mailConfiguration"),
          key: "mail",
          icon: "fas fa-envelope",
          component: "mail-config",
          dataType: "object",
          defaultValue: {},
        },
        {
          label: this.$t("label.openingTimes"),
          key: "opening-times",
          icon: "fas fa-clock",
          component: "opening-times",
          dataType: "array",
          defaultValue: [],
        },
        {
          label: this.$t("companyTerms"),
          key: "terms",
          icon: "fas fa-clipboard-list-check",
          component: "terms-config",
          dataType: "object",
          defaultValue: { tos: "", privacy: "" },
        },
        {
          label: this.$t("billingInformation"),
          key: "address",
          icon: "fad fa-address-book",
          component: "billing-information",
          dataType: "object",
          defaultValue: {},
        },
        {
          label: this.$t("label.menus"),
          key: "menus",
          icon: "fas fa-list-dropdown",
          component: "app-menus",
          dataType: "object",
          defaultValue: {},
        },
        {
          label: this.$t("socials"),
          key: "socials",
          icon: "fas fa-hashtag",
          component: "app-socials",
          dataType: "array",
          defaultValue: [],
        },
        {
          label: this.$t("theme"),
          key: "theme",
          icon: "fas fa-palette",
          component: "app-theme",
          dataType: "object",
          defaultValue: {},
        },
        {
          label: this.$t("pushWhatsappAlert"),
          key: "alert",
          icon: "fas fa-bell",
          component: "app-alert",
          dataType: "object",
          defaultValue: {},
        },
      ];
    },
  },
};
</script>

<style lang="scss">
.logo-container {
  width: 200px;
  cursor: pointer;
  border: 2px dashed $grey-4;
  border-radius: 5px;
}
</style>
