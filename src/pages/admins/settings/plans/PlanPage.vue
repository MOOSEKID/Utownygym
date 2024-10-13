<template>
  <q-page padding>
    <settings-page-header
      back-route="Plans"
      class="q-pb-md"
      title="Plans"
      hint="Effortlessly manage and customize your subscription plans in the Settings section for a tailored and seamless experience."
    />
    <base-form
      v-if="loaded"
      @submit="onSubmit"
      @cancel="onCancel"
      @reset="onReset"
      :resetable="resetable"
      :disable="disable"
      :submited="submited"
    >
      <div class="q-gutter-md">
        <base-section
          flat
          bordered
          :title="$t('generalInformation')"
          :description="$t('plans.generalDesc')"
        >
          <div class="col-xs-12 col-sm-7">
            <base-label required>{{ $t("label.label") }}</base-label>
            <base-input v-model="formData.label" type="text" />
          </div>
          <div class="col-xs-12 col-sm-5">
            <base-label>{{ $t("trialDays") }}</base-label>
            <base-input v-model="formData.trial_days" type="number" />
          </div>
          <div class="col-xs-12 col-sm-12">
            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-sm-4">
                <base-label required>{{ $t("renewalFee") }}</base-label>
                <base-price-input
                  dense
                  outlined
                  v-model="formData.price"
                  type="text"
                />
              </div>
              <div class="col-xs-12 col-sm-8">
                <base-label required>{{ $t("billingPeriod") }}</base-label>
                <div class="row q-col-gutter-sm">
                  <div class="col-xs-12 col-sm-6">
                    <base-select
                      :readonly="!creating"
                      dense
                      outlined
                      v-model="formData.default_interval"
                      :options="intervalOptions"
                      emit-value
                      map-options
                      @update:model-value="onChangeInterval"
                    />
                  </div>
                  <div
                    v-if="formData.default_interval === 'custom'"
                    class="col-xs-12 col-sm-6"
                  >
                    <div class="row q-col-gutter-sm">
                      <div class="col-sm-6 col-xs-6">
                        <base-input
                          :readonly="!creating"
                          dense
                          outlined
                          v-model="formData.interval_count"
                          :prefix="$t('prefix.every')"
                          type="number"
                          min="1"
                          step="1"
                          style="width: 100%"
                        />
                      </div>
                      <div class="col-sm-6 col-xs-6">
                        <base-select
                          :readonly="!creating"
                          dense
                          outlined
                          v-model="formData.interval"
                          :options="[
                            { label: 'days', value: 'day' },
                            { label: 'weeks', value: 'week' },
                            { label: 'months', value: 'month' },
                          ]"
                          emit-value
                          map-options
                          style="width: 100%"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12">
            <base-label>{{ $t("description") }}</base-label>
            <base-input v-model="formData.description" type="textarea" />
          </div>
          <div class="col-xs-12">
            <q-checkbox
              dense
              v-model="formData.is_active"
              :label="$t('active')"
              color="green"
            />
          </div>
        </base-section>
        <base-section
          flat
          bordered
          :title="$t('features')"
          :description="$t('plans.featureDesc')"
        >
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="col-xs-12 col-sm-4"
          >
            <template v-if="feature.type === 'integer'">
              <base-label required>
                {{ feature.label }}
              </base-label>
              <base-input
                v-model.number="formData.features[feature.slug]"
                type="number"
                min="-1"
                :hint="feature.description"
              />
            </template>
            <base-checkbox
              v-else
              dense
              v-model="formData.features[feature.slug]"
              :true-value="1"
              :false-value="0"
            >
              <div class="text-weight-bold">{{ feature.label }}</div>
              <div>{{ feature.description }}</div>
            </base-checkbox>
          </div>
        </base-section>
      </div>
    </base-form>
    <skeleton-single-page v-else />
  </q-page>
</template>

<script>
import { cloneDeep } from "lodash";
import { mapActions, mapState } from "pinia";
import SkeletonSinglePage from "components/skeleton/SkeletonSinglePage.vue";
import { usePlanStore } from "stores/plan";
import { PageMixins } from "services/mixins";
import SettingsPageHeader from "src/components/SettingsPageHeader.vue";

const formData = {
  default_interval: "month",
  interval: "month",
  interval_count: 1,
  trial_days: 0,
  price: 0,
  is_active: true,
  description: `Max <strong>1/mo</strong> Guest pass\nMax <strong>5/mo</strong> Classes\nFull Access to the Facilities\nClasses and Online Portal`,
  features: {
    classes: 5,
    guest: 1,
  },
};

export default {
  mixins: [PageMixins],
  components: {
    SkeletonSinglePage,
    SettingsPageHeader,
  },
  data() {
    return {
      defaultData: cloneDeep(formData),
      formData: cloneDeep(formData),
      features: [],
    };
  },
  methods: {
    ...mapActions(usePlanStore, ["store", "show", "update", "getFeatures"]),
    onChangeInterval(val) {
      let interval = val;

      if (val === "custom") {
        interval = "day";
      }

      Object.assign(this.formData, {
        interval,
      });
    },
  },
  async mounted() {
    await this.getFeatures().then((features) => {
      this.features = features;
    });

    if (!this.creating) {
      this.show(this.id)
        .then((data) => {
          this.formData = data;
          this.defaultData = cloneDeep(data);
          this.loaded = true;
        })
        .catch((error) => {
          this.$core.error(error);
        });
    } else {
      this.features.forEach(({ type, slug }) => {
        let value = 0;

        if (type === "boolean") {
          value = false;
        }

        this.formData.features[slug] = value;
        this.defaultData.features[slug] = value;
      });
      this.loaded = true;
    }
  },
  computed: {
    ...mapState(usePlanStore, ["intervalOptions"]),
  },
};
</script>
