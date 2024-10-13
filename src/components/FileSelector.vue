<template>
  <q-uploader
    flat
    ref="uploader"
    :class="classes"
    :multiple="false"
    :readonly="readonly"
    :max-files="1"
    field-name="media"
    :auto-upload="!noAutoUpload"
    :with-credentials="true"
    :headers="headers"
    :url="url"
    @uploaded="onUploaded"
    @rejected="onRejected"
    @added="$emit('added', $event)"
  >
    <template v-slot:header>
      <div v-if="label" class="label text-h6">{{ label }}</div>
    </template>
    <template v-slot:list="scope">
      <slot v-bind="scope"></slot>
      <base-dialog
        :title="dialogLabel"
        use-separator
        body-class="file-selector-uploader scroll"
        body-style="max-height: 50vh; min-height: 50vh"
        ref="files"
      >
        <template v-slot:body>
          <template v-if="!loading">
            <base-info v-if="hint" class="q-mb-md">{{ hint }}</base-info>
            <div class="file-grid">
              <file-uploader-trigger trigger />
              <div
                @click="onSelect(file)"
                :class="{
                  'relative-position': true,
                  'file-box': true,
                  selected: getSelected(file),
                }"
                v-for="file in files"
                :key="file.id"
              >
                <file-card :mini="mini" v-bind="file">
                  <div class="absolute-full controller">
                    <div class="q-pt-xs q-pr-sm absolute-top-right">
                      <q-icon
                        class="checked-icon"
                        size="15px"
                        color="green"
                        name="fas fa-check-circle"
                      />
                    </div>
                    <div class="q-pa-sm file-name ellipsis absolute-bottom">
                      {{ file.name }}
                      <base-tooltip style="width: 150px">
                        {{ file.name }}
                      </base-tooltip>
                    </div>
                  </div>
                </file-card>
              </div>
              <file-list :scope="scope" />
            </div>
          </template>
          <q-inner-loading :showing="loading">
            <q-spinner-oval size="50px" color="primary" />
          </q-inner-loading>
        </template>
        <template v-slot:footer>
          <q-card-section class="flex">
            <template v-if="loadFromServer">
              <q-btn
                :disable="current_page <= 1 || loading"
                @click="
                  onLoadFile({
                    page: current_page - 1 >= 1 ? current_page - 1 : 1,
                  })
                "
                dense
                round
                flat
                color="primary"
                icon="fal fa-angle-left"
              />
              <q-btn
                :disable="current_page == last_page || loading"
                @click="
                  onLoadFile({
                    page: current_page + 1 <= last_page ? current_page + 1 : 1,
                  })
                "
                dense
                round
                flat
                color="primary"
                icon="fal fa-angle-right"
              />
            </template>
            <q-space />
            <div class="q-gutter-sm">
              <q-btn
                no-caps
                outline
                :label="$t('cancel')"
                color="grey"
                v-close-popup
              />
              <q-btn
                :disable="disable"
                no-caps
                :label="$t('done')"
                color="primary"
                @click="onDone"
              />
            </div>
          </q-card-section>
        </template>
      </base-dialog>
      <div
        :class="{
          'file-box': true,
          mini: mini,
        }"
        @click.stop="onFileBrowse"
      >
        <q-uploader-add-trigger v-if="useSelector" />
        <file-card
          v-if="hasFile"
          :use-controler="useControler"
          @details="onDetails"
          @select="onFileBrowse"
          :mini="mini"
          v-bind="modelValue"
        />
        <file-uploader-trigger
          v-else
          :icon="icon"
          :mini="mini"
          :inline="inline"
          @click.stop="onFileBrowse"
        />
      </div>
    </template>
  </q-uploader>
</template>

<script>
import { mapActions } from "pinia";
import { useFileStore } from "stores/file";
import FileCard from "./FileCard.vue";
import FileEditor from "./FileEditor.vue";
import FileList from "./FileList.vue";
import FileUploaderTrigger from "./FileUploaderTrigger.vue";

export default {
  components: { FileCard, FileList, FileUploaderTrigger },
  props: {
    modelValue: {},
    relatedFiles: {
      type: Array,
      default: () => [],
    },
    label: String,
    icon: {
      type: String,
      default: "fad fa-file",
    },
    hint: String,
    size: Number,
    dialogLabel: {
      type: String,
      default: "uploadMedia",
    },
    mini: Boolean,
    noAutoUpload: Boolean,
    loadFromServer: Boolean,
    readonly: Boolean,
    query: {
      required: false,
      type: Function,
      default: () => (args) => {
        return {
          ...args,
          rowsPerPage: 7,
        };
      },
    },
    useControler: Boolean,
    useSelector: Boolean,
    inline: Boolean,
  },
  data() {
    return {
      selected: this.modelValue,
      files: this.relatedFiles,
      current_page: 1,
      last_page: 1,
      loading: false,
    };
  },
  emits: ["update:model-value", "rejected", "uploaded", "added"],
  methods: {
    ...mapActions(useFileStore, ["get"]),
    onRejected(rejectedEntries) {
      console.func("components/FileSelector:methods.onRejected()", arguments);
      this.$q.notify({
        type: "negative",
        message: this.$t("fileValidation", {
          count: rejectedEntries.length,
        }),
      });
      this.$emit("rejected", rejectedEntries);
    },
    onUploaded({ files, xhr }) {
      console.func("components/FileSelector:methods.onUploaded()", arguments);
      this.$refs.uploader.removeFile(files[0]);
      const image = JSON.parse(xhr.response);
      this.files.push(image);
      this.$emit("uploaded", image);
    },
    onLoadFile(args) {
      console.func("components/FileSelector:methods.onLoadFile()", arguments);
      this.loading = true;
      this.current_page = args.page;
      this.get(this.query(args))
        .then(({ data, meta }) => {
          this.files = data;
          this.current_page = meta.current_page;
          this.last_page = meta.last_page;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    async onFileBrowse() {
      console.func("components/FileSelector:methods.onFileBrowse()", arguments);
      if (this.readonly || this.useSelector) return false;
      if (this.loadFromServer) {
        await this.onLoadFile({
          page: this.current_page,
        });
      }
      this.selected = this.modelValue;
      this.$refs.files.show();
    },
    onDone() {
      console.func("components/FileSelector:methods.onDone()", arguments);
      this.$emit("update:model-value", this.selected);
      this.$refs.files.hide();
    },
    onDetails() {
      console.func("components/FileSelector:methods.onDetails()", arguments);
      this.$q.dialog({
        component: FileEditor,
        componentProps: {
          file: this.selected,
        },
      });
    },
    onSelect(file) {
      console.func("components/FileSelector:methods.onSelect()", arguments);
      this.selected = this.selected && this.selected.id === file.id ? "" : file;
    },
    getSelected(file) {
      return this.selected && this.selected.id === file.id;
    },
  },
  computed: {
    headers() {
      return [
        {
          name: "Authorization",
          value: `Bearer ${this.$app.token}`,
        },
      ];
    },
    url() {
      return this.$core.apiBaseURL("/files/store");
    },
    disable() {
      return this.selected === this.modelValue;
    },
    hasFile() {
      return (
        this.modelValue &&
        typeof this.modelValue === "object" &&
        this.modelValue.id
      );
    },
    classes() {
      let classes = "full-width file-selector-uploader overflow-hidden";
      if (this.inline) {
        classes += " inline";
      }
      return classes;
    },
  },
  watch: {
    modelValue: {
      deep: true,
      handler(val) {
        this.selected = val;
      },
    },
    relatedFiles: {
      deep: true,
      handler(val) {
        this.files = val;
      },
    },
  },
  mounted() {
    Object.assign(this, {
      pickFiles: this.$refs.uploader.pickFiles,
    });
  },
};
</script>
<style lang="sass">
$mini-height: 60px

.file-selector
  border: 2px dashed $separator-color
  border-radius: $generic-border-radius
  &.mini
    min-height: $mini-height
    min-width: $mini-height
    height: $mini-height
    width: $mini-height
  &.min
    min-height: auto
.file-box
  &.mini
    min-height: $mini-height
    min-width: $mini-height
    height: $mini-height
    width: $mini-height
  &:hover
    .delete
      display: block
      z-index: 1
  .delete
    display: none
.file-selector-uploader
  max-height: inherit
  &.inline .q-responsive__filler > div
    padding-bottom: 185px !important
  .q-uploader__header
    background-color: transparent
    border-radius: 0
    .label
      margin-bottom: .4rem
  .q-uploader__list
    padding: 0
    overflow: inherit
  .file-grid
    position: relative
    display: grid
    grid-template-columns: repeat(4,1fr)
    grid-gap: .8rem
    -webkit-user-select: none
    user-select: none
    .failed
      background: rgba(153, 153, 153, 0.55)
    .file-box
      .controller
        visibility: hidden
      &.selected, &:hover
        .controller
          visibility: visible
          background: rgba(153, 153, 153, 0.55)
        .rounded-borders
          border-color: $positive
      &:hover:not(.selected)
        .checked-icon
          color: white !important
  .file-box
    position: relative
    .box
      overflow: hidden
      border: 1px solid $separator-color
    .thumbnail
      z-index: 5
      display: flex
      overflow: hidden
      flex-direction: column
      justify-content: center
      align-items: center
      width: 100%
      border-radius: 5px
      transform: translateZ(0)
    .file
      max-width: 100%
      .info
        max-width: 100%
  .file-select-btn
    border-radius: $generic-border-radius
    overflow: hidden
    &:hover .file-selector
      background: $grey-2
</style>
