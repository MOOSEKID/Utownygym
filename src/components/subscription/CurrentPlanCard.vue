<template>
  <base-section flat bordered class="currnet-plan-card" dense no-row>
    <template #action>
      <div class="renewal-fee">
        <span class="amount text-subtitle2">
          {{ plan.price_formated }}
        </span>
        <span class="q-ml-xs interval">{{ intervalLabel }}</span>
      </div>
    </template>

    <template #title>
      <div class="text-h6">
        {{ plan?.label }}
        <base-status :type="planBadge" />
      </div>
    </template>

    <div v-if="subscription?.message">
      <span
        style="font-size: 13px"
        :class="{ 'text-negative': !subscribed }"
        v-html="subscription.message"
      ></span>
    </div>

    <div v-if="subscribed" class="q-py-sm usages">
      <div class="label text-h6">{{ $t("features") }}:</div>
      <plan-usages :features="usages" />
    </div>
    <div v-else-if="plan?.feature_lines" class="features">
      <ul>
        <li v-for="(feature, index) in plan.feature_lines" :key="index">
          <span v-html="feature"></span>
        </li>
      </ul>
    </div>

    <template v-if="!noAction" #bottom>
      <div class="text-right">
        <base-btn
          v-if="dueCollect && hasDue"
          @click="onMarkAsPaid"
          :label="$t('label.markAsPaid')"
          color="teal"
          class="q-mr-sm"
          link
        />
        <base-btn
          v-if="duePay && hasDue"
          @click="onPayNow"
          :label="$t('label.payNow')"
          color="warning"
          class="q-mr-sm"
          link
        />
        <base-btn
          v-if="canceled && !ended"
          @click="onResumePlan"
          :loading="resumeLoading"
          :label="$t('resumeNow')"
          color="warning"
          class="q-mr-sm"
          :disable="!currentPlan?.is_active"
          link
        />
        <base-btn
          v-else-if="isDowngrade"
          @click="onCancelDowngrade"
          :loading="cancelLoading"
          :label="$t('cancelDowngrade')"
          color="warning"
          class="q-mr-sm"
          link
        />
        <base-btn
          v-else-if="isActive"
          @click="onCancelPlan"
          :loading="cancelLoading"
          color="negative"
          :label="$t('cancelPlan')"
          class="q-mr-sm"
          link
        />
        <base-btn
          v-if="!noUpgrade"
          :to="{ name: 'Subscription' }"
          color="primary"
          :label="subscribeLabel"
          link
        />
        <base-btn
          v-else
          @click="onChangePlan"
          color="primary"
          :label="subscribeLabel"
          link
        />
      </div>
    </template>

    <template v-if="isLoadingSubscription" #skeleton>
      <current-plan-skeleton />
    </template>
  </base-section>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useSubscriptionStore } from "stores/subscription";
import CurrentPlanSkeleton from "../skeleton/CurrentPlanSkeleton.vue";
import ChangePlan from "./ChangePlan.vue";
import { useAppStore } from "src/stores/app";
import PaymentConfirm from "./PaymentConfirm.vue";
import ManualPayment from "./ManualPayment.vue";
import PlanUsages from "./PlanUsages.vue";

export default {
  components: { CurrentPlanSkeleton, PlanUsages },
  props: {
    user: Object,
    noUpgrade: Boolean,
    noAction: Boolean,
    dueCollect: Boolean,
    duePay: Boolean,
  },
  emits: ["changed", "paid"],
  data() {
    return {
      cancelLoading: false,
      resumeLoading: false,
    };
  },
  methods: {
    ...mapActions(useAppStore, ["currentUser"]),
    ...mapActions(useSubscriptionStore, [
      "cancel",
      "cancelDowngrade",
      "resume",
      "loadSubscription",
      "setUser",
      "pay",
    ]),
    onMarkAsPaid() {
      console.func(
        "pages/admins/members/MemberPage:methods.onMarkAsPaid()",
        arguments
      );
      this.$q
        .dialog({
          component: ManualPayment,
        })
        .onOk(async () => {
          this.$emit("paid");
          await this.loadSubscription();
        });
    },
    onCancelDowngrade() {
      this.cancelLoading = true;
      this.cancelDowngrade()
        .then(({ message }) => {
          this.cancelLoading = false;
          this.$core.success(message, {
            title: this.$t("dialog.title.success"),
          });
        })
        .catch((error) => {
          this.cancelLoading = false;
          this.$core.error(error);
        });
    },
    onCancelPlan() {
      this.$core
        .confirm(this.$t("dialog.info.cancel"), {
          title: this.$t("dialog.title.cancel"),
        })
        .then(() => {
          this.cancelLoading = true;
          console.func(
            "components/subscription/CurrentPlanCard:methods.onCancelPlan()",
            arguments
          );
          this.cancel()
            .then(({ message }) => {
              this.cancelLoading = false;
              this.$core.success(message, {
                title: this.$t("dialog.title.success"),
              });
            })
            .catch((error) => {
              this.cancelLoading = false;
              this.$core.error(error);
            });
        });
    },
    onPayNow() {
      console.func(
        "components/subscription/CurrentPlanCard:methods.onPayNow()",
        arguments
      );
      this.$q
        .dialog({
          component: PaymentConfirm,
          componentProps: {
            dueAmount: this.dueAmount,
            invoice: this.invoice,
            message: `To activate your subscription, please complete payment of ${this.dueAmount}.`,
          },
        })
        .onOk(async () => {
          this.$emit("paid");
          await this.loadSubscription();
        });
    },
    onResumePlan() {
      this.$core.confirm(`Are you sure you want to resume?`).then(() => {
        this.resumeLoading = true;
        console.func(
          "components/subscription/CurrentPlanCard:methods.onResumePlan()",
          arguments
        );
        this.resume()
          .then(({ message }) => {
            this.resumeLoading = false;
            this.$core.success(message, {
              title: this.$t("dialog.title.success"),
            });
          })
          .catch((error) => {
            this.resumeLoading = false;
            this.$core.error(error);
          });
      });
    },
    onChangePlan() {
      this.$q
        .dialog({
          component: ChangePlan,
          componentProps: {
            title: this.subscribeLabel,
          },
        })
        .onOk(async () => {
          this.$emit("changed");
          await this.loadSubscription();
        });
    },
  },
  computed: {
    ...mapState(useSubscriptionStore, [
      "subscription",
      "currentPlan",
      "upcomingInvoice",
      "isLoadingSubscription",
      "defaultPlan",
      "ended",
      "canceled",
      "subscribed",
      "usages",
      "hasDue",
      "invoice",
      "dueAmount",
    ]),
    plan() {
      if (this.currentPlan?.id) {
        return this.currentPlan;
      }
      return this.defaultPlan;
    },
    interval() {
      return this.$core.capitalize(this.plan?.interval || "month") + "ly";
    },
    intervalLabel() {
      return this.$core.priceToInterval(this.plan);
    },
    subscribeLabel() {
      if (this.dueCollect) {
        return this.$t("changePlan");
      }
      return this.subscribed || this.canceled
        ? this.$t("upgradePlan")
        : this.$t("subscribeNow");
    },
    isActive() {
      return this.subscription.is_valid;
    },
    isDowngrade() {
      return this.subscription.is_downgrade;
    },
    planBadge() {
      return this.subscription?.status || this.interval;
    },
  },
  async mounted() {
    if (this.user) {
      await this.setUser(this.user);
    }
  },
};
</script>

<style lang="scss">
.currnet-plan-card {
  .amount {
    font-size: 18px;
  }
  .usages {
    .label {
      font-size: 16px;
    }
    .q-item {
      min-height: auto;
    }
  }
}
</style>
