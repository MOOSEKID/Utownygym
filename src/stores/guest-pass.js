import { defineStore } from "pinia";
import Api from "services/api";
import core from "services/core";

export const useGuestPassStore = defineStore("guest-pass", {
  getters: {
    module: (store) => ({
      name: store.$t("label.guestPasses"),
      singular: store.$t("singular.guestPass"),
      plural: store.$t("plural.guestPasses"),
    }),
    columns: (store) => [
      {
        name: "name",
        align: "left",
        label: store.$t("label.name"),
        field: "name",
        style: "width: 40px",
        sortable: true,
        guard: ["admins", "users"],
      },
      {
        name: "created_at",
        align: "left",
        label: store.$t("label.createdAt"),
        field: "created_at",
        format: core.formatDateAsHuman,
        style: "width: 40px",
        sortable: true,
        guard: ["admins", "users"],
      },
      {
        name: "user",
        align: "left",
        label: store.$t("label.member"),
        field: "user",
        style: "width: 40px",
        format: (val) => (val ? val.name : null),
        sortable: false,
        guard: ["admins"],
      },
      {
        name: "actions",
        align: "right",
        sortable: false,
        guard: ["admins", "users"],
      },
    ],
    actions: (store) => [
      {
        label: store.$t("label.edit"),
        permission: "Edit",
        action: "route",
        route: "Guest Pass",
        params: (row) => ({ id: row.id }),
        query: (row) => ({ action: "edit" }),
        icon: "fas fa-edit",
        deleted: false,
      },
      {
        label: store.$t("label.delete"),
        permission: "Delete",
        action: "delete",
        icon: "fas fa-trash-alt",
        deleted: false,
      },
      {
        label: store.$t("label.restore"),
        permission: "Delete",
        action: "restore",
        icon: "fas fa-trash-undo",
        deleted: true,
      },
    ],
    toolbar: (store) => [
      {
        icon: "fad fa-plus-circle",
        label: store.$t("label.addGuestPass"),
        action: "route",
        params: { id: "add" },
        route: "Guest Pass",
        color: "primary",
        deleted: "all",

        guard: ["admins", "users"],
      },
    ],
    filters: (store) => [],
  },
  actions: {
    get(payload) {
      return new Promise((resolve, reject) => {
        Api.get("member/guest-passes", payload)
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
        Api.post("member/guest-passes/store", payload)
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
        Api.get(`member/guest-passes/${payload}`)
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
        Api.put(`member/guest-passes/${payload.id}`, payload)
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
        Api.delete(`member/guest-passes/${payload}/destroy`)
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
