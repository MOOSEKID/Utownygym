<template>
  <q-page padding>
    <base-page-header
      class="q-mb-md"
      :title="creating ? $t('createNew') : formData.name"
      :hint="$t('hint.member')"
      :tabs="['Overview', 'Billing']"
      v-model="tab"
      :no-tabs="creating"
    />
    <base-form
      v-if="loaded"
      @submit="onSubmit"
      @cancel="onCancel"
      @reset="onReset"
      :resetable="resetable"
      :disable="disable"
      :submited="submited"
    >
      <div class="masonry col-gutter-md">
        <div class="col-xs-12 col-sm-8">
          <q-tab-panels class="base-tab-panels" v-model="tab">
            <q-tab-panel name="overview">
              <div class="q-gutter-md">
                <base-section
                  flat
                  bordered
                  :title="$t('generalInformation')"
                  :description="$t('members.generalDesc')"
                >
                  <div class="col-xs-12 col-sm-4">
                    <base-label>{{ $t("firstName") }}</base-label>
                    <base-input
                      v-model="formData.first_name"
                      name="first_name"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-4">
                    <base-label>{{ $t("surname") }}</base-label>
                    <base-input v-model="formData.last_name" name="last_name" />
                  </div>
                  <div class="col-xs-12 col-sm-4">
                    <base-label>{{ $t("emailAddress") }}</base-label>
                    <base-input v-model="formData.email" name="email" />
                  </div>
                  <div class="col-xs-12 col-sm-4">
                    <base-label>{{ $t("phoneNumber") }}</base-label>
                    <base-input
                      v-model="formData.phone_number"
                      name="phone_number"
                      type="tel"
                    />
                  </div>
                  <div v-if="memberOnly" class="col-xs-12 col-sm-4">
                    <base-label>{{ $t("startsAt") }}</base-label>
                    <base-date-input
                      outlined
                      dense
                      readonly
                      v-model="formData.starts_at"
                      no-range
                      name="starts_at"
                    />
                  </div>
                  <div v-if="memberOnly" class="col-xs-12 col-sm-4">
                    <base-label>{{ $t("endsAt") }}</base-label>
                    <base-date-input
                      outlined
                      dense
                      v-model="formData.ends_at"
                      only-future
                      no-range
                      name="ends_at"
                      :hint="$t('hint.endsAt')"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-4">
                    <base-label>{{ $t("label.status") }}</base-label>
                    <q-select
                      dense
                      outlined
                      v-model="formData.status"
                      :options="[
                        'Active',
                        'Pending',
                        'Deactive',
                        'Hold',
                        'Lost',
                      ]"
                      @update:model-value="onChangeStatus"
                      name="status"
                    />
                  </div>
                  <div
                    v-if="formData.status === 'Hold'"
                    class="col-xs-12 col-sm-4"
                  >
                    <base-label>{{ $t("releaseAt") }}</base-label>
                    <base-date-input
                      outlined
                      dense
                      v-model="formData.release_at"
                      name="release_at"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-4">
                    <base-label>{{ $t("keyFob") }}</base-label>
                    <base-input name="rfid" v-model="formData.rfid" />
                  </div>
                  <div v-if="!creating" class="col-xs-12 col-sm-12">
                    <q-expansion-item
                      header-class="bg-grey-3"
                      icon="fas fa-clipboard-list-check"
                      :label="$t('parqStatus', { status: statusParq })"
                      @show="parq = true"
                      @hide="parq = false"
                    >
                      <parq-form
                        v-if="parq"
                        class="q-pa-md border-all"
                        v-model:member="formData"
                        readonly
                      />
                    </q-expansion-item>
                  </div>
                </base-section>
                <base-section
                  flat
                  bordered
                  :title="$t('billingAddress')"
                  :description="$t('members.billingDesc')"
                  no-row
                >
                  <address-fields v-model="formData.address" />
                </base-section>
                <base-section
                  flat
                  bordered
                  :title="$t('security')"
                  :description="$t('members.securityDesc')"
                >
                  <div class="col-xs-12 col-sm-4">
                    <base-label>{{ $t("password") }}</base-label>
                    <base-input
                      :type="isPwd ? 'password' : 'text'"
                      v-model="formData.password"
                      name="password"
                      color="blue-grey-14"
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
                    <base-label>{{ $t("confirmPassword") }}</base-label>
                    <base-input
                      :type="isConfPwd ? 'password' : 'text'"
                      v-model="formData.password_confirmation"
                      name="password_confirmation"
                      color="blue-grey-14"
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
                </base-section>
              </div>
            </q-tab-panel>
            <q-tab-panel name="billing">
              <member-billing :user="formData" />
            </q-tab-panel>
          </q-tab-panels>
        </div>
        <div class="col-xs-12 col-sm-4 col-end">
          <current-plan-card
            v-if="!creating && loaded"
            class="q-mb-md"
            :user="formData"
            no-upgrade
            due-collect
          />
          <base-section flat bordered :title="$t('specialNote')">
            <div class="col-xs-12">
              <base-input name="note" v-model="formData.note" type="textarea" />
            </div>
            <template #bottom>
              <base-btn
                link
                color="primary"
                icon="fas fa-message"
                :label="$t('sendMessage')"
                :to="{
                  name: 'Enquiry',
                  params: {
                    id: 'add',
                  },
                  query: {
                    user: formData.id,
                  },
                }"
              />
            </template>
          </base-section>
          <base-section flat bordered class="q-mt-md" :title="$t('avatar')">
            <div class="col-xs-12">
              <file-selector
                accept="image/*"
                icon="fad fa-image"
                :dialog-label="$t('uploadAvatar')"
                :hint="$t('hint.images', { type: 'avatar' })"
                v-model="formData.avatar"
                name="avatar"
              />
            </div>
          </base-section>
        </div>
        <div class="col-xs-12 col-sm-8">
          <div class="q-gutter-y-md">
            <base-section
              flat
              bordered
              v-if="hasClasses"
              title="Class Schedules"
              no-row
            >
              <user-class-schedules
                no-action
                class="q-mt-sm"
                :module-id="formData.id"
              />
            </base-section>
            <base-section
              flat
              bordered
              v-if="!creating"
              :title="$t('notes')"
              :description="$t('members.activityDesc')"
              no-row
              body-class="q-px-lg"
            >
              <q-timeline class="comments" color="secondary">
                <base-note-card
                  :module-action="notes"
                  :module-id="formData.id"
                  class="comment"
                  creating
                  @create="onCreateNote"
                />
                <base-note-card
                  class="comment"
                  v-for="note in formData.notes"
                  :key="note.id"
                  v-bind="note"
                  :module-id="formData.id"
                  :user="note.admin"
                />
              </q-timeline>
            </base-section>
          </div>
        </div>
      </div>
    </base-form>
    <skeleton-single-page v-else />
  </q-page>
</template>

<script>
import { cloneDeep } from "lodash";
import { mapActions, mapState } from "pinia";
import { useMemberStore } from "stores/member";
import { useAppStore } from "stores/app";
import UserClassSchedules from "components/UserClassSchedules.vue";
import SkeletonSinglePage from "components/skeleton/SkeletonSinglePage.vue";
import CurrentPlanCard from "components/subscription/CurrentPlanCard.vue";
import ParqForm from "components/ParqForm.vue";
import FileSelector from "components/FileSelector.vue";
import MemberBilling from "components/MemberBilling.vue";
import AddressFields from "src/components/address/AddressFields.vue";
import { useSubscriptionStore } from "src/stores/subscription";
import { PageMixins } from "services/mixins";

const formData = {
  is_enquiry: true,
  status: "Pending",
  title: "Mr",
  address: {},
};

export default {
  mixins: [PageMixins],
  components: {
    SkeletonSinglePage,
    UserClassSchedules,
    ParqForm,
    FileSelector,
    MemberBilling,
    CurrentPlanCard,
    AddressFields,
  },
  data() {
    return {
      defaultData: cloneDeep(formData),
      formData: cloneDeep(formData),
      isPwd: true,
      isConfPwd: true,
      parq: false,
      tab: "overview",
    };
  },
  methods: {
    ...mapActions(useMemberStore, ["store", "show", "update", "notes"]),
    ...mapActions(useSubscriptionStore, ["setUser", "removeUser"]),
    onSubmit(props) {
      console.func(
        "pages/admins/members/MemberPage:methods.onSubmit()",
        arguments
      );
      this.submited = true;
      const method = this.creating ? this.store : this.update;
      method(this.formData)
        .then(({ data, message }) => {
          this.submited = false;
          this.$q.notify(message);
          this.formData = data;
          this.setUser(data);
          this.defaultData = cloneDeep(data);
          this.$router.push({
            name: "Member",
            params: {
              id: data.id,
            },
            query: {
              action: "edit",
            },
          });
        })
        .catch((error) => {
          this.submited = false;
          this.$core.error(error, { title: this.$t("dialog.title.error") });
        });
    },
    onChangeStatus(value) {
      console.func(
        "pages/admins/members/MemberPage:methods.onChangeStatus()",
        arguments
      );
      this.formData.is_enquiry = value !== "Active";
      if (value !== "Hold") {
        this.formData.release_at = null;
      }
    },
    onCreateNote(props) {
      console.func(
        "pages/admins/members/MemberPage:methods.onCreateNote()",
        arguments
      );
      if (props) {
        this.formData.notes.splice(0, 0, cloneDeep(props));
        this.defaultData.notes.splice(0, 0, cloneDeep(props));
      } else {
        this.show(this.id).then((data) => {
          this.formData = data;
          this.defaultData = cloneDeep(data);
        });
      }
    },
  },
  async mounted() {
    if (!this.creating) {
      this.tab = this.queryTab || this.tab;
      this.show(this.id)
        .then(async (data) => {
          this.formData = data;
          this.setUser(data);
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
  computed: {
    ...mapState(useAppStore, ["user"]),
    memberOnly() {
      return !this.creating && !this.formData.is_enquiry;
    },
    queryTab() {
      return this.$route.query.tab;
    },
    hasClasses() {
      return !this.creating && !this.formData.is_enquiry;
    },
    statusParq() {
      return this.formData.has_parq ? "Completed" : "Required";
    },
  },
  watch: {
    tab(val) {
      this.$router.push({
        ...this.$route,
        query: { ...this.$route.query, tab: val },
      });
    },
  },
  unmounted() {
    this.removeUser();
  },
};
</script>
