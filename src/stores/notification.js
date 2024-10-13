import { defineStore } from "pinia";
import Api from "services/api";
import { router } from "src/router/index";
import core from "services/core";

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    rows: [],
    permissions: {},
  }),
  getters: {
    module: (store) => ({
      name: "Notifications",
      label: store.$t("label.notifications"),
      singular: store.$t("singular.notification"),
      plural: store.$t("plural.notifications"),
    }),
    columns: (store) => [
      {
        name: "label",
        align: "left",
        label: store.$t("label.label"),
        field: "label",
        sortable: true,
      },
      {
        name: "type",
        align: "left",
        label: store.$t("label.type"),
        field: "type",
        sortable: true,
      },
      {
        name: "default",
        align: "center",
        label: store.$t("label.default"),
        field: "is_default",
      },
      { name: "actions", align: "right" },
    ],
    actions: (store) => [
      {
        label: store.$t("label.edit"),
        action: "route",
        route: "Notification",
        params: (row) => ({ id: row.id }),
        query: (row) => ({ action: "edit" }),
        icon: "fas fa-edit",
        deleted: false,
      },
      {
        label: store.$t("label.duplicate"),
        action: store.duplicate,
        icon: "fas fa-copy",
        deleted: false,
      },
      {
        label: store.$t("label.markAsDefault"),
        condition: (row) => !row.is_default,
        action: store.markAsDefault,
        icon: "fas fa-star",
        deleted: false,
      },
      {
        label: store.$t("label.delete"),
        action: "delete",
        icon: "fas fa-trash-alt",
        deleted: false,
      },
      {
        label: store.$t("label.restore"),
        action: "restore",
        icon: "fas fa-trash-undo",
        deleted: true,
      },
    ],
    toolbar: (store) => [
      {
        icon: "fal fa-plus-circle",
        label: store.$t("label.addTemplate"),
        action: "route",
        params: { id: "add" },
        route: "Notification",
        color: "primary",
        deleted: "all",
      },
    ],
    types: (store) => [
      {
        label: store.$t("invoiceSent"),
        value: "user:invoice-sent",
      },
      {
        label: store.$t("signup"),
        value: "user:signup",
      },
      {
        label: store.$t("subscriptionCancel"),
        value: "user:subscription-cancel",
      },
      {
        label: store.$t("subscriptionCanceled"),
        value: "user:subscription-canceled",
      },
      {
        label: store.$t("subscriptionDowngrade"),
        value: "user:subscription-downgrade",
      },
      {
        label: store.$t("subscriptionExpired"),
        value: "user:subscription-expired",
      },
      {
        label: store.$t("subscriptionRenewed"),
        value: "user:subscription-renewed",
      },
      {
        label: store.$t("subscriptionUpgraded"),
        value: "user:subscription-upgraded",
      },
      {
        label: store.$t("enquiryNotification"),
        value: "user:enquiry-notification",
      },
      {
        label: store.$t("enquiryConfirmation"),
        value: "user:enquiry-confirmation",
      },
      {
        label: store.$t("enquiryUpdateNotification"),
        value: "user:enquiry-reply-notification",
      },
      {
        label: store.$t("AdminEnquiryNotification"),
        value: "admin:enquiry-reply-notification",
      },
      {
        label: store.$t("AdminSubscriptionExpired"),
        value: "admin:subscription-expired",
      },
      {
        label: store.$t("AdminSubscriptionCancel"),
        value: "admin:subscription-cancel",
      },
      {
        label: store.$t("AdminHoldRelease"),
        value: "admin:hold-release",
      },
      {
        label: store.$t("AdminTaskNotification"),
        value: "admin:task-user-notification",
      },
      {
        label: store.$t("AdminEnquiryNotification"),
        value: "admin:enquiry-notification",
      },
      {
        label: store.$t("AdminNewWelcome"),
        value: "admin:new-account",
      },
      {
        label: store.$t("AdminContactNotification"),
        value: "admin:contact-us-notification",
      },
      {
        label: store.$t("PushWhatsappSubscriptionCancel"),
        value: "push:subscription-cancel",
      },
      {
        label: store.$t("PushWhatsappSubscriptionCanceled"),
        value: "push:subscription-canceled",
      },
      {
        label: store.$t("PushWhatsappSubscriptionDowngrade"),
        value: "push:subscription-downgrade",
      },
      {
        label: store.$t("PushWhatsappSubscriptionExpired"),
        value: "push:subscription-expired",
      },
      {
        label: store.$t("PushWhatsappSubscriptionRenewed"),
        value: "push:subscription-renewed",
      },
      {
        label: store.$t("PushWhatsappSubscriptionUpgraded"),
        value: "push:subscription-upgraded",
      },
      {
        label: store.$t("PushWhatsappEnquiryNotification"),
        value: "push:enquiry-notification",
      },
      {
        label: store.$t("PushWhatsappEnquiryNotification"),
        value: "push:enquiry-reply-notification",
      },
      {
        label: store.$t("PushWhatsappEnquiryConfirmation"),
        value: "push:enquiry-confirmation",
      },
      {
        label: store.$t("AdminMemberUpdate"),
        value: "admin:member-status-update",
      },
      {
        label: store.$t("AdminGuestRequested"),
        value: "admin:guest-pass-request",
      },
      {
        label: store.$t("AdminMemberUpdate"),
        value: "admin:member-avatar-update",
      },
      {
        label: store.$t("bookingConfirmedNotification"),
        value: "user:booking-confirmed",
      },
      {
        label: store.$t("bookingStandbyNotification"),
        value: "user:booking-standby-confirmed",
      },
      {
        label: store.$t("bookingStandbyNotification"),
        value: "user:booking-standby",
      },
      {
        label: store.$t("bookingCanceledNotification"),
        value: "user:booking-canceled",
      },
      {
        label: store.$t("PushWhatsappBookingNotification"),
        value: "push:booking-confirmed",
      },
      {
        label: store.$t("PushWhatsappBookingNotification"),
        value: "push:booking-standby-confirmed",
      },
      {
        label: store.$t("PushWhatsappBookingNotification"),
        value: "push:booking-standby",
      },
      {
        label: store.$t("PushWhatsappBookingNotification"),
        value: "push:booking-canceled",
      },
      {
        label: store.$t("PushWhatsappUpcomingNotification"),
        value: "push:upcoming-class",
      },
      {
        label: store.$t("importCompleted"),
        value: "admin:import-completed",
      },
    ],
  },
  actions: {
    get(payload) {
      return new Promise((resolve, reject) => {
        Api.get("settings/notifications", payload)
          .then((response) => {
            this.rows = response.data;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    store(payload) {
      return new Promise((resolve, reject) => {
        Api.post("settings/notifications/store", payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    show(payload) {
      return new Promise((resolve, reject) => {
        Api.get(`settings/notifications/${payload}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    update(payload) {
      return new Promise((resolve, reject) => {
        Api.put(`settings/notifications/${payload.id}`, payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    delete(payload) {
      return new Promise((resolve, reject) => {
        Api.delete(`settings/notifications/${payload}/destroy`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    markAsDefault(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`settings/notifications/${payload.id}/mark-as-default`)
          .then((response) => {
            const { message, data } = response;
            payload.is_default = data.is_default;
            core.success(message);
            resolve(response);
          })
          .catch((error) => {
            core.error(error);
            reject(error);
          });
      });
    },
    duplicate(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`settings/notifications/${payload.id}/duplicate`)
          .then((response) => {
            const { message, data } = response;
            core.success(message);
            router.push({
              name: "Notification",
              params: {
                id: data.id,
              },
              query: {
                action: "edit",
              },
            });
            resolve(response);
          })
          .catch((error) => {
            core.error(error);
            reject(error);
          });
      });
    },
  },
});
