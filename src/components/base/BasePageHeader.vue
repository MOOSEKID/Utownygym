<template>
  <div class="base-page-header">
    <div class="text-h5">{{ title }}</div>
    <slot name="hint">
      <div class="text-grey-8" v-html="hint"></div>
    </slot>
    <q-tabs
      v-if="!noTabsOrEmpty"
      :model-value="modelValue"
      @update:model-value="updateModelValue"
      active-color="primary"
      class="base-tabs"
      align="left"
      dense
    >
      <template v-if="useRoute">
        <q-route-tab
          v-for="(item, index) in visibleTabs"
          :key="index"
          :to="{ name: item.route }"
          :label="item.label"
          no-caps
        />
      </template>
      <template v-else>
        <q-tab
          v-for="(item, index) in visibleTabs"
          :key="index"
          :name="item.value"
          :label="item.label"
          no-caps
        />
      </template>
      <base-btn-dropdown
        v-if="hasAdditionalActions"
        auto-close
        stretch
        flat
        label="More..."
      >
        <q-list>
          <q-item
            v-for="(item, index) in additionalActions"
            :key="index"
            clickable
            @click="onClickAction(item)"
            :to="{ name: item.route }"
          >
            <q-item-section>{{ item.label }}</q-item-section>
          </q-item>
        </q-list>
      </base-btn-dropdown>
    </q-tabs>
    <q-separator v-show="useSeparator" :class="{ 'q-mt-sm': noTabsOrEmpty }" />
  </div>
</template>

<script>
import { computed } from "vue";
import { useQuasar } from "quasar";

const toSlug = (val) => {
  return val
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

export default {
  props: {
    modelValue: String,
    title: String,
    hint: String,
    useSeparator: {
      type: Boolean,
      default: true,
    },
    tabs: Array,
    noTabs: Boolean,
    useRoute: Boolean,
  },
  setup(props, { emit }) {
    const $q = useQuasar();
    const updateModelValue = (value) => {
      emit("update:model-value", value);
    };

    const onClickAction = (action) => {
      if (!props.useRoute) {
        updateModelValue(action.value);
      }
    };

    const computedTabs = computed(() => {
      return props.tabs?.map((tab) => {
        if (typeof tab === "object") {
          return {
            ...tab,
            value: toSlug(tab?.label || ""),
          };
        } else {
          return {
            label: tab,
            value: toSlug(tab),
          };
        }
      });
    });

    const noTabsOrEmpty = computed(() => {
      return props.tabs?.length < 1 || props.noTabs;
    });

    const visibleTabs = computed(() => {
      if (noTabsOrEmpty.value) return [];
      if ($q.screen.xs) {
        return computedTabs.value.slice(0, 2);
      }
      return computedTabs.value;
    });

    const additionalActions = computed(() => {
      if (noTabsOrEmpty.value) return [];
      return computedTabs.value.slice(2, computedTabs.value.length);
    });

    const hasAdditionalActions = computed(() => {
      return additionalActions.value.length > 0 && $q.screen.xs;
    });

    return {
      updateModelValue,
      onClickAction,
      computedTabs,
      noTabsOrEmpty,
      visibleTabs,
      additionalActions,
      hasAdditionalActions,
    };
  },
};
</script>
