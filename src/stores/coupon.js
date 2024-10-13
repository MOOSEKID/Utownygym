import { defineStore } from "pinia";
import Api from "services/api";
import core from "services/core";

const statusOptions = (store) => [
  {
    label: store.$t("label.all"),
    value: null,
  },
  {
    label: store.$t("label.active"),
    value: true,
  },
];

const durationOptions = (store) => [
  {
    label: store.$t("label.forever"),
    value: "forever",
  },
  {
    label: store.$t("label.once"),
    value: "once",
  },
  {
    label: store.$t("label.repeating"),
    value: "repeating",
  },
];

const intervalOptions = (store) => [
  { label: store.$t("label.daily"), value: "day" },
  { label: store.$t("label.weekly"), value: "week" },
  { label: store.$t("label.monthly"), value: "month" },
  { label: store.$t("label.yearly"), value: "year" },
  { label: store.$t("label.custom"), value: "custom" },
];

const off = (row) => {
  if (row.fixed) {
    return core.money(row?.amount_off, { currency: row?.currency });
  }
  return row?.percent_off + "%";
};

export const useCouponStore = defineStore("coupon", {
  state: () => ({
    rows: [],
    permissions: {
      new: "coupons:new",
      edit: "coupons:edit",
      delete: "coupons:delete",
    },
  }),
  getters: {
    module: (store) => ({
      name: "Coupons",
      label: store.$t("label.coupons"),
      singular: store.$t("singular.coupon"),
      plural: store.$t("plural.coupons"),
    }),
    columns: (store) => [
      {
        name: "name",
        align: "left",
        label: store.$t("label.name"),
        field: "name",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "promotion_code",
        align: "left",
        label: store.$t("label.code"),
        field: "promotion_code",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "off",
        align: "left",
        label: store.$t("label.discount"),
        field: off,
        style: "width: 40px",
        sortable: false,
      },
      {
        name: "expires_at",
        align: "left",
        label: store.$t("label.expiredAt"),
        field: "expires_at",
        format: (val) => core.formatAsDateOnly(val) || "No Expiry Date",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "created_at",
        align: "left",
        label: store.$t("label.createdAt"),
        field: "created_at",
        format: core.formatDateAsHuman,
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "active",
        align: "left",
        label: store.$t("label.active"),
        field: "active",
        format: (val) => (val ? "Yes" : "No"),
        style: "width: 40px",
        sortable: true,
      },
      { name: "actions", align: "right", sortable: false },
    ],
    actions: (store) => [
      {
        label: store.$t("label.edit"),
        module: "Coupons",
        permission: "coupons:edit",
        action: "route",
        route: "Coupon",
        params: (row) => ({ id: row.id }),
        query: (row) => ({ action: "edit" }),
        icon: "fas fa-edit",
        deleted: false,
      },
      {
        label: store.$t("label.delete"),
        module: "Coupons",
        permission: "coupons:delete",
        action: "delete",
        icon: "fas fa-trash-alt",
        deleted: false,
      },
      {
        label: store.$t("label.restore"),
        module: "Coupons",
        permission: "coupons:delete",
        action: "restore",
        icon: "fas fa-trash-undo",
        deleted: true,
      },
    ],
    toolbar: (store) => [
      {
        label: store.$t("label.trashed"),
        action: "request",
        component: "base-toggle",
        dense: true,
        key: "deleted",
        checkedIcon: "delete",
        deleted: "all",
        permission: "coupons:delete",
      },
      {
        title: store.$t("label.status"),
        action: "request",
        component: "base-select",
        dense: true,
        outlined: true,
        key: "active",
        placeholder: store.$t("placeholder.select"),
        optionsDense: true,
        style: "width: 150px",
        mapOptions: true,
        emitValue: true,
        options: statusOptions(store),
        prefix: store.$t("prefix.status"),
        deleted: "all",
      },
      {
        icon: "fad fa-plus-circle",
        module: "Coupons",
        permission: "coupons:new",
        action: "route",
        label: store.$t("label.addCoupon"),
        params: { id: "add" },
        route: "Coupon",
        color: "primary",
        deleted: "all",
      },
    ],
    filters: (store) => [],
    intervalOptions,
    durationOptions,
  },
  actions: {
    get(payload) {
      return new Promise((resolve, reject) => {
        Api.get("coupons", payload)
          .then((response) => {
            this.setRows(response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    store(payload) {
      return new Promise((resolve, reject) => {
        Api.post("coupons/store", payload)
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
        Api.get(`coupons/${payload}`)
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
        Api.put(`coupons/${payload.id}`, payload)
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
        Api.delete(`coupons/${payload}/destroy`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteSelected(payload) {
      return new Promise((resolve, reject) => {
        Api.delete("coupons/destroy", {
          items: payload,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    restore(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`coupons/${payload}/restore`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    restoreSelected(payload) {
      return new Promise((resolve, reject) => {
        Api.post("coupons/restore", {
          items: payload,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    changeActive(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`coupons/${payload.id}/change-active`)
          .then((response) => {
            payload.active = !payload.active;
            const { message } = response;
            core.success(message);
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
