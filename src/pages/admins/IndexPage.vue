<template>
  <q-page padding>
    <div class="q-gutter-y-lg">
      <base-section :title="greeting" flat bordered class="modules">
        <div v-for="item in menuItems" :key="item.id" class="col-xs-6 col-sm-3">
          <base-btn
            class="full-width"
            :icon="icon(item)"
            :label="item.label"
            :to="toRoute(item)"
            stack
            outline
            padding="20px 10px"
            size="md"
          >
            <q-badge
              rounded
              class="text-bold"
              v-if="item.notification"
              color="negative"
              floating
            >
              {{ item.notification }}
            </q-badge>
          </base-btn>
        </div>
      </base-section>
      <div>
        <div class="row q-col-gutter-lg">
          <div class="col-xs-12 col-lg-2 col-sm-4">
            <new-members />
          </div>
          <div class="col-xs-12 col-lg-2 col-sm-4">
            <visits-today />
          </div>
          <div class="col-xs-12 col-lg-2 col-sm-4">
            <member-visits />
          </div>
          <div class="col-xs-12 col-lg-2 col-sm-4">
            <bookings-current-month />
          </div>
          <div class="col-xs-12 col-lg-2 col-sm-4">
            <online-bookings-current-month />
          </div>
          <div class="col-xs-12 col-lg-2 col-sm-4">
            <online-signups-current-month />
          </div>
        </div>
      </div>
      <div>
        <div class="row q-col-gutter-lg">
          <div class="col-xs-12 col-lg-4 col-sm-6">
            <base-section title="Revenue" no-row bordered flat>
              <revenue-breakdown />
            </base-section>
          </div>
          <div class="col-xs-12 col-lg-4 col-sm-6">
            <base-section title="Members" no-row bordered flat>
              <members-breakdown />
            </base-section>
          </div>
          <div class="col-xs-12 col-lg-4 col-sm-6">
            <base-section title="Checkin Logs" no-row bordered flat>
              <checkin-logs />
            </base-section>
          </div>
          <div class="col-xs-12 col-lg-6 col-sm-6">
            <base-section title="User Growth" no-row bordered flat>
              <user-growth />
            </base-section>
          </div>
          <div class="col-xs-12 col-lg-6 col-sm-6">
            <base-section title="Retention Rate" no-row bordered flat>
              <retention-rate />
            </base-section>
          </div>
          <div class="col-xs-12 col-lg-6 col-sm-6">
            <base-section title="Attendance & Utilization" no-row bordered flat>
              <attendance-utilization />
            </base-section>
          </div>
          <div class="col-xs-12 col-lg-6 col-sm-6">
            <base-section title="Revenue Trends" no-row bordered flat>
              <revenue-trends />
            </base-section>
          </div>
          <div class="col-xs-12 col-sm-12">
            <base-section
              :title="$t('label.classSchedules')"
              :description="$t('manageAdminClassSchedules')"
              no-row
              flat
              bordered
              class="class-schedules"
            >
              <class-schedules-calendar />

              <template #bottom>
                <div class="text-left">
                  <base-btn
                    color="primary"
                    label="View all"
                    link
                    :to="{ name: 'Week Schedules' }"
                  />
                </div>
              </template>
            </base-section>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from "pinia";
import ClassSchedulesCalendar from "src/components/ClassSchedulesCalendar.vue";
import { useAppStore } from "stores/app";
import UserGrowth from "src/components/charts/UserGrowth.vue";
import RevenueBreakdown from "src/components/charts/RevenueBreakdown.vue";
import RetentionRate from "src/components/charts/RetentionRate.vue";
import AttendanceUtilization from "src/components/charts/AttendanceUtilization.vue";
import RevenueTrends from "src/components/charts/RevenueTrends.vue";
import CheckinLogs from "src/components/charts/CheckinLogs.vue";
import MembersBreakdown from "src/components/charts/MembersBreakdown.vue";
import NewMembers from "src/components/kpi/NewMembers.vue";
import VisitsToday from "src/components/kpi/VisitsToday.vue";
import MemberVisits from "src/components/kpi/MemberVisits.vue";
import BookingsCurrentMonth from "src/components/kpi/BookingsCurrentMonth.vue";
import OnlineBookingsCurrentMonth from "src/components/kpi/OnlineBookingsCurrentMonth.vue";
import OnlineSignupsCurrentMonth from "src/components/kpi/OnlineSignupsCurrentMonth.vue";

export default {
  components: {
    ClassSchedulesCalendar,
    UserGrowth,
    RevenueBreakdown,
    RetentionRate,
    AttendanceUtilization,
    RevenueTrends,
    CheckinLogs,
    MembersBreakdown,
    NewMembers,
    VisitsToday,
    MemberVisits,
    BookingsCurrentMonth,
    OnlineBookingsCurrentMonth,
    OnlineSignupsCurrentMonth,
  },
  methods: {
    icon(item) {
      return item.icon.replace("fas", "fad");
    },
    toRoute(item) {
      return item.url ? "/admin/" + item.url : "";
    },
  },
  computed: {
    menuItems() {
      return [
        {
          id: "addMembers",
          icon: "fad fa-plus-circle",
          label: this.$t("addMember"),
          url: "members/add",
        },
        ...this.homeItems,
        {
          id: "qrcode-scanner",
          icon: "fad fa-qrcode",
          label: this.$t("scanQrCode"),
          url: "scanner",
        },
      ];
    },
    ...mapState(useAppStore, ["homeItems", "greeting"]),
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
