import { boot } from "quasar/wrappers";
import { useAppStore } from "stores/app";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ router, redirect }) => {
  const app = useAppStore();

  router.beforeEach(async (to, from, next) => {
    const { auth } = to.meta;

    if (auth) {
      if (app.isAuthenticated) {
        next();
      } else {
        next({ name: "Login", query: { redirect: to.fullPath } });
      }
    } else {
      next();
    }
  });

  router.beforeResolve((to, from, next) => {
    const permission = to.meta.permission;
    const permissions = Array.isArray(permission) ? permission : [permission];
    if (permission) {
      if (app.can(...permissions)) {
        next();
      } else {
        next({ name: "Dashboard" });
      }
    } else {
      next();
    }
  });

  router.onError((error, to) => {
    if (error.message.includes("Failed to fetch dynamically imported module")) {
      // window.location = to.fullPath;
    }
  });
});
