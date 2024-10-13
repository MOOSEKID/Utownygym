import { defineStore } from "pinia";
import Api from "services/api";

export const useKPIStore = defineStore("kpi", {
  actions: {
    newMembers(payload) {
      return new Promise((resolve, reject) => {
        Api.get("kpi/new-members", payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    visitsToday(payload) {
      return new Promise((resolve, reject) => {
        Api.get("kpi/visits-today", payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    memberVisits(payload) {
      return new Promise((resolve, reject) => {
        Api.get("kpi/member-visits", payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    bookings(payload) {
      return new Promise((resolve, reject) => {
        Api.get("kpi/bookings", payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    onlineSignups(payload) {
      return new Promise((resolve, reject) => {
        Api.get("kpi/online-signups", payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    onlineBookings(payload) {
      return new Promise((resolve, reject) => {
        Api.get("kpi/online-bookings", payload)
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
