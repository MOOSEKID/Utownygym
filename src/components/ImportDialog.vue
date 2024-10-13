<template>
  <base-dialog
    :title="title"
    body-class="scroll imports-dialog"
    content-style="width: 650px; max-width: 95vw"
    ref="dialog"
    @hide="onDialogHide"
    use-separator
    persistent
  >
    <template v-slot:body>
      <base-info class="q-mb-md" v-if="error" rounded color="negative">
        {{ error }}
      </base-info>
      <template v-if="csvFile">
        <base-item
          no-hover
          bordered
          @click.stop="$refs.fileSelector.pickFiles()"
        >
          <q-item-section avatar>
            <q-avatar
              size="75px"
              rounded
              color="grey-3"
              icon="fas fa-file-alt"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle2">{{
              csvFile.name
            }}</q-item-label>
            <q-item-label caption>
              {{ $core.humanSize(csvFile.size ?? 0) }}
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <base-btn
              @click.stop="$refs.fileSelector.pickFiles()"
              color="grey"
              label="Change file"
              outline
            />
          </q-item-section>
        </base-item>
        <div class="q-mt-md options">
          <div class="option" v-for="(item, index) in config" :key="index">
            <q-checkbox dense :label="item.label" v-model="item.value" />
          </div>
        </div>
      </template>
      <file-selector
        v-show="!csvFile"
        accept=".csv"
        v-model="csvFile"
        ref="fileSelector"
        @uploaded="onUploaded"
        use-selector
        inline
      />
    </template>
    <template v-slot:footer>
      <q-card-section class="flex">
        <base-btn
          link
          :href="sampleFile"
          :label="$t('downloadSampleCsv')"
        />
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
            :label="$t('uploadAndPreview')"
            color="primary"
            @click="onDone"
          />
        </div>
      </q-card-section>
    </template>
  </base-dialog>
</template>

<script>
import FileSelector from "./FileSelector.vue";

export default {
  components: { FileSelector },
  props: {
    title: String,
    sampleFile: String,
    importMethod: Function,
    options: { type: Array, default: () => [] },
  },
  data() {
    return {
      disable: true,
      error: null,
      csvFile: null,
      config: [],
    };
  },
  emits: ["ok", "hide"],
  methods: {
    async show() {
      console.func("components/ImportDialog:methods.show()", arguments);
      this.config = this.options;
      this.$refs.dialog.show();
    },
    hide() {
      console.func("components/ImportDialog:methods.close()", arguments);
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      console.func("components/ImportDialog:methods.onDialogHide()", arguments);
      this.$emit("hide");
    },
    onUploaded(file) {
      console.func("components/ImportDialog:methods.onUploaded()", arguments);
      this.csvFile = file;
      this.disable = false;
    },
    onDone() {
      console.func("components/ImportDialog:methods.onDone()", arguments);
      let options = {};
      this.config.forEach((item) => {
        options[item.key] = item.value;
      });
      this.importMethod({ file: this.csvFile.id, options })
        .then(({ message }) => {
          this.$core.success(message);
          this.$emit("ok");
          this.hide();
        })
        .catch(({ message }) => {
          this.error = message;
        });
    },
  },
};
</script>
