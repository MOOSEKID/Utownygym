export default [
  {
    path: "/",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        name: "Dashboard",
        meta: {
          auth: true,
        },
        component: () => import("pages/IndexPage.vue"),
      },
    ],
  },
  {
    path: "/enquiries",
    component: () => import("src/layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        name: "Enquiries",
        meta: {
          auth: true,
          title: "Messages",
          status: "All",
        },
        component: () => import("pages/core/enquiries/EnquiriesPage.vue"),
      },
      {
        path: ":id",
        name: "Enquiry",
        meta: {
          auth: true,
          title: "Create Message",
        },
        component: () => import("pages/core/enquiries/EnquiryPage.vue"),
      },
    ],
  },
  {
    path: "/guest-passes",
    component: () => import("src/layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        name: "Guest Passes",
        meta: {
          auth: true,
        },
        component: () => import("pages/guest-passes/GuestPassesPage.vue"),
      },
      {
        path: ":id",
        name: "Guest Pass",
        meta: {
          auth: true,
        },
        component: () => import("pages/guest-passes/GuestPassPage.vue"),
      },
    ],
  },
  {
    path: "/shop",
    component: () => import("src/layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        name: "Shop",
        meta: {
          auth: true,
        },
        component: () => import("pages/users/ShopPage.vue"),
      },
      {
        path: "products",
        redirect: "/shop",
      },
      {
        path: "products/:slug",
        name: "Product",
        meta: {
          auth: true,
        },
        component: () => import("pages/users/shop/ProductPage.vue"),
      },
      {
        path: "cart",
        name: "Cart",
        meta: {
          auth: true,
        },
        component: () => import("pages/users/shop/CartPage.vue"),
      },
    ],
  },
  {
    path: "/classes",
    redirect: "/classes/bookable",
    component: () => import("src/layouts/AppLayout.vue"),
    children: [
      {
        path: "bookable",
        name: "Bookable",
        meta: {
          auth: true,
          title: "Bookable Classes",
        },
        component: () => import("pages/users/BookablePage.vue"),
      },
      {
        path: "booked",
        name: "Classes",
        meta: {
          auth: true,
          title: "Booked Classes",
        },
        component: () => import("pages/users/ClassSchedulesPage.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      {
        path: "my-account",
        name: "My Account",
        meta: {
          auth: true,
          title: "My Account",
        },
        component: () => import("pages/MyAccountPage.vue"),
      },
      {
        path: "checkin-history",
        name: "Check-in History",
        meta: {
          auth: true,
          title: "Check-in History",
        },
        component: () => import("pages/users/CheckinHistoryPage.vue"),
      },
      {
        path: "billing",
        name: "Billing",
        meta: {
          auth: true,
          title: "Billing",
        },
        component: () => import("pages/BillingPage.vue"),
      },
      {
        path: "subscription",
        name: "Subscription",
        meta: {
          auth: true,
          title: "Subscription",
        },
        component: () => import("pages/SubscriptionPage.vue"),
      },
    ],
  },
  {
    path: "/payment",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      {
        path: "stripe",
        name: "Stripe Payment",
        meta: {
          auth: true,
          title: "Payment",
        },
        component: () => import("pages/core/payment/StripePage.vue"),
      },
      {
        path: "paypal",
        name: "Paypal Payment",
        meta: {
          auth: true,
          title: "Payment",
        },
        component: () => import("pages/core/payment/PaypalPage.vue"),
      },
      {
        path: "razorpay",
        name: "Razorpay Payment",
        meta: {
          auth: true,
          title: "Payment",
        },
        component: () => import("pages/core/payment/RazorpayPage.vue"),
      },
    ],
  },
  {
    path: "/sign-up",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      {
        path: "",
        name: "Sign up",
        meta: {
          auth: false,
        },
        component: () => import("pages/SignUpPage.vue"),
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
          signup: true,
          auth: false,
          signup: true,
          title: "Members Login",
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
];
