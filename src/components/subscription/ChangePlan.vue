<template>
  <base-dialog
    :title="title"
    ref="dialog"
    content-style="width: 450px; max-width: 95vw"
    body-class="scroll"
    class="change-plan"
    @hide="onDialogHide"
    @ok="onSuccess"
    use-separator
    :loading="loading"
    :done-label="$t('proceed')"
    persistent
  >
    <template v-slot:body>
      <div class="q-px-sm">
        <div class="q-gutter-y-md">
          <base-select
            dense
            outlined
            :options="planOptions"
            option-label="label"
            v-model="plan"
          />
          <plan-card flat disable v-bind="plan" ref="plan" />
        </div>
      </div>
    </template>
  </base-dialog>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useSubscriptionStore } from "stores/subscription";
import PlanCard from "./PlanCard.vue";

export default {
  components: { PlanCard },
  name: "ChangePlan",
  props: {
    title: String,
  },
  emits: ["ok", "hide"],
  data() {
    return {
      plan: null,
      loading: false,
      loaded: false,
    };
  },
  methods: {
    ...mapActions(useSubscriptionStore, ["subscribe", "confirm"]),
    show() {
      console.func(
        "components/subscription/ChangePlan:methods.show()",
        arguments
      );
      this.$refs.dialog.show();
    },
    hide() {
      console.func(
        "components/subscription/ChangePlan:methods.close()",
        arguments
      );
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      console.func(
        "components/subscription/ChangePlan:methods.onDialogHide()",
        arguments
      );
      this.loaded = false;
      this.$emit("hide");
    },
    onDone() {
      console.func(
        "components/subscription/ChangePlan:methods.onDone()",
        arguments
      );
      this.$emit("ok");
      this.hide();
    },
    onSuccess() {
      console.func(
        "components/subscription/ChangePlan:methods.onSuccess()",
        arguments
      );
      this.loading = true;
      this.subscribe({
        plan: this.plan?.id,
        admin: true,
      })
        .then(({ message }) => {
          this.loading = false;
          this.onDone();
          this.$core.success(message, {
            title: this.$t("dialog.title.success"),
          });
        })
        .catch((error) => {
          this.loading = false;
          this.$core.error(error, { title: this.$t("dialog.title.error") });
        });
    },
  },
  computed: {
    ...mapState(useSubscriptionStore, ["plans", "currentPlan", "defaultPlan"]),
    planOptions() {
      return this.plans.filter((item) => item.is_active);
    },
  },
  mounted() {
    this.$nextTick(() => {
      let plan = this.defaultPlan;

      if (this.currentPlan?.id) {
        plan = this.currentPlan;
      }

      this.plan = this.plans.find(({ id }) => id === plan.id);
    });
  },
};
</script>
