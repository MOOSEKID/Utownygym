<template>
  <q-select
    ref="baseSelect"
    class="base-select"
    :hide-selected="autoComplete"
    :hide-dropdown-icon="hideDropdownIcon || autoComplete"
    :fill-input="autoComplete"
    :model-value="modelValue"
    :placeholder="placeholder"
    :options="localOptions"
    :bgColor="bgColor"
    :useChips="useChips"
    :useInput="useInput || autoComplete"
    :multiple="multiple"
    :mapOptions="mapOptions"
    :inputDebounce="inputDebounce"
    :debounce="debounce"
    :newValueMode="newValueMode"
    :optionLabel="optionLabel"
    :optionValue="optionValue"
    :optionsDense="optionsDense"
    :loading="loading"
    :popup-content-class="popupContentClass"
    @update:model-value="onChange"
    @new-value="onNewValue"
    @input-value="onInputValue"
    @clear="clear"
    @virtual-scroll="onScroll"
    @filter="onFilter"
  >
    <template v-if="icon" v-slot:prepend>
      <q-icon size="xs" :name="icon" />
    </template>
    <template v-if="!useInput && showPlaceholder" v-slot:selected>
      <div class="text-grey-8">{{ placeholder }}</div>
    </template>
    <template v-if="useFilter" v-slot:before-options>
      <slot name="before-options">
        <q-input
          class="base-dropdown-filter q-mb-sm"
          @update:model-value="onInput"
          :placeholder="$t('placeholder.search')"
          dense
          outlined
          v-model="filterVal"
          type="text"
          input-debounce="500"
          debounce="500"
          autofocus
          bg-color="white"
        >
          <template v-slot:prepend>
            <q-icon size="xs" name="fal fa-search" />
          </template>
          <template v-if="canCreate && filterVal" v-slot:append>
            <q-btn
              icon="control_point"
              size="sm"
              color="positive"
              flat
              round
              dense
              @click="onCreate"
            />
          </template>
        </q-input>
      </slot>
    </template>
    <template v-slot:after-options>
      <slot name="after-options"></slot>
      <slot name="button" v-bind:onCreate="onCreate">
        <template v-if="canCreate && filterVal">
          <q-item dense class="q-pa-none">
            <q-item-section>
              <q-btn
                flat
                no-caps
                dense
                class="add-button"
                align="left"
                icon="fad fa-plus-circle"
                :label="$t('addFilter', { filter: filterVal })"
                @click="onCreate"
              />
            </q-item-section>
          </q-item>
        </template>
      </slot>
    </template>
    <template v-slot:no-option>
      <slot name="no-option">
        <q-input
          v-if="useFilter"
          class="q-mb-sm base-dropdown-filter"
          @update:model-value="onInput"
          :placeholder="$t('placeholder.search')"
          dense
          outlined
          v-model="filterVal"
          type="text"
          input-debounce="500"
          debounce="500"
        >
          <template v-slot:prepend>
            <q-icon size="xs" name="fal fa-search" />
          </template>
        </q-input>
        <q-item
          v-if="!hideNoOption || noAdd"
          v-close-popup
          clickable
          class="no-options"
        >
          <q-item-section class="text-grey">
            {{ noOptionMessage }}
          </q-item-section>
        </q-item>
      </slot>
      <slot name="button" v-bind:onCreate="onCreate">
        <template v-if="canCreate && filterVal && !noAdd">
          <q-item dense class="q-pa-none">
            <q-item-section>
              <q-btn
                flat
                no-caps
                class="add-button"
                align="left"
                icon="fad fa-plus-circle"
                :label="$t('addFilter', { filter: filterVal })"
                @click="onCreate"
              />
            </q-item-section>
          </q-item>
        </template>
      </slot>
    </template>
    <template v-for="slot in scopedSlots" v-slot:[slot]="props">
      <slot :name="slot" v-bind="props" v-bind:props="props"></slot>
    </template>
  </q-select>
</template>

<script>
import { Cookies, LocalStorage } from "quasar";

const validateNewValueMode = (v) => ["add", "add-unique", "toggle"].includes(v);

const excludes = [
  "prepend",
  "selected",
  "before-options",
  "after-options",
  "no-option",
];

export default {
  props: {
    modelValue: {},
    filterMethod: Function,
    placeholder: String,
    cacheKey: String,
    mapOptions: {
      required: false,
      type: [Boolean],
      default: true,
    },
    optionsDense: {
      required: false,
      type: [Boolean],
      default: true,
    },
    icon: {
      required: false,
      type: [String, Boolean],
      default: false,
    },
    noOptionMessage: {
      required: false,
      type: [String],
      default: "No option found.",
    },
    useInput: Boolean,
    useChips: Boolean,
    hideNoOption: Boolean,
    noAdd: Boolean,
    newValueMode: {
      type: String,
      validator: validateNewValueMode,
    },
    onNewValue: Function,
    autoComplete: Boolean,
    noAutoCompleteEmit: Boolean,
    preventDefault: Boolean,
    hideDropdownIcon: Boolean,
    useFilter: Boolean,
    options: Array,
    optionValue: [Function, String],
    optionLabel: [Function, String],
    optionDisable: [Function, String],
    query: {
      required: false,
      type: [Function],
      default: () => (val) => {
        return {
          filter: val,
          rowsPerPage: 10,
          active: true,
          page: 1,
        };
      },
    },
    multiple: Boolean,
    useCache: Boolean,
    bgColor: String,
    inputDebounce: {
      type: [Number, String],
      default: 500,
    },
    debounce: {
      type: [Number, String],
      default: 500,
    },
    requiredQueryKeys: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:model-value", "new-value", "complete"],
  data() {
    return {
      localOptions: this.options || [],
      filterVal: "",
      loading: false,
      currentPage: 0,
      lastPage: 1,
    };
  },
  methods: {
    onFilter(val, update, abort) {
      console.func("components/base/BaseSelect:methods.onFilter()", arguments);
      if (!this.filterMethod) return update();
      if (this.requiredQueryKeys.length) {
        const query = this.query(val);
        const emptyKeys = Object.keys(query).filter(
          (item) => this.requiredQueryKeys.includes(item) && !query[item]
        );
        if (emptyKeys.length) {
          return abort();
        }
      }
      this.filterVal = val;
      if (this.hasCacheValue()) {
        return update(() => {
          const { data, page } = LocalStorage.getItem(this.cacheKey);
          this.currentPage = page;
          const needle = val.toLowerCase();
          this.localOptions = data.filter((v) => {
            const label =
              typeof this.optionLabel === "function"
                ? this.optionLabel(v)
                : v[this.optionLabel];
            return (label || "").toLowerCase().indexOf(needle) > -1;
          });
        });
      }
      this.filterMethod(this.query(val))
        .then(({ data, meta }) => {
          update(() => {
            this.currentPage = meta?.current_page;
            this.lastPage = meta?.last_page;
            this.localOptions = data;
          });
        })
        .catch(() => {
          abort();
        });
    },
    onInput(val) {
      console.func("components/base/BaseSelect:methods.onInput()", arguments);
      this.filter(val);
    },
    onChange(val) {
      console.func("components/base/BaseSelect:methods.onChange()", arguments);
      this.$emit("update:model-value", val);
      const raw = this.localOptions.find(
        (item) => this.optionValue && item[this.optionValue] === val
      );
      if (raw) {
        this.$emit("complete", raw);
      }
    },
    onCreate() {
      console.func("components/base/BaseSelect:methods.onCreate()", arguments);
      if (this.onNewValue !== void 0) {
        this.$emit("new-value", this.filterVal, this.done);
      } else {
        this.done(this.filterVal);
      }
      this.updateInputValue("", true);
      this.hidePopup();
    },
    onInputValue(val) {
      if (this.autoComplete && !this.noAutoCompleteEmit) {
        this.$emit("update:model-value", val);
      }
    },
    onScroll({ to, ref }) {
      console.func("components/base/BaseSelect:methods.onScroll()", arguments);
      if (!this.filterMethod) return false;
      if (this.hasCacheValue()) return false;
      const lastIndex = this.localOptions.length - 1;
      if (
        this.loading !== true &&
        this.currentPage < this.lastPage &&
        to === lastIndex
      ) {
        this.loading = true;
        this.currentPage++;
        this.filterMethod({
          ...this.query(this.filterVal),
          page: this.currentPage,
        }).then(({ data, meta }) => {
          data.forEach((element) => {
            this.localOptions.push(element);
          });
          this.$nextTick(() => {
            this.currentPage = meta?.current_page;
            this.lastPage = meta?.last_page;
            ref.refresh();
            this.loading = false;
            if (this.cacheKey && this.currentPage === this.lastPage) {
              Cookies.set(this.cacheKey, true, {
                expires: "5m",
                path: "/",
              });
              LocalStorage.set(this.cacheKey, {
                page: this.currentPage,
                data: this.localOptions,
              });
            }
          });
        });
      }
    },
    clear() {
      console.func("components/base/BaseSelect:methods.clear()", arguments);
      this.$emit("update:model-value", undefined);
    },
    done(val, mode) {
      if (mode) {
        if (validateNewValueMode(mode) !== true) {
          return;
        }
      } else {
        mode = this.newValueMode;
      }

      if (val === void 0 || val === null) {
        return;
      }

      this.updateInputValue("", true);

      const fn = mode === "toggle" ? this.toggleOption : this.add;
      fn(val, mode === "add-unique");
      if (this.multiple !== true) {
        this.focus();
        this.hidePopup();
      }
    },
    hasCacheValue() {
      return Cookies.has(this.cacheKey) && LocalStorage.has(this.cacheKey);
    },
  },
  computed: {
    scopedSlots() {
      return Object.keys(this.$slots).filter((item) =>
        excludes.every((exclude) => exclude !== item)
      );
    },
    showPlaceholder() {
      return (
        (!this.hasValue && !this.useChips) ||
        !this.hasValue ||
        (this.multiple && this.modelValue.length < 1)
      );
    },
    hasValue() {
      return this.modelValue !== undefined;
    },
    canCreate() {
      return this.onNewValue !== void 0 || this.newValueMode;
    },
    popupContentClass() {
      let classes = "q-pa-sm base-dropdown";
      if (this.useFilter) {
        classes += " custom-filter";
      }
      return classes;
    },
  },
  mounted() {
    Object.assign(this, {
      add: this.$refs.baseSelect.add,
      filter: this.$refs.baseSelect.filter,
      focus: this.$refs.baseSelect.focus,
      reset: this.$refs.baseSelect.reset,
      showPopup: this.$refs.baseSelect.showPopup,
      hidePopup: this.$refs.baseSelect.hidePopup,
      toggleOption: this.$refs.baseSelect.toggleOption,
      updateInputValue: this.$refs.baseSelect.updateInputValue,
    });
  },
};
</script>

<style lang="scss">
// .base-dropdown.custom-filter {
//   .base-dropdown-filter {
//     position: fixed;
//     padding: 0;
//     z-index: 1;
//     margin-top: -8px;
//     padding-top: 8px;
//     background: white;
//     .q-input {
//       width: 240px;
//     }
//   }
//   .q-virtual-scroll__content {
//     margin-top: 50px;
//   }
// }
</style>
