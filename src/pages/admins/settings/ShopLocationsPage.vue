<template>
  <q-page padding>
    <settings-page-header
      class="q-mb-md"
      title="Shop Locations"
      back-route="Settings"
      :hint="$t('manageThePlacesYouStockInventoryFulfillOrdersAndSellProducts')"
    >
      <template #action>
        <base-btn :label="$t('addLocation')" @click="onAdd" />
      </template>
    </settings-page-header>
    <div v-if="loaded" class="locations-settings">
      <q-scroll-area style="height: calc(100vh - 300px)">
        <div class="bg-white address-list rounded-border">
          <q-item
            class="address-card q-py-md"
            v-for="(item, index) in rows"
            :key="index"
          >
            <q-item-section top avatar>
              <q-avatar
                :color="item.active ? 'primary' : 'negative'"
                text-color="white"
                icon="fas fa-location-dot"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
              <q-item-label caption lines="2">
                {{ item.address_label }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>
                <base-btn
                  dense
                  flat
                  color="grey"
                  @click="onEdit(item)"
                  icon="fas fa-edit"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-scroll-area>
    </div>
    <skeleton-single-page v-else />
  </q-page>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useShopLocationStore } from "src/stores/shop/location";
import ShopLocationDialog from "components/settings/ShopLocationDialog.vue";
import SkeletonSinglePage from "components/skeleton/SkeletonSinglePage.vue";
import SettingsPageHeader from "src/components/SettingsPageHeader.vue";

export default {
  components: { SkeletonSinglePage, SettingsPageHeader },
  data() {
    return {
      loaded: false,
    };
  },
  methods: {
    ...mapActions(useShopLocationStore, ["get"]),
    onEdit(args) {
      console.func(
        "components/settings/ShopLocationsDialog:methods.onEdit()",
        arguments
      );
      this.$q.dialog({
        component: ShopLocationDialog,
        componentProps: {
          modelValue: args,
          title: this.$t("updateLocation"),
        },
      });
    },
    onAdd() {
      console.func(
        "components/settings/ShopLocationsDialog:methods.onAdd()",
        arguments
      );
      this.$q.dialog({
        component: ShopLocationDialog,
        componentProps: {
          modelValue: { active: true },
          title: this.$t("addLocation"),
        },
      });
    },
  },
  computed: {
    ...mapState(useShopLocationStore, ["rows"]),
  },
  mounted() {
    this.get()
      .then(() => {
        this.loaded = true;
      })
      .catch((error) => {
        this.$core.error(error);
      });
  },
};
</script>

<style lang="scss">
.address-list {
  border: 1px solid $separator-color;
}

.address-list > *:not(:last-child) {
  border-bottom: 1px solid $separator-color;
}
</style>
