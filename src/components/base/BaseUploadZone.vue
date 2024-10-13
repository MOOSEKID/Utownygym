<template>
  <q-responsive
    class="base-upload-zone col"
    :ratio="4 / 3"
    style="max-height: 200px"
  >
    <div
      @drop="onDrop"
      @dragenter="onDraging"
      @dragover="onDraging"
      @click="$refs.uploader.pickFiles()"
      class="rounded-borders upload-zone flex flex-center"
    >
      <q-icon class="q-mr-sm" name="fas fa-plus" />
      <div>Drag or select file</div>
      <q-uploader
        v-show="false"
        ref="uploader"
        multiple
        class="hidden"
        color="primary"
        field-name="media"
        auto-upload
        :headers="headers"
        :url="endpoint"
        @uploaded="onUploaded"
        @rejected="onRejected"
        @failed="onFailed"
        :accept="accept"
        :max-file-size="maxFileSize"
      />
    </div>
  </q-responsive>
</template>

<script>
export default {
  props: {
    endpoint: String,
    accept: String,
    maxFileSize: String,
  },
  methods: {
    onDraging(event) {
      // console.func('components/base/BaseUploadZone:methods.onDraging()', arguments)
      event.preventDefault();
    },
    onDrop(event) {
      console.func(
        "components/base/BaseUploadZone:methods.onDrop()",
        arguments
      );
      event.preventDefault();
      // get the data from data transfer event
      const files = event.dataTransfer.files;
      // check console log to verify the data
      // do whatever you want to do with this data :)
      if (files.length) {
        this.$refs.uploader.addFiles(files);
      }
    },
    onUploaded({ files, xhr }) {
      console.func(
        "components/base/BaseUploadZone:methods.onUploaded()",
        arguments
      );
      const file = JSON.parse(xhr.response);
      this.$emit("updated", file);
    },
    onRejected(rejectedEntries) {
      console.func(
        "components/base/BaseUploadZone:methods.onRejected()",
        arguments
      );
      this.$q.notify({
        type: "negative",
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
      });
      this.$emit("rejected", rejectedEntries);
    },
    onFailed({ files, xhr }) {
      console.func(
        "components/base/BaseUploadZone:methods.onFailed()",
        arguments
      );
      const response = xhr.response ? JSON.parse(xhr.response) : null;
      this.$refs.uploader.removeQueuedFiles();
      this.$core.error(
        response?.message ||
          `${files.length} file(s) did not pass validation constraints`
      );
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
  },
};
</script>

<style lang="scss">
.base-upload-zone {
  .upload-zone {
    border: 2px dashed var(--q-primary);
    color: var(--q-primary);
    font-weight: 500;
    cursor: pointer;
  }
}
</style>
