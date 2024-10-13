<template>
  <q-page padding>
    <base-form
      v-if="loaded"
      @submit="onSubmit"
      @cancel="onCancel"
      @reset="onReset"
      :resetable="resetable"
      :disable="disable"
      :submited="submited"
    >
      <div class="q-gutter-md">
        <base-section flat bordered :title="$t('generalInformation')">
          <div class="col-xs-12 col-sm-12">
            <base-label required>{{ $t("name") }}</base-label>
            <base-input name="name" v-model="formData.name" />
          </div>
          <div class="col-xs-12">
            <base-label>{{ $t("description") }}</base-label>
            <base-input
              name="description"
              v-model="formData.description"
              type="textarea"
            />
          </div>
        </base-section>
        <base-section
          flat
          bordered
          no-row
          :title="$t('permissions')"
          :description="$t('staff.permissionDesc')"
        >
          <div class="row q-col-gutter-md">
            <div
              class="col-xs-12 col-sm-3"
              v-for="(item, index) in modules"
              :key="item.id"
            >
              <permissions-module
                edit
                v-model="formData.permissions"
                :module="modules[index]"
              />
            </div>
          </div>
        </base-section>
      </div>
    </base-form>
    <skeleton-single-page v-else />
  </q-page>
</template>

<script>
import { cloneDeep } from "lodash";
import { mapActions } from "pinia";
import PermissionsModule from "components/PermissionsModule.vue";
import SkeletonSinglePage from "components/skeleton/SkeletonSinglePage.vue";
import { useGroupStore } from "stores/group";
import { useAppStore } from "stores/app";
import { PageMixins } from "services/mixins";

const formData = {
  permissions: [],
};

export default {
  mixins: [PageMixins],
  components: {
    PermissionsModule,
    SkeletonSinglePage,
  },
  data() {
    return {
      defaultData: cloneDeep(formData),
      formData: cloneDeep(formData),
      modules: [],
    };
  },
  methods: {
    ...mapActions(useGroupStore, ["store", "show", "update"]),
    ...mapActions(useAppStore, ["getModules"]),
  },
  async mounted() {
    await this.getModules().then((data) => {
      this.modules = data;
    });
    if (!this.creating) {
      this.show(this.id)
        .then((data) => {
          this.formData = data;
          this.defaultData = cloneDeep(data);
          this.loaded = true;
        })
        .catch((error) => {
          this.$emit("error", error);
        });
    } else {
      this.loaded = true;
    }
  },
};
</script>
