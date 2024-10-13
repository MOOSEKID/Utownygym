<template>
  <q-page padding>
    <div class="q-gutter-y-lg">
      <base-section
        :title="greeting"
        :description="$t('fitnessQuote')"
        flat
        bordered
        class="modules"
      >
        <div
          v-for="item in modules"
          :key="item.id"
          :class="item?.col || 'col-xs-6 col-sm-2'"
        >
          <base-btn
            class="full-width"
            :icon="icon(item)"
            :label="item.label"
            :to="toRoute(item)"
            @click="item?.action"
            stack
            outline
            padding="20px 10px"
            size="md"
          >
            <q-badge v-if="item.notification" color="negative" floating>
              {{ item.notification }}
            </q-badge>
          </base-btn>
        </div>
      </base-section>
      <base-section
        :title="$t('label.classSchedules')"
        :description="$t('manageClassSchedules')"
        no-row
        flat
        bordered
        class="user-class-schedules"
      >
        <user-class-schedules-calendar :module-id="user.id" />

        <template #bottom>
          <div class="text-left">
            <base-btn
              color="primary"
              label="View all"
              link
              to="/user/classes/booked"
            />
          </div>
        </template>
      </base-section>
    </div>
  </q-page>
</template>

<script>
import { mapState } from "pinia";
import QrCodeDialog from "src/components/QrCodeDialog.vue";
import UserClassSchedulesCalendar from "src/components/UserClassSchedulesCalendar.vue";
import { useAppStore } from "stores/app";

export default {
  components: { UserClassSchedulesCalendar },
  methods: {
    showQrCode() {
      console.log("src/pages/IndexPage:methods.showQrCode()", arguments);
      this.$q.dialog({
        component: QrCodeDialog,
      });
    },
    icon(item) {
      return item.icon.replace("fas", "fad");
    },
    toRoute(item) {
      return item.url ? "/user/" + item.url : "";
    },
  },
  computed: {
    ...mapState(useAppStore, ["user", "greeting"]),
    modules() {
      return [
        {
          id: 1,
          label: this.$t("label.messages"),
          icon: "fad fa-message-quote",
          url: "enquiries",
          notification: this.user.unread_enquiries,
        },
        {
          id: 2,
          label: this.$t("label.bookAClass"),
          icon: "fad fa-book-sparkles",
          url: "classes/bookable",
        },
        {
          id: 8,
          col: "col-xs-12 col-sm-2",
          label: this.$t("label.memberCard"),
          icon: "fad fa-id-card",
          action: this.showQrCode,
        },
      ];
    },
  },
};
</script>
<style lang="scss">
.modules {
  .q-icon {
    font-size: 35px;
    margin-bottom: 5px;
  }
}
</style>
