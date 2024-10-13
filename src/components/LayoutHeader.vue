<template>
  <q-header bordered class="base-header bg-white text-black">
    <q-toolbar>
      <base-btn
        flat
        round
        dense
        size="18px"
        color="primary"
        class="q-mr-sm"
        icon="menu"
        :aria-label="$t('menu')"
        @click="onUpdateLeftDrawer"
        v-if="!noMenu"
        padding="0"
      />
      <template v-if="formChanged">
        <q-toolbar-title>{{ $t("unsavedChanges") }}</q-toolbar-title>
        <q-btn
          no-caps
          @click="onDiscard"
          :label="$t('discard')"
          color="negative"
          class="q-mr-sm"
        />
        <q-btn
          no-caps
          :label="$t('save')"
          @click="onSave"
          type="submit"
          color="primary"
          :loading="isLoading"
        />
      </template>
      <template v-else>
        <img v-if="config?.logo" width="120" :src="config?.logo" />
        <img v-else width="120" src="~assets/logo.png" />
        <q-space />
        <slot name="header-items"></slot>
        <base-current-user flat v-if="user">
          <template #menu-items>
            <slot name="menu-items"></slot>
          </template>
        </base-current-user>
      </template>
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapState } from "pinia";
import { useAppStore } from "stores/app";

export default {
  props: {
    noMenu: Boolean,
  },
  emits: ["update-left-drawer"],
  methods: {
    onUpdateLeftDrawer() {
      this.$emit("update-left-drawer");
    },
    onSave() {
      console.func("layouts/Dashboard:methods.onSave()", arguments);
      window.dispatchEvent(new Event("form:save"));
    },
    onDiscard() {
      console.func("layouts/Dashboard:methods.onDiscard()", arguments);
      window.dispatchEvent(new Event("form:discard"));
    },
  },
  computed: {
    ...mapState(useAppStore, ["user", "formChanged", "isLoading", "config"]),
  },
};
</script>
