function routes() {
  const context = require.context("./admins", true, /\.js$/);
  return context.keys().reduce((routes, key) => {
    const routeModule = context(key).default;
    return routes.concat(routeModule);
  }, []);
}

export default [
  {
    path: "/",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Dashboard",
        meta: {
          auth: true,
        },
        component: () => import("pages/admins/IndexPage.vue"),
      },
      {
        path: "scanner",
        name: "Scanner",
        meta: {
          auth: true,
        },
        component: () => import("pages/admins/QrCodeScannerPage.vue"),
      },
      {
        path: "my-account",
        name: "My Account",
        meta: {
          auth: true,
          title: "My Account",
        },
        component: () => import("pages/admins/MyAccountPage.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "login",
        meta: {
          auth: false,
          title: "Admin Login",
        },
        name: "Login",
        component: () => import("pages/core/auth/LoginPage.vue"),
      },
      {
        path: "forgot-password",
        meta: {
          auth: false,
        },
        name: "Forget Password",
        component: () => import("pages/core/auth/ForgotPasswordPage.vue"),
      },
      {
        path: "reset-password",
        meta: {
          auth: false,
        },
        name: "Reset Password",
        component: () => import("pages/core/auth/ResetPasswordPage.vue"),
      },
    ],
  },
  {
    path: "/reports",
    redirect: "/reports/daily",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "daily",
        name: "Daily Reports",
        meta: {
          auth: true,
          permission: "members:reports-daily",
        },
        component: () => import("pages/admins/members/ReportsDayPage.vue"),
      },
      {
        path: "monthly",
        name: "Monthly Reports",
        meta: {
          auth: true,
          permission: "members:reports-monthly",
        },
        component: () =>
          import("src/pages/admins/members/ReportsMonthPage.vue"),
      },
      {
        path: "yearly",
        name: "Yearly Reports",
        meta: {
          auth: true,
          permission: "members:reports-yearly",
        },
        component: () => import("pages/admins/members/ReportsYearPage.vue"),
      },
    ],
  },
  {
    path: "/staff",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Staffs",
        meta: {
          auth: true,
          permission: "staff:list",
        },
        component: () => import("pages/core/staffs/StaffsPage.vue"),
      },
      {
        path: ":id",
        name: "Staff",
        permission: "staff:*",
        meta: {
          auth: true,
        },
        component: () => import("pages/core/staffs/StaffPage.vue"),
      },
    ],
  },
  {
    path: "/groups",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Groups",
        meta: {
          auth: true,
          permission: "groups:list",
        },
        component: () => import("pages/core/groups/GroupsPage.vue"),
      },
      {
        path: ":id",
        name: "Group",
        meta: {
          auth: true,
          permission: "groups:*",
        },
        component: () => import("pages/core/groups/GroupPage.vue"),
      },
    ],
  },
  {
    path: "/members",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Members",
        meta: {
          auth: true,
          permission: "members:list",
        },
        component: () => import("pages/admins/members/MembersPage.vue"),
      },
      {
        path: ":id",
        name: "Member",
        meta: {
          auth: true,
          permission: "members:*",
        },
        component: () => import("pages/admins/members/MemberPage.vue"),
      },
    ],
  },
  {
    path: "/enquiry",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Member Enquiry",
        meta: {
          auth: true,
          permission: "members:list",
        },
        component: () => import("pages/admins/members/EnquiryPage.vue"),
      },
    ],
  },
  {
    path: "/instructors",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Instructors",
        meta: {
          auth: true,
          permission: "instructors:list",
        },
        component: () => import("pages/admins/instructors/InstructorsPage.vue"),
      },
      {
        path: ":id",
        name: "Instructor",
        meta: {
          auth: true,
          permission: "instructors:*",
        },
        component: () => import("pages/admins/instructors/InstructorPage.vue"),
      },
    ],
  },
  {
    path: "/products",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Products",
        meta: {
          auth: true,
          permission: "products:list",
        },
        component: () => import("pages/admins/products/ProductsPage.vue"),
      },
      {
        path: ":id",
        name: "Product",
        meta: {
          auth: true,
          permission: "products:*",
        },
        component: () => import("pages/admins/products/ProductPage.vue"),
      },
      {
        path: ":product_id/variants/:variant_id",
        name: "Products Variant",
        meta: {
          auth: true,
          permission: "products:*",
        },
        component: () => import("pages/admins/products/VariantPage.vue"),
      },
      {
        path: "categories",
        name: "Categories",
        meta: {
          auth: true,
          permission: "products:categories",
        },
        component: () =>
          import("pages/admins/products/categories/CategoriesPage.vue"),
      },
      {
        path: "categories/:id",
        name: "Category",
        meta: {
          auth: true,
          permission: "products:categories",
        },
        component: () =>
          import("pages/admins/products/categories/CategoryPage.vue"),
      },
      {
        path: "collections",
        name: "Collections",
        meta: {
          auth: true,
          permission: "products:collections",
        },
        component: () =>
          import("pages/admins/products/collections/CollectionsPage.vue"),
      },
      {
        path: "collections/:id",
        name: "Collection",
        meta: {
          auth: true,
          permission: "products:collections",
        },
        component: () =>
          import("pages/admins/products/collections/CollectionPage.vue"),
      },
      {
        path: "attributes",
        name: "Attributes",
        meta: {
          auth: true,
          permission: "products:attributes",
        },
        component: () =>
          import("pages/admins/products/attributes/AttributesPage.vue"),
      },
      {
        path: "attributes/:id",
        name: "Attribute",
        meta: {
          auth: true,
          permission: "products:attributes",
        },
        component: () =>
          import("pages/admins/products/attributes/AttributePage.vue"),
      },
      {
        path: "inventory",
        name: "Inventory",
        meta: {
          auth: true,
          permission: "products:inventory",
        },
        component: () => import("pages/admins/products/InventoryPage.vue"),
      },
    ],
  },
  {
    path: "/orders",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Orders",
        meta: {
          auth: true,
          permission: "orders:list",
        },
        component: () => import("pages/admins/orders/OrdersPage.vue"),
      },
      {
        path: ":id",
        name: "Order",
        meta: {
          auth: true,
          permission: "orders:*",
        },
        component: () => import("pages/admins/orders/OrderPage.vue"),
      },
      {
        path: "customers/:id",
        name: "Customer",
        meta: {
          auth: true,
          permission: "orders:*",
        },
        component: () => import("pages/admins/orders/CustomerPage.vue"),
      },
    ],
  },
  {
    path: "/pos",
    component: () => import("src/layouts/PosLayout.vue"),
    children: [
      {
        path: "",
        name: "Pos",
        meta: {
          auth: true,
          permission: "orders:pos",
        },
        component: () => import("pages/admins/orders/PosPage.vue"),
      },
    ],
  },
  {
    path: "/classes",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Classes",
        meta: {
          auth: true,
          permission: "classes:list",
        },
        component: () => import("pages/admins/class-lists/ClassesPage.vue"),
      },
      {
        path: ":id",
        name: "Class",
        meta: {
          auth: true,
          permission: "classes:*",
        },
        component: () => import("pages/admins/class-lists/ClassPage.vue"),
      },
    ],
  },
  {
    path: "/enquiries",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Enquiries",
        meta: {
          auth: true,
          permission: "enquiries:list",
          title: "Enquiries",
          status: "Live",
        },
        component: () => import("pages/core/enquiries/EnquiriesPage.vue"),
      },
      {
        path: ":id",
        name: "Enquiry",
        meta: {
          auth: true,
          permission: "enquiries:*",
        },
        component: () => import("pages/core/enquiries/EnquiryPage.vue"),
      },
    ],
  },
  {
    path: "/tasks",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Tasks",
        meta: {
          auth: true,
          permission: "tasks:list",
          status: "Live",
        },
        component: () => import("pages/core/tasks/TasksPage.vue"),
      },
      {
        path: ":id",
        name: "Task",
        meta: {
          auth: true,
          permission: "tasks:*",
        },
        component: () => import("pages/core/tasks/TaskPage.vue"),
      },
    ],
  },
  {
    path: "/class-schedules",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Class Schedules",
        meta: {
          auth: true,
          title: "Week Schedules",
          permission: "week-schedules:edit",
        },
        component: () => import("pages/admins/ClassSchedulesPage.vue"),
      },
    ],
  },
  {
    path: "/announcements",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Announcements",
        meta: {
          auth: true,
          permission: "announcements:list",
        },
        component: () =>
          import("pages/admins/announcements/AnnouncementsPage.vue"),
      },
      {
        path: ":id",
        name: "Announcement",
        meta: {
          auth: true,
          permission: "announcements:*",
        },
        component: () =>
          import("pages/admins/announcements/AnnouncementPage.vue"),
      },
    ],
  },
  {
    path: "/locations",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Locations",
        meta: {
          auth: true,
          permission: "locations:list",
        },
        component: () => import("pages/admins/locations/LocationsPage.vue"),
      },
      {
        path: ":id",
        name: "Location",
        meta: {
          auth: true,
          permission: "locations:*",
        },
        component: () => import("pages/admins/locations/LocationPage.vue"),
      },
    ],
  },
  {
    path: "/templates",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Templates",
        meta: {
          auth: true,
          permission: "templates:list",
        },
        component: () => import("pages/admins/templates/TemplatesPage.vue"),
      },
      {
        path: ":id",
        name: "Template",
        meta: {
          auth: true,
          permission: "templates:*",
        },
        component: () => import("pages/admins/templates/TemplatePage.vue"),
      },
    ],
  },
  {
    path: "/week-schedules",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Week Schedules",
        meta: {
          auth: true,
          permission: "week-schedules:list",
        },
        component: () =>
          import("pages/admins/week-schedules/WeekSchedulesPage.vue"),
      },
      {
        path: ":id",
        name: "Week Schedule",
        meta: {
          auth: true,
          permission: "week-schedules:*",
        },
        component: () =>
          import("pages/admins/week-schedules/WeekSchedulePage.vue"),
      },
    ],
  },
  {
    path: "/settings",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Settings",
        meta: {
          auth: true,
          title: "Settings",
          permission: "settings:*",
        },
        component: () => import("pages/admins/SettingsPage.vue"),
      },
      {
        path: "locations",
        name: "Shop Locations",
        meta: {
          auth: true,
          permission: "settings:shop-locations",
        },
        component: () => import("pages/admins/settings/ShopLocationsPage.vue"),
      },
      {
        path: "taxes",
        name: "Taxes",
        meta: {
          auth: true,
          title: "Taxes and duties",
          permission: "settings:taxes",
        },
        component: () => import("pages/admins/settings/TaxesPage.vue"),
      },
      {
        path: "payments",
        name: "Payment Methods",
        meta: {
          auth: true,
          title: "Payment methods",
          permission: "settings:payment-methods",
        },
        component: () => import("pages/admins/settings/PaymentMethodsPage.vue"),
      },
      {
        path: "notifications",
        name: "Notifications",
        meta: {
          auth: true,
          permission: "settings:notifications",
        },
        component: () =>
          import("pages/admins/settings/notifications/NotificationsPage.vue"),
      },
      {
        path: "notifications/:id",
        name: "Notification",
        meta: {
          auth: true,
          permission: "settings:notifications",
        },
        component: () =>
          import("pages/admins/settings/notifications/NotificationPage.vue"),
      },
      {
        path: "questionnaires",
        name: "Questionnaires",
        meta: {
          auth: true,
          permission: "settings:questionnaires",
        },
        component: () =>
          import("pages/admins/settings/questionnaires/QuestionnairesPage.vue"),
      },
      {
        path: "questionnaires/:id",
        name: "Questionnaire",
        meta: {
          auth: true,
          permission: "settings:questionnaires",
        },
        component: () =>
          import("pages/admins/settings/questionnaires/QuestionnairePage.vue"),
      },
      {
        path: "plans",
        name: "Plans",
        meta: {
          auth: true,
          permission: "settings:plans",
        },
        component: () => import("pages/admins/settings/plans/PlansPage.vue"),
      },
      {
        path: "plans/:id",
        name: "Plan",
        meta: {
          auth: true,
          permission: "settings:plans",
        },
        component: () => import("pages/admins/settings/plans/PlanPage.vue"),
      },
      {
        path: "coupons",
        name: "Coupons",
        meta: {
          auth: true,
          permission: "settings:coupons",
        },
        component: () =>
          import("pages/admins/settings/coupons/CouponsPage.vue"),
      },
      {
        path: "coupons/:id",
        name: "Coupon",
        meta: {
          auth: true,
          permission: "settings:coupons",
        },
        component: () => import("pages/admins/settings/coupons/CouponPage.vue"),
      },
    ],
  },
  {
    path: "/blogs",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Blogs",
        meta: {
          auth: true,
          permission: "blogs:list",
        },
        component: () => import("pages/core/blogs/BlogsPage.vue"),
      },
      {
        path: ":id",
        name: "Blog",
        meta: {
          auth: true,
          permission: ["blogs:view", "blogs:edit", "blogs:new"],
        },
        component: () => import("pages/core/blogs/BlogPage.vue"),
      },
    ],
  },
  {
    path: "/pages",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Pages",
        meta: {
          auth: true,
          permission: "pages:list",
        },
        component: () => import("pages/core/pages/PagesPage.vue"),
      },
      {
        path: ":id",
        name: "Page",
        meta: {
          auth: true,
          permission: "pages:*",
        },
        component: () => import("pages/core/pages/PagePage.vue"),
      },
    ],
  },
  {
    path: "/pages/:id/editor",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      {
        path: "",
        name: "Page Editor",
        meta: {
          auth: true,
          title: "Page Editor",
          permission: "pages:edit",
        },
        component: () => import("pages/core/pages/PageEditorPage.vue"),
      },
    ],
  },
  {
    path: "/themes",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Themes",
        meta: {
          auth: true,
          // permission: "themes:list",
        },
        component: () => import("pages/core/themes/ThemesPage.vue"),
      },
    ],
  },
  {
    path: "/themes/:name",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      {
        path: "",
        name: "Theme Editor",
        meta: {
          auth: true,
          // permission: "themes:edit",
        },
        component: () => import("pages/core/themes/EditorPage.vue"),
      },
    ],
  },
  ...routes(),
];
