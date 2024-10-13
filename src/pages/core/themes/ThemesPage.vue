<template>
  <q-page padding>
    <base-page-header
      no-tabs
      :title="$t('manageYourThemes')"
      :hint="$t('manageAndPresence')"
      class="q-pb-md"
    />
    <base-section flat bordered>
      <div
        :key="index"
        v-for="(item, index) in rows"
        class="col-xs-12 col-sm-4 col-lg-3"
      >
        <q-card bordered flat class="themes-card">
          <div class="preview-container overflow-hidden">
            <responsive-iframe :src="item.preview" />
          </div>
          <q-card-section>
            <div class="row">
              <div class="col">
                <div class="text-subtitle2">
                  {{ item.name }}
                  <q-badge v-if="item.active" label="Active" />
                </div>
              </div>
              <div class="col col-auto">
                <base-btn
                  dense
                  color="grey"
                  icon="fas fa-ellipsis-vertical"
                  flat
                  round
                >
                  <q-menu anchor="bottom right" self="top right">
                    <q-list class="q-pa-sm" style="min-width: 100px">
                      <base-item
                        dense
                        icon="fad fa-code"
                        link
                        :to="{
                          name: 'Theme Editor',
                          params: { name: item.key },
                        }"
                        label="Customize"
                      />
                      <base-item
                        dense
                        icon="fad fa-clone"
                        label="Clone"
                        @click.stop="onClone(item)"
                      />
                      <base-item
                        v-show="!item.active"
                        dense
                        icon="fad fa-circle-check"
                        label="Activate"
                        @click.stop="onActivate(item)"
                      />
                      <base-item
                        dense
                        icon="fad fa-trash-can"
                        class="text-negative"
                        color="negative"
                        label="Remove"
                        v-show="!item.active"
                        @click.stop="onRemove(item)"
                      />
                    </q-list>
                  </q-menu>
                </base-btn>
              </div>
            </div>
            <div class="text-grey">Version: v{{ item.version }}</div>
            <div class="text-grey">
              Last updated: {{ $core.formatDateAsHuman(item.modified_at) }}
            </div>
            <div class="q-mt-sm">
              {{ item.description }}
            </div>
          </q-card-section>
        </q-card>
      </div>
      <template v-if="!loaded" #skeleton>
        <base-section-skeleton />
      </template>
    </base-section>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useThemeStore } from "src/stores/themes";
import ResponsiveIframe from "src/components/ResponsiveIframe.vue";
import BaseSectionSkeleton from "src/components/skeleton/BaseSectionSkeleton.vue";

export default {
  components: { ResponsiveIframe, BaseSectionSkeleton },
  data() {
    return {
      loaded: false,
    };
  },
  methods: {
    ...mapActions(useThemeStore, ["get", "active", "clone", "delete"]),
    onLoad() {
      this.get()
        .then(() => {
          this.loaded = true;
        })
        .catch((err) => {
          this.$core.error(err);
        });
    },
    onClone(theme) {
      this.clone(theme.key)
        .then(() => {
          this.onLoad();
        })
        .catch((err) => {
          this.$core.error(err);
        });
    },
    onActivate(theme) {
      this.active(theme.key)
        .then(() => {})
        .catch((err) => {
          this.$core.error(err);
        });
    },
    onRemove(theme) {
      this.delete(theme.key)
        .then(() => {
          this.onLoad();
        })
        .catch((err) => {
          this.$core.error(err);
        });
    },
  },
  mounted() {
    this.onLoad();
  },
  computed: {
    ...mapState(useThemeStore, ["rows"]),
  },
};
</script>
