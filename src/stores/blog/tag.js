import { defineStore } from "pinia";
import Api from "services/api";

export const useBlogTagStore = defineStore("blog/tag", {
  actions: {
    get(payload) {
      return new Promise((resolve, reject) => {
        Api.get("blogs/tags", payload)
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
        Api.post("blogs/tags/store", payload)
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
