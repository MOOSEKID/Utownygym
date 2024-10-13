export const adminSideMenus = (store) => [
  {
    title: store.$t("menus.dashboard"),
    icon: "fas fa-tachometer-alt",
    route: "Dashboard",
  },
  /* MENUS */
  /* Don't remove `MENUS` placeholder. */
  {
    title: store.$t("menus.enquiries"),
    icon: "fas fa-message-quote",
    route: "Enquiries",
    permission: "enquiries:list",
    notification: store.stats.unread_support,
  },
  {
    title: store.$t("menus.tasks"),
    icon: "fas fa-list-check",
    route: "Tasks",
    permission: "tasks:list",
    notification: store.stats.unread_tasks,
  },
  {
    title: store.$t("menus.members"),
    icon: "fas fa-user-tag",
    route: "Member Enquiry",
    permission: ["members:enquiry", "members:list"],
    related: ["/members*", "/enquiry"],
    subLinks: [
      {
        title: store.$t("menus.enquiry"),
        route: "Member Enquiry",
        permission: "members:enquiry",
      },
      {
        title: store.$t("menus.members"),
        route: "Members",
        permission: "members:list",
      },
    ],
  },
  {
    title: store.$t("menus.reports"),
    icon: "fas fa-chart-user",
    route: "Daily Reports",
    permission: "members:reports*",
    related: ["/reports/*"],
    subLinks: [
      {
        title: store.$t("menus.dailyReports"),
        route: "Daily Reports",
        permission: "members:reports-daily",
      },
      {
        title: store.$t("menus.monthlyReports"),
        route: "Monthly Reports",
        permission: "members:reports-monthly",
      },
      {
        title: store.$t("menus.yearlyReports"),
        route: "Yearly Reports",
        permission: "members:reports-yearly",
      },
    ],
  },
  {
    title: store.$t("menus.classes"),
    icon: "fas fa-book-sparkles",
    route: "Classes",
    permission: [
      "classes:list",
      "templates:list",
      "locations:list",
      "week-schedules:edit",
    ],
    related: ["/classes*", "/templates*", "/class-schedules*", "/locations*"],
    subLinks: [
      {
        title: store.$t("menus.allClasses"),
        route: "Classes",
        permission: "classes:list",
      },
      {
        title: store.$t("menus.templates"),
        route: "Templates",
        permission: "templates:list",
      },
      {
        title: store.$t("menus.weekSchedules"),
        route: "Class Schedules",
        permission: "week-schedules:edit",
      },
      {
        title: store.$t("menus.locations"),
        route: "Locations",
        permission: "locations:list",
      },
    ],
  },
  {
    title: store.$t("menus.products"),
    icon: "fas fa-box-open-full",
    route: "Products",
    permission: "products:*",
    related: ["/products", "/products/*"],
    subLinks: [
      {
        title: store.$t("menus.allProducts"),
        route: "Products",
        exact: true,
        related: [
          "/products",
          "/products/(d+)",
          "/products/(d+)/*",
          "/products/add*",
        ],
        permission: "products:list",
      },
      {
        title: store.$t("label.inventory"),
        route: "Inventory",
        related: ["/products/inventory*"],
        permission: "products:inventory",
      },
      {
        title: store.$t("label.collections"),
        route: "Collections",
        related: ["/products/collections*"],
        permission: "products:collections",
      },
      {
        title: store.$t("label.categories"),
        route: "Categories",
        related: ["/products/categories*"],
        permission: "products:categories",
      },
      {
        title: store.$t("label.attributes"),
        route: "Attributes",
        related: ["/products/attributes*"],
        permission: "products:attributes",
      },
    ],
  },
  {
    title: store.$t("menus.instructors"),
    icon: "fas fa-chalkboard-user",
    route: "Instructors",
    permission: "instructors:list",
  },
  {
    title: store.$t("menus.weekSchedules"),
    icon: "fas fa-calendar-days",
    route: "Week Schedules",
    permission: "week-schedules:list",
  },
  {
    title: store.$t("menus.orders"),
    icon: "fas fa-cart-arrow-down",
    route: "Orders",
    permission: "orders:list",
  },
  {
    title: store.$t("menus.announcements"),
    icon: "fas fa-bullhorn",
    route: "Announcements",
    permission: "announcements:list",
  },
  {
    title: store.$t("menus.frontend"),
    icon: "fas fa-browser",
    route: "Pages",
    permission: ["blogs:list", "pages:list"],
    related: ["/pages*", "/blogs*", "/themes*"],
    subLinks: [
      {
        title: store.$t("themes"),
        route: "Themes",
        // permission: "pages:list",
      },
      {
        title: store.$t("menus.pages"),
        route: "Pages",
        permission: "pages:list",
      },
      {
        title: store.$t("menus.blogPosts"),
        route: "Blogs",
        permission: "blogs:list",
      },
    ],
  },
  {
    title: store.$t("menus.staff"),
    icon: "fas fa-user-shield",
    route: "Staffs",
    related: ["/groups*", "/staff*"],
    permission: ["staff:list", "groups:list"],
    subLinks: [
      {
        title: store.$t("menus.allStaff"),
        route: "Staffs",
        permission: "staff:list",
      },
      {
        title: store.$t("menus.groups"),
        route: "Groups",
        permission: "groups:list",
      },
    ],
  },
];

export const appSideMenus = (store) => [
  {
    title: store.$t("menus.dashboard"),
    icon: "fas fa-tachometer-alt",
    route: "Dashboard",
  },
  {
    title: store.$t("menus.messages"),
    icon: "fas fa-message-quote",
    route: "Enquiries",
    notification: store.user.unread_enquiries,
  },
  {
    title: store.$t("menus.bookClass"),
    icon: "fas fa-calendar-circle-plus",
    route: "Bookable",
  },
  {
    title: store.$t("menus.classesBooked"),
    icon: "fas fa-calendar-circle-user",
    route: "Classes",
  },
  {
    title: store.$t("menus.guestPasses"),
    route: "Guest Passes",
    icon: "fas fa-user-tag",
  },
  {
    title: store.$t("menus.shop"),
    route: "Shop",
    icon: "fas fa-gifts",
    show: store.config?.shop,
  },
  {
    title: store.$t("checkInHistory"),
    route: "Check-in History",
    icon: "fas fa-clock",
  },
  {
    title: store.$t("menus.billing"),
    route: "Billing",
    icon: "fas fa-credit-card",
  },
];
