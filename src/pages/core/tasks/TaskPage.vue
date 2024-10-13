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
        <base-section flat bordered :title="title" head-class="q-pb-sm">
          <template v-if="creating">
            <div class="col-xs-12">
              <base-label required>{{ $t("subject") }}</base-label>
              <base-input v-model="formData.subject" name="subject" />
            </div>
            <div class="col-xs-12">
              <base-label required>{{ $t("label.staff") }}</base-label>
              <base-select
                :placeholder="$t('placeholder.selectStaff')"
                dense
                outlined
                v-model="formData.users"
                name="users"
                :filter-method="getStaff"
                map-options
                use-filter
                multiple
                use-chips
                cache-key="admins"
                :option-label="(opt) => `${opt.name} (${opt.email})`"
              />
            </div>
            <div class="col-xs-12">
              <base-label required>{{ $t("label.message") }}</base-label>
              <base-editor v-model="formData.message" name="message" />
            </div>
            <div class="col-xs-12">
              <base-label>{{ $t("attachment") }}</base-label>
              <base-dropzone v-model="formData.media" name="media" />
            </div>
          </template>
          <template v-else>
            <div class="col-xs-12 col-sm-12">
              <div
                :class="{
                  'meta-section': true,
                  row: $q.screen.gt.xs,
                }"
              >
                <div class="col">
                  <div class="flex">
                    <div class="subject text-h6">{{ formData.subject }}</div>
                  </div>
                  <div class="created-at">
                    {{ $core.formatDateAsHuman(formData.created_at) }}
                    <base-status :type="formData.status" />
                  </div>
                </div>
                <div class="col-auto">
                  <base-avatars :items="formData.users" />
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12">
              <span v-html="formData.message"></span>
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
              :model-value="formData.is_archived"
              @update:model-value="onUpdateArchived"
              :label="$t('archived')"
              color="warning"
              dense
            />
            <base-btn
              class="q-ml-md"
              color="negative"
              icon="fas fa-trash-can"
              @click="onDelete"
              :label="$t('delete')"
              link
            />
          </template>
        </base-section>
        <base-section
          flat
          bordered
          :title="$t('activities')"
          :description="$t('tasks.activityDesc')"
          no-row
          v-if="!creating"
          body-class="q-px-lg"
        >
          <q-timeline class="comments" color="secondary">
            <reply-card
              creating
              is-admin
              :reply-method="reply"
              :module-id="formData.id"
              class="comment"
              @create="onCreateNote"
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
import { mapActions } from "pinia";
import SkeletonSinglePage from "components/skeleton/SkeletonSinglePage.vue";
import ReplyCard from "components/ReplyCard.vue";
import { useTaskStore } from "stores/task";
import { useStaffStore } from "stores/staff";
import { PageMixins } from "services/mixins";

const formData = {
  media: [],
  status: "Pending",
  message: "",
};

export default {
  mixins: [PageMixins],
  components: {
    SkeletonSinglePage,
    ReplyCard,
  },
  data() {
    return {
      defaultData: cloneDeep(formData),
      formData: cloneDeep(formData),
    };
  },
  methods: {
    ...mapActions(useTaskStore, [
      "store",
      "show",
      "update",
      "delete",
      "reply",
      "changeArchived",
    ]),
    ...mapActions(useStaffStore, { getStaff: "options", getUser: "show" }),
    onCreateNote(props) {
      console.func(
        "pages/core/tasks/TaskPage:methods.onCreateNote()",
        arguments
      );
      if (props) {
        this.formData.replies.splice(0, 0, cloneDeep(props));
        this.defaultData.replies.splice(0, 0, cloneDeep(props));
      } else {
        this.show(this.id).then((task) => {
          this.formData = task;
          this.defaultData = cloneDeep(task);
        });
      }
    },
    onDelete(props) {
      console.func("pages/core/tasks/TaskPage:methods.onDelete()", arguments);
      this.$core.confirm(this.$t("dialog.info.warning")).then(() => {
        this.delete(this.id)
          .then(() => {
            this.$router.push({
              name: "Tasks",
            });
          })
          .catch((error) => {
            this.$core.error(error, { title: this.$t("dialog.title.error") });
          });
      });
    },
    onUpdateArchived() {
      console.func(
        "pages/core/tasks/TaskPage:methods.onUpdateArchived()",
        arguments
      );
      this.changeArchived(this.formData).then(() => {
        this.defaultData = cloneDeep(this.formData);
      });
    },
  },
  async mounted() {
    if (!this.creating) {
      this.show(this.id)
        .then((data) => {
          this.$app.setTitle(data.subject);
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
  computed: {
    title() {
      if (this.creating) {
        return this.$t("generalInformation");
      }
      return null;
    },
  },
};
</script>
