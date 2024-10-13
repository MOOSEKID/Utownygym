<template>
  <q-page padding>
    <settings-page-header
      class="q-pb-md"
      title="Coupons"
      back-route="Coupons"
      hint="Effortlessly manage your coupons in the Settings section for a tailored and seamless experience."
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
          description="Coupons can be used to discount invoices, subscriptions, or entire customer accounts."
        >
          <div class="col-xs-12 col-sm-6">
            <base-label required>{{ $t("label.name") }}</base-label>
            <base-input
              v-model="formData.name"
              type="text"
              :hint="$t('hint.thisWillAppearOnCustomersReceiptsAndInvoices')"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <base-label required>{{ $t("label.code") }}</base-label>
            <base-input
              :readonly="!creating"
              v-model="formData.promotion_code"
              type="text"
              :hint="$t('hint.noUpdate', { field: 'promotion code' })"
            />
          </div>
          <div v-if="creating" class="col-xs-12 col-sm-12">
            <base-label>{{ $t("label.type") }}</base-label>
            <q-option-group
              v-model="formData.fixed"
              type="radio"
              class="q-gutter-y-sm"
              dense
              :options="[
                { label: 'Percentage discount', value: false },
                { label: 'Fixed amount discount', value: true },
              ]"
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <template v-if="formData.fixed">
              <base-label required>{{ $t("label.discountAmount") }}</base-label>
              <base-price-input
                :readonly="!creating"
                v-model="formData.amount_off"
                :precision="0"
                :minimum-fraction-digits="0"
                :hint="$t('hint.noUpdate', { field: 'discount amount' })"
              />
            </template>
            <template v-else>
              <base-label required>{{ $t("label.percentageOff") }}</base-label>
              <base-percentage-input
                :readonly="!creating"
                v-model="formData.percent_off"
                :hint="$t('hint.noUpdate', { field: 'percentage off' })"
              />
            </template>
          </div>
          <div class="col-xs-12 col-sm-4">
            <base-label>{{ $t("label.duration") }}</base-label>
            <base-select
              dense
              map-options
              emit-value
              outlined
              option-label="label"
              option-value="value"
              v-model="formData.duration"
              :options="durationOptions"
              :readonly="!creating"
              @update:model-value="onChangeField($event, 'duration')"
              :hint="$t('hint.noUpdate', { field: 'duration' })"
            />
          </div>
          <div
            v-if="formData.duration === 'repeating'"
            class="col-xs-12 col-sm-4"
          >
            <base-label required>{{ $t("label.numberOfMonths") }}</base-label>
            <base-input
              type="number"
              step="1"
              min="1"
              :readonly="!creating"
              v-model="formData.duration_in_months"
              :hint="$t('hint.noUpdate', { field: 'number of months' })"
            />
          </div>
          <div class="col-xs-12">
            <base-checkbox
              dense
              :readonly="!creating"
              v-model="formData.has_max_redemptions"
              @update:model-value="onChangeField($event, 'has_max_redemptions')"
            >
              <div>Limit number of times this coupon can be used in total</div>
              <q-input
                dense
                outlined
                :readonly="!creating"
                v-show="formData.has_max_redemptions"
                v-model="formData.max_redemptions"
                style="width: 300px"
                type="number"
                placeholder="0"
                min="0"
              />
            </base-checkbox>
          </div>
          <div class="col-xs-12">
            <base-checkbox
              dense
              :readonly="!creating"
              v-model="formData.has_expires_at"
              @update:model-value="onChangeField($event, 'has_expires_at')"
            >
              <div>
                Limit the date range when customers can redeem this coupon
              </div>
              <base-date-input
                dense
                outlined
                :readonly="!creating"
                v-show="formData.has_expires_at"
                v-model="formData.expires_at"
                style="width: 300px"
              />
            </base-checkbox>
          </div>
          <div class="col-xs-12">
            <base-checkbox
              dense
              v-model="formData.specific_plans"
              @update:model-value="onChangeField($event, 'specific_plans')"
              class="full-width"
            >
              <div>Apply to specific plans</div>
              <base-select
                dense
                outlined
                v-show="formData.specific_plans"
                v-model="formData.plans"
                multiple
                use-chips
                :filter-method="getPlans"
                placeholder="Select plans"
                class="q-mt-sm"
              />
            </base-checkbox>
          </div>
          <div class="col-xs-12">
            <q-checkbox
              dense
              v-model="formData.active"
              :label="$t('active')"
              color="green"
            />
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
import SettingsPageHeader from "src/components/SettingsPageHeader.vue";
import { useCouponStore } from "stores/coupon";
import { usePlanStore } from "src/stores/plan";
import { PageMixins } from "services/mixins";

const formData = {
  fixed: false,
  percent_off: 0,
  amount_off: 0,
  duration_in_months: null,
  duration: "forever",
  fixed: false,
  has_max_redemptions: false,
  has_expires_at: false,
  specific_plans: false,
  plans: [],
  active: true,
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
    };
  },
  methods: {
    ...mapActions(useCouponStore, ["store", "show", "update"]),
    ...mapActions(usePlanStore, { getPlans: "get" }),
    onChangeField(val, key = null) {
      console.func(
        "pages/admins/coupons/CouponPage:methods.onChangeField()",
        arguments
      );
      const { duration_in_months, max_redemptions, plans } = this.defaultData;
      switch (key) {
        case "has_max_redemptions":
          Object.assign(this.formData, {
            max_redemptions: val ? max_redemptions : null,
          });
          break;

        case "has_expires_at":
          const { expires_at } = this.defaultData;
          Object.assign(this.formData, {
            expires_at: val ? expires_at : null,
          });
          break;

        case "specific_plans":
          Object.assign(this.formData, {
            plans: val ? plans : [],
          });
          break;

        case "duration":
          const durations = ["forever", "once"];
          const month = !durations.includes(val);
          Object.assign(this.formData, {
            duration_in_months: month ? duration_in_months || 2 : null,
          });
          break;
      }
    },
  },
  async mounted() {
    if (!this.creating) {
      this.show(this.id)
        .then((data) => {
          this.formData = data;
          this.defaultData = cloneDeep(data);
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
    ...mapState(useCouponStore, ["intervalOptions", "durationOptions"]),
  },
};
</script>
