<template>
  <base-form
    :disable="disable"
    :no-action="readonly"
    :save-label="$t('submit')"
    :cancelable="false"
    class="parq-form"
    @submit="onSubmit"
    no-events
  >
    <input-from-fields :readonly="readonly" v-model="fields" />
  </base-form>
</template>

<script>
import { cloneDeep } from "lodash";
import { mapActions, mapState } from "pinia";
import { useQuestionnaireStore } from "src/stores/questionnaire";
import { useAppStore } from "stores/app";
import InputFromFields from "components/InputFromFields.vue";

const parg = {
  questionnaire: {
    fields: [],
  },
  answers: {},
};

const mapQuestionnaire = (data) => {
  const { answers, questionnaire } = data;
  const value = (key) => {
    return answers[key] || undefined;
  };
  data.questionnaire.fields = questionnaire.fields.map((item) => ({
    ...item,
    config: { ...item.config, value: value(item.key) || item.config?.value },
  }));
  console.log(data);
  return data;
};

export default {
  components: { InputFromFields },
  props: {
    member: Object,
    requestParq: Boolean,
    readonly: Boolean,
  },
  data() {
    return {
      parq: cloneDeep(parg),
      defaultParq: cloneDeep(parg),
    };
  },
  emits: ["done"],
  methods: {
    ...mapActions(useQuestionnaireStore, ["default"]),
    ...mapActions(useAppStore, ["updateParq"]),
    async onSubmit(args) {
      console.func("components/ParqForm:methods.onSubmit()", arguments);
      this.updateParq({
        fields: this.fields,
        user_id: this.member.id,
        questionnaire_id: this.parq.questionnaire?.id,
      })
        .then(({ message, data }) => {
          const parq = mapQuestionnaire(data);
          this.$emit("done", parq);
          this.$core.success(message);
          this.parq = parq;
        })
        .catch((error) => {
          this.$core.error(error, { title: this.$t("dialog.title.error") });
        });
    },
  },
  computed: {
    ...mapState(useAppStore, ["user"]),
    fields() {
      return this.parq.questionnaire?.fields || [];
    },
    disable() {
      return (
        this.requires.length > 0 ||
        JSON.stringify(this.parq) === JSON.stringify(this.defaultParq)
      );
    },
    requires() {
      return this.fields.filter(
        ({ config }) => config.required && !config.value
      );
    },
    noRequires() {
      return (
        this.fields.filter(({ config }) => config.skip && config.value).length >
        0
      );
    },
  },
  watch: {
    member: {
      deep: true,
      handler(val) {
        this.parq = {
          ...this.parq,
          ...val,
        };
      },
    },
  },
  async mounted() {
    if (this.member.parq) {
      this.parq = mapQuestionnaire(cloneDeep(this.member.parq));
    } else {
      await this.default().then((questionnaire) => {
        Object.assign(this.parq, {
          user: this.member,
          questionnaire,
        });
      });
    }
    this.defaultParq = cloneDeep(this.parq);
  },
};
</script>
