<template>
  <q-page padding>
    <base-page-header
      no-tabs
      :title="$t('checkInHistory')"
      :hint="$t('hint.hereYouActivity')"
    />
    <base-section class="q-mt-md" flat bordered no-row>
      <base-table
        :columns="columns"
        :rows="rows"
        :toolbar="toolbar"
        :loading="loading"
        :pagination="pagination"
        @request="onRequest"
      >
        <template #body-cell-type="props">
          <base-status :type="props.value" />
        </template>
      </base-table>
    </base-section>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useCheckinStore } from "../../stores/checkin";

export default {
  data() {
    return {
      loading: false,
      pagination: {
        sortBy: "created_at",
        descending: true,
        page: 1,
        filter: "",
        status: null,
        deleted: false,
        rowsPerPage: 15,
        rowsNumber: 15,
        loaded: false,
      },
      rows: [],
    };
  },
  methods: {
    ...mapActions(useCheckinStore, ["get"]),
    onRequest(props) {
      console.func(
        "pages/pages/users/CheckinHistoryPage:methods.onRequest()",
        arguments
      );
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      this.pagination = props.pagination;
      this.loading = true;

      this.get({
        ...props.pagination,
        direction: descending ? "desc" : "asc",
      })
        .then(({ data }) => {
          // clear out existing data and add new
          this.rows = data;

          // updated the pagination
          this.pagination.page = page;
          this.pagination.rowsPerPage = rowsPerPage;
          this.pagination.sortBy = sortBy;
          this.pagination.descending = descending;
          this.pagination.loaded = true;

          // ...and turn of loading indicator
          this.loading = false;
        })
        .catch((error) => {
          this.$core.error(error, { title: this.$t("dialog.title.error") });
        });
    },
  },
  computed: {
    ...mapState(useCheckinStore, ["columns", "toolbar"]),
  },
};
</script>
