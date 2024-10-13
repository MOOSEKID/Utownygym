import { defineStore } from "pinia";
import Api from "services/api";
import core from "services/core";

export const importMethod = (payload) => {
  return new Promise((resolve, reject) => {
    Api.post("admins/import", payload)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const importByCSV = () => {
  return core.csvImportDialog({
    title: "Import staff by CSV",
    sampleFile: "/csv/staff.csv",
    importMethod,
    options: [
      {
        label: "Overwrite existing staff that have the same email",
        type: "checkbox",
        key: "email_overwrite",
        value: false,
      },
    ],
  });
};

export const statusOptions = (store) => [
  {
    label: store.$t("label.all"),
    value: null,
  },
  {
    label: store.$t("label.active"),
    value: true,
  },
];

export const useStaffStore = defineStore("staff", {
  state: () => ({
    rows: [],
    permissions: {
      new: "staff:new",
      edit: "staff:edit",
      delete: "staff:delete",
    },
  }),
  getters: {
    module: (store) => ({
      name: "Staff",
      label: store.$t("label.staff"),
      singular: store.$t("singular.staff"),
      plural: store.$t("plural.staff"),
    }),
    columns: (store) => [
      {
        name: "avatar",
        align: "left",
        field: "avatar",
        style: "width: 40px",
      },
      {
        name: "name",
        align: "left",
        label: store.$t("label.name"),
        field: "name",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "email",
        align: "left",
        label: store.$t("label.email"),
        field: "email",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "last_login",
        align: "left",
        label: store.$t("label.lastLogin"),
        field: (row) => row.last_login?.created_at,
        format: core.formatDateAsHuman,
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "groups",
        align: "left",
        label: store.$t("label.groups"),
        field: "groups",
        format: (val) => (val ? val.map((item) => item.name).toString() : null),
        style: "width: 40px",
        sortable: false,
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
      {
        name: "is_supper_admin",
        align: "left",
        label: store.$t("label.admin"),
        field: "is_supper_admin",
        format: (val) => (val ? "Yes" : "No"),
        style: "width: 40px",
        sortable: true,
      },
      { name: "actions", align: "right", sortable: false },
    ],
    actions: (store) => [
      {
        label: store.$t("label.edit"),
        permission: "staff:edit",
        action: "route",
        route: "Staff",
        params: (row) => ({ id: row.id }),
        query: (row) => ({ action: "edit" }),
        icon: "fas fa-edit",
        deleted: false,
      },
      {
        label: ({ is_instructor }) =>
          store.$t(is_instructor ? "removeFromInstructor" : "markAsInstructor"),
        permission: "staff:edit",
        action: store.changeInstructor,
        icon: "fas fa-user",
        deleted: false,
      },
      {
        label: store.$t("label.delete"),
        permission: "staff:delete",
        action: "delete",
        icon: "fas fa-trash-alt",
        deleted: false,
      },
      {
        label: store.$t("label.restore"),
        permission: "staff:delete",
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
        permission: "staff:delete",
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
        icon: "fad fa-file-import",
        tooltip: store.$t("importByCsv"),
        permission: "staff:new",
        action: importByCSV,
        color: "grey",
        deleted: "all",
      },
      {
        icon: "fad fa-plus-circle",
        label: store.$t("label.addStaff"),
        permission: "staff:new",
        action: "route",
        params: { id: "add" },
        route: "Staff",
        color: "primary",
        deleted: "all",
      },
    ],
    filters: (store) => [],
  },
  actions: {
    get(payload) {
      return new Promise((resolve, reject) => {
        Api.get("admins", payload)
          .then((response) => {
            this.setRows(response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    options(payload) {
      return new Promise((resolve, reject) => {
        Api.get("admins/options", payload)
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
        Api.post("admins/store", payload)
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
        Api.get(`admins/${payload}`)
          .then((response) => {
            if (!response.address) {
              Object.assign(response, { address: {} });
            }
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    update(payload) {
      return new Promise((resolve, reject) => {
        Api.put(`admins/${payload.id}`, payload)
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
        Api.delete(`admins/${payload}/destroy`)
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
        Api.delete("admins/destroy", {
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
        Api.post(`admins/${payload}/restore`)
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
        Api.post("admins/restore", {
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
        Api.post(`admins/${payload.id}/change-active`)
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
    changeAdmin(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`admins/${payload.id}/change-admin`)
          .then((response) => {
            payload.is_supper_admin = !payload.is_supper_admin;
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
    changeInstructor(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`admins/${payload.id}/change-instructor`)
          .then((response) => {
            payload.is_instructor = !payload.is_instructor;
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
