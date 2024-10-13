<template>
  <q-page padding>
    <base-info
      color="negative"
      v-if="hasDeletionRequest"
      rounded
      class="q-mb-md"
    >
      {{ $t("requestToDeleteYourAccount", { date: deletionRequestedAt }) }}
    </base-info>
    <div class="row q-col-gutter-lg">
      <div class="col-xs-12 col-sm-9">
        <base-section flat bordered no-row :title="$t('profileInformation')">
          <q-form @submit="onSaveProfile">
            <div class="row q-col-gutter-md">
              <div class="col-sm-3 col-xs-12">
                <base-label>{{ $t("firstName") }}</base-label>
                <base-input
                  :error-message="$core.errorMessage('first_name', errors)"
                  :error="$core.hasError('first_name', errors)"
                  v-model="user.first_name"
                  name="first_name"
                />
              </div>
              <div class="col-sm-3 col-xs-12">
                <base-label>{{ $t("surname") }}</base-label>
                <base-input
                  :error-message="$core.errorMessage('last_name', errors)"
                  :error="$core.hasError('last_name', errors)"
                  v-model="user.last_name"
                  name="last_name"
                />
              </div>
              <div class="col-sm-4 col-xs-12">
                <base-label>{{ $t("email") }}</base-label>
                <base-input
                  :error-message="$core.errorMessage('email', errors)"
                  :error="$core.hasError('email', errors)"
                  v-model="user.email"
                  name="email"
                />
              </div>

              <div class="col-sm-4 col-xs-12">
                <base-label>{{ $t("phoneNumber") }}</base-label>
                <base-input
                  :error-message="$core.errorMessage('phone_number', errors)"
                  :error="$core.hasError('phone_number', errors)"
                  v-model="user.phone_number"
                  name="phone_number"
                />
              </div>

              <div class="col-sm-4 col-xs-12">
                <base-label>{{ $t("password") }}</base-label>
                <base-input
                  type="password"
                  readonly
                  bottom-slots
                  modelValue="**********"
                  name="password"
                >
                  <template v-slot:hint>
                    <base-btn
                      size="11px"
                      color="grey"
                      :to="{
                        name: 'Forget Password',
                        query: { email: user.email },
                      }"
                      link
                      type="a"
                      :label="$t('forgottenPassword')"
                    />
                  </template>
                </base-input>
              </div>

              <div v-if="user.address" class="col-xs-12">
                <address-fields
                  prefix="address."
                  :errors="errors"
                  v-model="user.address"
                />
              </div>

              <div class="col-sm col-xs-12 flex">
                <base-btn
                  link
                  :label="$t('deleteAccount')"
                  class="q-mr-md"
                  color="negative"
                  @click="onDeleteAccount"
                  :disable="hasDeletionRequest"
                />
                <q-space />
                <base-btn
                  :loading="loading"
                  style="width: 100px"
                  :label="$t('save')"
                  type="submit"
                />
              </div>
            </div>
          </q-form>
        </base-section>
      </div>
      <div class="col-xs-12 col-sm-3">
        <base-section flat bordered :title="$t('avatar')">
          <div class="col-xs-12">
            <file-selector
              ref="avatar"
              accept="image/*"
              :dialog-label="$t('uploadAvatar')"
              :hint="$t('hint.images', { type: 'avatar' })"
              :readonly="user.avatar && !user.request_avatar"
              v-model="user.avatar"
              @update:model-value="onSaveProfile"
            />
          </div>
        </base-section>
      </div>
      <div class="col-xs-12 col-sm-9">
        <base-section
          flat
          bordered
          :title="$t('parQ')"
          :description="$t('myAccount.parqDesc')"
          no-row
        >
          <parq-form :readonly="!user?.request_parq" v-model:member="user" />
        </base-section>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAppStore } from "stores/app";
import ParqForm from "components/ParqForm.vue";
import FileSelector from "components/FileSelector.vue";
import AddressFields from "src/components/address/AddressFields.vue";

export default {
  components: {
    ParqForm,
    FileSelector,
    AddressFields,
  },
  data() {
    return {
      loading: false,
      errors: {},
    };
  },
  methods: {
    ...mapActions(useAppStore, [
      "update",
      "currentUser",
      "setIsDirt",
      "setIsLoading",
      "requestAccountDeletion",
    ]),
    onSaveProfile() {
      console.func("pages/MyAccountPage:methods.onSaveProfile()", arguments);
      this.loading = true;
      this.errors = {};
      this.update({
        ...this.user,
        guard: this.$route.meta.guard,
      })
        .then(() => {
          this.loading = false;
        })
        .catch(({ errors, message }) => {
          this.loading = false;
          if (errors) {
            this.errors = errors;
          } else {
            this.$core.error(message);
          }
        });
    },
    onDeleteAccount() {
      console.func("pages/MyAccountPage:methods.onDeleteAccount()", arguments);
      this.$core
        .confirm(
          this.$t(
            "deletingYourAccountWillRemoveAllOfYourInformationFromOurDatabaseThisCannotBeUndone"
          ),
          {
            title: this.$t("weReSorryToSeeYouGo"),
          }
        )
        .then(() => {
          this.$core.showLoading("Processing account deletion request...");
          this.requestAccountDeletion()
            .then(() => {
              this.$core.hideLoading();
            })
            .catch(({ message }) => {
              this.$core.hideLoading();
              this.$core.error(message);
            });
        });
    },
  },
  computed: {
    ...mapState(useAppStore, ["user", "deletionRequest", "hasDeletionRequest"]),
    avatar() {
      return this.$route.query.avatar;
    },
    deletionRequestedAt() {
      return this.$core.formatDateAsHuman(this.deletionRequest?.created_at);
    },
  },
  mounted() {
    if (this.avatar) {
      this.$refs.avatar.onFileBrowse();
    }
  },
  watch: {
    loading: {
      deep: true,
      immediate: true,
      handler(val) {
        this.setIsDirt(val);
        this.setIsLoading(val);
      },
    },
  },
};
</script>
