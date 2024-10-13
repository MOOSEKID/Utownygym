import { defineStore } from "pinia";
import Api from "services/api";
import core from "services/core";
import { router } from "src/router/index";

export const useQuestionnaireStore = defineStore("questionnaire", {
  state: () => ({
    rows: [],
    permissions: {},
  }),
  getters: {
    module: (store) => ({
      name: "Questionnaires",
      label: store.$t("questionnaires"),
      singular: store.$t("singular.questionnaire"),
      plural: store.$t("plural.questionnaires"),
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
        label: store.$t("label.trashed"),
        action: "request",
        component: "base-toggle",
        dense: true,
        key: "deleted",
        checkedIcon: "delete",
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
        options: store.statusOptions,
        prefix: store.$t("prefix.status"),
        deleted: "all",
      },
      {
        icon: "fad fa-plus-circle",
        label: store.$t("addQuestionnaire"),
        permission: "settings:questionnaires",
        action: "route",
        params: { id: "add" },
        route: "Questionnaire",
        color: "primary",
        deleted: "all",
      },
    ],
    filters: (store) => [],
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
        name: "created_at",
        align: "left",
        label: store.$t("label.createdAt"),
        field: "created_at",
        format: core.formatDateAsHuman,
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "default",
        align: "center",
        label: store.$t("label.default"),
        field: "default",
      },
      {
        name: "active",
        align: "left",
        label: store.$t("label.active"),
        field: "active",
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
        action: "route",
        route: "Questionnaire",
        params: (row) => ({ id: row.id }),
        query: (row) => ({ action: "edit" }),
        icon: "fas fa-edit",
        deleted: false,
      },
      {
        label: store.$t("label.duplicate"),
        action: (row) => store.duplicate(row),
        icon: "fas fa-copy",
        deleted: false,
      },
      {
        label: store.$t("label.delete"),
        action: "delete",
        icon: "fas fa-trash-alt",
        deleted: false,
      },
      {
        label: store.$t("label.restore"),
        action: "restore",
        icon: "fas fa-trash-undo",
        deleted: true,
      },
    ],
    fields: (store) => [
      {
        icon: "fas fa-text",
        type: "input",
        label: store.$t("singleLineText"),
        config: {
          width: 12,
          required: false,
          hideLabel: false,
        },
      },
      {
        icon: "fas fa-chevron-square-down",
        type: "select",
        label: store.$t("dropdown"),
        options: [
          {
            label: "Foo",
            value: "Foo",
          },
          {
            label: "Bar",
            value: "Bar",
          },
        ],
        config: {
          width: 12,
          required: false,
          hideLabel: false,
        },
      },
      {
        icon: "fas fa-paragraph",
        type: "textarea",
        label: store.$t("paragraphText"),
        config: {
          width: 12,
          required: false,
          hideLabel: false,
        },
      },
      {
        icon: "fas fa-check-square",
        type: "checkbox",
        label: store.$t("checkboxes"),
        options: [
          {
            label: "Foo",
            value: "Foo",
          },
          {
            label: "Bar",
            value: "Bar",
          },
        ],
        config: {
          width: 12,
          required: false,
          hideLabel: false,
          value: [],
        },
      },
      {
        icon: "radio_button_checked",
        type: "radio",
        label: store.$t("multipleChoice"),
        options: [
          {
            label: "Foo",
            value: "Foo",
          },
          {
            label: "Bar",
            value: "Bar",
          },
        ],
        config: {
          width: 12,
          required: false,
          hideLabel: false,
        },
      },
      {
        icon: "fas fa-calendar-alt",
        type: "date",
        label: store.$t("date"),
        config: {
          width: 12,
          required: false,
          hideLabel: false,
        },
      },
      {
        icon: "fas fa-envelope",
        type: "email",
        label: store.$t("email"),
        config: {
          width: 12,
          required: false,
          hideLabel: false,
        },
      },
      {
        icon: "fas fa-folder-upload",
        type: "file",
        label: store.$t("fileUpload"),
        config: {
          width: 12,
          required: false,
          hideLabel: false,
          accept: undefined,
          value: [],
          maxFiles: 5,
          maxFileSize: 10485760,
        },
      },
      {
        icon: "fas fa-hashtag",
        type: "number",
        label: store.$t("number"),
        config: {
          width: 12,
          required: false,
          hideLabel: false,
        },
      },
      {
        icon: "fas fa-link",
        type: "url",
        label: store.$t("websiteUrl"),
        config: {
          width: 12,
          required: false,
          hideLabel: false,
        },
      },
      {
        icon: "fas fa-heading",
        type: "label",
        label: store.$t("heading"),
        config: {
          width: 12,
          required: false,
          hideLabel: false,
        },
      },
      {
        icon: "fas fa-user",
        type: "name",
        label: store.$t("name"),
        config: {
          width: 12,
          required: false,
          hideLabel: false,
          value: {
            first_name: "",
            surname: "",
          },
        },
      },
      {
        icon: "fas fa-address-card",
        type: "address",
        label: store.$t("address"),
        config: {
          width: 12,
          required: false,
          hideLabel: false,
          value: {
            line_1: "",
            line_2: "",
            city: "",
            state: "",
            postcode: "",
            country: "",
          },
        },
      },
    ],
  },
  actions: {
    get(payload) {
      return new Promise((resolve, reject) => {
        Api.get("questionnaires", payload)
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
        Api.post("questionnaires/store", payload)
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
        Api.get(`questionnaires/${payload}`)
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
        Api.put(`questionnaires/${payload.id}`, payload)
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
        Api.delete(`questionnaires/${payload}/destroy`)
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
        Api.post(`questionnaires/${payload.id}/change-active`)
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
    duplicate(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`questionnaires/${payload.id}/duplicate`)
          .then((response) => {
            const { message, data } = response;
            core.success(message);
            router.push({
              name: "Questionnaire",
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
    default() {
      return new Promise((resolve, reject) => {
        Api.get(`shared/questionnaires/default`)
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
