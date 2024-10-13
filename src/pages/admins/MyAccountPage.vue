<template>
  <q-page padding>
    <div class="row q-col-gutter-lg">
      <div class="col-xs-12 col-sm-3">
        <base-section flat bordered :title="$t('avatar')">
          <div class="col-xs-12">
            <file-selector
              ref="avatar"
              accept="image/*"
              :dialog-label="$t('uploadAvatar')"
              :hint="$t('hint.images', { type: 'avatar' })"
              v-model="user.avatar"
              @update:model-value="onSaveProfile"
            />
          </div>
        </base-section>
      </div>
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
              <div class="col-sm-3 col-xs-12">
                <base-label>{{ $t("email") }}</base-label>
                <base-input
                  :error-message="$core.errorMessage('email', errors)"
                  :error="$core.hasError('email', errors)"
                  v-model="user.email"
                  name="email"
                />
              </div>
              <div class="col-sm-3 col-xs-12">
                <base-label>{{ $t("phoneNumber") }}</base-label>
                <base-input
                  :error-message="$core.errorMessage('phone_number', errors)"
                  :error="$core.hasError('phone_number', errors)"
                  v-model="user.phone_number"
                  name="phone_number"
                />
              </div>

              <div class="col-sm-3 col-xs-12">
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

              <div class="col-xs-12">
                <address-fields
                  prefix="address."
                  :errors="errors"
                  v-model="user.address"
                />
              </div>

              <div class="col-sm-12 col-xs-12 text-right self-end">
                <base-btn
                  :loading="visible"
                  style="width: 100px"
                  :label="$t('save')"
                  type="submit"
                />
              </div>
            </div>
          </q-form>
        </base-section>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAppStore } from "stores/app";
import AddressFields from "src/components/address/AddressFields.vue";
import FileSelector from "components/FileSelector.vue";

export default {
  components: {
    FileSelector,
    AddressFields,
  },
  data() {
    return {
      visible: false,
      errors: {},
    };
  },
  methods: {
    ...mapActions(useAppStore, ["update", "currentUser"]),
    onSaveProfile() {
      console.func("pages/SignUpPage:methods.onSaveProfile()", arguments);
      this.visible = true;
      this.errors = {};
      this.update({
        ...this.user,
        guard: this.$route.meta.guard,
      })
        .then(() => {
          this.visible = false;
        })
        .catch(({ errors, message }) => {
          this.visible = false;
          if (errors) {
            this.errors = errors;
          } else {
            this.$core.error(message);
          }
        });
    },
  },
  computed: {
    ...mapState(useAppStore, ["user"]),
  },
};
</script>
