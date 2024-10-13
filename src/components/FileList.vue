<template>
  <div
    class="relative-position file-box"
    v-for="(file, index) in scope.files"
    :key="index"
  >
    <q-responsive
      class="box rounded-borders cursor-pointer bg-grey-2"
      :ratio="1"
    >
      <div
        v-if="file.__status === 'uploading'"
        class="q-pa-md text-black flex flex-center"
      >
        <q-spinner-orbit color="primary" size="3rem" :thickness="5" />
      </div>
      <template v-else>
        <div v-if="file.__img" class="thumbnail">
          <q-img :src="file.__img.src" contain>
            <template v-slot:loading>
              <q-spinner-orbit color="white" />
            </template>
          </q-img>
        </div>
        <div v-else class="q-pa-md text-black flex flex-center file">
          <div class="info overflow-hidden text-center">
            <q-icon :name="`fas fa-file-${icon(file.name)}`" size="30px" />
          </div>
        </div>
        <div
          class="absolute-full q-pa-md text-black flex flex-center failed"
          v-if="file.__status === 'failed'"
        >
          <div class="info overflow-hidden text-center">
            <q-btn
              flat
              round
              color="white"
              icon="fas fa-cloud-upload-alt"
              @click="scope.upload"
            />
          </div>
        </div>
      </template>
    </q-responsive>
  </div>
</template>

<script>
export default {
  props: {
    scope: {
      type: Object,
      default: () => ({ files: [] }),
    },
  },
  methods: {
    icon(file) {
      let type = "alt";
      const parts = file.split(".");
      const extension = parts[parts.length - 1];
      switch (extension) {
        case "pdf":
          type = "pdf";
          break;
        case "docx":
        case "doc":
          type = "word";
          break;
        case "xls":
        case "xlsx":
          type = "excel";
          break;
        case "mp3":
        case "ogg":
        case "wav":
          type = "audio";
          break;
        case "mp4":
        case "mov":
          type = "video";
          break;
        case "zip":
        case "7z":
        case "rar":
          type = "archive";
          break;
        case "jpg":
        case "jpeg":
        case "png":
          type = "image";
          break;
      }
      return type;
    },
  },
};
</script>
