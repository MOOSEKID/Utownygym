<template>
  <q-expansion-item
    v-if="subLinks"
    v-model="active"
    :icon="icon"
    :label="title"
    expand-icon-class="hidden"
    class="sublinks"
    :header-class="{
      'sublink-header': true,
      'sublink-active': active,
      'rounded-borders': rounded,
    }"
    :to="{ name: route }"
    :dense="dense"
    :duration="0"
  >
    <base-item
      v-for="(item, index) in subLinks"
      :key="index"
      clickable
      tag="a"
      :to="{ name: item.route, params: item.params }"
      :exact="item.exact || false"
      :class="{ active: is(item.related) }"
      v-ripple
      active-class="active"
      :dense="dense"
      :icon="item.icon"
      :label="item.title"
      :notification="item.notification"
      icon-space
    />
  </q-expansion-item>
  <base-item
    v-else
    clickable
    tag="a"
    :to="{ name: route, params: params }"
    v-ripple
    active-class="active"
    :dense="dense"
    :icon="icon"
    :label="title"
    :notification="notification"
  />
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      default: "",
    },
    params: {
      type: Object,
      default: () => ({}),
    },
    icon: {
      type: String,
      default: "",
    },
    notification: [String, Number],
    subLinks: {
      type: [Object, Boolean],
      default: false,
    },
    exact: Boolean,
    dense: Boolean,
    rounded: Boolean,
    related: Array,
  },
  methods: {
    is(patterns) {
      const currentRoute = String(this.$route.fullPath);
      const prefix = this.$app.guard === "admins" ? "/admin" : "/user";

      if (!Array.isArray(patterns)) {
        patterns = [patterns];
      }

      for (const pattern of patterns) {
        const patternString = prefix + String(pattern);

        // If current route is an exact match, return true
        if (patternString === currentRoute) {
          return true;
        }

        // If pattern has a placeholder for a digit, replace it with \\d+
        const digitPattern = patternString.replace(/\(d\+\)/g, "\\d+");

        // If the current route matches the modified digit pattern, return true
        if (new RegExp("^" + digitPattern + "$", "u").test(currentRoute)) {
          return true;
        }

        // If pattern has a wildcard '*', replace it with .*
        const wildcardPattern = digitPattern.replace(/\*/g, ".*");

        // If the current route matches the wildcard pattern, return true
        if (new RegExp("^" + wildcardPattern + "$", "u").test(currentRoute)) {
          return true;
        }

        // Check for pattern with '|' for special cases like '/products/(d+)|add$'
        if (patternString.includes("|")) {
          const escapedPattern = patternString.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
          );
          const regex = new RegExp("^" + escapedPattern + "$", "u");
          if (regex.test(currentRoute)) {
            return true;
          }
        }

        // Check for pattern with wildcard '*' for special cases like '/products/add*'
        if (
          patternString.endsWith("*") &&
          currentRoute.startsWith(patternString.slice(0, -1))
        ) {
          return true;
        }

        // If the pattern is like '/products/(d+)/*', match any query parameters after '/products/4'
        if (
          new RegExp(
            "^" +
              patternString.replace(/\(d\+\)/g, "\\d+").replace(/\*/g, ".*") +
              "(\\?.*)?$",
            "u"
          ).test(currentRoute)
        ) {
          return true;
        }
      }

      return false;
    },
  },
  computed: {
    active: {
      get() {
        return this.is(this.related);
      },
      set(val) {
        return val;
      },
    },
  },
};
</script>
