<template>
  <div :class="classes">
    <q-responsive class="cursor-pointer" :ratio="inline ? 16 / 9 : 1">
      <div
        :class="{
          'flex flex-center file-selector': true,
          mini: mini,
        }"
      >
        <div class="text-center">
          <q-icon v-if="icon" :size="mini ? '20px' : '30px'" :name="icon" />
          <div v-if="!mini" class="q-mt-sm">
            <base-btn
              class="q-pl-lg q-pr-lg"
              color="primary"
              @click.stop="$emit('click', $event)"
              outline
              link
              no-caps
              :label="$t('browseFiles')"
            >
              <q-uploader-add-trigger v-if="trigger" />
            </base-btn>
          </div>
          <div v-if="!mini">{{ $t("orDropFilesHereToUpload") }}</div>
        </div>
      </div>
    </q-responsive>
  </div>
</template>

<script>
export default {
  props: {
    inline: Boolean,
    mini: Boolean,
    icon: String,
    trigger: Boolean,
  },
  computed: {
    classes() {
      let classes = "relative-position file-box file-select-btn";
      if (this.inline) {
        classes += " inline";
      }
      return classes;
    },
  },
};
</script>

<style lang="scss">
.file-select-btn.inline .q-responsive__filler > div {
  padding-bottom: 185px !important;
}
</style>
