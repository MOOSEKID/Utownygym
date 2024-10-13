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
      <div class="row q-col-gutter-md">
        <div class="col-xs-12 col-sm-12">
          <div class="q-gutter-md">
            <base-section flat bordered title="General information">
              <div class="col-xs-12 col-sm-7">
                <base-label required>{{ $t("label.title") }}</base-label>
                <base-input v-model="formData.title" name="title" />
              </div>
              <div class="col-xs-12 col-sm-5">
                <base-label>{{ $t("useAs") }}</base-label>
                <base-select
                  :options="templates"
                  v-model="formData.template"
                  name="template"
                  outlined
                  dense
                  map-options
                  emit-value
                  clearable
                />
              </div>
              <div class="col-xs-12">
                <q-checkbox
                  dense
                  v-model="formData.is_active"
                  :label="$t('active')"
                  color="green"
                />
              </div>
              <div v-if="!creating" class="col-xs-12 col-sm-12">
                <base-label>{{ $t("preview") }}</base-label>
                <div class="page-preview relative-position">
                  <iframe
                    :src="formData.url"
                    width="100%"
                    height="500"
                    class="bg-white"
                  ></iframe>
                  <base-btn
                    class="absolute-center"
                    label="Open in Editor"
                    :to="{ name: 'Page Editor', params: $route.params }"
                  />
                </div>
              </div>
            </base-section>
            <seo-section
              :prefix="$core.baseURL('/')"
              flat
              bordered
              v-model="formData"
            />
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
import SkeletonSinglePage from "components/skeleton/SkeletonSinglePage.vue";
import { usePageStore } from "stores/page";
import { PageMixins } from "services/mixins";
import SeoSection from "components/SeoSection.vue";

const formData = {
  is_active: true,
  data: [],
};

export default {
  components: {
    SkeletonSinglePage,
    SeoSection,
  },
  mixins: [PageMixins],
  data() {
    return {
      defaultData: cloneDeep(formData),
      formData: cloneDeep(formData),
    };
  },
  methods: {
    ...mapActions(usePageStore, ["store", "show", "update"]),
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
  computed: {
    ...mapState(usePageStore, ["templates"]),
  },
};
</script>

<style lang="scss">
.page-preview {
  border-radius: $generic-border-radius;
  overflow: hidden;
  iframe {
    border: none;
    display: block;
    overflow: hidden;
  }
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: grey;
    z-index: 1;
    opacity: 0.75;
  }
  .q-btn {
    z-index: 999;
  }
}
</style>
