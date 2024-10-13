<template>
  <div class="blog-tag-select">
    <base-select
      popup-content-class="q-pa-sm base-dropdown"
      options-dense
      v-model="tags"
      placeholder="web development, seo, digital marketing"
      ref="tags"
      use-input
      map-options
      hide-selected
      input-debounce="500"
      debounce="500"
      option-label="label"
      option-value="label"
      dense
      outlined
      multiple
      :query="
        (val) => ({
          filter: val,
          limit: 5,
          sortBy: 'label',
          options: true,
        })
      "
      :filter-method="get"
      @update:model-value="onChange"
      @new-value="createTag"
    >
      <template v-slot:option="{ itemProps, opt, toggleOption, selected }">
        <q-item v-bind="itemProps">
          <q-item-section style="min-width: auto" avatar>
            <q-checkbox
              dense
              :model-value="selected"
              @update:model-value="toggleOption(opt)"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <span v-html="opt.label"></span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </base-select>
    <div v-if="tags" class="q-mt-sm">
      <base-tags v-model="tags" dense removable square @remove="removeTag" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useBlogTagStore } from "src/stores/blog/tag";

export default {
  props: {
    modelValue: {
      required: true,
    },
  },
  emits: ["update:model-value"],
  data() {
    return {
      tags: this.modelValue,
      options: [],
    };
  },
  methods: {
    ...mapActions(useBlogTagStore, ["get"]),
    createTag(val, done) {
      console.func("components/BlogTagSelect:methods.createTag()", arguments);
      if (val.length > 0) {
        const tags = (this.tags || []).slice();
        val
          .split(/[,;|]+/)
          .map((v) => v.trim().toLowerCase())
          .filter((v) => v.length > 0)
          .forEach((v) => {
            if (!tags.find((item) => item.label === v)) {
              tags.push({
                label: v,
              });
            }
          });
        done(null);
        this.tags = tags;
        this.$emit("update:model-value", this.tags);
        // this.$refs.tags.updateInputValue("", true);
        // this.$refs.tags.hidePopup();
      }
    },
    removeTag(index) {
      console.func("components/BlogTagSelect:methods.removeTag()", arguments);
      this.tags.splice(index, 1);
      this.$emit("update:model-value", this.tags);
    },
    onChange(val) {
      console.func("components/BlogTagSelect:methods.onChange()", arguments);
      this.$emit("update:model-value", val);
    },
  },
  watch: {
    modelValue: {
      deep: true,
      handler(val) {
        this.tags = val;
      },
    },
  },
};
</script>
