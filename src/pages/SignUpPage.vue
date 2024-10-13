<template>
  <q-page class="row flex-center items-center vertical-middle" padding>
    <div class="signup-container q-pa-xl">
      <div class="text-h5 q-mb-md">{{ $t("Signup Form") }}</div>
      <q-form @submit="onSubmit">
        <div class="row q-col-gutter-md">
          <div class="col-sm-12 col-xs-12">
            <div class="text-h6">{{ $t("Personal details") }}</div>
          </div>
          <div class="col-sm-6 col-xs-12">
            <base-label>{{ $t("firstName") }}</base-label>
            <base-input
              :error-message="$core.errorMessage('first_name', errors)"
              :error="$core.hasError('first_name', errors)"
              placeholder="Jone"
              v-model="form.first_name"
              name="first_name"
            />
          </div>
          <div class="col-sm-6 col-xs-12">
            <base-label>{{ $t("surname") }}</base-label>
            <base-input
              :error-message="$core.errorMessage('last_name', errors)"
              :error="$core.hasError('last_name', errors)"
              placeholder="Done"
              v-model="form.last_name"
              name="last_name"
            />
          </div>
          <div class="col-xs-12 col-sm-12">
            <div class="row q-col-gutter-md">
              <div class="col-sm-4 col-xs-12">
                <base-label>{{ $t("email") }}</base-label>
                <base-input
                  :error-message="$core.errorMessage('email', errors)"
                  :error="$core.hasError('email', errors)"
                  placeholder="yourname@example.com"
                  v-model="form.email"
                  name="email"
                />
              </div>
              <div class="col-sm-4 col-xs-12">
                <base-label>{{ $t("phoneNumber") }}</base-label>
                <base-input
                  :error-message="$core.errorMessage('phone_number', errors)"
                  :error="$core.hasError('phone_number', errors)"
                  placeholder="+44 1632 960806"
                  v-model="form.phone_number"
                  name="phone_number"
                />
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-xs-12">
            <address-fields :errors="errors" v-model="form" />
          </div>
          <div class="col-xs-12 col-sm-12">
            <div class="row q-col-gutter-md">
              <div class="col-sm-4 col-xs-12">
                <base-label>{{ $t("password") }}</base-label>
                <base-input
                  v-model="form.password"
                  :error-message="$core.errorMessage('password', errors)"
                  :error="$core.hasError('password', errors)"
                  :type="isPwd1 ? 'password' : 'text'"
                  name="password"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd1 ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd1 = !isPwd1"
                    />
                  </template>
                </base-input>
              </div>
              <div class="col-sm-4 col-xs-12">
                <base-label>{{ $t("confirmPassword") }}</base-label>
                <base-input
                  v-model="form.password_confirmation"
                  name="password_confirmation"
                  :error-message="
                    $core.errorMessage('password_confirmation', errors)
                  "
                  :error="$core.hasError('password_confirmation', errors)"
                  :type="isPwd2 ? 'password' : 'text'"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd2 ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd2 = !isPwd2"
                    />
                  </template>
                </base-input>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-xs-12">
            <plans-card
              dense
              :title="$t('Select a plan')"
              no-interval
              v-model="plan"
              gutter="md"
              col="4"
              class="plans-card"
            />
          </div>
          <div v-if="plan" class="col-sm-12 co-xs-12 plan-actions">
            <div class="plan q-pa-lg">
              <div class="text-h6">{{ $t("Your plan") }}</div>
              <div class="info">
                {{ plan.label }} # {{ plan.price_formated }}
                {{ intervalLabel }}
              </div>
              <div class="features">
                <ul class="flex">
                  <li
                    v-for="(feature, index) in plan.feature_lines"
                    :key="index"
                  >
                    <span v-html="feature"></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12">
            <coupon-card
              :plan="plan"
              v-model="form.promotion_code"
              v-model:amount="amount"
              v-model:processing="disabled"
            />
          </div>
          <div class="col-sm-12 col-xs-12">
            <div class="row q-col-gutter-md">
              <div class="col-sm-12 col-xs-12">
                <div class="text-h6">{{ $t("paymentMethod") }}</div>
              </div>
              <div
                v-for="(method, index) in paymentMethods"
                :key="index"
                class="col-xs-12 col-sm-6 col-md-4"
              >
                <payment-method-card
                  v-model:selected="paymentMethod"
                  v-bind="method"
                  pay-mode
                />
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-5 offset-sm-4">
            <div class="terms">
              <q-checkbox dense size="sm" v-model="form.terms">
                I have read and agree to the
                <base-btn
                  @click.stop="onTermsDialog('privacy')"
                  size="11px"
                  type="a"
                  link
                >
                  privacy policy
                </base-btn>
                and
                <base-btn
                  @click.stop="onTermsDialog('tos')"
                  size="11px"
                  type="a"
                  link
                >
                  terms and conditions
                </base-btn>
              </q-checkbox>
            </div>
          </div>
          <div class="col-sm-3 co-xs-12">
            <base-btn
              style="width: 180px"
              :disabled="!form.terms && !disabled"
              :loading="processing"
              :label="$t('confirmPayment')"
              type="submit"
            />
          </div>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAppStore } from "stores/app";
import { useSubscriptionStore } from "stores/subscription";
import PaymentMethodCard from "components/payment-methods/PaymentMethodCard.vue";
import AddressFields from "src/components/address/AddressFields.vue";
import CouponCard from "src/components/subscription/CouponCard.vue";
import PlansCard from "src/components/subscription/PlansCard.vue";
import TermsDialog from "src/components/TermsDialog.vue";

const guard = "users";

export default {
  components: {
    PaymentMethodCard,
    AddressFields,
    CouponCard,
    PlansCard,
  },
  data() {
    return {
      plan: null,
      paymentMethod: null,
      form: {
        title: "Mr",
        plan: null,
        promotion_code: null,
        terms: false,
        guard,
      },
      errors: {},
      processing: false,
      disabled: false,
      isPwd1: true,
      isPwd2: true,
      amount: 0,
    };
  },
  methods: {
    ...mapActions(useAppStore, ["signUp", "currentUser"]),
    ...mapActions(useSubscriptionStore, ["confirm", "subscribe", "getPlans"]),
    onReset() {
      this.errors = {};
      this.processing = true;
    },
    onSubmit() {
      console.func("pages/SignUpPage:methods.onSubmit()", arguments);
      this.onReset();
      this.signUp(this.form)
        .then((response) => {
          console.log("pages/SignUpPage:methods.signUp().then()", response);
          this.subscribe({
            ...this.form,
            plan: this.plan?.id,
            payment_method: this.paymentMethod?.id,
          })
            .then((res) => {
              console.log(
                "pages/SignUpPage:methods.signUp().then().subscribe().then()",
                res
              );
              const { message, payment } = res;
              this.currentUser("users").then(() => {
                if (payment) {
                  this.$redirect(payment);
                } else {
                  this.$core.success(message, {
                    title: this.$t("dialog.title.success"),
                  });
                  this.$router.push({ name: "Dashboard" });
                  this.processing = false;
                }
              });
            })
            .catch((error) => {
              this.$router.push({ name: "Dashboard" });
              this.$core.error(error, { title: this.$t("dialog.title.error") });
              this.processing = false;
            });
        })
        .catch(({ errors, message }) => {
          this.processing = false;
          if (errors) {
            this.errors = errors;
          } else {
            this.$core.error(message);
          }
        });
    },
    onTermsDialog(type) {
      console.func("pages/SignUpPage:methods.onTermsDialog()", arguments);
      this.$q
        .dialog({
          component: TermsDialog,
          componentProps: {
            type,
          },
        })
        .onOk(() => {
          this.form.terms = true;
        })
        .onCancel(() => {
          this.form.terms = false;
        });
    },
  },
  computed: {
    ...mapState(useAppStore, ["paymentMethods", "config"]),
    ...mapState(useSubscriptionStore, ["plans", "defaultPlan"]),
    intervalLabel() {
      return this.$core.priceToInterval(this.plan || {}, false, true);
    },
    queryPlan() {
      const { plan } = this.$route.query;
      const result = this.plans.find(({ id }) => id === Number(plan));

      if (result) {
        return result;
      }

      return null;
    },
  },
  async mounted() {
    await this.getPlans();
    this.$nextTick(() => {
      this.paymentMethod = this.paymentMethods[0];
      Object.assign(this, {
        plan: this.queryPlan || this.defaultPlan,
        interval: this.$route.query?.interval || "month",
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.plans-card {
  margin: 0 -16px;
}
</style>
