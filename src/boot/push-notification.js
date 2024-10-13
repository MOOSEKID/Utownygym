import { PushNotifications } from "@capacitor/push-notifications";
import { boot } from "quasar/wrappers";
import { Capacitor } from "@capacitor/core";
import { LocalStorage } from "quasar";
import { useAppStore } from "stores/app";
import core from "services/core";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ redirect }) => {
  const appStore = useAppStore();

  if (Capacitor.isNativePlatform()) {
    console.log("Initializing Push Notification....");

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === "granted") {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener("registration", (token) => {
      const device_token = token.value;
      console.log("boot/push-notification.registration()", device_token);
      if (appStore.isAuthenticated) {
        appStore.addDeviceToken(device_token);
      } else {
        LocalStorage.set("device_token", device_token);
      }
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener("registrationError", (error) => {
      core.error(error);
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification) => {
        // do something
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      ({ notification }) => {
        const { data } = notification;

        if (data.route) {
          redirect({ path: data.route });
        }
      }
    );
  }
});
