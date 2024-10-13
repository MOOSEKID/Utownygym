import { defineStore } from "pinia";
import Api from "services/api";
import core from "services/core";

const typeOptions = (store) => [
  {
    label: store.$t("label.all"),
    value: null,
  },
  {
    label: store.$t("label.membersOnly"),
    value: "users",
  },
  {
    label: store.$t("label.contactForm"),
    value: "contact",
  },
];

const defaultStatusOptions = (store) => [
  {
    label: store.$t("label.pending"),
    value: "Pending",
  },
  {
    label: store.$t("label.ongoing"),
    value: "Ongoing",
  },
  {
    label: store.$t("label.resolved"),
    value: "Resolved",
  },
];

const statusOptions = (store) => [
  {
    label: store.$t("label.all"),
    value: "All",
  },
  {
    label: store.$t("label.live"),
    value: "Live",
  },
  {
    label: store.$t("label.archive"),
    value: "Archive",
  },
];

export const useEnquiryStore = defineStore("enquiry", {
  state: () => ({
    rows: [],
    permissions: {
      new: "enquiries:new",
      edit: "enquiries:edit",
      delete: "enquiries:delete",
    },
  }),
  getters: {
    module: (store) => ({
      name: "Enquiries",
      label: store.$t("label.enquiries"),
      singular: store.$t("singular.enquiry"),
      plural: store.$t("plural.enquiries"),
    }),
    columns: (store) => [
      {
        name: "id",
        align: "left",
        label: store.$t("label.subject"),
        field: (row) => row.subject,
        style: "width: 200px;",
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
        name: "is_archived",
        align: "center",
        label: store.$t("label.archived"),
        field: "is_archived",
        style: "width: 10px",
        format: (val) => (val ? "Yes" : "No"),
        sortable: false,
        guard: ["admins"],
      },
      {
        name: "user_archived",
        align: "center",
        label: store.$t("label.archived"),
        field: "user_archived",
        style: "width: 10px",
        format: (val) => (val ? "Yes" : "No"),
        sortable: false,
        guard: ["users"],
      },
      {
        name: "name",
        align: "left",
        label: store.$t("label.name"),
        field: "name",
        style: "width: 40px",
        sortable: true,
        guard: ["admins"],
      },
      {
        name: "email",
        align: "left",
        label: store.$t("label.email"),
        field: "email",
        style: "width: 40px",
        sortable: true,
        guard: ["admins"],
      },
      {
        name: "phone",
        align: "left",
        label: store.$t("label.contact"),
        field: "phone",
        style: "width: 40px",
        sortable: true,
        guard: ["admins"],
      },
      {
        name: "status",
        align: "center",
        label: store.$t("label.status"),
        field: "status",
        style: "width: 40px",
        sortable: true,
        guard: ["admins", "users"],
      },
      {
        name: "last_reply",
        align: "left",
        label: store.$t("label.lastUpdate"),
        field: "last_reply",
        format: core.lastUpdate,
        style: "width: 40px",
        sortable: true,
        guard: ["admins", "users"],
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
        label: store.$t("label.reply"),
        permission: ["enquiries:view", "enquiries:edit"],
        action: "route",
        route: "Enquiry",
        params: (row) => ({ id: row.id }),
        query: (row) => ({ action: "edit" }),
        icon: "fas fa-paper-plane",
        deleted: false,
      },
      {
        label: store.$t("label.delete"),
        permission: "enquiries:delete",
        action: "delete",
        icon: "fas fa-trash-alt",
        deleted: false,
      },
      {
        label: store.$t("label.restore"),
        permission: "enquiries:delete",
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
        guard: ["admins"],
        deleted: "all",
        permission: "enquiries:delete",
      },
      {
        title: store.$t("label.type"),
        action: "request",
        component: "base-select",
        dense: true,
        outlined: true,
        key: "type",
        placeholder: store.$t("placeholder.select"),
        optionsDense: true,
        style: "width: 180px",
        mapOptions: true,
        emitValue: true,
        options: typeOptions(store),
        deleted: "all",
        prefix: store.$t("prefix.type"),
        guard: ["admins"],
      },
      {
        title: store.$t("label.status"),
        action: "request",
        component: "base-select",
        dense: true,
        outlined: true,
        key: "status",
        placeholder: store.$t("placeholder.select"),
        optionsDense: true,
        style: "width: 180px",
        mapOptions: true,
        emitValue: true,
        options: statusOptions(store),
        deleted: "all",
        prefix: store.$t("prefix.status"),
        guard: ["admins"],
      },
      {
        title: store.$t("label.status"),
        action: "request",
        component: "base-select",
        dense: true,
        outlined: true,
        key: "status",
        placeholder: store.$t("placeholder.select"),
        optionsDense: true,
        style: "width: 180px",
        mapOptions: true,
        emitValue: true,
        options: statusOptions(store),
        deleted: "all",
        prefix: store.$t("prefix.status"),
        guard: ["users"],
      },
      {
        icon: "fad fa-plus-circle",
        label: store.$t("label.createEnquiry"),
        permission: "enquiries:new",
        action: "route",
        params: { id: "add" },
        route: "Enquiry",
        color: "primary",
        deleted: "all",
        guard: ["admins"],
      },
      {
        icon: "fad fa-plus-circle",
        label: store.$t("label.createEnquiry"),
        action: "route",
        params: { id: "add" },
        route: "Enquiry",
        color: "primary",
        deleted: "all",
        guard: ["users"],
      },
    ],
    filters: (store) => [],
    statusOptions,
    defaultStatusOptions,
  },
  actions: {
    get(payload) {
      return new Promise((resolve, reject) => {
        Api.get("enquiries", payload)
          .then((response) => {
            this.rows = response.data.map((item) => ({
              ...item,
              subject: item.subject || "Contact us",
            }));
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    show(payload) {
      return new Promise((resolve, reject) => {
        Api.get(`enquiries/${payload}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    store(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`enquiries/store`, payload)
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
        Api.delete(`enquiries/${payload}/destroy`)
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
        Api.delete("enquiries/destroy", {
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
        Api.post(`enquiries/${payload}/restore`)
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
        Api.post("enquiries/restore", {
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
    reply(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`enquiries/${payload.moduleId}/reply`, payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    changeArchived(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`enquiries/${payload.id}/change-archived`)
          .then((response) => {
            payload.is_archived = !payload.is_archived;
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
    changeUserArchived(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`enquiries/${payload.id}/change-user-archived`)
          .then((response) => {
            payload.user_archived = !payload.user_archived;
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
