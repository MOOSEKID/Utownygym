import { defineStore } from "pinia";
import Api from "services/api";
import core from "services/core";
import { router } from "src/router/index";

export const useTemplateStore = defineStore("template", {
  state: () => ({
    rows: [],
    permissions: {
      new: "templates:new",
      edit: "templates:edit",
      delete: "templates:delete",
    },
  }),
  getters: {
    module: (store) => ({
      name: "Templates",
      label: store.$t("label.templates"),
      singular: store.$t("singular.template"),
      plural: store.$t("plural.templates"),
    }),
    statusOptions: (store) => [
      {
        label: store.$t("label.all"),
        value: null,
      },
      {
        label: store.$t("label.active"),
        value: true,
      },
    ],
    toolbar: (store) => [
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
        options: store.statusOptions,
        prefix: store.$t("prefix.status"),
        deleted: "all",
      },
      {
        icon: "fad fa-plus-circle",
        label: store.$t("label.addTemplate"),
        permission: "templates:new",
        action: "route",
        params: { id: "add" },
        route: "Template",
        color: "primary",
        deleted: "all",
      },
    ],
    filters: (store) => [],
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
        action: (row) => store.changeActive(row),
        sortable: true,
      },
      { name: "actions", align: "right", sortable: false },
    ],
    actions: (store) => [
      {
        label: store.$t("label.edit"),
        permission: "templates:edit",
        action: "route",
        route: "Template",
        params: (row) => ({ id: row.id }),
        query: (row) => ({ action: "edit" }),
        icon: "fas fa-edit",
        deleted: false,
      },
      {
        label: store.$t("label.duplicate"),
        permission: "templates:edit",
        action: (row) => store.duplicate(row),
        icon: "fas fa-copy",
        deleted: false,
      },
      {
        label: store.$t("label.delete"),
        permission: "templates:delete",
        action: "delete",
        icon: "fas fa-trash-alt",
        deleted: false,
      },
      {
        label: store.$t("label.restore"),
        permission: "templates:delete",
        action: "restore",
        icon: "fas fa-trash-undo",
        deleted: true,
      },
    ],
  },
  actions: {
    get(payload) {
      return new Promise((resolve, reject) => {
        Api.get("templates", payload)
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
        Api.post("templates/store", payload)
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
        Api.get(`templates/${payload}`)
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
        Api.put(`templates/${payload.id}`, payload)
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
        Api.delete(`templates/${payload}/destroy`)
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
        Api.delete("templates/destroy", {
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
        Api.post(`templates/${payload}/restore`)
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
        Api.post("templates/restore", {
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
        Api.post(`templates/${payload.id}/change-active`)
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
    duplicate(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`templates/${payload.id}/duplicate`)
          .then((response) => {
            const { message, data } = response;
            core.success(message);
            router.push({
              name: "Template",
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
