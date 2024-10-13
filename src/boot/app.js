import { boot } from "quasar/wrappers";
import axios from "axios";
import core from "services/core";
import api from "services/api";
import { colors } from "quasar";
import { useAppStore } from "stores/app";

const appStore = useAppStore();

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, store, redirect }) => {
  console.core(`Loading ${process.env.APP_NAME} services`);

  //    app prototypes setup    //
  app.config.globalProperties.$core = core;
  app.config.globalProperties.$api = api;
  app.config.globalProperties.$colors = colors;
  app.config.globalProperties.$app = appStore;
  app.config.globalProperties.$redirect = redirect;

  //    axios setup    //
  axios.defaults.baseURL = core.apiBaseURL();

  //    core prototypes setup    //
  core.$axios = axios;
  core.$app = appStore;

  console.core("Mode: " + process.env.APP_ENV || "Development");

  //    call and wait for initial setup    //
  await core.init();
});
