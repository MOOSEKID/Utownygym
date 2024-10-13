<template>
  <q-btn-dropdown
    no-caps
    :class="classes"
    :ripple="false"
    color="primary"
    :menu-offset="[10, 18]"
  >
    <template #label>
      <div class="row items-center user-label">
        <div class="col col-auto">
          <base-avatar :rounded="rounded" :size="size" :user="user" />
        </div>
        <div v-if="$q.screen.gt.xs && !avatarOnly" class="q-ml-xs col">
          <div class="ellipsis text-subtitle2">
            {{ user.name }}
          </div>
        </div>
      </div>
    </template>
    <q-list class="q-pa-sm">
      <q-item class="user-label">
        <q-item-section class="auto-width" avatar>
          <base-avatar size="28px" :user="user" />
        </q-item-section>
        <q-item-section>
          <div class="ellipsis text-subtitle2">
            {{ user.name }}
          </div>
          <q-item-label caption>{{ user.email }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator class="q-mb-sm" />
      <base-item
        dense
        link
        :label="$t('darkMode')"
        icon="fas fa-circle-half-stroke"
        tag="label"
      >
        <template #side>
          <q-toggle
            size="xs"
            @update:model-value="setDarkMode"
            :model-value="darkMode"
            color="black"
            dense
          />
        </template>
      </base-item>
      <slot name="menu-items"></slot>
      <base-item
        v-if="!noMyAccount"
        dense
        icon-color="primary"
        link
        :label="$t('myAccount.title')"
        :to="{ name: 'My Account' }"
        icon="fas fa-user"
      />
      <base-item
        dense
        class="text-negative"
        link
        :label="$t('logout')"
        icon="fas fa-sign-out"
        @click="onLogout"
      />
    </q-list>
  </q-btn-dropdown>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAppStore } from "stores/app";

export default {
  props: {
    avatarOnly: Boolean,
    noMyAccount: Boolean,
    size: {
      type: String,
      default: "28px",
    },
    rounded: Boolean,
  },
  methods: {
    ...mapActions(useAppStore, ["logout", "setDarkMode"]),
    onLogout() {
      this.logout(this.$route.meta.guard)
        .then(() => {
          this.$redirect({ name: "Login" });
        })
        .catch((error) => {
          console.core(error);
          this.$redirect({ name: "Login" });
        });
    },
  },
  computed: {
    ...mapState(useAppStore, ["user", "darkMode"]),
    classes() {
      return {
        "base-current-user base-btn-dropdown q-px-none": true,
        "avatar-only": this.avatarOnly,
      };
    },
  },
};
</script>
