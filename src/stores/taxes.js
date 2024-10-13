import { defineStore } from "pinia";
import { Dialog } from "quasar";
import Api from "services/api";
import TaxDialog from "src/components/settings/TaxDialog.vue";

export const useTaxStore = defineStore("taxes", {
  state: () => ({
    rows: [],
    permissions: {
      new: "settings:taxes",
      edit: "settings:taxes",
      delete: "settings:taxes",
    },
  }),
  getters: {
    columns: (store) => [
      {
        name: "country",
        align: "left",
        label: store.$t("label.country"),
        field: "country",
        style: "width: 100px;",
        sortable: true,
      },
      {
        name: "state",
        align: "left",
        label: store.$t("label.state"),
        field: "state",
        style: "width: 50px;",
        sortable: true,
      },
      {
        name: "label",
        align: "left",
        label: store.$t("label.label"),
        field: "label",
        style: "width: 100px;",
        sortable: true,
      },
      {
        name: "rate",
        align: "center",
        label: store.$t("label.rate"),
        field: "rate",
        style: "width: 100px;",
        sortable: true,
      },
      {
        name: "compounded",
        align: "center",
        label: store.$t("label.compounded"),
        field: "compounded",
        format: (val) => (val ? "Yes" : "No"),
        style: "width: 50px;",
        sortable: true,
      },
      {
        name: "priority",
        align: "center",
        label: store.$t("label.priority"),
        field: "priority",
        style: "width: 100px;",
        sortable: true,
      },
      { name: "actions", align: "right", sortable: false },
    ],
  },
  actions: {
    get(payload) {
      return new Promise((resolve, reject) => {
        Api.get("taxes", payload)
          .then((response) => {
            const rows = response.map((item) => ({
              ...item,
              removeable: item.code === "*",
            }));
            this.setRows(rows);
            resolve(rows);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    store(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`taxes/store`, payload)
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
        Api.put(`taxes/${payload.id}`, payload)
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
        Api.delete(`taxes/${payload}/destroy`)
          .then((response) => {
            this.deleteRows({ id: payload });
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    add() {
      Dialog.create({
        component: TaxDialog,
        componentProps: {
          title: this.$t("label.addTax"),
          method: this.store,
          modelValue: {
            country: null,
            code: null,
            state: "*",
            label: this.$t("label.vat"),
            rate: 0,
            compounded: false,
            priority: 0,
          },
        },
      }).onOk((payload) => {
        this.pushRows(payload);
      });
    },
    edit({ row, pageIndex }) {
      Dialog.create({
        component: TaxDialog,
        componentProps: {
          title: this.$t("label.updateTax"),
          method: this.update,
          modelValue: { ...row },
        },
      }).onOk((payload) => {
        this.editRows(payload);
      });
    },
  },
});
