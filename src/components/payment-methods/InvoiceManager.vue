<template>
  <base-section
    flat
    bordered
    no-row
    :title="$t('invoices.historyTitle')"
    :description="$t('invoices.historyDesc')"
    class="invoice-manager"
  >
    <base-table
      :rowsPerPageOptions="[0]"
      :rows="invoices"
      :columns="columns"
      :no-data-label="$t('invoices.noData')"
      v-model:pagination="pagination"
      @request="onRequest"
      :loading="loading"
      hide-top
      has-actions
    >
      <template v-slot:body-cell-status="props">
        <base-status v-for="item in props.value" :type="item" :key="item" />
      </template>
      <template v-slot:actions="props">
        <base-btn
          link
          color="grey"
          :loading="props.row.loading"
          @click="onViewInvoice(props)"
          :label="$t('invoices.viewLabel')"
        />
      </template>
    </base-table>
  </base-section>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useSubscriptionStore } from "stores/subscription";
import PdfViewer from "components/PdfViewer.vue";

export default {
  props: {
    user: Object,
  },
  data() {
    return {
      loading: false,
      columns: [
        {
          name: "created_at",
          label: this.$t("label.date"),
          field: "created_at",
          format: this.$core.formatDateAsHuman,
          align: "left",
        },
        {
          name: "amount",
          label: this.$t("label.amount"),
          field: "amount",
          align: "left",
        },
        {
          name: "status",
          label: this.$t("label.status"),
          field: "status",
          format: (val) => val?.map((item) => item.label),
          align: "left",
        },
        {
          name: "actions",
          field: "actions",
          align: "right",
        },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10,
        loaded: false,
      },
    };
  },
  methods: {
    ...mapActions(useSubscriptionStore, [
      "getInvoices",
      "downloadInvoice",
      "setUser",
    ]),
    async onRequest(args) {
      console.func(
        "components/payment-methods/InvoiceManager:methods.onRequest()",
        arguments
      );
      this.loading = true;
      const { page, rowsPerPage } = args.pagination;
      await this.setUser(this.user);
      this.getInvoices({
        page,
        rowsPerPage,
      })
        .then((response) => {
          // update rowsCount with appropriate value
          this.pagination.rowsNumber = response.total;

          // don't forget to update local pagination object
          this.pagination.page = page;
          this.pagination.rowsPerPage = rowsPerPage;
          this.pagination.from = response.from;
          this.pagination.to = response.to;
          this.pagination.loaded = true;

          // ...and turn of loading indicator
          this.loading = false;
        })
        .catch((error) => {
          this.$emit("error", error);
        });
    },
    onViewInvoice(args) {
      console.func(
        "components/payment-methods/InvoiceManager:methods.onViewInvoice()",
        arguments
      );
      args.row.loading = true;
      this.downloadInvoice(args?.row.id)
        .then((data) => {
          args.row.loading = false;
          const blob = new Blob([data], { type: "application/pdf" });

          this.$q
            .dialog({
              component: PdfViewer,
              componentProps: {
                title: `Invoice-${args?.row.number}.pdf`,
                url: URL.createObjectURL(blob),
              },
            })
            .onOk((payload) => {
              URL.revokeObjectURL(payload);
            });
        })
        .catch((error) => {
          args.row.loading = false;
          this.$core.error(error, { title: this.$t("dialog.title.error") });
        });
    },
  },
  computed: {
    ...mapState(useSubscriptionStore, ["invoices"]),
  },
};
</script>
