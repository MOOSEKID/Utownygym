<template>
  <draggable
    class="drag-area"
    tag="ul"
    :list="list"
    :group="{ name: 'list' }"
    :item-key="itemKey"
    @change="onChange"
  >
    <template #item="{ element, index }">
      <li class="list-item relative-position">
        <q-expansion-item group="list" class="border-all">
          <template v-slot:header>
            <q-item-section class="text-bold">
              {{ element.label }}
            </q-item-section>

            <q-item-section side>
              {{ element.type }}
            </q-item-section>
          </template>
          <q-card>
            <q-separator />
            <q-card-section>
              <div class="row q-col-gutter-md">
                <div class="col-sm-12 col-xs-12">
                  <div class="row q-col-gutter-md">
                    <div class="col-xs-12 col-sm-6">
                      <base-select
                        dense
                        outlined
                        v-model="element.type"
                        :prefix="$t('type')"
                        :options="['Page', 'Custom']"
                      />
                    </div>
                    <div class="col-xs-12 col-sm-6">
                      <base-select
                        v-if="element.type === 'Page'"
                        dense
                        outlined
                        use-input
                        option-label="title"
                        input-debounc="500"
                        :filter-method="getPage"
                        :placeholder="$t('selectAPage')"
                        @update:model-value="onSelectPage(element, $event)"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 col-xs-12">
                  <base-label :title="$t('url')" required />
                  <base-input
                    :readonly="element.type !== 'Custom'"
                    v-model="element.href"
                  />
                </div>
                <div class="col-sm-6 col-xs-12">
                  <base-label :title="$t('navigationLabel')" required />
                  <base-input v-model="element.label" />
                </div>
                <div class="col-xs-12">
                  <base-btn
                    link
                    :label="$t('remove')"
                    @click="onRemove(index)"
                    color="negative"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <nested-list
          class="drag-area--child"
          :item-key="itemKey"
          :list="element.items"
        />
      </li>
    </template>
  </draggable>
</template>
<script>
import { mapActions } from "pinia";
import { usePageStore } from "src/stores/page";
import Draggable from "vuedraggable";

export default {
  name: "nested-list",
  components: { Draggable },
  props: {
    list: {
      required: true,
      type: Array,
    },
    itemKey: String,
  },
  emits: ["update:list"],
  methods: {
    ...mapActions(usePageStore, { getPage: "get" }),
    onChange() {
      this.$emit("update:list", this.list);
    },
    onRemove(index) {
      const list = this.list;
      list.splice(index, 1);
      this.$emit("update:list", list);
    },
    onSelectPage(element, val) {
      Object.assign(element, {
        label: val?.title,
        href: val?.template ? "/" + val.template : "/pages/" + val?.slug,
      });
    },
  },
};
</script>
<style scoped lang="scss">
.drag-area {
  padding: 0;
  margin: 0;
  .list-item {
    list-style: none;
  }
  &.drag-area--child {
    padding-left: 20px;
  }
}
</style>
