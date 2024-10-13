import { defineStore } from "pinia";
import Api from "services/api";

export const useSubscriptionStore = defineStore("subscription", {
  state: () => ({
    isLoadingSubscription: true,
    user: null,
    subscription: {
      upcomingInvoice: null,
      plan: null,
    },
    paymentMethods: [],
    invoices: [],
    plans: [],
  }),
  getters: {
    payload(state) {
      return { user_id: state.user?.id };
    },
    defaultPaymentMethod(state) {
      return state.paymentMethods.find((item) => item.is_default);
    },
    upcomingInvoice(state) {
      return state.subscription.upcomingInvoice;
    },
    hasDue(state) {
      return state.subscription?.hasDue;
    },
    dueAmount(state) {
      return state.subscription?.invoice?.amount;
    },
    invoice(state) {
      return state.subscription?.invoice;
    },
    currentPlan(state) {
      const { plan } = state.subscription;
      if (plan) return plan;
      return null;
    },
    noPaymentMethods(state) {
      return state?.paymentMethods.length <= 0;
    },
    selectedPlan(state) {
      return (plan) => {
        return state.plans.find((item) => item.id === plan);
      };
    },
    defaultPlan(state) {
      const plan = state.plans[0];
      if (plan) return plan;
      return null;
    },
    subscribed(state) {
      return state.subscription?.is_valid;
    },
    canceled(state) {
      return state.subscription?.canceled;
    },
    ended(state) {
      return state.subscription?.ended;
    },
    billingDetails(store) {
      const user = store.user;
      const { line1, line2, city, state, postal_code } = user.address || {};
      return {
        name: user.name,
        email: user.email,
        phone: user.phone_number,
        address: { line1, line2, city, state, postal_code },
      };
    },
    usages(state) {
      return state.subscription?.usages || [];
    },
  },
  actions: {
    getPlans(payload = {}) {
      const id = this.currentPlan?.id;
      return new Promise((resolve, reject) => {
        Api.get(`shared/plans`, { ...payload, plan_id: id })
          .then((response) => {
            const data = Array.isArray(response) ? response : [];
            this.plans = data.map((item) => ({
              ...item,
              features: item.feature_lines,
              value: item.id,
            }));
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    subscribe(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`subscription/subscribe`, {
          ...payload,
          ...this.payload,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    loadSubscription() {
      this.isLoadingSubscription = true;
      return new Promise(async (resolve, reject) => {
        Api.get("subscription", this.payload)
          .then(async (response) => {
            this.subscription = response;
            await this.getPlans();
            this.isLoadingSubscription = false;
            resolve(response);
          })
          .catch((error) => {
            this.isLoadingSubscription = false;
            reject(error);
          });
      });
    },
    pay(payload = {}) {
      return new Promise((resolve, reject) => {
        Api.post("subscription/pay", {
          ...payload,
          ...this.payload,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    confirm(payload) {
      return new Promise((resolve, reject) => {
        Api.post("subscription/confirm", {
          ...payload,
          ...this.payload,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    cancel() {
      return new Promise((resolve, reject) => {
        Api.post("subscription/cancel", this.payload)
          .then(async (response) => {
            this.updateCancelled(true);
            await this.loadSubscription();
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    cancelDowngrade() {
      return new Promise((resolve, reject) => {
        Api.post("subscription/cancel-downgrade", this.payload)
          .then(async (response) => {
            await this.loadSubscription();
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    resume() {
      return new Promise((resolve, reject) => {
        Api.post("subscription/resume", this.payload)
          .then(async (response) => {
            this.updateCancelled(false);
            await this.loadSubscription();
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getInvoices(payload) {
      return new Promise((resolve, reject) => {
        Api.post("subscription/invoices", {
          ...payload,
          ...this.payload,
        })
          .then((response) => {
            this.invoices = response.data;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    downloadInvoice(payload) {
      return new Promise((resolve, reject) => {
        Api.download(`subscription/invoices/${payload}`, this.payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getPaymentMethods() {
      return new Promise((resolve, reject) => {
        Api.post("users/payment-methods", this.payload)
          .then((response) => {
            const data = Array.isArray(response) ? response : [];
            this.paymentMethods = data.map((item) => ({
              ...item,
              id: item.stripe_id,
              pId: item.id,
            }));
            resolve(this.paymentMethods);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addPaymentMethod(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`users/payment-methods/store`, {
          ...payload,
          ...this.payload,
        })
          .then(async (response) => {
            await this.getPaymentMethods();
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    removePaymentMethod(payload) {
      return new Promise((resolve, reject) => {
        Api.delete(`users/payment-methods/${payload}`, this.payload)
          .then(async (response) => {
            await this.getPaymentMethods();
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    updateDefaultPaymentMethod(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`users/payment-methods/${payload}/update`, this.payload)
          .then(async (response) => {
            await this.getPaymentMethods();
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    checkPromoCode(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`subscription/check-promo-code`, payload)
          .then(async (response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async setUser(payload, force = false) {
      const { id } = this.user || {};
      this.user = payload;
      if (id !== payload?.id || force) {
        await this.loadSubscription();
      }
    },
    removeUser() {
      this.user = null;
      this.isLoadingSubscription = true;
    },
    updateCancelled(payload) {
      if (this.subscription) {
        this.subscription.has_cancelled = payload;
      }
    },
  },
});
