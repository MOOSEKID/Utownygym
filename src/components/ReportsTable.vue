<template>
  <base-table
    :module="module"
    :columns="columns"
    :rows="rows"
    :loading="loading"
    :pagination="pagination"
    @request="onRequest"
    :no-data-label="$t('members.noData')"
    no-permissions
    :no-responsive="noResponsive"
    hide-top
    ref="members"
  >
    <template v-slot:header-cell-id="props">
      {{ props.col.label }}
      <q-btn
        flat
        round
        color="primary"
        icon="fas fa-file-csv"
        @click="onExport"
        dense
        size="sm"
      />
    </template>
    <template v-slot:body-cell-user_name="props">
      <base-btn
        @click.stop
        link
        size="12px"
        tag="a"
        :to="{
          name: 'Member',
          params: {
            id: props.row.user_id,
          },
          query: {
            action: 'edit',
          },
        }"
      >
        {{ props.value }}
      </base-btn>
    </template>
    <template v-slot:body-cell-plan_label="props">
      <base-btn
        @click.stop
        link
        size="12px"
        tag="a"
        :to="{
          name: 'Plan',
          params: {
            id: props.row?.plan_id,
          },
          query: {
            action: 'edit',
          },
        }"
      >
        {{ props.value }}
      </base-btn>
    </template>
    <template v-slot:body-cell-status="props">
      <base-status v-if="props.value" :type="props.value" />
    </template>
  </base-table>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useMemberStore } from "stores/member";
import { useMemberReportStore } from "stores/member-report";

export default {
  props: {
    year: [String, Number],
    month: [String, Number],
    day: [String, Number],
    type: String,
    noResponsive: Boolean,
  },
  data() {
    return {
      loading: false,
      loaded: false,
      pagination: {
        sortBy: "created_at",
        descending: false,
        page: 1,
        filter: "",
        deleted: false,
        rowsPerPage: 15,
        rowsNumber: 15,
        loaded: false,
        year: this.year,
        month: this.month,
        day: this.day,
        type: this.type,
      },
      columns: [
        {
          name: "id",
          align: "left",
          label: this.$t("subscriptionId"),
          field: "id",
          style: "width: 40px",
          sortable: true,
        },
        {
          name: "user_name",
          align: "left",
          label: this.$t("label.name"),
          field: "user_name",
          style: "width: 40px",
          sortable: true,
        },
        {
          name: "plan_label",
          align: "left",
          label: this.$t("label.plan"),
          field: "plan_label",
          style: "width: 250px; white-space: normal",
          sortable: true,
        },
        {
          name: "created_at",
          align: "left",
          label: this.$t("label.startsAt"),
          style: "width: 40px",
          field: "created_at",
          format: this.$core.formatAsDateOnly,
          sortable: true,
        },
        {
          name: "ends_at",
          align: "left",
          label: this.$t("label.endsAt"),
          style: "width: 40px",
          field: "ends_at",
          format: this.$core.formatAsDateOnly,
          sortable: true,
        },
        {
          name: "plan_price",
          align: "left",
          label: this.$t("label.renewalFee"),
          field: "plan_price",
          format: (val) => this.$core.money(val),
          style: "width: 40px",
          sortable: true,
        },
        {
          name: "total_paid",
          align: "left",
          label: this.$t("totalSpend"),
          field: "total_paid",
          format: (val) => this.$core.money(val),
          style: "width: 40px",
          sortable: true,
        },
        {
          name: "status",
          align: "left",
          label: this.$t("label.status"),
          field: "status",
          style: "width: 40px",
          sortable: true,
        },
      ],
      rows: [],
    };
  },
  methods: {
    ...mapActions(useMemberReportStore, ["get"]),
    onRequest(props) {
      console.func("components/MembersTable:methods.onRequest()", arguments);
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      this.loading = true;

      this.get({
        ...props.pagination,
        direction: descending ? "desc" : "asc",
      })
        .then(({ meta, data }) => {
          // clear out existing data and add new
          this.rows = data;
          // update rowsCount with appropriate value
          this.pagination.rowsNumber = meta.total;

          // don't forget to update local pagination object
          this.pagination.page = page;
          this.pagination.rowsPerPage = rowsPerPage;
          this.pagination.sortBy = sortBy;
          this.pagination.descending = descending;
          this.pagination.loaded = true;
          this.pagination.from = meta.from;
          this.pagination.to = meta.to;

          // ...and turn of loading indicator
          this.loading = false;
        })
        .catch((error) => {
          this.$core.error(error, { title: this.$t("dialog.title.error") });
        });
    },
    onExport() {
      console.func("components/MembersTable:methods.onExport()", arguments);
      this.$refs.members.onToolbarClicked({
        action: "export",
        type: "csv",
        method: this.get,
      });
    },
  },
  computed: {
    ...mapState(useMemberStore, ["module"]),
  },
};
</script>
