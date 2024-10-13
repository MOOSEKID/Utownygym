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
      <base-info class="q-mb-md"
        >Accepts Images (JPEG, PNG, GIF); Max file size: 300 KB</base-info
      >
      <base-upload-zone
        @updated="onDone"
        :endpoint="url"
        max-file-size="300000"
        accept=".jpg, image/*"
      />
    </template>
  </base-dialog>
</template>

<script>
export default {
  props: {
    title: String,
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
    onDone(file) {
      console.func("components/AddThemeFile:methods.onDone()", arguments);
      this.$emit("ok", file);
      this.hide();
    },
  },
  computed: {
    url() {
      return this.$core.apiBaseURL(`/themes/${this.theme}/assets`);
    },
    theme() {
      return this.options?.theme;
    },
  },
};
</script>
