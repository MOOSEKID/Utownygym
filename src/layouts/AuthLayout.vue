<template>
  <q-layout view="hHh Lpr fFf" class="bg-main">
    <q-page-container>
      <q-page class="row flex-center items-center vertical-middle" padding>
        <div class="login-container row vertical-middle">
          <div class="login-left col q-pa-xl">
            <div class="row items-center flex-center">
              <img
                v-if="config?.logo"
                style="width: 150px"
                :src="config?.logo"
                transition="fade"
                :alt="config?.companyName"
              />
              <img
                v-else
                style="width: 150px"
                src="~assets/logo.png"
                transition="fade"
                :alt="config?.companyName"
              />
            </div>
            <router-view />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from "pinia";
import { useAppStore } from "stores/app";

export default {
  computed: {
    ...mapState(useAppStore, ["config"]),
  },
};
</script>

<style lang="scss">
.login-container {
  width: 400px;
  box-shadow: 0px 8px 24px rgba(153, 153, 153, 0.15);
  border-radius: 20px;
}
</style>
