import { defineStore } from "pinia";
import Api from "services/api";
import core from "services/core";

export const useAnnouncementStore = defineStore("announcement", {
  state: () => ({
    rows: [],
    permissions: {
      new: "announcements:new",
      edit: "announcements:edit",
      delete: "announcements:delete",
    },
  }),
  getters: {
    module: (store) => ({
      name: "Announcements",
      label: store.$t("label.announcements"),
      singular: store.$t("singular.announcement"),
      plural: store.$t("plural.announcements"),
    }),
    columns: (store) => [
      {
        name: "date",
        align: "left",
        label: store.$t("label.date"),
        field: "date_formated",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "open_at",
        align: "left",
        label: store.$t("label.openAt"),
        field: (row) => (row.is_closed ? "-" : row.open_at_formated),
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "close_at",
        align: "left",
        label: store.$t("label.closeAt"),
        field: (row) => (row.is_closed ? "-" : row.close_at_formated),
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "note",
        align: "left",
        label: store.$t("label.note"),
        field: "note",
        style: "width: 250px; white-space: normal",
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
      { name: "actions", align: "right", sortable: false },
    ],
    actions: (store) => [
      {
        label: store.$t("label.edit"),
        permission: "announcements:edit",
        action: "route",
        route: "Announcement",
        params: (row) => ({ id: row.id }),
        query: (row) => ({ action: "edit" }),
        icon: "fas fa-edit",
        deleted: false,
      },
      {
        label: store.$t("label.delete"),
        permission: "announcements:delete",
        action: "delete",
        icon: "fas fa-trash-alt",
        deleted: false,
      },
      {
        label: store.$t("label.restore"),
        permission: "announcements:delete",
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
        permission: "announcements:delete",
        deleted: "all",
      },
      {
        icon: "fad fa-plus-circle",
        label: store.$t("label.addAnnouncement"),
        permission: "announcements:new",
        action: "route",
        params: { id: "add" },
        route: "Announcement",
        color: "primary",
        deleted: "all",
      },
    ],
    filters: (store) => [],
  },
  actions: {
    get(payload) {
      return new Promise((resolve, reject) => {
        Api.get("announcements", payload)
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
        Api.post("announcements/store", payload)
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
        Api.get(`announcements/${payload}`)
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
        Api.put(`announcements/${payload.id}`, payload)
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
        Api.delete(`announcements/${payload}/destroy`)
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
        Api.delete("announcements/destroy", {
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
        Api.post(`announcements/${payload}/restore`)
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
        Api.post("announcements/restore", {
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
  },
});
