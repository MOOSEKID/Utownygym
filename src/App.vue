<template>
  <router-view
    :class="{
      'is-loading': loading,
    }"
  />
</template>
<script>
import { setCssVar, colors, QSpinnerIos, createMetaMixin } from "quasar";
import { mapActions, mapState } from "pinia";
import { useAppStore } from "./stores/app";
const { lighten } = colors;

const getTitle = (route) => {
  const { meta, query } = route;
  return query.title || meta.title || meta.module || route.name;
};

export default {
  mixins: [
    createMetaMixin(function () {
      // "this" here refers to your component
      return {
        // sets document title
        title: this.title,
        // optional; sets final title as "Index Page - My Website", useful for multiple level meta
        titleTemplate: (title) => `${title} | ${process.env.APP_NAME}`,

        // <noscript> tags
        noscript: {
          default: "This is content for browsers with no JS (or disabled JS)",
        },
      };
    }),
  ],
  data() {
    return {
      loading: true,
    };
  },
  watch: {
    $route(to, from) {
      this.setTitle(getTitle(to));
      if (this.isGuard("admins") && this.isAuthenticated) {
        this.$app.getStats();
      }
    },
  },
  methods: {
    ...mapActions(useAppStore, [
      "setTitle",
      "currentUser",
      "setIsReady",
      "getConfig",
      "updateCurrentUser",
    ]),
    loadUser() {
      if (this.isAuthenticated) {
        this.currentUser().catch(() => {
          this.updateCurrentUser(false);
          this.$router.push({
            name: "Login",
            query: { redirect: this.$route.fullPath },
            params: this.$route.params,
          });
        });
      }
    },
    loadConfig() {
      console.core("Loading app config ....");
      return new Promise((resolve) => {
        this.getConfig("theme", "payment-methods", "terms")
          .then((configs) => {
            const { theme, config } = configs;
            Object.keys(theme).forEach((key) => {
              let val = theme[key];
              if (this.$core.isValidColor(val)) {
                setCssVar(key, val);
                if (key === "primary") {
                  setCssVar("bg-active-menu", lighten(val, 70));
                }
              } else if (key === "dark") {
                this.$q.dark.set(this.darkMode || val);
              }
            });
            if (config?.lang) {
              this.$i18n.locale = config?.lang;
            }
            resolve(true);
          })
          .catch((error) => {
            resolve(false);
            console.core(error);
          });
      });
    },
  },
  computed: {
    ...mapState(useAppStore, [
      "title",
      "isGuard",
      "config",
      "isAuthenticated",
      "darkMode",
    ]),
  },
  mounted() {
    this.$q.loading.show({
      customClass: "base-loading",
      spinnerColor: "primary",
      spinner: QSpinnerIos,
      spinnerSize: "5em",
    });

    this.setTitle(getTitle(this.$route));

    this.loadUser();

    this.loadConfig().then(() => {
      setTimeout(() => {
        this.setIsReady(true);
        this.$q.loading.hide();
        this.loading = false;
      }, 100);
    });
  },
};
</script>
