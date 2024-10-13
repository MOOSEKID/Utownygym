import { defineStore } from "pinia";
import Api from "services/api";
import core from "src/services/core";
import { router } from "src/router";

export const usePaymentStore = defineStore("payment", {
  actions: {
    token(payload) {
      return new Promise((resolve, reject) => {
        Api.get(`/payment/${payload?.provider}/token`, payload?.query)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    process(payload) {
      core.showLoading(`Payment capturing <b>process</b> is in progress.`);
      const { query, provider } = payload;

      const redirect = () => {
        window.location = query.redirect || "/";
      };

      return new Promise((resolve, reject) => {
        Api.post(`/payment/${provider}/process`, query)
          .then((response) => {
            resolve(response);
            redirect();
          })
          .catch((error) => {
            reject(error);
            core.error(error);
            redirect();
          });
      });
    },
  },
});
