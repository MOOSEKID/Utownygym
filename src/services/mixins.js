import core from "./core";
import { sumBy, cloneDeep } from "lodash";
import OpeningTimes from "components/settings/OpeningTimes.vue";
import BillingInformation from "components/settings/BillingInformation.vue";
import MailConfig from "components/settings/MailConfig.vue";
import AppTheme from "components/settings/AppTheme.vue";
import AppAlert from "components/settings/AppAlert.vue";
import AppMenus from "components/settings/AppMenus.vue";
import AppSocials from "components/settings/AppSocials.vue";
import TermsConfig from "components/settings/TermsConfig.vue";
import SkeletonSinglePage from "components/skeleton/SkeletonSinglePage.vue";
import { useAppStore } from "src/stores/app";
import { mapState } from "pinia";

export const isEqualObject = (val, old) => {
  try {
    return JSON.stringify(val) === JSON.stringify(old);
  } catch (error) {
    return false;
  }
};

export const defaultPagination = {
  sortBy: "id",
  descending: true,
  page: 1,
  filter: "",
  deleted: false,
  rowsPerPage: 15,
  rowsNumber: 15,
  loaded: false,
};

export const SettingsMixins = {
  components: {
    OpeningTimes,
    BillingInformation,
    MailConfig,
    AppTheme,
    AppAlert,
    AppMenus,
    AppSocials,
    TermsConfig,
  },
};

export const useReportMixin = {
  methods: {
    getTotal(key, money = true) {
      const total = sumBy(cloneDeep(this.rows), (o) =>
        o[key] ? parseFloat(o[key]) : 0
      );
      if (money) return core.money(total);
      return total;
    },
  },
};

export const PageMixins = {
  components: {
    SkeletonSinglePage,
  },
  data() {
    return {
      loaded: false,
      submited: false,
      defaultData: {},
      formData: {},
      errors: {},
    };
  },
  methods: {
    onSubmit(props) {
      console.func("src/services/mixins:methods.onSubmit()", arguments);
      this.submited = true;
      const method = this.creating ? this.store : this.update;
      method(this.formData)
        .then(({ data, message }) => {
          this.submited = false;
          this.$q.notify(message);
          this.formData = data;
          this.defaultData = cloneDeep(data);
          this.$router.push({
            name: this.$route.name,
            params: {
              id: data.id,
            },
            query: {
              action: "edit",
            },
          });
        })
        .catch((error) => {
          this.submited = false;
          this.$core.error(error, { title: this.$t("dialog.title.error") });
        });
    },
    onReset(props) {
      console.func("src/services/mixins:methods.onReset()", arguments);
      this.loaded = false;
      this.$nextTick(() => {
        this.formData = cloneDeep(this.defaultData);
        this.loaded = true;
      });
    },
    onCancel(props) {
      console.func("src/services/mixins:methods.onCancel()", arguments);
      this.$router.go(-1);
    },
  },
  computed: {
    edit() {
      return ["add", "edit"].includes(this.action) || this.id === "add";
    },
    creating() {
      return this.id === "add";
    },
    id() {
      return this.$route.params.id;
    },
    action() {
      return this.$route.query.action;
    },
    disable() {
      return isEqualObject(this.formData, this.defaultData);
    },
    resetable() {
      return !isEqualObject(this.formData, this.defaultData);
    },
  },
};

export const ResourcesPageMixins = {
  data() {
    return {
      loading: false,
      loaded: false,
      selected: [],
      pagination: { ...defaultPagination },
    };
  },
  methods: {
    onRequest(props) {
      console.func("src/services/mixins:methods.onRequest()", arguments);
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      this.pagination = props.pagination;
      this.loading = true;

      this.get({
        ...this.queryParams,
        direction: descending ? "desc" : "asc",
      })
        .then(({ meta }) => {
          // clear out existing data and add new
          // this.rows = this.tableData;
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
    async actionClicked(action, row) {
      console.func("src/services/mixins:methods.actionClicked()", arguments);
    },
    async toolbarClicked(action, row) {
      console.func("src/services/mixins:methods.toolbarClicked()", arguments);
    },
    async rowClicked(evt, row) {
      console.func("src/services/mixins:methods.rowClicked()", arguments);
      if (typeof this.singleRoute === "function") {
        this.$router.push(this.singleRoute(row));
      }
    },
  },
  computed: {
    ...mapState(useAppStore, ["guard"]),
    queryParams() {
      return { ...this.pagination };
    },
    isAdmin() {
      return this.guard === "admins";
    },
  },
};

import FormAddress from "components/form-fields/FormAddress.vue";
import FormCheckbox from "components/form-fields/FormCheckbox.vue";
import FormDate from "components/form-fields/FormDate.vue";
import FormEmail from "components/form-fields/FormEmail.vue";
import FormFile from "components/form-fields/FormFile.vue";
import FormInput from "components/form-fields/FormInput.vue";
import FormLabel from "components/form-fields/FormLabel.vue";
import FormName from "components/form-fields/FormName.vue";
import FormNumber from "components/form-fields/FormNumber.vue";
import FormRadio from "components/form-fields/FormRadio.vue";
import FormSelect from "components/form-fields/FormSelect.vue";
import FormTextarea from "components/form-fields/FormTextarea.vue";
import FormUrl from "components/form-fields/FormUrl.vue";
import FormFields from "components/form-fields/FormFields.vue";

export const FromFields = {
  components: {
    FormAddress,
    FormCheckbox,
    FormDate,
    FormEmail,
    FormFile,
    FormInput,
    FormLabel,
    FormName,
    FormNumber,
    FormRadio,
    FormSelect,
    FormTextarea,
    FormUrl,
    FormFields,
  },
};
