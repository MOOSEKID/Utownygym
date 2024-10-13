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

export const usePageStore = defineStore("page", {
  state: () => ({
    rows: [],
    permissions: {
      new: "pages:new",
      edit: "pages:edit",
      delete: "pages:delete",
    },
  }),
  getters: {
    module: (store) => ({
      name: "Pages",
      label: store.$t("label.pages"),
      singular: store.$t("singular.page"),
      plural: store.$t("plural.pages"),
    }),
    columns: (store) => [
      {
        name: "title",
        align: "left",
        label: store.$t("label.title"),
        field: "title",
        style: "width: 200px; white-space: normal;",
        sortable: true,
      },
      {
        name: "template",
        align: "center",
        field: "template",
        style: "width: 15px;",
      },
      {
        name: "url",
        align: "center",
        field: "url",
        style: "width: 15px;",
      },
      {
        name: "updated_at",
        align: "left",
        label: store.$t("updatedAt"),
        field: "updated_at",
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
      },
      { name: "actions", align: "right", sortable: false },
    ],
    actions: (store) => [
      {
        label: store.$t("label.edit"),
        permission: "pages:edit",
        action: "route",
        route: "Page",
        params: (row) => ({ id: row.id }),
        query: (row) => ({ action: "edit" }),
        icon: "fas fa-edit",
        deleted: false,
      },
      {
        label: store.$t("label.delete"),
        permission: "pages:delete",
        action: "delete",
        icon: "fas fa-trash-alt",
        deleted: false,
      },
      {
        label: store.$t("label.restore"),
        permission: "pages:delete",
        action: "restore",
        icon: "fas fa-trash-undo",
        deleted: true,
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
        placeholder: "Select",
        optionsDense: true,
        style: "width: 150px",
        mapOptions: true,
        emitValue: true,
        options: statusOptions(store),
        prefix: store.$t("prefix.status"),
        deleted: "all",
        width: "6",
      },
      {
        icon: "fad fa-plus-circle",
        label: store.$t("label.addPage"),
        permission: "pages:new",
        action: "route",
        params: { id: "add" },
        route: "Page",
        color: "primary",
        deleted: "all",
        width: "6",
      },
    ],
    templates: (store) => [
      { label: store.$t("home"), value: "home" },
      { label: store.$t("blogs"), value: "blogs" },
      { label: store.$t("membership"), value: "membership" },
      { label: store.$t("singleBlogPage"), value: "blog" },
    ],
  },
  actions: {
    get(payload) {
      return new Promise((resolve, reject) => {
        Api.get("pages", payload)
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
        Api.post("pages/store", payload)
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
        Api.get(`pages/${payload}`)
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
        Api.put(`pages/${payload.id}`, payload)
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
        Api.delete(`pages/${payload}/destroy`)
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
        Api.delete("pages/destroy", {
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
        Api.post(`pages/${payload}/restore`)
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
        Api.post("pages/restore", {
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
        Api.post(`pages/${payload.id}/change-active`)
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
    shortCode(payload) {
      return new Promise((resolve, reject) => {
        Api.get(`application/short-code`, payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editorTheme(payload) {
      return new Promise((resolve, reject) => {
        Api.get(`application/editor-theme`, payload)
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
