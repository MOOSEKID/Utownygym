<template>
  <q-layout view="hHh LpR lFr" class="bg-main">
    <layout-header @update-left-drawer="$refs.layoutDrawer.toggle()">
      <template #header-items>
        <base-btn
          class="q-mr-sm"
          icon="fad fa-cart-arrow-down"
          :to="{ name: 'Pos' }"
          rounded
          flat
          dense
          size="16px"
        />
      </template>
    </layout-header>

    <layout-drawer
      class="admin-side-links"
      ref="layoutDrawer"
      :side-menus="menus"
      :list-style="{ 'padding-bottom': '100px' }"
    >
      <div class="absolute-bottom bg-white settings q-py-sm q-px-md">
        <base-item
          dense
          v-can="['settings:*']"
          :to="{ name: 'Settings' }"
          icon="far fa-gear"
          :label="$t('menus.settings')"
          class="text-bold"
          :notification="`v${version}`"
          flat-notification
        />
      </div>
    </layout-drawer>

    <q-page-container>
      <router-view :key="$router.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<script>
import LayoutHeader from "components/LayoutHeader.vue";
import LayoutDrawer from "components/LayoutDrawer.vue";
import { mapState } from "pinia";
import { useAppStore } from "stores/app";

const permissions = (permission) => {
  return Array.isArray(permission) ? permission : [permission];
};

export default {
  components: { LayoutHeader, LayoutDrawer },
  computed: {
    ...mapState(useAppStore, ["adminSideMenus", "version"]),
    menus() {
      const checkMenus = (node) => {
        let filteredNode = node.filter((child) => {
          if (child.permission) {
            return this.$app.can(...permissions(child.permission));
          }
          return true;
        });

        filteredNode.forEach((child) => {
          if (child.subLinks) {
            child.subLinks = checkMenus(child.subLinks);
            if (child.subLinks.length) {
              child.route = child.subLinks[0].route;
            }
            if (child.useSubLinksModule && child.subLinks.length === 0) {
              filteredNode = filteredNode.filter((item) => item !== child);
            }
          }
        });

        return filteredNode;
      };

      return checkMenus(this.adminSideMenus);
    },
  },
};
</script>
