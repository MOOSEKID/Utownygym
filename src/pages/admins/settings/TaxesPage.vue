<template>
  <q-page padding>
    <settings-page-header
      class="q-mb-md"
      title="Taxes and duties"
      back-route="Settings"
      :hint="$t('hint.manageSalesTaxCollection')"
    >
      <template #action>
        <base-btn :label="$t('label.addTax')" @click="add" />
      </template>
    </settings-page-header>
    <base-section flat bordered no-row>
      <base-table
        ref="taxes"
        :columns="columns"
        :rows="rows"
        hide-top
        hide-pagination
        :rows-per-page-options="[0]"
        :loaded="loaded"
        has-actions
      >
        <template v-slot:section-body="props">
          <q-item-label class="q-mb-xs">
            {{ props.row.country }} ({{ props.row.state }})
          </q-item-label>
          <q-item-label caption>
            {{ props.row.label }} - {{ props.row.rate }}%
          </q-item-label>
        </template>
        <template v-slot:actions="props">
          <div class="q-gutter-xs">
            <q-btn
              @click.stop="onEdit(props)"
              size="sm"
              round
              flat
              color="warning"
              icon="fas fa-edit"
            />
            <q-btn
              @click.stop="onRemove(props)"
              size="sm"
              round
              flat
              color="grey"
              icon="fas fa-trash-can"
              :disable="props.row.removeable"
            />
          </div>
        </template>
      </base-table>
    </base-section>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "pinia";
import SettingsPageHeader from "src/components/SettingsPageHeader.vue";
import { useTaxStore } from "src/stores/taxes";

export default {
  data() {
    return {
      loaded: false,
    };
  },
  methods: {
    ...mapActions(useTaxStore, [
      "get",
      "store",
      "update",
      "delete",
      "add",
      "edit",
    ]),
    onEdit(args) {
      console.func(
        "components/settings/TaxesDialog:methods.onEdit()",
        arguments
      );
      this.edit(args);
    },
    onRemove({ row }) {
      console.func(
        "components/settings/TaxesDialog:methods.onRemove()",
        arguments
      );
      this.$core
        .confirm("Are you sure you want to delete this tax?")
        .then(() => {
          this.delete(row?.id);
        });
    },
  },
  computed: {
    ...mapState(useTaxStore, ["rows", "columns"]),
  },
  mounted() {
    this.get()
      .then(() => {
        this.loaded = true;
      })
      .catch((error) => {
        this.$core.error(error);
      });
  },
  components: { SettingsPageHeader },
};
</script>
