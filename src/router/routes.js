import { useAppStore } from "src/stores/app";

const routePath = (path, prefix) => {
  return path === "/" ? `/${prefix}` : `/${prefix}${path}`;
};

const mapRoutes = (routes, prefix) => [
  { path: "/", redirect: `/${prefix}` },
  ...routes.map((item) => ({
    ...item,
    path: routePath(item.path, prefix),
  })),
];

export default async () => {
  var routes = [];
  const path = window.location.pathname;
  const pathname = path.startsWith("/admin") ? "admin" : "app";
  const route = process.env.APP_MODE ? process.env.APP_MODE : pathname;
  const app = useAppStore();

  try {
    switch (route) {
      case "admin":
        app.setGuard("admins");
        routes = await import("./admin");
        routes = routes.default ? mapRoutes(routes.default, "admin") : [];
        break;

      default:
        app.setGuard("users");
        routes = await import("./app");
        routes = routes.default ? mapRoutes(routes.default, "user") : [];
    }
  } catch (error) {
    console.error("Routes Error", error);
    routes = [];
  }

  // Always leave this as last one,
  // but you can also remove it
  routes.push({
    path: "/:catchAll(.*)*",
    name: "Error 404",
    component: () => import("pages/ErrorNotFound.vue"),
  });

  return routes;
};
