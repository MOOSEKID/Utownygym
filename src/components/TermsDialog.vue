<template>
  <base-dialog
    :title="title"
    body-class="scroll terms-dialog"
    content-style="width: 950px; max-width: 95vw"
    ref="dialog"
    @hide="onDialogHide"
    use-separator
    persistent
    :cancel-label="$t('decline')"
    :done-label="$t('accept')"
    :loading="loading"
    @ok="onDone"
  >
    <template v-slot:body>
      <div v-html="content"></div>
    </template>
    <template v-if="loading" v-slot:loading>
      <text-skeleton />
    </template>
  </base-dialog>
</template>

<script>
import { mapState } from "pinia";
import { useAppStore } from "src/stores/app";
import TextSkeleton from "components/skeleton/TextSkeleton.vue";

export default {
  components: { TextSkeleton },
  data() {
    return {
      title: null,
      content: null,
      loading: true,
    };
  },
  props: {
    type: String,
  },
  emits: ["ok", "hide"],
  methods: {
    async show() {
      console.func("components/MemberDialog:methods.show()", arguments);
      this.$refs.dialog.show();
      this.title =
        this.type == "privacy"
          ? this.$t("privacyPolicy")
          : this.$t("termsAndConditions");
      setTimeout(() => {
        this.content = this[this.type];
        this.loading = false;
      }, 300);
    },
    hide() {
      console.func("components/MemberDialog:methods.close()", arguments);
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      console.func("components/MemberDialog:methods.onDialogHide()", arguments);
      this.$emit("hide");
    },
    onDone() {
      console.func("components/MemberDialog:methods.onDone()", arguments);
      this.$emit("ok");
      this.hide();
    },
  },
  computed: {
    ...mapState(useAppStore, ["tos", "privacy"]),
  },
};
</script>

<style lang="scss">
.terms-dialog {
  ul,
  ol {
    padding: 0;
  }
  li {
    list-style: none;
  }
}
</style>
