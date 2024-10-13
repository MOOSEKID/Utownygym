<template>
  <div class="mail-config q-pb-md">
    <div v-if="loaded" class="q-pt-md row q-col-gutter-md">
      <div class="col-xs-12 col-sm-4">
        <base-section no-row flat bordered :title="$t('label.menus')">
          <q-list v-if="menus.length" bordered class="bordered">
            <q-item
              :active="item === current"
              v-for="(item, index) in menus"
              :key="index"
              clickable
              v-ripple
              @click="onSelectMenu(item)"
            >
              <q-item-section>{{ item }}</q-item-section>
              <q-item-section side>
                <base-btn
                  link
                  color="negative"
                  icon="fa fa-trash-can"
                  @click.stop="onRemoveMenu(item)"
                />
              </q-item-section>
            </q-item>
          </q-list>

          <q-item v-else>
            <q-item-section>
              <q-item-label>{{ $t("No menus") }}</q-item-label>
            </q-item-section>
          </q-item>

          <template #bottom>
            <base-btn
              color="primary"
              @click="onAddMenu"
              icon="fad fa-plus-circle"
              :label="$t('addMenu')"
            />
          </template>
        </base-section>
      </div>
      <div class="col-xs-12 col-sm-8">
        <base-section no-row flat bordered :title="$t('menuStructure')">
          <div class="menu-structure">
            <div v-if="!current">{{ $t("selectAEdit") }}</div>
            <nested-list item-key="id" v-model:list="items" />
          </div>
          <template #bottom>
            <base-btn
              :disable="!current"
              @click="onAddMenuItem"
              color="grey"
              icon="fad fa-plus-circle"
              :label="$t('addItem')"
              class="q-mr-md"
            />
            <base-btn
              :disable="!current"
              @click="$emit('save')"
              :loading="loading"
              color="primary"
              icon="fad fa-save"
              :label="$t('saveMenu')"
            />
          </template>
        </base-section>
      </div>
    </div>
    <base-section-skeleton v-else />
  </div>
</template>

<script>
import { mapActions } from "pinia";
import BaseSectionSkeleton from "../skeleton/BaseSectionSkeleton.vue";
import { usePageStore } from "src/stores/page";
import NestedList from "../NestedList.vue";

export default {
  components: { BaseSectionSkeleton, NestedList },
  props: {
    options: Object,
    loaded: Boolean,
    changed: Boolean,
    loading: Boolean,
  },
  data() {
    return {
      current: null,
      items: [],
    };
  },
  emits: ["update", "save"],
  methods: {
    ...mapActions(usePageStore, ["get"]),
    onChange(val, key) {
      console.func("components/settings/AppMenu:methods.onChange()", arguments);
      const options = this.options;
      options[key] = val;
      this.$emit("update", options);
    },
    onAddMenu() {
      const options = this.options;
      const length = Object.keys(this.options).length + 1;
      options[`menu-${length}`] = [];
      this.$emit("update", options);
    },
    onSelectMenu(item) {
      this.current = item;
      this.items = this.options[item];
    },
    onAddMenuItem() {
      this.items.push({
        id: this.$core.uid(),
        type: "Custom",
        items: [],
        label: "Menu",
        href: "#",
      });
    },
    onRemoveMenu(key) {
      this.$core.confirm(this.$t("restorationIsnTRemoval")).then(() => {
        const options = this.options;
        delete options[key];
        this.$emit("update", options);
        this.$emit("save");
      });
    },
  },
  computed: {
    menus() {
      return Object.keys(this.options);
    },
  },
};
</script>
