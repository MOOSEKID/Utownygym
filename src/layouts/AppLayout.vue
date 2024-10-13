<template>
  <q-layout view="hHh LpR lFr" class="bg-main">
    <layout-header @update-left-drawer="$refs.layoutDrawer.toggle()">
      <template #header-items>
        <shop-cart v-if="config?.shop" class="q-mr-sm" dense />
      </template>
    </layout-header>

    <layout-drawer
      class="admin-side-links"
      ref="layoutDrawer"
      :side-menus="menus"
    >
      <div class="card absolute-bottom q-pa-md">
        <member-card v-bind="user" />
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
import MemberCard from "src/components/MemberCard.vue";
import { mapState, mapActions } from "pinia";
import { useAppStore } from "stores/app";
import ParqDialog from "components/ParqDialog.vue";
import ShopCart from "src/components/ShopCart.vue";

export default {
  components: { LayoutHeader, LayoutDrawer, MemberCard, ShopCart },
  computed: {
    ...mapState(useAppStore, ["user", "config", "appSideMenus"]),
    menus() {
      return this.appSideMenus.filter((item) => item?.show !== false);
    },
  },
  methods: {
    ...mapActions(useAppStore, ["currentUser"]),
    showParq() {
      console.func("layouts/AppLayout:methods.showParq()", arguments);
      this.$q
        .dialog({
          component: ParqDialog,
          componentProps: {
            requestParq: true,
          },
        })
        .onOk(() => {
          this.currentUser();
        });
    },
  },
  mounted() {
    this.currentUser().then(() => {
      if (this.user.request_parq) {
        this.showParq();
      } else if (this.user.request_avatar) {
        this.$core
          .warning(this.$t("avatarDialogMessage"), {
            title: this.$t("updatePIC"),
            ok: this.$t("uploadNow"),
          })
          .onOk(() => {
            this.$router.push({
              name: "My Account",
              query: {
                avatar: true,
              },
            });
          });
      }
    });
  },
};
</script>
