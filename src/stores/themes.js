import { defineStore } from "pinia";
import Api from "services/api";
import core from "services/core";

export const useThemeStore = defineStore("themes", {
  state: () => ({
    rows: [],
  }),
  actions: {
    get() {
      return new Promise((resolve, reject) => {
        Api.get("themes")
          .then((response) => {
            this.rows = response;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    show(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`themes/${payload}/show`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    clone(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`themes/${payload}/clone`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    files(payload) {
      return new Promise((resolve, reject) => {
        Api.get(`themes/${payload}/files`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fileCreate(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`themes/${payload.theme}/files/create`, payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fileDestroy(payload) {
      return new Promise((resolve, reject) => {
        Api.delete(`themes/${payload.theme}/files/destroy`, payload.query)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fileContent(payload) {
      return new Promise((resolve, reject) => {
        Api.get(`themes/${payload.theme}/files/content`, payload.query)
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
        Api.post(`themes/${payload?.theme}/files`, payload.data)
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
        Api.delete(`themes/${payload}/destroy`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    active(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`themes/${payload}/active`)
          .then((response) => {
            this.rows = this.rows.map((item) => ({
              ...item,
              active: item.key == payload,
            }));
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
