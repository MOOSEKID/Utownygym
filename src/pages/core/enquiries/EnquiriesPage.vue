<template>
  <q-page padding>
    <base-section flat bordered no-row>
      <base-table
        hide-label
        :store="store"
        :module="module"
        :actions="actions"
        :columns="getColumns"
        :rows="rows"
        :toolbar="getToolbar"
        :filters="filters"
        :loading="loading"
        :pagination="pagination"
        @request="onRequest"
        @toolbar-clicked="toolbarClicked"
        @row-clicked="rowClicked"
        :no-data-label="$t('enquiries.noData')"
        table-key="enquiries"
        selection="multiple"
        v-model:selected="selected"
        :grid-columns="['created_at,id,email,last_reply,status']"
      >
        <template v-slot:body-cell-id="props">
          <base-btn
            @click.stop
            link
            tag="a"
            align="left"
            :to="{
              name: 'Enquiry',
              params: {
                id: props.row.id,
              },
              query: {
                action: 'edit',
                title: props.row.subject || $t('contactUs'),
              },
            }"
            :style="props.col.style"
          >
            <div class="ellipsis">{{ props.value }}</div>
          </base-btn>
          <base-btn
            v-show="props.row.message"
            class="q-ml-xs"
            size="md"
            link
            color="black"
            icon="fal fa-align-left"
            @click.stop
          >
            <q-popup-proxy>
              <q-banner style="width: 350px">
                <base-label>{{ $t("label.message") }}</base-label>
                <span v-html="props.row.message"></span>
              </q-banner>
            </q-popup-proxy>
          </base-btn>
        </template>
        <template v-slot:body-cell-name="props">
          <template v-if="props.row.user">
            <base-btn
              @click.stop
              link
              size="12px"
              tag="a"
              :to="{
                name: 'Member',
                params: {
                  id: props.row.user.id,
                },
                query: {
                  action: 'edit',
                },
              }"
              :label="props.value"
            />
          </template>
          <template v-else>
            {{ props.value }}
          </template>
        </template>
        <template v-slot:body-cell-status="props">
          <base-status :type="props.value" />
        </template>
        <template v-slot:body-cell-is_archived="props">
          <q-checkbox
            @update:model-value="changeArchived(props.row)"
            size="sm"
            dense
            :model-value="props.row.is_archived"
            color="green"
          />
        </template>
        <template v-slot:body-cell-user_archived="props">
          <q-checkbox
            @update:model-value="changeUserArchived(props.row)"
            size="sm"
            dense
            :model-value="props.row.user_archived"
            color="green"
          />
        </template>
        <template v-slot:body-cell-last_reply="props">
          <span>{{ props.value }}</span>
          <base-btn
            v-show="props.row.last_reply"
            class="q-ml-sm"
            size="md"
            link
            color="black"
            icon="fal fa-align-left"
            @click.stop
          >
            <q-popup-proxy>
              <q-banner style="width: 350px">
                <base-label>{{ $t("lastMessage") }}</base-label>
                <span v-html="$core.nl2br(props.row.last_reply.message)"></span>
              </q-banner>
            </q-popup-proxy>
          </base-btn>
        </template>
      </base-table>
    </base-section>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useEnquiryStore } from "stores/enquiry";
import { ResourcesPageMixins, defaultPagination } from "src/services/mixins";

export default {
  mixins: [ResourcesPageMixins],
  data() {
    return {
      store: useEnquiryStore(),
      pagination: {
        ...defaultPagination,
        sortBy: "last_reply",
        status: this.$route.meta.status,
      },
    };
  },
  methods: {
    ...mapActions(useEnquiryStore, [
      "get",
      "changeArchived",
      "changeUserArchived",
    ]),
    singleRoute(row) {
      return {
        name: "Enquiry",
        params: {
          id: row.id,
        },
        query: {
          action: "edit",
          title: row.subject || "Contact us",
        },
      };
    },
  },
  computed: {
    ...mapState(useEnquiryStore, [
      "actions",
      "rows",
      "columns",
      "module",
      "toolbar",
      "filters",
    ]),
    getColumns() {
      return this.columns.filter((item) => item.guard.includes(this.guard));
    },
    getToolbar() {
      return this.toolbar.filter((item) => item.guard.includes(this.guard));
    },
  },
};
</script>
