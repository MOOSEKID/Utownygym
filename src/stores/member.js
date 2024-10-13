import { defineStore } from "pinia";
import Api from "services/api";
import core from "services/core";

export const importMethod = (payload) => {
  return new Promise((resolve, reject) => {
    Api.post("users/import", payload)
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
    title: "Import members by CSV",
    sampleFile: "/csv/users.csv",
    importMethod,
    options: [
      {
        label: "Overwrite existing users that have the same email",
        type: "checkbox",
        key: "email_overwrite",
        value: false,
      },
    ],
  });
};

export const statusOptions = (store) => [
  {
    label: store.$t("label.active"),
    value: true,
  },
  {
    label: store.$t("label.nSPast7Days"),
    value: "no-show",
  },
  {
    label: store.$t("label.lCPast7Days"),
    value: "late-cancellation",
  },
  {
    label: store.$t("label.blocked"),
    value: "blocked",
  },
];

export const markAsPaid = (payload) => {
  return new Promise((resolve, reject) => {
    Api.post(`users/${payload.id}/mark-as-paid`, payload)
      .then((response) => {
        const { message } = response;
        core.success(message);
        resolve(response);
      })
      .catch((error) => {
        core.error(error);
        reject(error);
      });
  });
};

export const useMemberStore = defineStore("member", {
  state: () => ({
    rows: [],
    permissions: {
      new: "members:new",
      edit: "members:edit",
      delete: "members:delete",
    },
  }),
  getters: {
    module: (store) => ({
      name: "Members",
      label: store.$t("label.members"),
      singular: store.$t("singular.member"),
      plural: store.$t("plural.members"),
    }),
    columns: (store) => [
      {
        name: "id",
        align: "left",
        label: store.$t("label.memberID"),
        field: "member_id_formated",
        style: "width: 40px",
        sortable: true,
      },
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
        name: "phone_number",
        align: "left",
        label: store.$t("label.contact"),
        field: "phone_number",
        style: "width: 40px",
        sortable: true,
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
        name: "subscription",
        align: "center",
        label: store.$t("label.subscription"),
        field: "subscription_status",
        style: "width: 40px",
        sortable: false,
      },
      {
        name: "last_login",
        align: "left",
        label: store.$t("label.lastLogin"),
        field: "last_login",
        format: (val) => core.formatDateAsHuman(val?.created_at),
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "ns_bookings_count",
        align: "center",
        label: store.$t("label.nS"),
        field: "ns_bookings_count",
        style: "width: 40px",
        sortable: false,
        status: ["no-show"],
      },
      {
        name: "last_ns_bookings",
        align: "left",
        label: store.$t("label.lastNS"),
        field: "last_ns_bookings",
        format: (val) => core.formatDateAsHuman(val?.schedules_at),
        style: "width: 40px",
        sortable: true,
        status: ["no-show", "blocked"],
      },
      {
        name: "late_cancellation_count",
        align: "center",
        label: store.$t("label.lC"),
        field: "late_cancellation_count",
        style: "width: 40px",
        sortable: false,
        status: ["late-cancellation"],
      },
      {
        name: "last_late_cancellation",
        align: "left",
        label: store.$t("label.lastLC"),
        field: "last_late_cancellation",
        format: (val) => core.formatDateAsHuman(val?.schedules_at),
        style: "width: 40px",
        sortable: true,
        status: ["late-cancellation", "blocked"],
      },
      {
        name: "release_at",
        align: "left",
        label: store.$t("label.releaseAt"),
        field: "blocked",
        format: (val) =>
          val
            ? `[${val?.type}] ${core.formatDateAsHuman(val?.release_at)}`
            : null,
        style: "width: 40px",
        sortable: false,
        status: ["blocked"],
      },
      {
        name: "is_active",
        align: "left",
        label: store.$t("label.active"),
        field: "is_active",
        style: "width: 40px",
        format: (val) => (val ? "Yes" : "No"),
        sortable: true,
      },
      { name: "actions", align: "right", sortable: false },
    ],
    toolbar: (store) => [
      {
        label: store.$t("label.trashed"),
        action: "request",
        component: "base-toggle",
        dense: true,
        key: "deleted",
        checkedIcon: "delete",
        permission: "members:delete",
        guard: ["admins"],
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
        title: store.$t("label.rag"),
        action: "request",
        component: "base-select",
        dense: true,
        outlined: true,
        key: "rag",
        placeholder: store.$t("placeholder.rag"),
        optionsDense: true,
        style: "width: 120px",
        mapOptions: true,
        emitValue: true,
        options: [null, "red", "green", "amber", "white"].map((item) => ({
          label: item
            ? `<div class="text-center"><i class="q-icon fas fa-circle rag-${item}" style="font-size: 13px;" aria-hidden="true" role="presentation" ></i></div>`
            : `<div class="text-center">${store.$t("label.all")}</div>`,
          value: item,
        })),
        optionsHtml: true,
        prefix: store.$t("prefix.rag"),
        deleted: "all",
      },
      {
        tooltip: store.$t("tooltip.exportAsCsv"),
        icon: "fas fa-file-csv",
        action: "export",
        color: "grey",
        deleted: "all",
        type: "csv",
      },
      {
        icon: "fad fa-file-import",
        tooltip: store.$t("importByCsv"),
        permission: "members:new",
        action: importByCSV,
        color: "grey",
        deleted: "all",
      },
      {
        icon: "fad fa-plus-circle",
        label: store.$t("label.addMember"),
        permission: "members:new",
        action: "route",
        params: { id: "add" },
        route: "Member",
        color: "primary",
        deleted: "all",
      },
    ],
    actions: (store) => [
      {
        label: store.$t("label.edit"),
        permission: "members:edit",
        action: "route",
        route: "Member",
        params: (row) => ({ id: row.id }),
        query: (row) => ({ action: "edit" }),
        icon: "fas fa-edit",
        deleted: false,
      },
      {
        label: (row) => (row.has_blocked ? "Unblock" : "Block"),
        action: (row) => store.changeBlock(row),
        condition: (row) =>
          ["no-show", "late-cancellation", "blocked"].includes(
            row.pagination.status
          ),
        icon: (row) => (row.has_blocked ? "fas fa-circle-stop" : "fas fa-ban"),
        deleted: false,
      },
      {
        label: (row) => (row.request_parq ? "PARQ Received" : "Request PARQ"),
        action: (row) => store.requestParq(row),
        icon: (row) =>
          row.request_parq
            ? "fas fa-clipboard-question"
            : "fas fa-clipboard-question",
        deleted: false,
      },
      {
        label: (row) =>
          row.request_avatar ? "Avatar Uploaded" : "Request Avatar",
        action: (row) => store.requestAvatar(row),
        icon: (row) =>
          row.request_avatar
            ? "fas fa-image-polaroid"
            : "fas fa-image-polaroid-user",
        deleted: false,
      },
      {
        label: store.$t("label.delete"),
        permission: "members:delete",
        action: "delete",
        icon: "fas fa-trash-alt",
        deleted: false,
      },
      {
        label: store.$t("label.restore"),
        permission: "members:delete",
        action: "restore",
        icon: "fas fa-trash-undo",
        deleted: true,
      },
    ],
    filters: (store) => [],
  },
  actions: {
    get(payload) {
      return new Promise((resolve, reject) => {
        Api.get("users", payload)
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
        Api.get("users/options", payload)
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
        Api.post("users/store", payload)
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
        Api.get(`users/${payload}`)
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
    shows(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`users/list-by-ids`, payload)
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
        Api.put(`users/${payload.id}`, payload)
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
        Api.delete(`users/${payload}/destroy`)
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
        Api.delete("users/destroy", {
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
        Api.post(`users/${payload}/restore`)
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
        Api.post("users/restore", {
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
        Api.post(`users/${payload.id}/change-active`)
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
    changeBlock(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`users/${payload.id}/change-block`)
          .then((response) => {
            payload.has_blocked = !payload.has_blocked;
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
    notes(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`users/${payload.moduleId}/notes`, payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    schedules(payload) {
      return new Promise((resolve, reject) => {
        Api.get(`users/${payload.moduleId}/schedules`, payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    schedulesCalendar(payload) {
      return new Promise((resolve, reject) => {
        Api.get(`users/${payload.moduleId}/schedules-calendar`, payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    showByQrcode(payload) {
      return new Promise((resolve, reject) => {
        Api.get(`users/show-by-qrcode/${payload}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    markAsPaid,
    requestAvatar(payload) {
      payload.loading = true;
      return new Promise((resolve, reject) => {
        Api.post(`users/${payload.id}/request-avatar`)
          .then((response) => {
            payload.loading = false;
            payload.request_avatar = !payload.request_avatar;
            const { message } = response;
            core.success(message);
            resolve(response);
          })
          .catch((error) => {
            payload.loading = false;
            core.error(error);
            reject(error);
          });
      });
    },
    requestParq(payload) {
      payload.loading = true;
      return new Promise((resolve, reject) => {
        Api.post(`users/${payload.id}/request-parq`)
          .then((response) => {
            payload.loading = false;
            payload.request_parq = !payload.request_parq;
            const { message } = response;
            core.success(message);
            resolve(response);
          })
          .catch((error) => {
            payload.loading = false;
            core.error(error);
            reject(error);
          });
      });
    },
  },
});
