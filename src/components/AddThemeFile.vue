<template>
  <base-dialog
    :title="title"
    body-class="scroll add-theme-file-dialog"
    content-style="width: 650px; max-width: 95vw"
    ref="dialog"
    @hide="onDialogHide"
    @ok="onDone"
    use-separator
    persistent
  >
    <template v-slot:body>
      <div class="section">
        <base-label>Use template</base-label>
        <base-select
          dense
          outlined
          :options="templates"
          v-model="formData.template"
          name="template"
          option-label="name"
          option-value="name"
          placeholder="Blank template"
          clearable
          emit-value
          map-options
        />
      </div>
      <div class="section q-mt-md">
        <base-label required>File name</base-label>
        <base-input v-model="formData.name" name="name" :suffix="options.ext" />
      </div>
    </template>
  </base-dialog>
</template>

<script>
export default {
  props: {
    title: String,
    fileCreate: Function,
    options: Object,
  },
  data() {
    return {
      disable: true,
      formData: {},
    };
  },
  emits: ["ok", "hide"],
  methods: {
    async show() {
      console.func("components/AddThemeFile:methods.show()", arguments);
      this.$refs.dialog.show();
    },
    hide() {
      console.func("components/AddThemeFile:methods.close()", arguments);
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      console.func("components/AddThemeFile:methods.onDialogHide()", arguments);
      this.$emit("hide");
    },
    onDone() {
      console.func("components/AddThemeFile:methods.onDone()", arguments);
      this.fileCreate({
        ...this.formData,
        theme: this.options.theme,
        ext: this.options.ext,
        basepath: this.options.basepath,
      })
        .then(({ file }) => {
          this.$emit("ok", file);
          this.hide();
        })
        .catch((err) => {
          this.$core.error(err);
        });
    },
  },
  computed: {
    templates() {
      return this.options?.children.filter((item) => item.header === "file");
    },
  },
};
</script>
