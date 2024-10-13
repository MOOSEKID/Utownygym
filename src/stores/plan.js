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

const intervalOptions = (store) => [
  { label: store.$t("label.daily"), value: "day" },
  { label: store.$t("label.weekly"), value: "week" },
  { label: store.$t("label.monthly"), value: "month" },
  { label: store.$t("label.yearly"), value: "year" },
  { label: store.$t("label.custom"), value: "custom" },
];

export const usePlanStore = defineStore("plan", {
  state: () => ({
    rows: [],
    permissions: {
      new: "settings:plans",
      edit: "settings:plans",
      delete: "settings:plans",
    },
  }),
  getters: {
    module: (store) => ({
      name: "Plans",
      label: store.$t("label.plans"),
      singular: store.$t("singular.plan"),
      plural: store.$t("plural.plans"),
    }),
    columns: (store) => [
      {
        name: "label",
        align: "left",
        label: store.$t("label.label"),
        field: "label",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "price",
        align: "left",
        label: store.$t("price"),
        field: "price_formated",
        style: "width: 40px",
        sortable: false,
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
        name: "is_active",
        align: "left",
        label: store.$t("label.active"),
        field: "is_active",
        format: (val) => (val ? "Yes" : "No"),
        style: "width: 40px",
        sortable: true,
        // grid: { label: "inline" },
      },
      { name: "actions", align: "right", sortable: false },
    ],
    actions: (store) => [
      {
        label: store.$t("label.edit"),
        module: "Plans",
        permission: "plans:edit",
        action: "route",
        route: "Plan",
        params: (row) => ({ id: row.id }),
        query: (row) => ({ action: "edit" }),
        icon: "fas fa-edit",
        deleted: false,
      },
      {
        label: store.$t("label.delete"),
        permission: "plans:delete",
        action: "delete",
        icon: "fas fa-trash-alt",
        deleted: false,
      },
      {
        label: store.$t("label.restore"),
        permission: "plans:delete",
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
        permission: "plans:delete",
        guard: ["admins"],
        deleted: "all",
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
        permission: "plans:new",
        action: "route",
        label: store.$t("label.addPlan"),
        params: { id: "add" },
        route: "Plan",
        color: "primary",
        deleted: "all",
      },
    ],
    filters: (store) => [],
    intervalOptions,
  },
  actions: {
    get(payload) {
      return new Promise((resolve, reject) => {
        Api.get("plans", payload)
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
        Api.post("plans/store", payload)
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
        Api.get(`plans/${payload}`)
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
        Api.put(`plans/${payload.id}`, payload)
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
        Api.delete(`plans/${payload}/destroy`)
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
        Api.delete("plans/destroy", {
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
        Api.post(`plans/${payload}/restore`)
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
        Api.post("plans/restore", {
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
        Api.post(`plans/${payload.id}/change-active`)
          .then((response) => {
            payload.is_active = !payload.is_active;
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
    getFeatures() {
      return new Promise((resolve, reject) => {
        Api.get(`shared/plans/features`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
