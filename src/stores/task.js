import { defineStore } from "pinia";
import Api from "services/api";
import core from "services/core";

const status = (store) => [
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

export const useTaskStore = defineStore("task", {
  state: () => ({
    rows: [],
    permissions: {
      new: "tasks:new",
      edit: "tasks:edit",
      delete: "tasks:delete",
    },
  }),
  getters: {
    module: (store) => ({
      name: "Tasks",
      label: store.$t("label.tasks"),
      singular: store.$t("singular.task"),
      plural: store.$t("plural.tasks"),
    }),
    columns: (store) => [
      {
        name: "id",
        align: "left",
        label: store.$t("label.task"),
        field: (row) => row.subject,
        style: "width: 200px;",
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
        name: "user",
        align: "left",
        label: store.$t("label.user"),
        field: "user",
        format: (val) => (val ? `${val.name} (${val.email})` : ""),
        style: "width: 40px",
        sortable: false,
      },
      {
        name: "users",
        align: "left",
        label: store.$t("label.assigned"),
        field: "users",
        style: "width: 40px",
        sortable: false,
      },
      {
        name: "is_archived",
        align: "center",
        label: store.$t("label.archived"),
        field: "is_archived",
        style: "width: 10px",
        format: (val) => (val ? "Yes" : "No"),
        sortable: false,
      },
      {
        name: "status",
        align: "center",
        label: store.$t("label.status"),
        field: "status",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "last_reply",
        align: "left",
        label: store.$t("label.lastUpdate"),
        field: "last_reply",
        format: core.lastUpdate,
        style: "width: 40px",
        sortable: true,
      },
      { name: "actions", align: "right", sortable: false },
    ],
    actions: (store) => [
      {
        label: store.$t("label.reply"),
        permission: ["tasks:edit", "tasks:view"],
        action: "route",
        route: "Task",
        params: (row) => ({ id: row.id }),
        query: (row) => ({ action: "edit" }),
        icon: "fas fa-paper-plane",
        deleted: false,
      },
      {
        label: store.$t("label.delete"),
        permission: "tasks:delete",
        action: "delete",
        icon: "fas fa-trash-alt",
        deleted: false,
      },
      {
        label: store.$t("label.restore"),
        permission: "tasks:delete",
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
        permission: "tasks:delete",
        deleted: "all",
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
      },
      {
        icon: "fad fa-plus-circle",
        label: store.$t("label.createTask"),
        permission: "tasks:new",
        action: "route",
        params: { id: "add" },
        route: "Task",
        color: "primary",
        deleted: "all",
      },
    ],
    filters: (store) => [],
    statusOptions,
    status,
  },
  actions: {
    get(payload) {
      return new Promise((resolve, reject) => {
        Api.get("tasks", payload)
          .then((response) => {
            this.setRows(response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    show(payload) {
      return new Promise((resolve, reject) => {
        Api.get(`tasks/${payload}`)
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
        Api.post(`tasks/store`, payload)
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
        Api.delete(`tasks/${payload}/destroy`)
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
        Api.delete("tasks/destroy", {
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
        Api.post(`tasks/${payload}/restore`)
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
        Api.post("tasks/restore", {
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
        Api.post(`tasks/${payload.moduleId}/reply`, payload)
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
        Api.post(`tasks/${payload.id}/change-archived`)
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
  },
});
