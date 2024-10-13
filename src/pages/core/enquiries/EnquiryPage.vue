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
      :no-action="!creating"
      :save-label="$t('send')"
    >
      <div class="q-gutter-md">
        <base-section flat bordered head-class="q-pb-sm">
          <template #title>
            <div>
              <div class="text-h6">
                {{ title }}
              </div>
              <q-item-label v-if="!creating">
                {{ $core.formatDateAsHuman(formData.created_at) }}
                <base-status :type="formData.status" />
              </q-item-label>
            </div>
          </template>
          <template v-if="creating">
            <div class="col-xs-12">
              <base-label required>{{ $t("subject") }}</base-label>
              <base-input v-model="formData.subject" name="subject" />
            </div>
            <template v-if="isAdmin">
              <div class="col-xs-12">
                <base-label required>{{ $t("label.user") }}</base-label>
                <base-select
                  :placeholder="$t('placeholder.selectMember')"
                  dense
                  outlined
                  v-model="formData.user"
                  name="user"
                  :filter-method="getMember"
                  map-options
                  :multiple="formData.bulk"
                  use-filter
                  use-chips
                  cache-key="users"
                  :option-label="(opt) => `${opt.name} (${opt.email})`"
                />
              </div>
            </template>
            <div class="col-xs-12 col-sm-12">
              <base-label required>{{ $t("label.message") }}</base-label>
              <base-editor v-model="formData.message" name="message" />
            </div>
            <div class="col-xs-12 col-sm-12">
              <base-label>{{ $t("attachment") }}</base-label>
              <base-dropzone v-model="formData.media" name="media" />
            </div>
          </template>
          <template v-else>
            <div class="col-xs-12">
              <div class="row">
                <div v-if="isAdmin" class="col-xs-12 col-sm-12">
                  <q-item class="q-px-none">
                    <q-item-section avatar>
                      <base-avatar
                        size="45px"
                        :user="user || { name: formData.name }"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-subtitle2">
                        {{ formData.name }} - {{ formData.email }}
                      </q-item-label>
                      <q-item-label v-if="formData.phone">
                        {{ formData.phone }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
                <div v-else-if="formData?.admin" class="col-xs-12 col-sm-12">
                  <q-item class="q-px-none">
                    <q-item-section avatar>
                      <base-avatar size="45px" :user="formData.admin" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-subtitle2">
                        {{ formData.name }}
                      </q-item-label>
                      <q-item-label v-if="formData.phone">
                        {{ formData.email }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
                <div class="col-xs-12 col-sm-12">
                  <span v-html="formData.message"></span>
                </div>
              </div>
            </div>
          </template>

          <template v-if="!creating && formData.media.length">
            <div class="col-xs-12">
              <div class="files">
                <div class="row q-col-gutter-sm">
                  <div
                    v-for="media in formData.media"
                    :key="media.id"
                    class="col-sm-2 col-xs-12"
                  >
                    <base-media-card :media="media" />
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template v-if="!creating" v-slot:bottom>
            <q-checkbox
              :model-value="archived"
              @update:model-value="onUpdateArchived"
              :label="$t('archived')"
              color="warning"
              dense
            />
            <base-btn
              class="q-ml-md"
              v-guard:admins
              color="negative"
              icon="fas fa-trash-can"
              @click="onDelete"
              :label="$t('delete')"
              link
            />
          </template>
        </base-section>

        <template v-if="formData?.order">
          <products-card
            flat
            bordered
            view
            v-model="formData.order.line_items"
            :currency="formData.order.currency"
          >
            <template v-if="isAdmin" #bottom>
              <base-btn
                link
                label="View order"
                :to="`/admin/orders/${formData?.order_id}`"
              />
            </template>
          </products-card>
        </template>

        <base-section
          flat
          bordered
          :title="$t('activities')"
          :description="$t('enquiries.activityDesc')"
          no-row
          v-if="!creating"
          body-class="q-px-lg"
        >
          <q-timeline class="comments" color="secondary">
            <reply-card
              creating
              class="comment"
              :module-id="formData.id"
              :reply-method="reply"
              @create="onCreateNote"
              :is-admin="isAdmin"
              @update:archived="onUpdateArchived"
            />
            <reply-card
              class="comment"
              v-for="note in formData.replies"
              :key="note.id"
              v-bind="note"
              :module-id="formData.id"
              :user="note.user"
            />
          </q-timeline>
        </base-section>
      </div>
    </base-form>
    <skeleton-single-page v-else />
  </q-page>
</template>

<script>
import { cloneDeep } from "lodash";
import { mapActions, mapState } from "pinia";
import SkeletonSinglePage from "components/skeleton/SkeletonSinglePage.vue";
import { useEnquiryStore } from "stores/enquiry";
import { useMemberStore } from "stores/member";
import ProductsCard from "src/components/order/ProductsCard.vue";
import ReplyCard from "components/ReplyCard.vue";
import { PageMixins } from "services/mixins";
import { useAppStore } from "src/stores/app";

const formData = {
  media: [],
  message: "",
  status: "Pending",
  is_archived: false,
  user_archived: false,
};

export default {
  mixins: [PageMixins],
  components: {
    SkeletonSinglePage,
    ProductsCard,
    ReplyCard,
  },
  data() {
    return {
      defaultData: cloneDeep(formData),
      formData: cloneDeep(formData),
    };
  },
  methods: {
    ...mapActions(useEnquiryStore, [
      "store",
      "show",
      "update",
      "delete",
      "reply",
      "changeArchived",
      "changeUserArchived",
    ]),
    ...mapActions(useMemberStore, {
      getMember: "options",
      getUser: "show",
      getUsers: "shows",
    }),
    onSubmit(props) {
      console.func(
        "pages/core/enquiries/EnquiryPage:methods.onSubmit()",
        arguments
      );
      this.submited = true;
      const method = this.creating ? this.store : this.update;
      method({ ...this.formData, admin: this.isAdmin })
        .then(({ data, message }) => {
          this.submited = false;
          this.$q.notify(message);
          if (this.formData.bulk) {
            this.defaultData = cloneDeep(this.formData);
            this.$router.back();
            return false;
          }
          this.formData = data;
          this.defaultData = cloneDeep(data);
          this.$router.push({
            name: "Enquiry",
            params: {
              id: data.id,
            },
            query: {
              action: "edit",
              title: data.subject,
            },
          });
        })
        .catch((error) => {
          this.submited = false;
          this.$core.error(error, { title: this.$t("dialog.title.error") });
        });
    },
    onDelete(props) {
      console.func(
        "pages/core/enquiries/EnquiryPage:methods.onDelete()",
        arguments
      );
      this.$core.confirm(this.$t("dialog.info.warning")).then(() => {
        this.delete(this.id)
          .then(() => {
            this.$router.push({
              name: "Enquiries",
            });
          })
          .catch((error) => {
            this.$core.error(error, { title: this.$t("dialog.title.error") });
          });
      });
    },
    onCreateNote(props) {
      console.func(
        "pages/core/enquiries/EnquiryPage:methods.onCreateNote()",
        arguments
      );
      if (props) {
        this.formData.replies.splice(0, 0, cloneDeep(props));
        this.defaultData.replies.splice(0, 0, cloneDeep(props));
      } else {
        this.show(this.id).then((enquiry) => {
          this.formData = enquiry;
          this.defaultData = cloneDeep(enquiry);
        });
      }
    },
    onUpdateArchived() {
      console.func(
        "pages/core/enquiries/EnquiryPage:methods.onUpdateArchived()",
        arguments
      );
      const method = this.isAdmin
        ? this.changeArchived
        : this.changeUserArchived;
      method(this.formData).then(() => {
        this.defaultData = cloneDeep(this.formData);
      });
    },
  },
  async mounted() {
    if (!this.creating) {
      this.show(this.id)
        .then((data) => {
          this.$app.setTitle(data.subject || "Contact us");
          this.formData = data;
          this.defaultData = cloneDeep(data);
          this.loaded = true;
        })
        .catch((error) => {
          this.$emit("error", error);
        });
    } else {
      if (this.user) {
        await this.getUser(this.user).then((user) => {
          this.formData.user = {
            name: user.name,
            email: user.email,
            id: user.id,
          };
          this.defaultData = cloneDeep(this.formData);
        });
      } else if (this.users) {
        await this.getUsers({
          ids: this.users.split(","),
        }).then((users) => {
          this.formData.bulk = true;
          this.formData.user = users.map((user) => ({
            name: user.name,
            email: user.email,
            id: user.id,
          }));
          this.defaultData = cloneDeep(this.formData);
        });
      }
      this.loaded = true;
    }
  },
  computed: {
    ...mapState(useAppStore, ["guard"]),
    user() {
      return this.$route.query.user;
    },
    users() {
      return this.$route.query.users;
    },
    isAdmin() {
      return this.guard === "admins";
    },
    archived() {
      return this.isAdmin
        ? this.formData.is_archived
        : this.formData.user_archived;
    },
    title() {
      if (this.creating) {
        return this.$t("generalInformation");
      }
      return this.formData.subject || this.$t("contactUs");
    },
  },
};
</script>
