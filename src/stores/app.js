import { defineStore } from "pinia";
import Api from "services/api";
import core from "services/core";
import { Dark, LocalStorage } from "quasar";
import { forEach, orderBy } from "lodash";
import app from "../../package.json";
import { Device } from "@capacitor/device";
import { adminSideMenus, appSideMenus } from "services/menus";

const user = LocalStorage.getItem("current_user") || {};
const location = LocalStorage.getItem("location") || {};
const usersToken = LocalStorage.getItem("usersToken");
const adminsToken = LocalStorage.getItem("adminsToken");
const authenticated = LocalStorage.has("current_user");
const darkMode = LocalStorage.getItem("darkMode") || false;

const defaultConfig = {
  lang: "en-US",
  name: process.env.APP_NAME,
  timezone: "Asia/Calcutta",
  phone: "+9733014543",
  email: "hello@coderstm.com",
  country: "India",
  currency: "usd",
  shop: true,
};

const HOME_ITEMS = ["Tasks", "Enquiries"];
const STRIPE_PAYMENT = "stripe";

const method = (str) => {
  return str.replace(/[-_](.)/g, (_, char) => char.toUpperCase());
};

export const useAppStore = defineStore("app", {
  state: () => ({
    user: user,
    location: location,
    authenticated,
    version: app.version,
    isDirt: false,
    formChanged: false,
    isLoading: false,
    isReady: false,
    paymentMethods: [],
    stats: {},
    config: defaultConfig,
    title: null,
    tos: null,
    privacy: null,
    currency: {
      symbol: process.env.APP_CURRENCY || "$",
      decimal: ".",
    },
    guard: "admins",
    usersToken,
    adminsToken,
    darkMode,
  }),
  getters: {
    isAuthenticated(store) {
      return store.authenticated;
    },
    token(store) {
      return store[`${store.guard}Token`];
    },
    isGuard(store) {
      return (guard) => {
        return store.user?.guard === guard;
      };
    },
    can(store) {
      const permissions = store.permissions || [];
      return (...scopes) => {
        return scopes.some((scope) => {
          if (scope.includes("*")) {
            const prefix = scope.replace("*", "");
            return permissions.some((permission) =>
              permission.startsWith(prefix)
            );
          }
          return permissions.includes(scope);
        });
      };
    },
    modules(store) {
      return orderBy(store.user?.modules || [], ["sort_order"], ["asc"]).map(
        (item) => ({
          ...item,
          notification: store.stats["unread_" + item.url],
        })
      );
    },
    permissions(store) {
      return store.user?.permissions || [];
    },
    homeItems(store) {
      return store.modules.filter((item) => HOME_ITEMS.includes(item.name));
    },
    adminSideMenus,
    appSideMenus,
    greeting(store) {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      if (currentHour >= 5 && currentHour < 12) {
        return store.$t("goodMorning", { name: store?.user?.name });
      } else if (currentHour >= 12 && currentHour < 17) {
        return store.$t("goodAfternoon", { name: store?.user?.name });
      } else {
        return store.$t("goodEvening", { name: store?.user?.name });
      }
    },
    paymentProvider(store) {
      return (provider) => {
        let method = store.paymentMethods.find((e) => e.provider === provider);
        return method;
      };
    },
    paymentProvider(store) {
      return (provider) => {
        let method = store.paymentMethods.find((e) => e.provider === provider);
        return method;
      };
    },
    deletionRequest(store) {
      return store.user?.request_account_deletion;
    },
    hasDeletionRequest(store) {
      return Boolean(store.deletionRequest?.id);
    },
    noPaymentMethods(state) {
      return state?.paymentMethods.length <= 0;
    },
  },
  actions: {
    async login(payload) {
      const { identifier } = await Device.getId();
      payload.device_id = identifier;
      return new Promise((resolve, reject) => {
        Api.post(`auth/${this.guard}/login`, payload)
          .then(async (response) => {
            this.updateCurrentUser(response);
            await this.addDeviceToken();
            resolve(response);
          })
          .catch((error) => {
            this.updateCurrentUser(false);
            reject(error);
          });
      });
    },
    async signUp(payload) {
      const { identifier } = await Device.getId();
      payload.device_id = identifier;
      return new Promise((resolve, reject) => {
        Api.post(`auth/${this.guard}/signup`, payload)
          .then(async (response) => {
            this.updateCurrentUser(response);
            await this.addDeviceToken();
            resolve(response);
          })
          .catch((error) => {
            this.updateCurrentUser(false);
            reject(error);
          });
      });
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        Api.post(`auth/${this.guard}/me`)
          .then((response) => {
            const user = response;
            if (!response.address) {
              Object.assign(user, {
                address: {},
              });
            }
            this.updateCurrentUser(user);
            resolve(user);
          })
          .catch((error) => {
            this.updateCurrentUser(false);
            reject(error);
          });
      });
    },
    async updateCurrentUser(payload) {
      const tokenKey = `${this.guard}Token`;
      if (payload) {
        this.authenticated = true;
        if ("token" in payload) {
          const { user, token } = payload;
          this.user = user;
          this[tokenKey] = token;
          LocalStorage.set("current_user", user);
          LocalStorage.set(tokenKey, token);
        } else {
          this.user = payload;
          LocalStorage.set("current_user", payload);
        }
      } else {
        this.authenticated = false;
        this[tokenKey] = null;
        this.user = {};
        LocalStorage.remove("current_user");
        LocalStorage.remove(tokenKey);
      }
    },
    update(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`auth/${this.guard}/update`, payload)
          .then((response) => {
            this.updateCurrentUser(response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getModules(payload) {
      return new Promise((resolve, reject) => {
        Api.get("admins/modules", payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getStats(payload) {
      return new Promise((resolve, reject) => {
        Api.get(`application/stats`, payload)
          .then((response) => {
            this.stats = response;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getSettings(payload) {
      return new Promise((resolve, reject) => {
        Api.get(`application/settings/${payload}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getConfig(...payload) {
      return new Promise((resolve, reject) => {
        Api.get(`application/config`, { includes: payload })
          .then((response) => {
            if (payload?.length > 0) {
              forEach(response, (val, key) => {
                const action = method("set-" + key);
                if (typeof this[action] === "function") {
                  this[action](val);
                }
              });
            } else {
              this.setConfig(response);
            }
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getPaymentMethods() {
      return new Promise((resolve, reject) => {
        Api.get(`application/payment-methods`)
          .then((response) => {
            this.setPaymentMethods(response);
            resolve(this.paymentMethods);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    updateSettings(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`application/settings`, payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    changePassword(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`auth/${this.guard}/change-password`, payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async requestPassword(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`auth/${this.guard}/request-password`, payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async resetPassword(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`auth/${this.guard}/reset-password`, payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    logout() {
      return new Promise((resolve, reject) => {
        Api.post(`auth/${this.guard}/logout`)
          .then((response) => {
            this.updateCurrentUser(false);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    updateParq(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`auth/users/update-parq`, payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    requestAccountDeletion(payload) {
      return new Promise((resolve, reject) => {
        Api.post(`auth/users/request-account-deletion`, payload)
          .then(async (response) => {
            await this.currentUser();
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    testMailConfig(payload) {
      return new Promise((resolve, reject) => {
        Api.post("application/test-mail-config", payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addDeviceToken(payload) {
      return new Promise((resolve, reject) => {
        const device_token = payload || LocalStorage.getItem("device_token");
        if (device_token) {
          Api.post(`auth/${this.guard}/add-device-token`, {
            device_token,
          })
            .then((response) => {
              LocalStorage.remove("device_token");
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          resolve(device_token);
        }
      });
    },
    async setConfig(payload = {}) {
      this.config = Object.assign(this.config, payload);
      this.currency = await core.currencyInfo(this.config?.currency);
    },
    setPaymentMethods(payload = []) {
      this.paymentMethods = payload;
    },
    setTerms(payload = {}) {
      Object.assign(this, payload);
    },
    setIsDirt(payload) {
      this.isDirt = payload;
      if (!payload) {
        this.isLoading = false;
      }
    },
    setFormChanged(payload) {
      this.formChanged = payload;
      if (!payload) {
        this.isLoading = false;
      }
    },
    setIsLoading(payload) {
      this.isLoading = payload;
    },
    setIsReady(payload) {
      this.isReady = payload;
    },
    setTitle(payload) {
      this.title = payload;
    },
    setGuard(payload) {
      this.guard = payload;
    },
    setDarkMode(payload) {
      Dark.set(payload);
      this.darkMode = payload;
      LocalStorage.set("darkMode", payload);
    },
  },
});
