<template>
  <q-page padding>
    <settings-page-header
      class="q-pb-md"
      :title="$t('questionnaires')"
      back-route="Questionnaires"
      :hint="
        $t(
          'effortlesslyManageYourQuestionnairesInTheSettingsSectionForATailoredAndSeamlessExperience'
        )
      "
    >
      <template #action>
        <form-fields @add="onAdd" />
      </template>
    </settings-page-header>
    <q-drawer
      side="right"
      ref="settings"
      bordered
      :width="300"
      class="bg-white from-field-drawer"
    >
      <q-toolbar class="bg-primary text-white">
        <q-btn size="sm" flat round dense icon="fas fa-tools" />
        <q-toolbar-title class="text-subtitle2 text-capitalize">
          {{ field.label }}
        </q-toolbar-title>
        <q-btn
          @click="$refs.settings.hide()"
          size="sm"
          flat
          round
          dense
          icon="fal fa-times"
          class="q-mr-xs"
        />
      </q-toolbar>
      <q-scroll-area :thumb-style="thumbStyle" :bar-style="barStyle">
        <div class="q-pa-md q-gutter-y-md">
          <div class="">
            <base-label class="text-uppercase">
              {{ $t("fieldLabel") }}
            </base-label>
            <base-input v-model="field.label" />
          </div>
          <div class="">
            <base-label class="text-uppercase">
              {{ $t("fieldSize") }}
            </base-label>
            <base-select
              square
              dense
              outlined
              use-input
              emit-value
              map-options
              v-model="field.config.width"
              :options="[
                { label: 'Small', value: 3 },
                { label: 'Medium', value: 6 },
                { label: 'Large', value: 9 },
                { label: 'Full width', value: 12 },
              ]"
            />
          </div>
          <div class="">
            <base-label class="text-uppercase">{{
              $t("description")
            }}</base-label>
            <base-input v-model="field.description" type="textarea" rows="4" />
          </div>
          <div v-if="hasOption(field.type)" class="">
            <base-label class="text-uppercase">{{ $t("options") }}</base-label>
            <draggable
              ghost-class="ghost-item"
              :list="field.options"
              :group="{ name: 'options' }"
              item-key="value"
              class="q-gutter-y-sm"
            >
              <template #item="{ element, index }">
                <q-item dense class="q-px-none">
                  <q-item-section style="min-width: auto" avatar>
                    <q-icon name="menu" />
                  </q-item-section>
                  <q-item-section>
                    <base-input
                      v-model="element.label"
                      @update:model-value="(val) => (element.value = val)"
                    />
                  </q-item-section>
                  <q-item-section v-if="field.options.length > 1" side>
                    <q-item-label>
                      <base-btn
                        dense
                        flat
                        color="grey"
                        icon="fas fa-trash-can"
                        @click="field.options.splice(index, 1)"
                      />
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <template #footer>
                <div class="q-mt-sm full-width">
                  <base-btn
                    dense
                    outline
                    color="primary"
                    class="full-width"
                    icon="add"
                    label="Add Option"
                    @click="
                      field.options.push({
                        label: `Option ` + field.options.length,
                        value: `Option ` + field.options.length,
                      })
                    "
                  />
                </div>
              </template>
            </draggable>
          </div>
          <div v-if="hasPlaceholder(field.type)" class="">
            <base-label class="text-uppercase">{{
              $t("placeholderText")
            }}</base-label>
            <base-input v-model="field.config.placeholder" />
          </div>
          <div class="">
            <base-label class="text-uppercase">{{
              $t("cssClasses")
            }}</base-label>
            <base-input
              placeholder="i.e q-pa-sm"
              v-model="field.config.classes"
            />
          </div>
          <div v-if="hasPlaceholderOrOption(field.type)" class="">
            <q-toggle
              dense
              v-model="field.config.hideLabel"
              :label="$t('hideLabel')"
              color="green"
            />
          </div>
          <div v-if="hasPlaceholderOrOption(field.type)" class="">
            <q-toggle
              dense
              v-model="field.config.required"
              :label="$t('required')"
              color="green"
            />
          </div>
        </div>
      </q-scroll-area>
      <div class="q-pa-md">
        <base-btn
          outline
          color="negative"
          class="full-width"
          icon="fas fa-trash-can"
          :label="$t('removeField')"
          @click="onRemove(field.key)"
        >
        </base-btn>
      </div>
    </q-drawer>
    <base-form
      v-if="loaded"
      @submit="onSubmit"
      @cancel="onCancel"
      @reset="onReset"
      :resetable="resetable"
    >
      <div class="q-gutter-md">
        <base-section bordered title="General information">
          <div class="col-xs-12 col-sm-12">
            <base-label>{{ $t("name") }}</base-label>
            <q-input dense outlined v-model="formData.name" type="text" />
          </div>
          <div class="col-xs-12 col-sm-12">
            <base-label>{{ $t("fields") }}</base-label>
            <div class="fields-container">
              <draggable
                ghost-class="ghost-item"
                class="row q-col-gutter-md"
                :list="formData.fields"
                :group="{ name: 'fields', put: ['fields'], pull: true }"
                item-key="id"
              >
                <template #item="{ element, index }">
                  <div
                    :class="`col-sm-${element.config?.width || 6} col-xs-12`"
                    :key="index"
                    @click="onClick(element)"
                  >
                    <div
                      class="form-field-container cursor-pointer q-pa-md bg-grey-3"
                    >
                      <component
                        :is="`form-${element.type}`"
                        readonly
                        :model-value="element.config.value"
                        v-bind="element"
                      />
                    </div>
                  </div>
                </template>
                <template #footer>
                  <div class="footer full-width from-fields">
                    <form-fields @add="onAdd" />
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </base-section>
      </div>
    </base-form>
    <skeleton-single-page v-else />
  </q-page>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { uid } from "quasar";
import { cloneDeep } from "lodash";
import SkeletonSinglePage from "components/skeleton/SkeletonSinglePage.vue";
import { useQuestionnaireStore } from "stores/questionnaire";
import { PageMixins, FromFields } from "services/mixins";
import Draggable from "vuedraggable";
import SettingsPageHeader from "src/components/SettingsPageHeader.vue";

const formData = {
  default: false,
  active: false,
  has_pdf: false,
  has_signature: false,
  send_email: false,
  fields: [],
};

export default {
  components: { SkeletonSinglePage, SettingsPageHeader, Draggable },
  mixins: [PageMixins, FromFields],
  data() {
    return {
      defaultData: cloneDeep(formData),
      formData: cloneDeep(formData),
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "grey",
        width: "5px",
        opacity: 0.35,
      },
      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "grey",
        width: "9px",
        opacity: 0.2,
      },
      field: {
        config: {},
      },
    };
  },
  methods: {
    ...mapActions(useQuestionnaireStore, ["show", "store", "update"]),
    onClick(args) {
      console.func(
        "pages/admins/settings/questionnaires/QuestionnairePage:methods.onClick()",
        arguments
      );
      this.field = args;
      this.$refs.settings.show();
    },
    onAdd(args) {
      console.func(
        "pages/admins/settings/questionnaires/QuestionnairePage:methods.onAdd()",
        arguments
      );
      this.formData.fields.push(
        Object.assign(cloneDeep(args), {
          key: uid(),
        })
      );
    },
    onReset(props) {
      console.func(
        "pages/admins/settings/questionnaires/QuestionnairePage:methods.onReset()",
        arguments
      );
      this.loaded = false;
      this.$nextTick(() => {
        this.formData = cloneDeep(this.defaultData);
        this.$refs.settings.hide();
        this.loaded = true;
      });
    },
    onRemove(key) {
      this.formData.fields = this.formData.fields.filter(
        (item) => item.key != key
      );
      this.$refs.settings.hide();
    },
    hasPlaceholder(component) {
      return ["input", "textarea"].includes(component);
    },
    hasOption(component) {
      return ["checkbox", "radio", "select"].includes(component);
    },
    hasPlaceholderOrOption(component) {
      return this.hasPlaceholder(component) || this.hasOption(component);
    },
  },
  mounted() {
    if (this.id !== "add") {
      this.show(this.id)
        .then((response) => {
          this.formData = response;
          this.defaultData = cloneDeep(response);
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
    ...mapState(useQuestionnaireStore, ["fields"]),
  },
};
</script>
