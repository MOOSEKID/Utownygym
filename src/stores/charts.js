import { defineStore } from "pinia";
import Api from "services/api";

export const useChartsStore = defineStore("charts", {
  actions: {
    userGrowth(payload) {
      return new Promise((resolve, reject) => {
        Api.get("charts/user-growth", payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    revenueBreakdown(payload) {
      return new Promise((resolve, reject) => {
        Api.get("charts/revenue-breakdown", payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    membersBreakdown(payload) {
      return new Promise((resolve, reject) => {
        Api.get("charts/members-breakdown", payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    retentionRate(payload) {
      return new Promise((resolve, reject) => {
        Api.get("charts/retention-rate", payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    attendanceUtilization(payload) {
      return new Promise((resolve, reject) => {
        Api.get("charts/attendance-utilization", payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    revenueTrends(payload) {
      return new Promise((resolve, reject) => {
        Api.get("charts/revenue-trends", payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    sourceRevenueTrends(payload) {
      return new Promise((resolve, reject) => {
        Api.get("charts/source-revenue-trends", payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    checkIn(payload) {
      return new Promise((resolve, reject) => {
        Api.get("charts/check-in", payload)
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
