import { defineStore } from "pinia";
import Api from "services/api";
import core from "services/core";

const statusOptions = (store) => [
  {
    label: store.$t("label.all"),
    value: null,
  },
  {
    label: store.$t("checkIn"),
    value: "check-in",
  },
  {
    label: store.$t("accessDenied"),
    value: "access-denied",
  },
];

export const useCheckinStore = defineStore("checkin", {
  getters: {
    columns: (store) => [
      {
        name: "created_at",
        align: "left",
        label: store.$t("label.date"),
        field: "created_at",
        format: core.formatDateAsHuman,
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "type",
        align: "left",
        label: store.$t("label.type"),
        field: "type",
        style: "width: 40px",
        sortable: true,
      },
      {
        name: "message",
        align: "left",
        label: store.$t("label.message"),
        field: "message",
        sortable: false,
      },
    ],
    toolbar: (store) => [
      {
        title: store.$t("label.status"),
        action: "request",
        component: "base-select",
        dense: true,
        outlined: true,
        key: "status",
        placeholder: store.$t("placeholder.select"),
        optionsDense: true,
        style: "width: 150px",
        mapOptions: true,
        emitValue: true,
        options: statusOptions(store),
        prefix: store.$t("prefix.status"),
        deleted: "all",
      },
    ],
    filters: (store) => [],
  },
  actions: {
    get(payload) {
      return new Promise((resolve, reject) => {
        Api.get("member/checkin-history", payload)
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
