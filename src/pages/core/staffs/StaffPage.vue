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
        <base-section
          flat
          bordered
          :title="$t('generalInformation')"
          :description="$t('staff.generalDesc')"
        >
          <div class="col-xs-12 col-sm-4">
            <base-label required>{{ $t("firstName") }}</base-label>
            <base-input name="first_name" v-model="formData.first_name" />
          </div>
          <div class="col-xs-12 col-sm-4">
            <base-label required>{{ $t("surname") }}</base-label>
            <base-input name="last_name" v-model="formData.last_name" />
          </div>
          <div class="col-xs-12 col-sm-4">
            <base-label required>{{ $t("emailAddress") }}</base-label>
            <base-input name="email" v-model="formData.email" type="email" />
          </div>
          <div class="col-xs-12 col-sm-4">
            <base-label>{{ $t("phoneNumber") }}</base-label>
            <base-input
              name="phone_number"
              v-model="formData.phone_number"
              type="tel"
            />
          </div>
          <div class="col-xs-12 col-sm-4">
            <base-label>{{ $t("keyFob") }}</base-label>
            <base-input name="rfid" v-model="formData.rfid" />
          </div>
        </base-section>
        <base-section
          flat
          bordered
          :title="$t('security')"
          :description="$t('staff.securityInfo')"
        >
          <div class="col-xs-12 col-sm-4">
            <base-label required>{{ $t("password") }}</base-label>
            <base-input
              :type="isPwd ? 'password' : 'text'"
              v-model="formData.password"
              color="blue-grey-14"
              name="password"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'fal fa-eye-slash' : 'fal fa-eye'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                  size="16px"
                />
              </template>
            </base-input>
          </div>
          <div class="col-xs-12 col-sm-4">
            <base-label required>{{ $t("confirmPassword") }}</base-label>
            <base-input
              :type="isConfPwd ? 'password' : 'text'"
              v-model="formData.password_confirmation"
              color="blue-grey-14"
              name="password_confirmation"
            >
              <template v-slot:append>
                <q-icon
                  :name="isConfPwd ? 'fal fa-eye-slash' : 'fal fa-eye'"
                  class="cursor-pointer"
                  @click="isConfPwd = !isConfPwd"
                  size="16px"
                />
              </template>
            </base-input>
          </div>
          <div class="col-xs-12">
            <q-checkbox
              dense
              v-model="formData.is_active"
              :label="$t('active')"
              color="green"
            />
          </div>
          <div class="col-xs-12">
            <q-checkbox
              dense
              v-model="formData.is_instructor"
              :label="$t('isInstructor')"
              color="green"
            />
          </div>
        </base-section>
        <base-section
          flat
          bordered
          :title="$t('groupsAndPermissions')"
          :description="$t('staff.permissionDesc')"
        >
          <div class="col-sm-4 col-xs-12">
            <base-label>{{ $t("label.groups") }}</base-label>
            <base-select
              bg-color="white"
              :placeholder="$t('placeholder.select')"
              dense
              outlined
              v-model="formData.groups"
              :filter-method="groupList"
              @update:model-value="onChangeGroup"
              map-options
              use-filter
              multiple
              use-chips
              option-label="name"
              option-value="id"
            />
          </div>
          <div class="col-xs-12">
            <base-label>{{ $t("permissions") }}</base-label>
            <div class="row q-pt-md q-col-gutter-md">
              <div
                class="col-xs-12 col-sm-3"
                v-for="(item, index) in modules"
                :key="item.id"
              >
                <permissions-module
                  has-icon
                  edit
                  v-model="formData.permissions"
                  :group-permissions="formData.groupPermissions"
                  :module="modules[index]"
                />
              </div>
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
import { useStaffStore } from "stores/staff";
import { useAppStore } from "stores/app";
import { useGroupStore } from "stores/group";
import { PageMixins } from "services/mixins";

const formData = {
  groups: [],
  permissions: [],
  groupPermissions: [],
  is_active: false,
  is_instructor: false,
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
      isPwd: true,
      isConfPwd: true,
    };
  },
  methods: {
    ...mapActions(useStaffStore, ["store", "show", "update"]),
    ...mapActions(useAppStore, ["getModules"]),
    ...mapActions(useGroupStore, { groupList: "get" }),
    onChangeGroup(groups) {
      console.func(
        "pages/core/staffs/StaffPage:methods.onChangeGroup()",
        arguments
      );
      if (groups.length < 1) {
        this.formData.groupPermissions = [];
        return;
      }
      groups.forEach((group) => {
        if (group.permissions.length) {
          group.permissions.forEach((permission) => {
            let item = this.formData.groupPermissions.find(
              (item) => item.id === permission.id
            );
            if (item && permission.pivot.access !== null) {
              item.access = permission.pivot.access;
            } else if (!item) {
              this.formData.groupPermissions.push({
                id: permission.id,
                access: permission.pivot.access,
              });
            }
          });
        }
      });
    },
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
