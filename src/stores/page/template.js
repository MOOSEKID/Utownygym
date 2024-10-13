import { defineStore } from "pinia";
import Api from "services/api";

export const useTemplateStore = defineStore("page/template", {
  state: () => ({
    rows: [],
  }),
  actions: {
    get(payload) {
      return new Promise((resolve, reject) => {
        Api.get("pages/templates", payload)
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
        Api.post("pages/templates/store", payload)
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
        Api.get(`pages/templates/${payload}`)
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
        Api.delete(`pages/templates/${payload}/destroy`)
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
