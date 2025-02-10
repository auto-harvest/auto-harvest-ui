import { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useAppSelector } from "@/store/overrides";
import { useAppDispatch } from "@/store/overrides";
import { setPushToken } from "@/store/slices/persist/authSlice";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

export default function useNotifications(onNotification: (notification: any) => void) {
  const dispatch = useAppDispatch();
  const allowPush = useAppSelector((state) => state.auth.allowPush);
 
  const notificationListener = useRef<Notifications.EventSubscription>();
  useEffect(() => {
    if (!allowPush) return;
    if (Platform.OS !== "android") return;

    registerForPushNotificationsAsync()
      .then((token) =>{ 
        dispatch(setPushToken(token ?? ""))
      })
      .catch((error: any) => console.error(error));
    notificationListener.current =
      Notifications.addNotificationReceivedListener(onNotification);
    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
    
    };
  }, [allowPush, dispatch, onNotification]);

  return notificationListener.current;
}
