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
      <div class="masonry col-gutter-md">
        <div class="col-xs-12 col-sm-8">
          <div class="q-gutter-md">
            <base-section
              flat
              bordered
              title="General information"
              description="A great blog title and description has the power to turn a casual shopper into a revenue-generating buyer."
            >
              <div class="col-xs-12 col-sm-12">
                <base-label required>{{ $t("label.title") }}</base-label>
                <base-input v-model="formData.title" name="title" />
              </div>
              <div class="col-xs-12">
                <base-label required>{{ $t("label.description") }}</base-label>
                <base-editor
                  v-model="formData.description"
                  name="description"
                  min-height="10rem"
                />
              </div>
            </base-section>
            <seo-section flat bordered v-model="formData" />
          </div>
        </div>
        <div class="col-xs-12 col-sm-4 col-end">
          <div class="q-gutter-y-md">
            <base-section flat bordered title="Tags" no-row>
              <tag-select v-model="formData.tags" />
            </base-section>
            <base-section flat bordered :title="$t('thumbnail')">
              <thumbnail-selector
                :dialog-label="$t('label.uploadthumbnail')"
                :hint="$t('youCanThumbnail')"
                icon="fad fa-image"
                v-model="formData.thumbnail"
              />
            </base-section>
          </div>
        </div>
        <div class="col-xs-12 col-sm-8">
          <base-section
            v-if="!creating"
            title="Comments"
            :description="$t('withActivityBlog')"
            no-row
            body-class="q-px-lg"
          >
            <q-timeline class="comments" color="secondary">
              <base-note-card
                :module-action="comments"
                :module-id="formData.id"
                class="comment"
                creating
                no-rag
                @create="onCreateComment"
              />
              <base-note-card
                class="comment"
                v-for="comment in formData.comments"
                :key="comment.id"
                v-bind="comment"
                :module-id="formData.id"
                :user="comment.user"
              />
            </q-timeline>
          </base-section>
        </div>
      </div>
    </base-form>
    <skeleton-single-page v-else />
  </q-page>
</template>

<script>
import { cloneDeep } from "lodash";
import { mapActions } from "pinia";
import SkeletonSinglePage from "components/skeleton/SkeletonSinglePage.vue";
import { useBlogStore } from "stores/blog";
import { PageMixins } from "services/mixins";
import SeoSection from "components/SeoSection.vue";
import TagSelect from "src/components/BlogTagSelect.vue";
import ThumbnailSelector from "src/components/FileSelector.vue";

const formData = {
  is_active: true,
  thumbnail: null,
  description: "",
};

export default {
  components: {
    SkeletonSinglePage,
    SeoSection,
    TagSelect,
    ThumbnailSelector,
  },
  mixins: [PageMixins],
  data() {
    return {
      defaultData: cloneDeep(formData),
      formData: cloneDeep(formData),
    };
  },
  methods: {
    ...mapActions(useBlogStore, ["store", "show", "update", "comments"]),
    onCreateComment(props) {
      console.func(
        "pages/core/blogs/BlogPage:methods.onCreateComment()",
        arguments
      );
      if (props) {
        this.formData.comments.splice(0, 0, cloneDeep(props));
        this.defaultData.comments.splice(0, 0, cloneDeep(props));
      } else {
        this.show(this.id).then((response) => {
          this.formData = response;
          this.defaultData = cloneDeep(response);
        });
      }
    },
  },
  async mounted() {
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
